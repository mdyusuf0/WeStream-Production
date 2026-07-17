import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { connectToDatabase } from "../../../lib/db";
import { ContactSubmission } from "../../../models/ContactSubmission";
import { rateLimitContact, blockUserInstantly } from "../../../lib/rateLimit";

// Nodemailer SMTP fallback or console logger
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

let transporter: nodemailer.Transporter | null = null;

if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

// Target email address for notifications
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "admin@westream.in";

export async function POST(req: NextRequest) {
  try {
    // 1. Honeypot check for bots (field: website)
    const body = await req.json();
    const honeypot = body.website; // 'website' serves as our honeypot

    if (honeypot && honeypot.trim() !== "") {
      const blockToken = await blockUserInstantly(req);
      const res = NextResponse.json({ success: true, message: "Submission received." });
      
      if (blockToken) {
        res.cookies.set("ws_block_token", blockToken, {
          httpOnly: true,
          path: "/",
          maxAge: 86400, // 24 hours
          sameSite: "strict",
        });
      }
      return res; // Return fake success to quiet the bot
    }

    // 2. Redis Rate Limiting & Blocking
    const rateLimitResult = await rateLimitContact(req);
    if (rateLimitResult.blocked) {
      const res = NextResponse.json(
        { error: "Too many submissions. Please wait before submitting another enquiry." },
        { status: 429 }
      );
      
      if (rateLimitResult.shouldBlockCookie) {
        res.cookies.set("ws_block_token", rateLimitResult.blockToken, {
          httpOnly: true,
          path: "/",
          maxAge: 3600, // 1 hour
          sameSite: "strict",
        });
      }
      return res;
    }

    // 3. Payload Validation
    const {
      fullName,
      company,
      email,
      phone,
      projectType,
      budget,
      timeline,
      description,
      referenceLinks,
      driveLink,
    } = body;

    if (!fullName || !email || !projectType || !description) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, email, projectType, and description are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address format." }, { status: 400 });
    }

    const validProjectTypes = ["Corporate Film", "Live Streaming", "Event Coverage", "Post-Production", "Other"];
    if (!validProjectTypes.includes(projectType)) {
      return NextResponse.json(
        { error: "Invalid project type. Must be one of the designated options." },
        { status: 400 }
      );
    }

    // 4. Save to MongoDB Database
    await connectToDatabase();
    const submission = await ContactSubmission.create({
      fullName,
      company: company || "",
      email: email.toLowerCase().trim(),
      phone: phone || "",
      projectType,
      budget: budget || "",
      timeline: timeline || "",
      description,
      referenceLinks: referenceLinks || "",
      driveLink: driveLink || "",
      status: "NEW",
      source: "contact-page",
    });

    // 5. Send Notification Email (optional convenience alert)
    const emailSubject = `New WeStream Contact Enquiry from ${fullName}`;
    const emailHtml = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Timeline:</strong> ${timeline || "N/A"}</p>
      <p><strong>Budget (Private):</strong> ${budget || "N/A"}</p>
      <p><strong>Google Drive Link:</strong> ${driveLink ? `<a href="${driveLink}">${driveLink}</a>` : "None"}</p>
      <p><strong>Description:</strong></p>
      <p>${description}</p>
      <p><strong>Reference Links:</strong> ${referenceLinks || "None"}</p>
      <hr />
      <p><em>View and manage this enquiry on the <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/enquiries">WeStream Admin Dashboard</a>.</em></p>
    `;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"WeStream System" <${SMTP_USER}>`,
          to: NOTIFICATION_EMAIL,
          subject: emailSubject,
          html: emailHtml,
        });
        console.log(`Notification email sent to: ${NOTIFICATION_EMAIL}`);
      } catch (mailError) {
        console.error("Failed to send notification email via SMTP:", mailError);
      }
    } else {
      console.log(`[Email Log Fallback] notification to ${NOTIFICATION_EMAIL}:
        Subject: ${emailSubject}
        Content: ${emailHtml}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Your enquiry has been successfully stored.",
      submission 
    });
  } catch (error: any) {
    console.error("Public contact form submission failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

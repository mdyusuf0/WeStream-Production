import mongoose, { Schema } from "mongoose";

const ContactSubmissionSchema = new Schema({
  fullName: { type: String, required: true },
  company: { type: String, default: "" },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  projectType: { 
    type: String, 
    enum: ["Corporate Film", "Live Streaming", "Event Coverage", "Post-Production", "Other"], 
    required: true 
  },
  budget: { type: String, default: "" }, // private field, never rendered on the public site
  timeline: { type: String, default: "" },
  description: { type: String, required: true },
  referenceLinks: { type: String, default: "" },
  driveLink: { type: String, default: "" }, // Google Drive link field, per Section 6/7
  status: { type: String, enum: ["NEW", "READ", "ARCHIVED"], default: "NEW" },
  source: { type: String, default: "contact-page" },
}, { timestamps: true });

// Compound index for sorting by status and date
ContactSubmissionSchema.index({ status: 1, createdAt: -1 });

export const ContactSubmission = mongoose.models.ContactSubmission || mongoose.model("ContactSubmission", ContactSubmissionSchema);
export default ContactSubmission;

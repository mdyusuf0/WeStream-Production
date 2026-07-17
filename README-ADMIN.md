# WeStream Production — Admin Portal Setup Guide

This guide details the setup and configuration of the secure, flat-role administrative dashboard for **WeStream Production** (swapping hero media and review contact submissions).

---

## 1. Prerequisites & Stack
- **Database:** MongoDB Atlas (Mongoose connection)
- **Cache/Lockout:** Redis (e.g. Upstash Redis, used for rate limits, lookup caches, and block cookies)
- **CDN/Storage:** Cloudinary (secure media uploads)
- **Auth:** NextAuth.js (Credentials provider)
- **Mailing:** Nodemailer (SMTP alert fallback for incoming enquiries)

---

## 2. Environment Variables (`.env.local`)
Create a `.env.local` file at the root of your project. You can copy the structure from `.env.example`:

```env
# MongoDB Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/westream

# Redis Connection URL (e.g. Upstash Redis)
REDIS_URL=redis://default:<password>@<host>:<port>

# NextAuth configuration
NEXTAUTH_SECRET=generate-a-random-32-character-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Seed Admin user details (Used once by the seed script. Remove after bootstrap)
SEED_ADMIN_EMAIL=admin@westream.in
SEED_ADMIN_PASSWORD=your-secure-temporary-password
```

> [!IMPORTANT]
> Keep `.env.local` local and **never** commit it to git control.

---

## 3. Database Seeding & Bootstrapping
Before you run the dashboard, you must run the idempotent seed script. It does two things:
1. Creates the first `SYSTEM_ADMIN` user using the credentials from `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`.
2. Creates the initial target `MediaAsset` rows matching all static placeholders on the public site.

Run the seed script:
```bash
npx tsx scripts/seed.ts
```

Output should show:
```
Loaded environment configuration from: .env.local
Connecting to MongoDB...
Connected successfully!
Successfully seeded initial system_admin user: admin@westream.in
Checking/seeding 20 placeholder media assets...
Media seeding completed: Created: 20, Skipped: 0
Disconnected from MongoDB.
```

---

## 4. Run Locally
Once the seed script has been completed successfully:
1. Start the dev server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:3000/admin` or `http://localhost:3000/admin/login`.
3. Log in with the email and password you defined in `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`.
4. After logging in, you will be redirected to the **Media Management** dashboard.

---

## 5. Security Features

### A. Access Control
- All routes under `/admin/*` (except `/admin/login`) and `/api/admin/*` are strictly protected server-side by NextAuth middleware. Unauthenticated requests are blocked.
- There are no public registration or signup pages. The seed script is the only external entrance.

### B. Admin Management
- Active logged-in admins can invite new admins using **Admins -> Add Admin** form.
- Admins can change their passwords using the **Change Password** panel.
- Self-deletion and removing the last remaining admin are blocked server-side to prevent lockouts.

### C. Abuse & Rate Limiting (Redis-backed)
- **Login Attempts:** Max 5 failed attempts within 10 minutes per IP+email. If exceeded, they are blocked for 10 minutes.
- **Contact Submissions:** Max 5 submissions per hour per IP. If exceeded, they are blocked for 1 hour.
- **Honeypot Trigger:** If the hidden `website` field is filled out by spam bots, they are blocked instantly for 24 hours.
- **Cookie Blocking:** When a block occurs, a unique block token is set as an HTTP-only cookie and stored in Redis. Subsequent requests from this browser are instantly rejected, even if they change their IP or email.

---

## 6. How Caching & Media Loading Works
1. **Dynamic lookup (`getMediaBySlot`):** Public pages check Redis cache for slot media (`media:<slotKey>`) first. On a cache miss, they fall back to MongoDB and repopulate Redis. If database layers fail, they return static placeholders (zero-regression).
2. **Instant updates (Cache invalidation):** When you replace media in the dashboard, the backend updates MongoDB, sets the new key in Redis, and triggers `revalidatePath` to refresh Next.js ISR caches instantly (live in seconds, no rebuilds needed).

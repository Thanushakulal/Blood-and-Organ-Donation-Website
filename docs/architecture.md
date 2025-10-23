# Blood & Organ Donation Platform — Simple Architecture

## Overview
- Frontend: Next.js (App Router) using shadcn/ui. Client-side i18n with a lightweight context for English/Hindi.
- Backend: Node.js (Express) or Next.js Route Handlers for simplicity (recommended to start with Next.js route handlers).
- Database: MongoDB (Atlas). Collections: donors, staffUsers, alerts.
- Notifications: SMTP (Nodemailer) for email alerts.

## Data Model (MongoDB)
- donors
  - _id (ObjectId)
  - name (string)
  - email (string, unique)
  - phone (string)
  - bloodGroup (enum: A+, A-, B+, B-, AB+, AB-, O+, O-)
  - city (string)
  - organConsent (boolean)
  - organs (array<string>)
  - createdAt (date), updatedAt (date)
- staffUsers
  - _id (ObjectId)
  - email (string, unique)
  - passwordHash (string)  // store bcrypt hash
  - role (string, default: "admin")
  - createdAt (date)
- alerts
  - _id (ObjectId)
  - senderUserId (ObjectId -> staffUsers)
  - subject (string)
  - message (string)      // raw template content
  - recipients (array<ObjectId> -> donors)
  - status (string: "queued" | "sent" | "failed")
  - createdAt (date)

## API Endpoints (suggested)
- POST /api/donors       => create donor
- GET  /api/donors       => list donors with filters (bloodGroup, organ, city)
- POST /api/auth/login   => staff login to obtain session/cookie
- POST /api/alerts       => create + send alert (server queues emails)
- GET  /api/alerts/:id   => status

Use Next.js Route Handlers for MVP. Add simple session cookie with signed JWT for staff endpoints.

## Email Sending
- Nodemailer SMTP transport using environment variables:
  - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
- Render alert message using a simple template (handlebars or mustache). Replace placeholders like {{name}}, {{need}}, {{city}}, {{contact}}, {{hospital}}.

## Security
- Hash passwords (bcrypt), enable rate limiting on auth routes, validate inputs (zod or joi).
- Store only necessary PII. Ensure CORS and CSRF protections if separated front/back ends.

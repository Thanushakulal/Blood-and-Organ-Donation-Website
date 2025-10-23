# Donor Registration & Alert Flow

## Donor Registration Flow (MVP)
1. Donor opens the registration page and fills in: name, email, phone, city, blood group, consent and optional organs.
2. Frontend validates required fields, then POST /api/donors.
3. Server validates, stores donor in MongoDB, returns success.
4. Optional: send a confirmation email thanking the donor.

## Alert Sending Flow (MVP)
1. Staff logs in to dashboard (POST /api/auth/login) and receives a session cookie.
2. Staff filters donors by blood group and/or organ and selects recipients.
3. Staff composes subject + message using placeholders like {{name}}, {{need}}, {{city}}, {{contact}}, {{hospital}}.
4. POST /api/alerts with recipients and template data. Server:
   - stores the alert document,
   - expands message per recipient (template variables),
   - sends emails via SMTP (Nodemailer),
   - updates status to "sent" or "failed".
5. Frontend shows a toast/notice when queued/sent.

## Basic Validation (suggested)
- Required: name, email, phone, bloodGroup, city.
- email format, phone format (basic), blood group enum check.
- staff login: basic rate limiting and lockout after repeated failures.

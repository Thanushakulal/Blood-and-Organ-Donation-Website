# Backend Data Structure (MVP suggestion)

- Tech: Node.js (Next.js route handlers) + MongoDB.
- Collections: donors, alerts, staffUsers.

## donors
\`\`\`json
{
  "_id": "ObjectId",
  "name": "Amit Sharma",
  "email": "amit@example.com",
  "phone": "+91 99999 11111",
  "bloodGroup": "A+",
  "city": "Delhi",
  "organConsent": true,
  "organs": ["Kidney", "Liver"],
  "createdAt": "2025-07-01T10:00:00Z"
}
\`\`\`

Indexes:
- email unique
- bloodGroup
- city
- organs (multikey)

## alerts
\`\`\`json
{
  "_id": "ObjectId",
  "createdBy": "staffUserId",
  "subject": "Urgent O- blood required",
  "message": "Dear {{name}} ...",
  "filters": { "bloodGroup": "O-", "organ": null, "city": "Delhi" },
  "recipientIds": ["donorId1", "donorId2"],
  "channel": ["email"], 
  "status": "queued|sent|failed",
  "createdAt": "2025-07-01T10:10:00Z"
}
\`\`\`

## staffUsers
\`\`\`json
{
  "_id": "ObjectId",
  "email": "staff@hospital.org",
  "passwordHash": "bcrypt...",
  "hospital": "City Hospital",
  "createdAt": "2025-07-01T08:00:00Z"
}
\`\`\`

Notes:
- Use server-side route handlers for `/api/donors` and `/api/alerts`.
- Keep PII protected; never expose donor contact info to clients other than authenticated staff.
- Add rate limiting and audit logs for alert sends.

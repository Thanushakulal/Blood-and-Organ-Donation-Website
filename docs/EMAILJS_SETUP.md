# EmailJS Integration Setup

This project uses EmailJS to send donor registration emails to `4pa23ic053@pace.edu.in`.

## Setup Instructions

### 1. Create EmailJS Account
- Go to [emailjs.com](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email

### 2. Create Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the setup wizard to connect your email account
- Note the **Service ID** (e.g., `service_xxxxx`)

### 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use the following template:

\`\`\`
Subject: New Donor Registration - {{donor_name}}

Dear Hospital Administrator,

A new donor has registered on the LifeLink platform:

**Donor Information:**
- Name: {{donor_name}}
- Age: {{donor_age}}
- Gender: {{donor_gender}}
- Email: {{donor_email}}
- Phone: {{donor_phone}}
- City: {{donor_city}}
- Blood Group: {{donor_blood_group}}
- Organs Willing to Donate: {{donor_organs}}
- Organ Donation Consent: {{donor_consent}}
- Submission Date: {{submission_date}}

Please review and add this donor to your database.

Best regards,
LifeLink Platform
\`\`\`

- Note the **Template ID** (e.g., `template_xxxxx`)

### 4. Add Environment Variables
Create a `.env.local` file in your project root:

\`\`\`env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
EMAILJS_PRIVATE_KEY=your_private_key_here
\`\`\`

### 5. Install EmailJS Package
\`\`\`bash
npm install @emailjs/nodejs @emailjs/browser
\`\`\`

### 6. Get Your Keys
- In EmailJS dashboard, go to "Account" → "API Keys"
- Copy your **Public Key** → Add to `.env.local` as `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- Copy your **Private Key** → Add to `.env.local` as `EMAILJS_PRIVATE_KEY`

## Environment Variables

Add these to your Vercel project's environment variables (in the Vars section):

- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` - Your EmailJS public key (visible to client)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` - Your EmailJS service ID (visible to client)
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` - Your EmailJS template ID (visible to client)
- `EMAILJS_PRIVATE_KEY` - Your EmailJS private key (server-only, hidden from client)

## Testing

1. Fill out the donor registration form
2. Submit the form
3. Check your email (the one configured in EmailJS) for the registration details
4. The email will be sent to `4pa23ic053@pace.edu.in` as configured in the template

## Troubleshooting

- **"Failed to send registration email"**: Check that all environment variables are correctly set
- **Email not sending**: Verify your EmailJS service is properly connected and verified
- **Template variables not replacing**: Ensure template parameter names match exactly in the template and code

## Free Tier Limits

EmailJS free tier allows:
- 200 emails per month
- Unlimited templates
- Unlimited services

For production use, consider upgrading to a paid plan.

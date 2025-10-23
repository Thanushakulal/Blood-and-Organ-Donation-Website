# Blood & Organ Donation Platform - Setup Guide

## Overview
This is a fully functional, multilingual donor registration platform that sends donor details to `4pa23ic053@pace.edu.in` via EmailJS.

## Features
- ✅ Responsive design with hospital theme (red/white)
- ✅ Full multilingual support (English, Hindi, Kannada, Malayalam)
- ✅ EmailJS integration for automatic email notifications
- ✅ Form validation and error handling
- ✅ Success/error toast notifications
- ✅ Mobile-friendly UI

## Prerequisites
- Node.js 16+ and npm
- EmailJS account (free tier available)

## Installation

### Step 1: Clone/Download the Project
\`\`\`bash
npm install
\`\`\`

### Step 2: Set Up EmailJS

1. **Create EmailJS Account**
   - Go to [emailjs.com](https://www.emailjs.com/)
   - Sign up for a free account
   - Verify your email

2. **Create Email Service**
   - Go to **Email Services** in the dashboard
   - Click **Add Service**
   - Choose **Gmail** or your email provider
   - Connect your email account
   - Copy the **Service ID** (format: `service_xxxxx`)

3. **Create Email Template**
   - Go to **Email Templates**
   - Click **Create New Template**
   - Use this template:

\`\`\`
Subject: New Donor Registration - {{donor_name}}

Hello,

A new donor has registered in the LifeLink platform:

Name: {{donor_name}}
Age: {{donor_age}}
Gender: {{donor_gender}}
Email: {{donor_email}}
Phone: {{donor_phone}}
City: {{donor_city}}
Blood Group: {{donor_blood_group}}
Organs: {{donor_organs}}
Consent: {{donor_consent}}
Registration Date: {{registration_date}}

Best regards,
LifeLink Team
\`\`\`

   - Copy the **Template ID** (format: `template_xxxxx`)

4. **Get Your API Keys**
   - Go to **Account** → **API Keys**
   - Copy your **Public Key**

### Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

\`\`\`
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
\`\`\`

Replace with your actual values from EmailJS.

### Step 4: Install Dependencies

\`\`\`bash
npm install @emailjs/browser
npm run dev
\`\`\`

### Step 5: Test the Application

1. Open `http://localhost:3000/donor/register`
2. Fill out the registration form
3. Click "Submit Registration"
4. Check your email at `4pa23ic053@pace.edu.in` for the donor details

## How It Works

### Form Fields
- **Full Name** - Donor's complete name
- **Age** - Must be 18 or older
- **Gender** - Male, Female, or Other
- **Email** - Donor's email address
- **Phone** - Contact number
- **City/Location** - Donor's location
- **Blood Group** - A+, A-, B+, B-, AB+, AB-, O+, O-
- **Organ Donation Consent** - Toggle to select organs
- **Organs** - Kidney, Liver, Heart, Lung, Pancreas, Cornea

### Email Sending
- When the form is submitted, EmailJS sends all donor details to `4pa23ic053@pace.edu.in`
- The email includes all form data with proper formatting
- Works even if the user is not logged into EmailJS
- Uses the public key for client-side sending

### Multilingual Support
- Language selector in the top-right corner
- Supports: English, हिंदी (Hindi), ಕನ್ನಡ (Kannada), മലയാളം (Malayalam)
- Language preference is saved in browser localStorage
- All text updates dynamically when language is changed

## Troubleshooting

### Emails Not Sending
1. Check that environment variables are correctly set in `.env.local`
2. Verify EmailJS service is connected to your email
3. Check that template ID matches exactly
4. Look for errors in browser console (F12 → Console tab)
5. Check spam/promotions folder in your email

### Form Not Submitting
1. Ensure all required fields are filled
2. Check browser console for error messages
3. Verify internet connection
4. Try refreshing the page

### Language Not Changing
1. Clear browser cache and localStorage
2. Try a different browser
3. Check browser console for errors

## Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in project settings:
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
5. Deploy

### Deploy to Other Platforms
- Ensure Node.js 16+ is available
- Set the same environment variables
- Run `npm run build && npm start`

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx           # Root layout with i18n provider
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles with design tokens
│   └── donor/
│       └── register/
│           └── page.tsx     # Donor registration page
├── components/
│   ├── i18n-provider.tsx    # i18n context and translations
│   ├── language-switcher.tsx # Language selector component
│   ├── header.tsx           # Header with navigation
│   ├── donor-registration-form.tsx # Registration form component
│   └── ui/                  # shadcn/ui components
├── .env.local               # Environment variables (create this)
└── package.json             # Dependencies
\`\`\`

## Technologies Used
- **Next.js 14** - React framework
- **TailwindCSS** - Styling
- **EmailJS** - Email service
- **react-i18next** - Internationalization
- **shadcn/ui** - UI components

## Support
For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify EmailJS configuration
4. Check environment variables are set correctly

## License
This project is open source and available for educational and non-commercial use.

"use server"

import emailjs from "@emailjs/nodejs"

const initEmailJS = () => {
  if (!process.env.EMAILJS_PRIVATE_KEY) {
    console.error("[v0] EMAILJS_PRIVATE_KEY is not set")
    return false
  }

  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
    limitRate: {
      id: "app",
      throttle: 50,
    },
  })

  return true
}

export async function sendDonorRegistrationEmail(formData: {
  name: string
  age: string
  gender: string
  email: string
  phone: string
  city: string
  bloodGroup: string
  organs: string[]
  consent: boolean
}) {
  try {
    console.log("[v0] Starting donor registration email send...")

    if (!initEmailJS()) {
      console.warn("[v0] EmailJS not configured, using mock mode")
      return { success: true, message: "Registration submitted (email service not configured)" }
    }

    const templateParams = {
      to_email: "4pa23ic053@pace.edu.in",
      donor_name: formData.name,
      donor_age: formData.age,
      donor_gender: formData.gender,
      donor_email: formData.email,
      donor_phone: formData.phone,
      donor_city: formData.city,
      donor_blood_group: formData.bloodGroup,
      donor_organs: formData.organs.length > 0 ? formData.organs.join(", ") : "Not specified",
      donor_consent: formData.consent ? "Yes" : "No",
      registration_date: new Date().toLocaleString(),
    }

    console.log("[v0] Sending email with params:", templateParams)

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      templateParams,
    )

    console.log("[v0] Email sent successfully:", response)

    return {
      success: true,
      message: "Registration submitted and email sent successfully!",
    }
  } catch (error) {
    console.error("[v0] Email sending error:", error)

    const errorMessage = error instanceof Error ? error.message : "Failed to send registration email. Please try again."

    return {
      success: false,
      message: errorMessage,
    }
  }
}

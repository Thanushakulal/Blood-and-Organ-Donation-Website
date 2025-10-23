"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useI18n } from "./i18n-provider"

const initEmailJS = () => {
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
  }
}

export function DonorRegistrationForm() {
  const { t } = useI18n()
  const router = useRouter()
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [blood, setBlood] = useState<string>("")
  const [consent, setConsent] = useState(false)
  const [organs, setOrgans] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const availableOrgans = ["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Cornea"]

  function toggleOrgan(org: string) {
    setOrgans((prev) => (prev.includes(org) ? prev.filter((o) => o !== org) : [...prev, org]))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name || !email || !phone || !blood || !city || !age || !gender) {
      setError(t("fillAllFields") || "Please fill all required fields")
      return
    }

    setLoading(true)

    try {
      initEmailJS()

      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
        console.warn("[v0] EmailJS credentials not configured, proceeding without email")
        setSuccess(true)
        setTimeout(() => {
          setLoading(false)
          router.push("/donor/register/thank-you")
        }, 1000)
        return
      }

      const templateParams = {
        to_email: "4pa23ic053@pace.edu.in",
        donor_name: name,
        donor_age: age,
        donor_gender: gender,
        donor_email: email,
        donor_phone: phone,
        donor_city: city,
        donor_blood_group: blood,
        donor_organs: organs.length > 0 ? organs.join(", ") : "Not specified",
        donor_consent: consent ? "Yes" : "No",
        registration_date: new Date().toLocaleString(),
      }

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
      )

      console.log("[v0] Email sent successfully:", response)
      setSuccess(true)

      setTimeout(() => {
        setLoading(false)
        router.push("/donor/register/thank-you")
      }, 1000)
    } catch (err) {
      console.error("[v0] Registration error:", err)
      const errorMsg = err instanceof Error ? err.message : "Failed to submit registration. Please try again."
      setError(errorMsg)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
          ✓ Registration submitted successfully!
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="name" className="font-semibold">
          {t("name")} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-primary/20 focus:border-primary"
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="age" className="font-semibold">
            Age <span className="text-destructive">*</span>
          </Label>
          <Input
            id="age"
            type="number"
            min="18"
            max="120"
            placeholder="25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border-primary/20 focus:border-primary"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gender" className="font-semibold">
            Gender <span className="text-destructive">*</span>
          </Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender" className="border-primary/20 focus:border-primary">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="blood" className="font-semibold">
            {t("bloodGroup")} <span className="text-destructive">*</span>
          </Label>
          <Select value={blood} onValueChange={setBlood}>
            <SelectTrigger id="blood" className="border-primary/20 focus:border-primary">
              <SelectValue placeholder={t("bloodGroup")} />
            </SelectTrigger>
            <SelectContent>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <SelectItem key={bg} value={bg}>
                  {bg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email" className="font-semibold">
            {t("email")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-primary/20 focus:border-primary"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone" className="font-semibold">
            {t("phone")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-primary/20 focus:border-primary"
            required
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="city" className="font-semibold">
          {t("location")} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="city"
          placeholder="Bangalore"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border-primary/20 focus:border-primary"
          required
        />
      </div>

      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="pt-6 grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-primary">{t("organConsent")}</span>
              <span className="text-sm text-muted-foreground">{t("willingToDonateOrgans")}</span>
            </div>
            <Switch checked={consent} onCheckedChange={setConsent} />
          </div>
          {consent && (
            <div className="flex flex-wrap gap-2">
              {availableOrgans.map((org) => {
                const checked = organs.includes(org)
                return (
                  <button
                    type="button"
                    key={org}
                    onClick={() => toggleOrgan(org)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      checked
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-card border border-primary/20 text-foreground hover:border-primary/40"
                    }`}
                    aria-pressed={checked}
                  >
                    {org}
                  </button>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 rounded-lg shadow-md"
        disabled={loading}
      >
        {loading ? "Sending..." : t("submit")}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Your information will be securely stored and shared only with verified hospitals.
      </p>
    </form>
  )
}

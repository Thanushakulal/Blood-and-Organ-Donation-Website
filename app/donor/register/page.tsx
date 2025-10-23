"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonorRegistrationForm } from "@/components/donor-registration-form"
import { useI18n } from "@/components/i18n-provider"

export default function DonorRegisterPage() {
  const { t } = useI18n()
  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Card className="w-full max-w-2xl shadow-lg border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
          <CardTitle className="text-2xl text-center text-primary">{t("donorRegistration")}</CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <DonorRegistrationForm />
        </CardContent>
      </Card>
    </div>
  )
}

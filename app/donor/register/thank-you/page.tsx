"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/components/i18n-provider"

export default function ThankYouPage() {
  const { t } = useI18n()
  return (
    <div className="max-w-md mx-auto">
      <Card className="border-accent">
        <CardHeader>
          <CardTitle className="text-center text-accent">{t("registerThanks")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-center">
          <p className="text-muted-foreground">{t("donateSub")}</p>
          <Button asChild>
            <Link href="/">{t("siteName")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

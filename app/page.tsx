"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/components/i18n-provider"

export default function HomePage() {
  const { t } = useI18n()
  return (
    <div className="grid gap-6">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-balance">{t("donateHeadline")}</h1>
        <p className="mt-3 text-muted-foreground text-pretty">{t("donateSub")}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/donor/register">{t("registerNow")}</Link>
          </Button>
          <Button asChild variant="outline" className="border-accent text-accent-foreground bg-transparent">
            <Link href="/staff/login">{t("staffLogin")}</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold">{t("benefit1Title")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("benefit1Desc")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold">{t("benefit2Title")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("benefit2Desc")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold">{t("benefit3Title")}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t("benefit3Desc")}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-2 grid gap-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-balance">{t("impactTitle")}</h2>
          <p className="mt-2 text-muted-foreground text-pretty">{t("impactSub")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">20,297,336</div>
              <div className="text-sm text-muted-foreground mt-1">{t("statPeopleServed")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">186,000</div>
              <div className="text-sm text-muted-foreground mt-1">{t("statProjects")}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold">29</div>
              <div className="text-sm text-muted-foreground mt-1">{t("statCountries")}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <img src="/impact-map-visualization.jpg" alt={t("impactMapAlt")} className="w-full h-auto" />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

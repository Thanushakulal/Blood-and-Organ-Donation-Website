"use client"

import Link from "next/link"
import { useI18n } from "./i18n-provider"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "@/components/ui/button"

export function Header() {
  const { t } = useI18n()
  return (
    <header className="border-b bg-card/50 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-primary">
          {t("siteName")}
        </Link>
        <nav className="flex items-center gap-3">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/donor/register">{t("registerNow")}</Link>
          </Button>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link href="/staff/login">{t("staffLogin")}</Link>
          </Button>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  )
}

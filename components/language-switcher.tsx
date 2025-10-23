"use client"

import { useI18n } from "./i18n-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  const label = lang === "en" ? "English" : lang === "hi" ? "हिन्दी" : lang === "kn" ? "ಕನ್ನಡ" : "മലയാളം"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Change language">
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("hi")}>हिन्दी</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("kn")}>ಕನ್ನಡ</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("ml")}>മലയാളം</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

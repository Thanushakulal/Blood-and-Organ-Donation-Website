import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { I18nProvider } from "@/components/i18n-provider"
import { Header } from "@/components/header"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "LifeLink - Blood & Organ Donation Platform",
  description: "Connect donors with those in need of blood and organ donations",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          <I18nProvider>
            <Header />
            <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
          </I18nProvider>
        </Suspense>
      </body>
    </html>
  )
}

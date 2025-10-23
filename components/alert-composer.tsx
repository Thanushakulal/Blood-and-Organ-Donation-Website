"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useI18n } from "./i18n-provider"
import type { Donor } from "./donor-table"

export function AlertComposer({ recipients }: { recipients: Donor[] }) {
  const { t } = useI18n()
  const [subject, setSubject] = useState("Urgent blood/organ requirement")
  const [message, setMessage] = useState(
    "Dear {{name}},\n\nWe have an urgent need for {{need}} in {{city}}. If you are available, please contact {{contact}}.\n\nThank you,\n{{hospital}}",
  )
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const preview = useMemo(() => {
    // Very simple preview with first recipient
    const r = recipients[0]
    if (!r) return message
    return message
      .replaceAll("{{name}}", r.name)
      .replaceAll("{{city}}", r.city)
      .replaceAll("{{need}}", `${r.bloodGroup} blood`)
      .replaceAll("{{contact}}", "hospital@example.org")
      .replaceAll("{{hospital}}", "City Hospital")
  }, [message, recipients])

  function handleSendAlert() {
    if (!recipients.length) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setTimeout(() => setSent(false), 3000)
      console.log("[v0] Alert sent to", recipients.length, "recipients")
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("sendAlert")} {recipients.length ? `(${recipients.length})` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {sent && (
          <div className="p-3 bg-accent/10 border border-accent rounded-md text-accent-foreground text-sm">
            ✓ Alert sent to {recipients.length} recipient{recipients.length !== 1 ? "s" : ""}
          </div>
        )}
        <div className="grid gap-2">
          <label htmlFor="subject" className="text-sm font-medium">
            {t("subject")}
          </label>
          <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="text-sm font-medium">
            {t("alertMessage")}
          </label>
          <Textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-2">
              {t("templateVarsLabel")}: {"{{name}}, {{need}}, {{city}}, {{contact}}, {{hospital}}"}
            </div>
            <Button onClick={handleSendAlert} disabled={!recipients.length || loading}>
              {loading ? "..." : t("sendAlert")}
            </Button>
          </div>
          <div className="border rounded-md p-3 bg-muted/40">
            <div className="text-xs text-muted-foreground mb-1">{t("preview")}</div>
            <div className="whitespace-pre-wrap text-sm">{preview}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

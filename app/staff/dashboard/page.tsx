"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DonorTable, type Donor } from "@/components/donor-table"
import { AlertComposer } from "@/components/alert-composer"
import { useI18n } from "@/components/i18n-provider"

const SAMPLE_DONORS: Donor[] = [
  {
    id: "1",
    name: "Amit Sharma",
    email: "amit@example.com",
    phone: "+91 99999 11111",
    bloodGroup: "A+",
    organs: ["Kidney"],
    city: "Delhi",
  },
  {
    id: "2",
    name: "Priya Rao",
    email: "priya@example.com",
    phone: "+91 88888 22222",
    bloodGroup: "O-",
    organs: ["Liver"],
    city: "Mumbai",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555 123 4567",
    bloodGroup: "B+",
    organs: ["Heart"],
    city: "San Francisco",
  },
  {
    id: "4",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 77777 33333",
    bloodGroup: "AB+",
    organs: ["Kidney", "Liver"],
    city: "Bangalore",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 555 987 6543",
    bloodGroup: "O+",
    organs: ["Heart", "Lung"],
    city: "New York",
  },
]

export default function StaffDashboardPage() {
  const { t } = useI18n()
  const [bloodFilter, setBloodFilter] = useState<string>("all")
  const [organFilter, setOrganFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filtered = useMemo(() => {
    return SAMPLE_DONORS.filter((d) => {
      const byBlood = bloodFilter === "all" || d.bloodGroup === bloodFilter
      const byOrgan = organFilter === "all" || d.organs.includes(organFilter)
      const bySearch =
        searchTerm === "" ||
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.phone.includes(searchTerm) ||
        d.city.toLowerCase().includes(searchTerm.toLowerCase())
      return byBlood && byOrgan && bySearch
    })
  }, [bloodFilter, organFilter, searchTerm])

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("staffDashboard")}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="sr-only" htmlFor="search">
                Search
              </label>
              <Input
                id="search"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="blood">
                {t("bloodGroup")}
              </label>
              <Select value={bloodFilter} onValueChange={setBloodFilter}>
                <SelectTrigger id="blood">
                  <SelectValue placeholder={t("bloodGroup")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all")}</SelectItem>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                    <SelectItem key={bg} value={bg}>
                      {bg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="sr-only" htmlFor="organ">
                {t("organ")}
              </label>
              <Select value={organFilter} onValueChange={setOrganFilter}>
                <SelectTrigger id="organ">
                  <SelectValue placeholder={t("organ")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all")}</SelectItem>
                  {["Kidney", "Liver", "Heart", "Lung", "Pancreas", "Cornea"].map((org) => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-muted-foreground">
                {filtered.length} of {SAMPLE_DONORS.length} donors
              </div>
            </div>
          </div>

          <DonorTable
            donors={filtered}
            selectedIds={selectedIds}
            onToggle={(id, checked) =>
              setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)))
            }
            onToggleAll={(ids, checked) =>
              setSelectedIds(
                checked ? Array.from(new Set([...selectedIds, ...ids])) : selectedIds.filter((id) => !ids.includes(id)),
              )
            }
          />
        </CardContent>
      </Card>

      <AlertComposer recipients={SAMPLE_DONORS.filter((d) => selectedIds.includes(d.id))} />
    </div>
  )
}

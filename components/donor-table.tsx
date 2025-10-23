"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useMemo } from "react"
import { useI18n } from "./i18n-provider"

export type Donor = {
  id: string
  name: string
  email: string
  phone: string
  bloodGroup: string
  organs: string[]
  city: string
}

export function DonorTable({
  donors,
  selectedIds,
  onToggle,
  onToggleAll,
}: {
  donors: Donor[]
  selectedIds: string[]
  onToggle: (id: string, checked: boolean) => void
  onToggleAll: (ids: string[], checked: boolean) => void
}) {
  const { t } = useI18n()
  const pageIds = useMemo(() => donors.map((d) => d.id), [donors])
  const allChecked = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id))
  const indeterminate = pageIds.some((id) => selectedIds.includes(id)) && !allChecked

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={allChecked}
                onCheckedChange={(value) => onToggleAll(pageIds, Boolean(value))}
                aria-checked={indeterminate ? "mixed" : allChecked}
                data-state={indeterminate ? "indeterminate" : allChecked ? "checked" : "unchecked"}
              />
            </TableHead>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("email")}</TableHead>
            <TableHead>{t("phone")}</TableHead>
            <TableHead>{t("bloodGroup")}</TableHead>
            <TableHead>{t("organs")}</TableHead>
            <TableHead>{t("location")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donors.map((d) => {
            const checked = selectedIds.includes(d.id)
            return (
              <TableRow key={d.id}>
                <TableCell>
                  <Checkbox checked={checked} onCheckedChange={(value) => onToggle(d.id, Boolean(value))} />
                </TableCell>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell>{d.email}</TableCell>
                <TableCell>{d.phone}</TableCell>
                <TableCell>{d.bloodGroup}</TableCell>
                <TableCell>{d.organs.join(", ")}</TableCell>
                <TableCell>{d.city}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

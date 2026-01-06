"use client"

import React from "react"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function capitalize(s: string) {
  if (!s) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function BreadcrumbHeader() {
  const pathname = usePathname() || "/"
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  const crumbs = [] as { href: string; label: string }[]
  let acc = ""
  segments.forEach((seg) => {
    acc += `/${seg}`
    crumbs.push({ href: acc, label: capitalize(seg.replace(/-/g, " ")) })
  })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {crumbs.map((c, i) => (
          <React.Fragment key={c.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={c.href}>{c.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {i !== crumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

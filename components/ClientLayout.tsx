"use client"

import { usePathname } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/header"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  return (
    <>
      {!isAdmin && (
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
      )}
      {children}
    </>
  )
}

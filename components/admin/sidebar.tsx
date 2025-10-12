"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: "/admin/products", label: "Products", icon: <Package className="h-4 w-4" /> },
  { href: "/admin/orders", label: "Orders", icon: <ShoppingBag className="h-4 w-4" /> },
]

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <div className="flex h-dvh flex-col gap-2 p-4">
      <div className="px-2 py-4 text-lg font-bold">Suzangaron Admin</div>
      <nav className="grid gap-1">
        {items.map((i) => {
          const active = pathname === i.href
          return (
            <Link
              key={i.href}
              href={i.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted",
                active && "bg-muted font-medium"
              )}
            >
              {i.icon}
              {i.label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto rounded-md border p-3 text-xs text-muted-foreground">
        UI-only demo. No database connected.
      </div>
    </div>
  )
}

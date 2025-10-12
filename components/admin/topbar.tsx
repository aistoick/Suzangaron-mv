"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, LogOut } from "lucide-react"

export function AdminTopbar() {
  return (
    <div className="container mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
      <Input className="hidden md:block" placeholder="Search anything…" />
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="sm">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  )
}

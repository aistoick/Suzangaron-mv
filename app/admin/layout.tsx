import "@/app/globals.css"
import { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminTopbar } from "@/components/admin/topbar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <div className="grid lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block border-r border-border">
          <AdminSidebar />
        </aside>
        <main className="flex min-h-dvh flex-col">
          <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
            <AdminTopbar />
          </div>
          <div className="container mx-auto w-full max-w-6xl px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { mockOrders } from "@/components/admin/mock"
import { Eye } from "lucide-react"

export default function OrdersPage() {
  const [selected, setSelected] = useState<any | null>(null)
  const items = useMemo(() => mockOrders, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Review and update order statuses.</p>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-muted-foreground">
              <tr className="[&>th]:px-3 [&>th]:py-2">
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b">
              {items.map((o) => (
                <tr key={o.id} className="[&>td]:px-3 [&>td]:py-3">
                  <td className="font-medium">{o.id}</td>
                  <td>{o.customer}</td>
                  <td className="font-semibold">${o.total.toFixed(2)}</td>
                  <td><OrderStatus status={o.status as any} /></td>
                  <td>{o.date}</td>
                  <td className="text-right">
                    <Button variant="outline" size="sm" onClick={() => setSelected(o)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Details Sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full max-w-md">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
          </SheetHeader>
          {selected && (
            <div className="mt-4 space-y-4">
              {/* Order Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Order ID</div>
                  <div className="font-medium">{selected.id}</div>
                </div>
                <OrderStatus status={selected.status} />
              </div>

              {/* Customer Info */}
              <div className="grid gap-2 rounded-lg border p-3">
                <div className="text-sm text-muted-foreground">Customer</div>
                <div className="font-medium">{selected.customer}</div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div>{selected.phone}</div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <div className="font-medium">Items</div>
                <div className="grid gap-2">
                  {selected.items.map((it: any) => (
                    <div
                      key={it.name}
                      className="flex items-center justify-between rounded-lg border p-2"
                    >
                      <span>
                        {it.qty} × {it.name}
                      </span>
                      <span className="font-semibold">
                        ${(it.qty * it.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-muted-foreground">Total</span>
                <span className="text-lg font-bold">${selected.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function OrderStatus({
  status,
}: {
  status: "Pending" | "Processing" | "Delivered" | "Cancelled"
}) {
  const map = {
    Pending: "bg-yellow-500",
    Processing: "bg-blue-500",
    Delivered: "bg-green-600",
    Cancelled: "bg-red-600",
  } as const
  return <Badge className={`${map[status]} text-white`}>{status}</Badge>
}

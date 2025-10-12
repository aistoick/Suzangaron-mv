import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <KPI title="Total Orders" value="128" icon={<ShoppingCart className="h-5 w-5" />} />
      <KPI title="Products" value="42" icon={<Package className="h-5 w-5" />} />
      <KPI title="Customers" value="316" icon={<Users className="h-5 w-5" />} />

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: "ORD-1023", name: "Ali V.", total: "$48.90", status: "Pending" },
            { id: "ORD-1022", name: "Laylo M.", total: "$26.40", status: "Processing" },
            { id: "ORD-1021", name: "Jasur T.", total: "$74.10", status: "Delivered" },
          ].map((o) => (
            <div key={o.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex flex-col">
                <span className="font-medium">{o.id}</span>
                <span className="text-sm text-muted-foreground">{o.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{o.total}</span>
                <OrderStatus status={o.status as any} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function KPI({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

function OrderStatus({ status }: { status: "Pending" | "Processing" | "Delivered" | "Cancelled" }) {
  const map = {
    Pending: "bg-yellow-500",
    Processing: "bg-blue-500",
    Delivered: "bg-green-600",
    Cancelled: "bg-red-600",
  } as const
  return <Badge className={`${map[status]} text-white`}>{status}</Badge>
}

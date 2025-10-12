"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockProducts, categories } from "@/components/admin/mock"

export default function ProductsPage() {
  const [items, setItems] = useState(mockProducts)
  const [q, setQ] = useState("")
  const [page, setPage] = useState(1)

  const perPage = 8
  const filtered = items.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / perPage)
  const currentItems = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Create, edit and manage your catalog.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <AddProductDialog
            onCreate={(p) => setItems((prev) => [{ ...p, id: Date.now().toString() }, ...prev])}
          />
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setPage(1)
            }}
            placeholder="Search products..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {currentItems.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                alt={p.name}
                src={p.image}
                fill
                className="object-cover object-center"
              />
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="line-clamp-1 text-base">{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-2 p-4">
              <div className="flex flex-col">
                <span className="font-semibold">${p.price}</span>
                <span className="text-xs text-muted-foreground">{p.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setItems((prev) => prev.filter((x) => x.id !== p.id))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

function AddProductDialog({ onCreate }: { onCreate: (p: any) => void }) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [image, setImage] = useState("https://picsum.photos/seed/new/600/600")

  const canSave = name.trim() && price && category

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle>Add Product</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Angus Beef 1kg" />
        </div>
        <div className="grid gap-2">
          <Label>Price (USD)</Label>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="24.90" />
        </div>
        <div className="grid gap-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Image URL</Label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
          <p className="text-xs text-muted-foreground">
            Demo uchun URL yetarli. (Upload keyinroq qo‘shiladi)
          </p>
        </div>
        <Button
          disabled={!canSave}
          onClick={() => {
            onCreate({ name, price: parseFloat(price), category, image })
            setName("")
            setPrice("")
          }}
        >
          Save Product
        </Button>
      </div>
    </DialogContent>
  )
}

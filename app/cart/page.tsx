"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getCart, updateCartItem, removeFromCart, clearCart, getCartTotal, type CartItem } from "@/lib/cart"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [orderNote, setOrderNote] = useState("")
  // </CHANGE>
  const { toast } = useToast()

  useEffect(() => {
    setIsClient(true)
    setCart(getCart())
    const savedName = localStorage.getItem("customerName")
    const savedPhone = localStorage.getItem("customerPhone")
    const savedNote = localStorage.getItem("orderNote")
    if (savedName) setCustomerName(savedName)
    if (savedPhone) setCustomerPhone(savedPhone)
    if (savedNote) setOrderNote(savedNote)
    // </CHANGE>

    const handleCartUpdate = () => {
      setCart(getCart())
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  useEffect(() => {
    if (isClient && customerName) {
      localStorage.setItem("customerName", customerName)
    }
  }, [customerName, isClient])

  useEffect(() => {
    if (isClient && customerPhone) {
      localStorage.setItem("customerPhone", customerPhone)
    }
  }, [customerPhone, isClient])

  useEffect(() => {
    if (isClient && orderNote !== undefined) {
      localStorage.setItem("orderNote", orderNote)
    }
  }, [orderNote, isClient])
  // </CHANGE>

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateCartItem(id, { quantity: newQuantity })
  }

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id)
    toast({
      title: "Removed from cart",
      description: `${name} has been removed from your cart.`,
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const total = isClient ? getCartTotal() : 0

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center gap-6 min-h-[400px] text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground">Add some products to get started!</p>
          </div>
          <Button size="lg" asChild>
            <Link href="/categories">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Shopping Cart</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Review your items and add a delivery note for your order.
            </p>
            {/* </CHANGE> */}
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Items ({cart.length})</h2>
              <Button variant="ghost" size="sm" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-1">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <span className="text-sm text-muted-foreground">{item.category}</span>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id, item.name)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    {/* </CHANGE> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold">Order Summary</h2>

                  <div className="flex flex-col gap-4 pb-6 border-b border-border">
                    <h3 className="font-semibold">Your Information</h3>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="customer-name" className="text-sm font-medium">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="customer-name"
                        type="text"
                        placeholder="Enter your name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="customer-phone" className="text-sm font-medium">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="customer-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pb-6 border-b border-border">
                    <Label htmlFor="order-note" className="text-sm font-medium">
                      Delivery Note (Optional)
                    </Label>
                    <Textarea
                      id="order-note"
                      placeholder={`Example: "I'll be coming at 6 PM" or "Please call when you arrive"`}
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">This note will apply to all items in your order</p>
                  </div>
                  {/* </CHANGE> */}

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" disabled={!customerName.trim() || !customerPhone.trim()}>
                    Proceed to Checkout
                  </Button>
                  {(!customerName.trim() || !customerPhone.trim()) && (
                    <p className="text-xs text-muted-foreground text-center">
                      Please enter your name and phone number to proceed
                    </p>
                  )}

                  <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                    <Link href="/categories">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

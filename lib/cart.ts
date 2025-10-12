"use client"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

export function addToCart(item: Omit<CartItem, "quantity"> & { quantity?: number }) {
  const cart = getCart()
  const existingItem = cart.find((i) => i.id === item.id)

  if (existingItem) {
    existingItem.quantity += item.quantity || 1
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  window.dispatchEvent(new Event("cartUpdated"))
}

export function updateCartItem(id: string, updates: Partial<CartItem>) {
  const cart = getCart()
  const itemIndex = cart.findIndex((i) => i.id === id)

  if (itemIndex !== -1) {
    cart[itemIndex] = { ...cart[itemIndex], ...updates }
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cartUpdated"))
  }
}

export function removeFromCart(id: string) {
  const cart = getCart()
  const filteredCart = cart.filter((i) => i.id !== id)
  localStorage.setItem("cart", JSON.stringify(filteredCart))
  window.dispatchEvent(new Event("cartUpdated"))
}

export function clearCart() {
  localStorage.removeItem("cart")
  window.dispatchEvent(new Event("cartUpdated"))
}

export function getCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

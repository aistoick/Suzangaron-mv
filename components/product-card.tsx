"use client"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { addToCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {/* O'ZGARISH: Rasm CardHeader ichiga joylandi va uning padding'i 0 qilindi */}
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="text-lg font-semibold text-balance leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-foreground">
              ${product.price}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.unit}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="lg">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { ArrowRight, Leaf, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="flex flex-col">

      {/* 🛍 Hero Banner (top) */}
      <section className="relative bg-background py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="relative h-[300px] md:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden">
            <Image
              src="/fresh-market-produce-vegetables-fruits-display.jpg"
              alt="Suzangaron Market Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 md:px-16 text-white max-w-lg">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Your Trusted Local Market
              </h1>
              <p className="text-lg mb-6 text-white/90">
                Order online and get the freshest meat, jams, and drinks — with same-day pickup available.
              </p>
              <Button size="lg" variant="secondary" asChild className="text-base font-medium">
                <Link href="/categories">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 🥦 Featured Products (immediately after hero) */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background via-background to-secondary/20">
        <div className="container mx-auto px-4 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Fresh Picks of the Week 🛒
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Handpicked products from Suzangaron Market — straight from local farmers to your table.
              </p>
            </div>
            <Button size="lg" asChild className="w-fit text-base">
              <Link href="/categories">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 🌿 Features Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-none shadow-sm">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Leaf className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Fresh & Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We source the freshest products daily to ensure top quality for our customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Custom Notes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Add a personal note with your order — include your name, phone number, or any special request.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Local Market</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Visit us in person or order online from your trusted local market.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 🧺 CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Order?</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Browse our full selection of fresh products and add your delivery preferences. We’ll make sure everything
              arrives just the way you want it.
            </p>
            <Button size="lg" variant="secondary" asChild className="text-base">
              <Link href="/categories">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}

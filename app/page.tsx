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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Fresh Products Available for Online Order
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
               Quality meat, homemade jams, and refreshing drinks from Suzangaron Market. Place your order and leave a note with your request.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="text-base">
                  <Link href="/categories">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                  <Link href="/location">View Location</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/fresh-market-produce-vegetables-fruits-display.jpg"
                alt="Fresh market products"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Featured Products Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Featured Products</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Discover our most popular items, handpicked for quality and freshness.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="flex justify-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/categories">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to Order?</h2>
            <p className="text-lg text-primary-foreground/90 text-pretty leading-relaxed">
              Browse our full selection of fresh products and add your delivery preferences. We'll make sure everything
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

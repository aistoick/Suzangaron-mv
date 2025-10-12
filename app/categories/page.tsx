"use client"
import { categories, getProductsByCategory } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { Beef, Grape, Coffee, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

const categoryIcons = {
  Meat: Beef,
  Jam: Grape,
  Drinks: Coffee,
}

export default function CategoriesPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Product Categories</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
              Browse our selection of fresh meat, homemade jams, and refreshing drinks.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 border-b border-border bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons]
              return (
                <Link
                  key={category}
                  href={`#${category.toLowerCase()}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="font-medium">{category}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories with Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-16">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category)
            const Icon = categoryIcons[category as keyof typeof categoryIcons]

            return (
              <section key={category} id={category.toLowerCase()} className="scroll-mt-32">
                <CategorySection category={category} products={categoryProducts} Icon={Icon} />
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface CategorySectionProps {
  category: string
  products: any[]
  Icon?: any
}

function CategorySection({ category, products, Icon }: CategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const showCarousel = products.length >= 5

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold">{category}</h2>
            <p className="text-muted-foreground">{products.length} products available</p>
          </div>
        </div>
        {showCarousel && (
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="h-10 w-10 bg-transparent">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="h-10 w-10 bg-transparent">
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        )}
      </div>

      {/* Products Display */}
      {showCarousel ? (
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-none w-[280px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
// </CHANGE>

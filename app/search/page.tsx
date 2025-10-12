"use client"

import { useSearchParams } from "next/navigation"
import { searchProducts } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { Search } from "lucide-react"
import { Suspense } from "react"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const results = query ? searchProducts(query) : []

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Search Results</h1>
            </div>
            {query && (
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Showing results for <span className="font-semibold text-foreground">"{query}"</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="container mx-auto px-4 py-12">
        {!query ? (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[300px] text-center">
            <Search className="h-16 w-16 text-muted-foreground" />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">Start searching</h2>
              <p className="text-muted-foreground">Enter a search term to find products</p>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[300px] text-center">
            <Search className="h-16 w-16 text-muted-foreground" />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">No results found</h2>
              <p className="text-muted-foreground">
                We couldn't find any products matching "{query}". Try a different search term.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <p className="text-lg text-muted-foreground">
              Found {results.length} {results.length === 1 ? "product" : "products"}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">Loading search results...</p>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}

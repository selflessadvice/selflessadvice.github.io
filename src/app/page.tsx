import { Suspense } from "react"
import { HeroSection } from "@/components/home/hero-section"
import { ArticlesGrid } from "@/components/articles/articles-grid"
import { FilterTabs } from "@/components/articles/filter-tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface HomePageProps {
  searchParams: Promise<{
    tag?: string
    featured?: string
    search?: string
    page?: string
  }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Articles Archive Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Life-Changing Wisdom
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover profound insights and practical advice to transform your life, 
              find true happiness, and understand your purpose.
            </p>
          </div>
          
          {/* Filters */}
          <FilterTabs 
            activeTag={params.tag}
            featured={params.featured === "true"}
            search={params.search}
          />
          
          {/* Articles Grid */}
          <Suspense fallback={<LoadingSpinner />}>
            <ArticlesGrid 
              tag={params.tag}
              featured={params.featured === "true"}
              search={params.search}
              page={parseInt(params.page || "1")}
            />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

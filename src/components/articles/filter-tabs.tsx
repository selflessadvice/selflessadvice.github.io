"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Star, Hash, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterTabsProps {
  activeTag?: string
  featured?: boolean
  search?: string
}

// Mock tags - in real app, fetch from API
const mockTags = [
  { id: "1", name: "Happiness", slug: "happiness", color: "#FFD700" },
  { id: "2", name: "Inner Peace", slug: "inner-peace", color: "#87CEEB" },
  { id: "3", name: "Life Purpose", slug: "life-purpose", color: "#98FB98" },
  { id: "4", name: "Self-Discovery", slug: "self-discovery", color: "#DDA0DD" },
  { id: "5", name: "Spirituality", slug: "spirituality", color: "#F0E68C" },
  { id: "6", name: "Mindfulness", slug: "mindfulness", color: "#9370DB" },
  { id: "7", name: "Love", slug: "love", color: "#FF69B4" },
  { id: "8", name: "Growth", slug: "growth", color: "#FFA07A" }
]

export function FilterTabs({ activeTag, featured, search }: FilterTabsProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(search || "")
  const [showAllTags, setShowAllTags] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim())
    }
    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchQuery("")
    router.push("/")
  }

  const createFilterUrl = (type: "tag" | "featured", value?: string) => {
    const params = new URLSearchParams()
    
    if (type === "featured") {
      params.set("featured", "true")
    } else if (type === "tag" && value) {
      params.set("tag", value)
    }
    
    return `/?${params.toString()}`
  }

  const displayedTags = showAllTags ? mockTags : mockTags.slice(0, 6)
  const hasActiveFilters = activeTag || featured || search

  return (
    <div className="space-y-6 mb-12">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for wisdom, life advice, happiness..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm text-gray-900 placeholder-gray-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* All Articles */}
        <Link
          href="/"
          className={cn(
            "px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center",
            !activeTag && !featured
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          )}
        >
          All Articles
        </Link>

        {/* Featured */}
        <Link
          href={createFilterUrl("featured")}
          className={cn(
            "px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center",
            featured
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          )}
        >
          <Star className="w-4 h-4 mr-2" />
          Featured
        </Link>

        {/* Tag Filters */}
        {displayedTags.map((tag) => (
          <Link
            key={tag.id}
            href={createFilterUrl("tag", tag.slug)}
            className={cn(
              "px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center",
              activeTag === tag.slug
                ? "text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            )}
            style={
              activeTag === tag.slug
                ? { backgroundColor: tag.color }
                : {}
            }
          >
            <Hash className="w-3 h-3 mr-1" />
            {tag.name}
          </Link>
        ))}

        {/* Show More/Less Tags */}
        {mockTags.length > 6 && (
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            {showAllTags ? "Show Less" : `+${mockTags.length - 6} More`}
          </button>
        )}
      </div>

      {/* Active Filters & Clear */}
      {hasActiveFilters && (
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            
            {featured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </span>
            )}
            
            {activeTag && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                <Hash className="w-3 h-3 mr-1" />
                {mockTags.find(t => t.slug === activeTag)?.name || activeTag}
              </span>
            )}
            
            {search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                <Search className="w-3 h-3 mr-1" />
                "{search}"
              </span>
            )}
            
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 ml-2 flex items-center"
            >
              <X className="w-3 h-3 mr-1" />
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

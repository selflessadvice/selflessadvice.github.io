import { ArticleCard } from "./article-card"
import { Pagination } from "@/components/ui/pagination"
import { EmptyState } from "@/components/ui/empty-state"

// Mock data for demonstration - replace with actual API call
const mockArticles = [
  {
    id: "1",
    title: "The True Meaning of Happiness: A Journey Within",
    slug: "true-meaning-of-happiness",
    excerpt: "Discover what genuine happiness really means and how to cultivate lasting joy in your life through ancient wisdom and modern insights.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    readTime: 8,
    views: 2847,
    publishedAt: new Date("2024-01-15"),
    author: {
      id: "1",
      name: "Wisdom Guide",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    tags: [
      { tag: { id: "1", name: "Happiness", slug: "happiness", color: "#FFD700" } },
      { tag: { id: "2", name: "Inner Peace", slug: "inner-peace", color: "#87CEEB" } }
    ],
    _count: { comments: 23, likes: 156 }
  },
  {
    id: "2",
    title: "Understanding Life's Purpose: Why Are We Here?",
    slug: "understanding-lifes-purpose",
    excerpt: "Explore the fundamental questions of existence and discover your unique path to a meaningful life filled with purpose and fulfillment.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    readTime: 12,
    views: 3921,
    publishedAt: new Date("2024-01-10"),
    author: {
      id: "1",
      name: "Wisdom Guide",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    tags: [
      { tag: { id: "3", name: "Life Purpose", slug: "life-purpose", color: "#98FB98" } },
      { tag: { id: "4", name: "Self-Discovery", slug: "self-discovery", color: "#DDA0DD" } }
    ],
    _count: { comments: 34, likes: 289 }
  },
  {
    id: "3",
    title: "The Essence of True Religion: Unity in Diversity",
    slug: "essence-of-true-religion",
    excerpt: "Discover the common threads that weave through all spiritual traditions and find the universal truths that unite humanity.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    readTime: 15,
    views: 1834,
    publishedAt: new Date("2024-01-05"),
    author: {
      id: "1",
      name: "Wisdom Guide",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    tags: [
      { tag: { id: "5", name: "Spirituality", slug: "spirituality", color: "#F0E68C" } },
      { tag: { id: "6", name: "Unity", slug: "unity", color: "#FFB6C1" } }
    ],
    _count: { comments: 45, likes: 198 }
  },
  {
    id: "4",
    title: "Overcoming Life's Challenges with Grace",
    slug: "overcoming-lifes-challenges",
    excerpt: "Learn practical wisdom for navigating difficulties, transforming obstacles into opportunities for growth and spiritual development.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    readTime: 10,
    views: 2156,
    publishedAt: new Date("2024-01-01"),
    author: {
      id: "1",
      name: "Wisdom Guide",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    tags: [
      { tag: { id: "7", name: "Resilience", slug: "resilience", color: "#20B2AA" } },
      { tag: { id: "8", name: "Growth", slug: "growth", color: "#FFA07A" } }
    ],
    _count: { comments: 28, likes: 167 }
  },
  {
    id: "5",
    title: "The Art of Mindful Living",
    slug: "art-of-mindful-living",
    excerpt: "Embrace the present moment and discover how mindfulness can transform your daily experience into a source of peace and joy.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    readTime: 7,
    views: 3245,
    publishedAt: new Date("2023-12-28"),
    author: {
      id: "1",
      name: "Wisdom Guide",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    tags: [
      { tag: { id: "9", name: "Mindfulness", slug: "mindfulness", color: "#9370DB" } },
      { tag: { id: "10", name: "Present Moment", slug: "present-moment", color: "#40E0D0" } }
    ],
    _count: { comments: 19, likes: 234 }
  },
  {
    id: "6",
    title: "Love as the Foundation of Life",
    slug: "love-foundation-of-life",
    excerpt: "Explore how love, in its purest form, serves as the foundation for all meaningful relationships and personal transformation.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    readTime: 9,
    views: 1967,
    publishedAt: new Date("2023-12-25"),
    author: {
      id: "1",
      name: "Wisdom Guide",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    tags: [
      { tag: { id: "11", name: "Love", slug: "love", color: "#FF69B4" } },
      { tag: { id: "12", name: "Relationships", slug: "relationships", color: "#DA70D6" } }
    ],
    _count: { comments: 31, likes: 278 }
  }
]

interface ArticlesGridProps {
  tag?: string
  featured?: boolean
  search?: string
  page?: number
}

export async function ArticlesGrid({ tag, featured, search, page = 1 }: ArticlesGridProps) {
  // In a real app, this would be an API call
  // const response = await fetch(`/api/articles?tag=${tag}&featured=${featured}&search=${search}&page=${page}`)
  // const data = await response.json()
  
  // Filter mock data based on props
  let filteredArticles = mockArticles
  
  if (tag) {
    filteredArticles = filteredArticles.filter(article => 
      article.tags.some(t => t.tag.slug === tag)
    )
  }
  
  if (search) {
    filteredArticles = filteredArticles.filter(article =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase())
    )
  }
  
  if (featured) {
    // For demo, just take the first 3 articles as "featured"
    filteredArticles = filteredArticles.slice(0, 3)
  }
  
  const articlesPerPage = 6
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const startIndex = (page - 1) * articlesPerPage
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage)

  if (filteredArticles.length === 0) {
    return (
      <EmptyState
        title="No articles found"
        description="Try adjusting your search criteria or explore different topics."
      />
    )
  }

  return (
    <div className="space-y-12">
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          className="flex justify-center"
        />
      )}
    </div>
  )
}

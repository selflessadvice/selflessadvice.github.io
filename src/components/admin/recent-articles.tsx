import Link from "next/link"
import { Eye, MessageCircle, Heart, Calendar, Edit } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"

// Mock data - replace with actual API call
const recentArticles = [
  {
    id: "1",
    title: "The True Meaning of Happiness: A Journey Within",
    status: "PUBLISHED",
    views: 2847,
    likes: 156,
    comments: 23,
    publishedAt: new Date("2024-01-15"),
    slug: "true-meaning-of-happiness"
  },
  {
    id: "2", 
    title: "Understanding Life's Purpose: Why Are We Here?",
    status: "PUBLISHED",
    views: 3921,
    likes: 289,
    comments: 34,
    publishedAt: new Date("2024-01-10"),
    slug: "understanding-lifes-purpose"
  },
  {
    id: "3",
    title: "The Essence of True Religion: Unity in Diversity",
    status: "DRAFT",
    views: 0,
    likes: 0,
    comments: 0,
    publishedAt: null,
    slug: "essence-of-true-religion"
  },
  {
    id: "4",
    title: "Overcoming Life's Challenges with Grace",
    status: "PUBLISHED",
    views: 2156,
    likes: 167,
    comments: 28,
    publishedAt: new Date("2024-01-01"),
    slug: "overcoming-lifes-challenges"
  }
]

const statusColors = {
  PUBLISHED: "bg-green-100 text-green-800",
  DRAFT: "bg-yellow-100 text-yellow-800",
  ARCHIVED: "bg-gray-100 text-gray-800",
  SCHEDULED: "bg-blue-100 text-blue-800"
}

export function RecentArticles() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Articles</h2>
        <Link
          href="/admin/articles"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View all →
        </Link>
      </div>

      <div className="space-y-4">
        {recentArticles.map((article) => (
          <div
            key={article.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-gray-900 line-clamp-1">
                    {article.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[article.status as keyof typeof statusColors]
                  }`}>
                    {article.status}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {article.publishedAt && (
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatRelativeTime(article.publishedAt)}
                    </span>
                  )}
                  
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {article.views.toLocaleString()}
                  </span>
                  
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {article.likes}
                  </span>
                  
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {article.comments}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Link
                  href={`/articles/${article.slug}`}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  title="View article"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  title="Edit article"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

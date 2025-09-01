"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Eye, MessageCircle, Heart, Calendar } from "lucide-react"
import { formatDate, formatRelativeTime } from "@/lib/utils"

interface ArticleCardProps {
  article: {
    id: string
    title: string
    slug: string
    excerpt: string
    featuredImage?: string | null
    readTime?: number | null
    views: number
    publishedAt: Date
    author: {
      id: string
      name: string | null
      image?: string | null
    }
    tags: Array<{
      tag: {
        id: string
        name: string
        slug: string
        color?: string | null
      }
    }>
    _count: {
      comments: number
      likes: number
    }
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <Link href={`/articles/${article.slug}`} className="block">
        {/* Featured Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
              <div className="text-6xl opacity-20">📚</div>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Read time badge */}
          {article.readTime && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {article.readTime} min
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 2).map(({ tag }) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: tag.color ? `${tag.color}20` : '#e0e7ff',
                  color: tag.color || '#4f46e5'
                }}
              >
                {tag.name}
              </span>
            ))}
            {article.tags.length > 2 && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{article.tags.length - 2}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Author and Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              {article.author.image ? (
                <Image
                  src={article.author.image}
                  alt={article.author.name || "Author"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {article.author.name?.charAt(0) || "A"}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {article.author.name}
                </p>
                <p className="text-xs text-gray-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatRelativeTime(article.publishedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {article.views.toLocaleString()}
              </span>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {article._count.comments}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Heart className="w-4 h-4 mr-1" />
              {article._count.likes}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

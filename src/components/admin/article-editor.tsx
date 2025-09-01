"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, Eye, Upload, X, Plus } from "lucide-react"
import { motion } from "framer-motion"

interface ArticleEditorProps {
  article?: {
    id: string
    title: string
    excerpt?: string
    content: string
    featuredImage?: string
    metaTitle?: string
    metaDescription?: string
    status: string
    featured: boolean
    tags: Array<{ tag: { name: string } }>
  }
}

export function ArticleEditor({ article }: ArticleEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState(false)
  
  const [formData, setFormData] = useState({
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    featuredImage: article?.featuredImage || "",
    metaTitle: article?.metaTitle || "",
    metaDescription: article?.metaDescription || "",
    status: article?.status || "DRAFT",
    featured: article?.featured || false,
    tags: article?.tags.map(t => t.tag.name) || []
  })
  
  const [currentTag, setCurrentTag] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(
        article ? `/api/articles/${article.id}` : "/api/articles",
        {
          method: article ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to save article")
      }

      const data = await response.json()
      router.push(`/admin/articles`)
    } catch (error) {
      console.error("Error saving article:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  if (preview) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Preview</h2>
          <button
            onClick={() => setPreview(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Editor
          </button>
        </div>
        
        <article className="bg-white rounded-xl p-8 shadow-sm border">
          {formData.featuredImage && (
            <img
              src={formData.featuredImage}
              alt={formData.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            {formData.title}
          </h1>
          {formData.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{formData.excerpt}</p>
          )}
          <div className="prose prose-lg max-w-none">
            {formData.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center space-x-4">
          <select
            value={formData.status}
            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="mr-2"
            />
            Featured Article
          </label>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setPreview(true)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Article"}
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a compelling title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-medium"
                  required
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of your article..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your wisdom and insights..."
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Write your content in plain text. Basic formatting will be applied automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-medium text-gray-900 mb-4">Featured Image</h3>
            <div className="space-y-4">
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {formData.featuredImage && (
                <img
                  src={formData.featuredImage}
                  alt="Featured"
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-medium text-gray-900 mb-4">Tags</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="font-medium text-gray-900 mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                  placeholder="SEO title (60 chars max)"
                  maxLength={60}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="SEO description (160 chars max)"
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.form>
  )
}

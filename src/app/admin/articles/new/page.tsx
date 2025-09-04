import { ArticleEditor } from "@/components/admin/article-editor"

export default function NewArticlePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Article</h1>
        <p className="text-gray-600 mt-2">
          Share your wisdom and insights with the world. Create content that transforms lives.
        </p>
      </div>

      <ArticleEditor />
    </div>
  )
}

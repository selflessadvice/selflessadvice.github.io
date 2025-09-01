import { render, screen } from '@testing-library/react'
import { ArticleCard } from '@/components/articles/article-card'

const mockArticle = {
  id: '1',
  title: 'Test Article',
  slug: 'test-article',
  excerpt: 'This is a test article excerpt',
  featuredImage: 'https://example.com/image.jpg',
  readTime: 5,
  views: 100,
  publishedAt: new Date('2024-01-01'),
  author: {
    id: '1',
    name: 'Test Author',
    image: 'https://example.com/author.jpg'
  },
  tags: [
    { tag: { id: '1', name: 'Test Tag', slug: 'test-tag', color: '#blue' } }
  ],
  _count: {
    comments: 10,
    likes: 25
  }
}

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
  },
}))

describe('ArticleCard', () => {
  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} />)
    
    expect(screen.getByText('Test Article')).toBeInTheDocument()
    expect(screen.getByText('This is a test article excerpt')).toBeInTheDocument()
    expect(screen.getByText('Test Author')).toBeInTheDocument()
    expect(screen.getByText('Test Tag')).toBeInTheDocument()
    expect(screen.getByText('5 min')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
  })

  it('renders without featured image', () => {
    const articleWithoutImage = { ...mockArticle, featuredImage: null }
    render(<ArticleCard article={articleWithoutImage} />)
    
    expect(screen.getByText('Test Article')).toBeInTheDocument()
    // Should still render the article content
  })

  it('displays correct link href', () => {
    render(<ArticleCard article={mockArticle} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/articles/test-article')
  })

  it('shows multiple tags correctly', () => {
    const articleWithMultipleTags = {
      ...mockArticle,
      tags: [
        { tag: { id: '1', name: 'Tag 1', slug: 'tag-1', color: '#blue' } },
        { tag: { id: '2', name: 'Tag 2', slug: 'tag-2', color: '#red' } },
        { tag: { id: '3', name: 'Tag 3', slug: 'tag-3', color: '#green' } }
      ]
    }
    
    render(<ArticleCard article={articleWithMultipleTags} />)
    
    expect(screen.getByText('Tag 1')).toBeInTheDocument()
    expect(screen.getByText('Tag 2')).toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument() // Should show +1 for the third tag
  })
})

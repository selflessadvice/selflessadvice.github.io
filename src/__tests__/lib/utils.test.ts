import { 
  generateSlug, 
  calculateReadTime, 
  formatDate, 
  formatRelativeTime,
  truncate,
  getExcerpt,
  isValidUrl,
  getInitials
} from '@/lib/utils'

describe('Utils Functions', () => {
  describe('generateSlug', () => {
    it('converts title to slug format', () => {
      expect(generateSlug('Hello World')).toBe('hello-world')
      expect(generateSlug('The True Meaning of Life')).toBe('the-true-meaning-of-life')
    })

    it('handles special characters', () => {
      expect(generateSlug('Life & Happiness!')).toBe('life-happiness')
      expect(generateSlug('What\'s the purpose?')).toBe('whats-the-purpose')
    })

    it('handles multiple spaces and dashes', () => {
      expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces')
      expect(generateSlug('Multiple---Dashes')).toBe('multiple-dashes')
    })
  })

  describe('calculateReadTime', () => {
    it('calculates read time correctly', () => {
      const shortText = 'This is a short text with just a few words.'
      const longText = 'This is a much longer text. '.repeat(100) // 700 words
      
      expect(calculateReadTime(shortText)).toBe(1) // Minimum 1 minute
      expect(calculateReadTime(longText)).toBe(4) // ~700 words / 200 WPM ≈ 4 minutes
    })

    it('handles empty content', () => {
      expect(calculateReadTime('')).toBe(1)
      expect(calculateReadTime('   ')).toBe(1)
    })
  })

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toBe('January 15, 2024')
    })

    it('handles string dates', () => {
      const formatted = formatDate('2024-01-15')
      expect(formatted).toBe('January 15, 2024')
    })
  })

  describe('formatRelativeTime', () => {
    it('returns "just now" for very recent dates', () => {
      const now = new Date()
      expect(formatRelativeTime(now)).toBe('just now')
    })

    it('returns minutes ago for recent dates', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago')
    })

    it('returns hours ago for older dates', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
      expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago')
    })
  })

  describe('truncate', () => {
    it('truncates text longer than specified length', () => {
      const text = 'This is a long text that needs to be truncated'
      expect(truncate(text, 20)).toBe('This is a long text...')
    })

    it('returns original text if shorter than length', () => {
      const text = 'Short text'
      expect(truncate(text, 20)).toBe('Short text')
    })
  })

  describe('getExcerpt', () => {
    it('extracts plain text from HTML content', () => {
      const htmlContent = '<p>This is <strong>bold</strong> text with <a href="#">links</a></p>'
      expect(getExcerpt(htmlContent, 50)).toBe('This is bold text with links')
    })

    it('truncates to specified length', () => {
      const longText = 'This is a very long text that should be truncated at the specified length limit'
      expect(getExcerpt(longText, 30)).toBe('This is a very long text that...')
    })
  })

  describe('isValidUrl', () => {
    it('validates correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://example.com')).toBe(true)
      expect(isValidUrl('https://example.com/path')).toBe(true)
    })

    it('rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false)
      expect(isValidUrl('example.com')).toBe(false)
      expect(isValidUrl('')).toBe(false)
    })
  })

  describe('getInitials', () => {
    it('gets initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD')
      expect(getInitials('Jane Mary Smith')).toBe('JM')
    })

    it('handles single name', () => {
      expect(getInitials('John')).toBe('J')
    })

    it('handles empty name', () => {
      expect(getInitials('')).toBe('')
    })
  })
})

const { PrismaClient } = require('../src/generated/prisma')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@selflessadvice.com' },
    update: {},
    create: {
      email: 'admin@selflessadvice.com',
      name: 'Admin User',
      hashedPassword,
      role: 'ADMIN',
      bio: 'Site administrator and content curator',
    },
  })

  console.log('✅ Created admin user:', adminUser.email)

  // Create tags
  const tags = [
    { name: 'Happiness', slug: 'happiness', color: '#FFD700', description: 'Articles about finding genuine happiness and joy' },
    { name: 'Life Purpose', slug: 'life-purpose', color: '#98FB98', description: 'Understanding your purpose and meaning in life' },
    { name: 'Spirituality', slug: 'spirituality', color: '#F0E68C', description: 'Spiritual growth and enlightenment' },
    { name: 'Inner Peace', slug: 'inner-peace', color: '#87CEEB', description: 'Finding peace within yourself' },
    { name: 'Self-Discovery', slug: 'self-discovery', color: '#DDA0DD', description: 'Journey of understanding yourself' },
    { name: 'Mindfulness', slug: 'mindfulness', color: '#9370DB', description: 'Present moment awareness and meditation' },
    { name: 'Love', slug: 'love', color: '#FF69B4', description: 'Universal love and compassion' },
    { name: 'Wisdom', slug: 'wisdom', color: '#CD853F', description: 'Ancient and modern wisdom teachings' },
    { name: 'Growth', slug: 'growth', color: '#FFA07A', description: 'Personal development and growth' },
    { name: 'Gratitude', slug: 'gratitude', color: '#20B2AA', description: 'The power of gratitude and appreciation' }
  ]

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    })
  }

  console.log('✅ Created tags')

  // Create sample articles
  const articles = [
    {
      title: 'The True Meaning of Happiness: A Journey Within',
      slug: 'true-meaning-of-happiness',
      excerpt: 'Discover what genuine happiness really means and how to cultivate lasting joy in your life through ancient wisdom and modern insights.',
      content: `# The True Meaning of Happiness: A Journey Within

Happiness is perhaps the most sought-after experience in human life, yet it remains one of the most misunderstood. In our modern world, we often chase external achievements, material possessions, and fleeting pleasures, believing they will bring us the happiness we seek. But true happiness comes from within.

## Understanding Authentic Happiness

Real happiness is not dependent on external circumstances. It's a state of being that comes from understanding your true nature, accepting yourself completely, and finding peace in the present moment. This kind of happiness is sustainable, unshakeable, and grows stronger with time.

## The Path to Inner Joy

1. **Self-Acceptance**: Embrace who you are, including your flaws and imperfections
2. **Present Moment Awareness**: Find joy in the simple experiences of daily life
3. **Gratitude Practice**: Appreciate what you already have
4. **Service to Others**: Find purpose in helping and supporting others
5. **Inner Reflection**: Regular meditation and self-inquiry

## Conclusion

True happiness is your birthright. It's not something you need to earn or achieve - it's something you need to uncover within yourself. Start this journey today, and discover the profound joy that has always been waiting within you.`,
      featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
      status: 'PUBLISHED',
      featured: true,
      tags: ['happiness', 'inner-peace', 'self-discovery']
    },
    {
      title: 'Understanding Life\'s Purpose: Why Are We Here?',
      slug: 'understanding-lifes-purpose',
      excerpt: 'Explore the fundamental questions of existence and discover your unique path to a meaningful life filled with purpose and fulfillment.',
      content: `# Understanding Life's Purpose: Why Are We Here?

The question of life's purpose has puzzled humanity since the beginning of time. Every person, at some point in their journey, asks themselves: "Why am I here? What is my purpose?" This is perhaps the most important question we can explore.

## The Universal Purpose

While each person has their unique path, there are universal purposes that unite all of humanity:

- **To Love and Be Loved**: At its core, life is about connection, compassion, and love
- **To Grow and Evolve**: We are here to learn, expand our consciousness, and become better versions of ourselves
- **To Serve**: Our lives gain meaning when we contribute to something greater than ourselves
- **To Experience**: Life is a gift of experience, both joyful and challenging

## Finding Your Personal Purpose

Your individual purpose is discovered through:

1. **Deep Self-Reflection**: Understanding your values, passions, and natural gifts
2. **Following Your Heart**: Listening to your inner voice and intuition
3. **Serving Others**: Finding ways to use your talents to help and uplift others
4. **Embracing Growth**: Seeing every experience as an opportunity to learn and evolve

## Living with Purpose

When you align with your purpose, life becomes meaningful, fulfilling, and joyful. You wake up each day with passion and direction, knowing that your life matters and makes a difference.

Remember: You are here for a reason. Your life has meaning. Your journey matters.`,
      featuredImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop',
      status: 'PUBLISHED',
      featured: true,
      tags: ['life-purpose', 'self-discovery', 'spirituality']
    },
    {
      title: 'The Art of Mindful Living',
      slug: 'art-of-mindful-living',
      excerpt: 'Embrace the present moment and discover how mindfulness can transform your daily experience into a source of peace and joy.',
      content: `# The Art of Mindful Living

In our fast-paced world, we often live on autopilot, rushing from one task to another without truly experiencing life. Mindful living offers a different way - a path to presence, peace, and profound appreciation for each moment.

## What is Mindful Living?

Mindful living is the practice of bringing conscious awareness to your everyday experiences. It's about being fully present in whatever you're doing, whether it's eating breakfast, walking in nature, or having a conversation with a loved one.

## Benefits of Mindfulness

- **Reduced Stress**: Present moment awareness naturally reduces anxiety about the future and regret about the past
- **Enhanced Appreciation**: You begin to notice and appreciate the beauty in ordinary moments
- **Better Relationships**: When you're fully present with others, your connections deepen
- **Increased Joy**: Mindfulness reveals the inherent joy available in each moment

## Practical Ways to Live Mindfully

1. **Mindful Breathing**: Take conscious breaths throughout the day
2. **Mindful Eating**: Savor your food and eat without distractions
3. **Mindful Walking**: Feel your feet on the ground and notice your surroundings
4. **Mindful Listening**: Give your full attention when others speak
5. **Mindful Gratitude**: Regularly appreciate the blessings in your life

## Starting Your Mindful Journey

Begin small. Choose one daily activity and commit to doing it mindfully for a week. You'll be amazed at how this simple practice can transform your entire experience of life.

The present moment is the only moment we truly have. Make it count.`,
      featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      status: 'PUBLISHED',
      featured: false,
      tags: ['mindfulness', 'inner-peace', 'happiness']
    }
  ]

  for (const articleData of articles) {
    const { tags: tagNames, ...articleInfo } = articleData
    
    // Calculate read time
    const wordCount = articleInfo.content.split(' ').length
    const readTime = Math.ceil(wordCount / 200)
    
    const article = await prisma.article.upsert({
      where: { slug: articleInfo.slug },
      update: {},
      create: {
        ...articleInfo,
        readTime,
        publishedAt: new Date(),
        authorId: adminUser.id,
        views: Math.floor(Math.random() * 5000) + 100, // Random views between 100-5100
      },
    })

    // Connect tags
    for (const tagName of tagNames) {
      const tag = await prisma.tag.findUnique({ where: { slug: tagName } })
      if (tag) {
        await prisma.articleTag.upsert({
          where: {
            articleId_tagId: {
              articleId: article.id,
              tagId: tag.id,
            },
          },
          update: {},
          create: {
            articleId: article.id,
            tagId: tag.id,
          },
        })
      }
    }

    console.log('✅ Created article:', article.title)
  }

  // Create site settings
  await prisma.siteSettings.upsert({
    where: { id: 'site' },
    update: {},
    create: {
      id: 'site',
      siteName: 'Selfless Advice',
      siteDescription: 'Life-changing wisdom for a happier life',
      siteUrl: 'https://selflessadvice.com',
      defaultMetaTitle: 'Selfless Advice - Life-Changing Wisdom for a Happier Life',
      defaultMetaDesc: 'Discover valuable insights for life, wisdom on how to live happily, understand life\'s true purpose, and find genuine advice that can transform your existence.',
      contactEmail: 'hello@selflessadvice.com',
      enableComments: true,
      enableDonations: true,
      enableNewsletter: true,
    },
  })

  console.log('✅ Created site settings')
  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

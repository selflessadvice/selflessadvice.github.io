import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { articleSchema } from "@/lib/validations"
import { generateSlug, calculateReadTime } from "@/lib/utils"
import { prisma } from "@/lib/prisma"

// GET /api/articles - Fetch articles with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status") || "PUBLISHED"
    const featured = searchParams.get("featured")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = {
      status: status as any
    }
    
    if (featured === "true") {
      where.featured = true
    }
    
    if (tag) {
      where.tags = {
        some: {
          tag: {
            slug: tag
          }
        }
      }
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } }
      ]
    }
    
    // Fetch articles with pagination
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true
            }
          },
          tags: {
            include: {
              tag: true
            }
          },
          _count: {
            select: {
              comments: true,
              likes: true
            }
          }
        },
        orderBy: {
          publishedAt: "desc"
        },
        skip,
        take: limit
      }),
      prisma.article.count({ where })
    ])
    
    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error("Fetch articles error:", error)
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    )
  }
}

// POST /api/articles - Create new article (Admin/Author only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Check if user has permission to create articles
    if (!["ADMIN", "AUTHOR", "EDITOR"].includes(session.user.role)) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      )
    }
    
    const body = await request.json()
    const validatedData = articleSchema.parse(body)
    
    // Generate slug from title
    let slug = generateSlug(validatedData.title)
    
    // Ensure slug is unique
    const existingArticle = await prisma.article.findUnique({
      where: { slug }
    })
    
    if (existingArticle) {
      slug = `${slug}-${Date.now()}`
    }
    
    // Calculate read time
    const readTime = calculateReadTime(validatedData.content)
    
    // Create article
    const article = await prisma.article.create({
      data: {
        title: validatedData.title,
        slug,
        excerpt: validatedData.excerpt,
        content: validatedData.content,
        featuredImage: validatedData.featuredImage,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        status: validatedData.status,
        featured: validatedData.featured,
        readTime,
        publishedAt: validatedData.status === "PUBLISHED" ? new Date() : validatedData.publishedAt,
        authorId: session.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })
    
    // Add tags if provided
    if (validatedData.tags && validatedData.tags.length > 0) {
      for (const tagName of validatedData.tags) {
        // Find or create tag
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: {
            name: tagName,
            slug: generateSlug(tagName)
          }
        })
        
        // Connect article to tag
        await prisma.articleTag.create({
          data: {
            articleId: article.id,
            tagId: tag.id
          }
        })
      }
    }
    
    return NextResponse.json({
      message: "Article created successfully",
      article
    }, { status: 201 })
    
  } catch (error) {
    console.error("Create article error:", error)
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data", details: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    )
  }
}

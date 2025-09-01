import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { articleSchema } from "@/lib/validations"
import { generateSlug, calculateReadTime } from "@/lib/utils"
import { prisma } from "@/lib/prisma"

// GET /api/articles/[slug] - Fetch single article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const article = await prisma.article.findUnique({
      where: {
        slug: slug
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true
          }
        },
        tags: {
          include: {
            tag: true
          }
        },
        comments: {
          where: {
            approved: true,
            parentId: null // Only top-level comments
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    image: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: "desc"
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    })
    
    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }
    
    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } }
    })
    
    return NextResponse.json({ article })
    
  } catch (error) {
    console.error("Fetch article error:", error)
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[slug] - Update article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Find the article
    const existingArticle = await prisma.article.findUnique({
      where: { slug: slug },
      include: { author: true }
    })
    
    if (!existingArticle) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }
    
    // Check permissions
    const isAuthor = existingArticle.authorId === session.user.id
    const isAdmin = ["ADMIN", "EDITOR"].includes(session.user.role)
    
    if (!isAuthor && !isAdmin) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      )
    }
    
    const body = await request.json()
    const validatedData = articleSchema.parse(body)
    
    // Generate new slug if title changed
    let newSlug = existingArticle.slug
    if (validatedData.title !== existingArticle.title) {
      newSlug = generateSlug(validatedData.title)
      
      // Ensure new slug is unique
      const slugExists = await prisma.article.findFirst({
        where: {
          slug: newSlug,
          id: { not: existingArticle.id }
        }
      })
      
      if (slugExists) {
        newSlug = `${newSlug}-${Date.now()}`
      }
    }
    
    // Calculate read time
    const readTime = calculateReadTime(validatedData.content)
    
    // Update article
    const article = await prisma.article.update({
      where: { id: existingArticle.id },
      data: {
        title: validatedData.title,
        slug: newSlug,
        excerpt: validatedData.excerpt,
        content: validatedData.content,
        featuredImage: validatedData.featuredImage,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        status: validatedData.status,
        featured: validatedData.featured,
        readTime,
        publishedAt: validatedData.status === "PUBLISHED" && !existingArticle.publishedAt 
          ? new Date() 
          : validatedData.publishedAt || existingArticle.publishedAt
      },
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
        }
      }
    })
    
    // Update tags if provided
    if (validatedData.tags) {
      // Remove existing tags
      await prisma.articleTag.deleteMany({
        where: { articleId: article.id }
      })
      
      // Add new tags
      for (const tagName of validatedData.tags) {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: {
            name: tagName,
            slug: generateSlug(tagName)
          }
        })
        
        await prisma.articleTag.create({
          data: {
            articleId: article.id,
            tagId: tag.id
          }
        })
      }
    }
    
    return NextResponse.json({
      message: "Article updated successfully",
      article
    })
    
  } catch (error) {
    console.error("Update article error:", error)
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data", details: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[slug] - Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    // Find the article
    const existingArticle = await prisma.article.findUnique({
      where: { slug: slug }
    })
    
    if (!existingArticle) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }
    
    // Check permissions
    const isAuthor = existingArticle.authorId === session.user.id
    const isAdmin = ["ADMIN", "EDITOR"].includes(session.user.role)
    
    if (!isAuthor && !isAdmin) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      )
    }
    
    // Delete article (cascade will handle related records)
    await prisma.article.delete({
      where: { id: existingArticle.id }
    })
    
    return NextResponse.json({
      message: "Article deleted successfully"
    })
    
  } catch (error) {
    console.error("Delete article error:", error)
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    )
  }
}

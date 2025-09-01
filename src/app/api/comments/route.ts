import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { commentSchema } from "@/lib/validations"
import { prisma } from "@/lib/prisma"

// POST /api/comments - Create new comment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const validatedData = commentSchema.parse(body)
    
    // Verify article exists
    const article = await prisma.article.findUnique({
      where: { id: validatedData.articleId }
    })
    
    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }
    
    // Verify parent comment exists if provided
    if (validatedData.parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: validatedData.parentId }
      })
      
      if (!parentComment || parentComment.articleId !== validatedData.articleId) {
        return NextResponse.json(
          { error: "Invalid parent comment" },
          { status: 400 }
        )
      }
    }
    
    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content: validatedData.content,
        articleId: validatedData.articleId,
        userId: session.user.id,
        parentId: validatedData.parentId,
        approved: true // Auto-approve for now, can add moderation later
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })
    
    return NextResponse.json({
      message: "Comment created successfully",
      comment
    }, { status: 201 })
    
  } catch (error) {
    console.error("Create comment error:", error)
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data", details: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    )
  }
}

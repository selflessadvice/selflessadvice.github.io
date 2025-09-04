import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/tags - Fetch all tags
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeCount = searchParams.get("includeCount") === "true"
    
    let tags
    
    if (includeCount) {
      tags = await prisma.tag.findMany({
        include: {
          _count: {
            select: {
              articles: true
            }
          }
        },
        orderBy: {
          name: "asc"
        }
      })
    } else {
      tags = await prisma.tag.findMany({
        orderBy: {
          name: "asc"
        }
      })
    }
    
    return NextResponse.json({ tags })
    
  } catch (error) {
    console.error("Fetch tags error:", error)
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    )
  }
}

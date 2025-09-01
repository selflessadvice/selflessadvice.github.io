"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  className?: string
}

export function Pagination({ currentPage, totalPages, className }: PaginationProps) {
  const searchParams = useSearchParams()
  
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    return `?${params.toString()}`
  }

  const getVisiblePages = () => {
    const delta = 2
    const range: number[] = []
    const rangeWithDots: (number | string)[] = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className={cn("flex items-center justify-center space-x-2", className)}>
      {/* Previous button */}
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={cn(
          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        )}
        {...(currentPage === 1 && { "aria-disabled": true })}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Link>

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => {
          if (typeof page === "string") {
            return (
              <span
                key={`dots-${index}`}
                className="px-3 py-2 text-gray-400"
              >
                {page}
              </span>
            )
          }

          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Next button */}
      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={cn(
          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        )}
        {...(currentPage === totalPages && { "aria-disabled": true })}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </nav>
  )
}

import { z } from "zod"

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
})

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  excerpt: z.string().max(500, "Excerpt is too long").optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().url().optional().or(z.literal("")),
  metaTitle: z.string().max(60, "Meta title is too long").optional(),
  metaDescription: z.string().max(160, "Meta description is too long").optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED", "SCHEDULED"]),
  featured: z.boolean().default(false),
  publishedAt: z.date().optional(),
  tags: z.array(z.string()).default([])
})

export const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000, "Comment is too long"),
  articleId: z.string().cuid("Invalid article ID"),
  parentId: z.string().cuid("Invalid parent comment ID").optional()
})

export const donationSchema = z.object({
  amount: z.number().min(1, "Minimum donation is $1").max(10000, "Maximum donation is $10,000"),
  currency: z.string().default("USD"),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
  message: z.string().max(500, "Message is too long").optional(),
  anonymous: z.boolean().default(false)
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type ArticleInput = z.infer<typeof articleSchema>
export type CommentInput = z.infer<typeof commentSchema>
export type DonationInput = z.infer<typeof donationSchema>

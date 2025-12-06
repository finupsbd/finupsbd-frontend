import { z } from "zod"

export const blogSchema = z.object({
  title: z.string().min(3, "Title is required").max(200, "Title must be at most 200 characters"),
  slug: z.string().optional(),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(299, "Excerpt must be at most 299 characters"),
  content: z.string().min(10, "Content must be at least 10 characters").max(100000, "Content must be at most 100000 characters"),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  language: z.enum(["en", "bn"]).default("en"),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
})

export type BlogSchemaType = z.infer<typeof blogSchema>

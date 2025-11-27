import { z } from "zod"

export const blogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  language: z.enum(["en", "bn"]).default("en"),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
})

export type BlogSchemaType = z.infer<typeof blogSchema>

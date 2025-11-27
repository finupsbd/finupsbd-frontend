



"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { blogSchema, BlogSchemaType } from "@/lib/schema/blog.schema"
import { toast } from "sonner"
import ImageUploaderSingle from "@/components/small-component/ImageUploaderSingle"
import { postBlog } from "@/services/blog"
import { useUser } from "@/context/UserContext"
import Link from "next/link"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";


const categories = [
  "PERSONAL_LOAN",
  "HOME_LOAN",
  "CAR_LOAN",
  "SME_LOAN",
  "EDUCATION_LOAN",
  "BUSINESS_LOAN",
  "FINUPS_AGRIM_LOAN",
  "CREDIT_CARD",
  "CREDIT_SCORE",
  "DEBT_MANAGEMENT",
  "DIGITAL_BANKING",
  "SAVINGS",
  "MONEY_MANAGEMENT",
  "INSURANCE",
  "TAX_TIPS",
  "INVESTMENT",
  "FINANCIAL_PLANNING",
  "WEALTH_BUILDING",
  "FINTECH_NEWS",
  "STARTUP_GROWTH",
  "PRODUCT_UPDATE",
  "CUSTOMER_SUCCESS",
  "MARKET_ANALYSIS",
  "FRAUD_PREVENTION",
  "ECONOMIC_TRENDS",
  "FINANCIAL_EDUCATION",
  "LIFESTYLE",
  "TECH_TIPS",
  "CAREER_ADVICE",
  "SUCCESS_STORIES",
  "OTHER",
]

export default function BlogPostForm() {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [fileblog, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()


  // Initialize form
  const form = useForm<BlogSchemaType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      category: "OTHER",
      tags: [],
      language: "en",
    },
  })

  // Handle Submit
  const onSubmit = async (values: BlogSchemaType) => {
    const data = { ...values, tags }
    setIsLoading(true)

    console.log(fileblog)
    if (!fileblog) {
      toast.error("Please upload image")
       setIsLoading(false)
    }


    const fromData = new FormData()

    fromData.append("data", JSON.stringify(data))
    fromData.append("file", fileblog as File)
    try {
      const res = await postBlog(fromData)


      if (res.success) {
        toast.success("Blog created successfully! your blogs is under review")
         form.reset()
         setIsLoading(false)
        
      }
      console.log("Success:", res)
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create blog")
      setIsLoading(false)
    }
  }

  const addTag = () => {
    if (!tagInput.trim()) return
    setTags([...tags, tagInput.trim()])
    setTagInput("")
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <Form {...form}>

      <form
      
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white border border-gray-300 rounded-xl shadow-lg max-w-5xl mx-auto my-20"
      >
        <h2 className="text-2xl font-bold">Create New Blog Post</h2>
      {/* <div>
        <Link className="underline text-blue-700" href={"/blog/blogs"}>Back Blog page</Link>
      </div> */}
        {/* TITLE */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SLUG */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="custom-slug..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* EXCERPT */}
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="Short summary..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* CONTENT */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea className="h-40" placeholder="Write full content..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CATEGORY */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TAGS */}
        <div>
          <Label>Tags</Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag..."
            />
            <Button type="button" onClick={addTag}>
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="cursor-pointer bg-slate-700 text-white"
                onClick={() => removeTag(tag)}
              >
                {tag} ✕
              </Badge>
            ))}
          </div>
        </div>

        {/* LANGUAGE */}
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="en">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="bn">Bangla</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* PUBLISH */}
        {user?.role === "SUPER_ADMIN" && <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between p-3 border rounded-lg">
              <FormLabel>Publish Immediately</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        }
        {/* FEATURED */}
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between p-3 border rounded-lg">
              <FormLabel>Mark as Featured</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* IMAGE UPLOAD */}
        <ImageUploaderSingle
          label="Thumbnail Image"
          value={null}
          onChange={(file) => setFile(file)}
        />

        <Button disabled={isLoading} type="submit" className="w-full py-3 text-lg">
          {isLoading ? "Createing blogs....." : "Publish Blog"}
        </Button>
      </form>
    </Form>
  )
}

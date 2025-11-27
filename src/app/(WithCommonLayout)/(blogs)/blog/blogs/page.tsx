"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, ChevronDown, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { formatEnums } from "@/utils"
import { formatWeekNumber } from "react-day-picker"
import { useUser } from "@/context/UserContext"
import { getAllBlogs } from "@/services/blog"
import { TBlogApiResponse } from "@/types"
import Loading from "./loading"

// Example fetched posts (Replace with API)
const blogPosts = [
  {
    id: "1",
    title: "Understanding Personal Loan Process in Bangladesh",
    slug: "understanding-personal-loan",
    excerpt: "Learn how to apply for a personal loan and improve your approval chances.",
    category: "PERSONAL_LOAN",
    readingTime: 4,
    publishedDate: "2024-10-10",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Credit Score Factors Every Bangladeshi Must Know",
    slug: "credit-score-factors",
    excerpt: "A detailed guide explaining credit score calculation and improvement tips.",
    category: "CREDIT_SCORE",
    readingTime: 6,
    publishedDate: "2024-09-18",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "FinTech Trends to Watch in 2025",
    slug: "fintech-trends-2025",
    excerpt: "Latest FinTech innovations shaping the financial sector of Bangladesh.",
    category: "FINTECH_NEWS",
    readingTime: 5,
    publishedDate: "2024-11-01",
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

// Prisma Category Enum (Frontend list)
const categoryList = [
  "View all",
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
  "LAST",
  "OTHER",
]

const sortOptions = ["Most recent", "Oldest first", "Alphabetical", "Reading time"]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("View all")
  const [sortBy, setSortBy] = useState("Most recent")
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [blogs, setBlogs] = useState<TBlogApiResponse>()
  const [pagination, setPagination] = useState()


useEffect(() => {
  const res = async () =>{
    setLoading(true)
      const res = await getAllBlogs()
      if(res.success){
        setBlogs(res?.data)
        setPagination(res?.pagination)
      }
      setLoading(false)
  }
res()
}, [])


console.log(blogs)




  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mt-2">Insights & Financial Guidance</h1>
          <p className="text-gray-500 mt-4">
            Stay updated with expert tips, financial guides, market news, and personal insights.
          </p>

          {/* Search */}
          <div className="flex">
            <div className="relative max-w-lg mx-auto mt-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {user && <Button>
              <Link href={'/blog/post-blog'}>
                Write a Blog
              </Link>
            </Button>}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative">
            {/* Top Fade Shadow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-50 to-transparent z-10" />

            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 rounded-2xl border bg-slate-50 shadow-inner">
              {categoryList.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "secondary"}
                  className={`rounded-full px-4 py-2 text-sm transition-all
          ${activeCategory === cat
                      ? "shadow-md scale-105"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                    }
        `}
                  onClick={() => setActiveCategory(cat)}
                >
                  {formatEnums(cat)}
                </Button>
              ))}
            </div>

            {/* Bottom Fade Shadow */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-slate-50 to-transparent z-10" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                {sortBy}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortOptions.map((option) => (
                <DropdownMenuItem key={option} onClick={() => setSortBy(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Blog Grid */}
       { blogs ?  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.data?.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition p-0 overflow-hidden">
              <Image
               src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${post.bannerImage}`}
                alt={post.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-5">
                <div className="flex justify-between mb-3">
                  <Badge>{post.category.replaceAll("_", " ")}</Badge>
                  {/* <span className="text-xs text-gray-500">{post.publishedDate}</span> */}
                </div>

                <h3 className="text-lg font-semibold line-clamp-2 mb-2">{post.title}</h3>
                {/* <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p> */}

                <Link
                  href={`/blog/blogs/${post.id}`}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div> : <Loader2/>}
       
        {/* No results */}
        {blogs?.data?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No posts found</p>
            <Button onClick={() => { setSearchQuery(""); setActiveCategory("View all") }} className="mt-3">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

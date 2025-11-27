import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getSingleBlog } from "@/services/blog"

export default async function BlogPost(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const { data } = await getSingleBlog(id)

  if (!data) {
    notFound()
  }

  console.log(data)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/blog/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <article className="prose prose-lg max-w-none">
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">

              {/* Category */}
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {data.category}
              </span>

              {/* Published Date */}
              <span>{data.date}</span>

              {/* Author (FIXED) */}
              <div className="flex items-center gap-2">
                {data.author?.profile?.avatar && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.author.profile.avatar}`}
                    alt={data.author.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
                <span>By {data.author?.name}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">{data.title}</h1>

            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.bannerImage}`}
              alt={data.title}
              width={800}
              height={400}
              className="w-full max-h-96 object-cover rounded-lg mb-8"
            />
          </div>

          {/* Blog content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </article>
      </div>
    </div>
  )
}

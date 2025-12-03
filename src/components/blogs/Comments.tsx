"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/context/UserContext"
import { createComment } from "@/services/blog"

type User = {
  id: string
  name: string
  profile: {
    avatar: string
  }
}

type Comment = {
  id: string
  content: string
  createdAt: string
  parentId: string | null
  user: User
}

interface CommentsProps {
  comments: Comment[]
  cId: string
}


export default function Comments({ comments: initialComments, cId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments) // use local state
  const [newComment, setNewComment] = useState("")
  const { user } = useUser()




  const handleNewCommentSubmit = async () => {
    if (!newComment.trim()) return // prevent empty comment

    const payload = {
      blogId: cId,
      content: newComment
    }




    console.log(user)

    try {
      const res = await createComment(payload)
      if (res.success) {
        // Add the new comment to the local state immediately
        const commentToAdd: Comment = {
          id: res.data.id, // assuming API returns created comment
          content: newComment,
          createdAt: new Date().toISOString(),
          parentId: null,
          user: {
            id: user?.userId || "",
            name: user?.name || "Unknown",
            profile: {
              avatar: user?.avater || ""
            }
          }
        }

        setComments([commentToAdd, ...comments]) // prepend new comment
      }
    } catch (err) {
      console.error(err)
    }
  }



  console.log(comments)


  return (
    <div className="space-y-6 mt-7">
      {/* Current user comment box */}
      <div className="flex gap-3 p-4 border rounded-2xl bg-white shadow-md">
        <div className="flex-1 flex flex-col gap-2">
          <Textarea
          disabled={!user}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none rounded-xl border-gray-300 shadow-sm"
            rows={3}
          />
          <div className="flex justify-end">
            <Button  disabled={!user} onClick={handleNewCommentSubmit}>Comment</Button>
          </div>
        </div>
      </div>

      {/* Existing comments */}
      {comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-3 p-4 border rounded-2xl bg-white shadow-md"
          >
            <Image
              src={
                comment?.user?.profile?.avatar
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${comment.user.profile.avatar}`
                  : "/avatar-placeholder.png"
              }
              alt={comment.user.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">{comment.user.name}</p>
                <p className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="mt-1 text-gray-700 italic">{comment.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  label?: string
  value?: string | null
  onChange?: (file: File | null) => void
}

export default function ImageUploaderSingle({
  label = "Cover Image",
  value = null,
  onChange,
}: ImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(value)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImagePreview(base64String)
        onChange?.(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    handleImageChange(file || null)
    onChange?.(file ?? null, )
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true)
    } else if (e.type === "dragleave") {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      handleImageChange(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    onChange?.(null)
  }

  return (
    <div className="space-y-4 border-t pt-6">
      <h3 className="text-sm font-semibold">{label}</h3>

      {!imagePreview ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
        >
          <input
            type="file"
            id="imageUploader"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
          <label htmlFor="imageUploader" className="cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Drag and drop your image here
                </p>
                <p className="text-xs text-gray-500">
                  or click to select a file
                </p>
              </div>
            </div>
          </label>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative inline-block w-full">
            <Image
              height={200}
              width={200}
              src={imagePreview}
              alt="Preview"
              className="h-48 w-full rounded-lg border border-gray-200 object-cover shadow-sm"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <label htmlFor="imageUploader" className="block">
            <input
              type="file"
              id="imageUploader"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <span className="inline-block cursor-pointer rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              Change Image
            </span>
          </label>
        </div>
      )}
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, X, Eye, Send, CheckCircle2, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import { createAppiDoc } from "@/services/applications/userApplication"
import { toast } from "sonner"

interface FileUploadSectionProps {
  uploadedFiles: File[]
  setUploadedFiles: (files: File[]) => void
  additionalDocumentSubmit: boolean,
  additionalDocuments: boolean,
  appicationId: string
}

export function FileUploadSection({
  uploadedFiles,
  setUploadedFiles,
  additionalDocumentSubmit,
  additionalDocuments,
  appicationId,
}: FileUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewFile, setPreviewFile] = useState<File | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const submittedFiles = [
    { name: "passport-copy.pdf", size: 2048576, type: "application/pdf", uploadDate: "2024-01-15" },
    { name: "bank-statement.pdf", size: 1536000, type: "application/pdf", uploadDate: "2024-01-15" },
    { name: "id-photo.jpg", size: 512000, type: "image/jpeg", uploadDate: "2024-01-15" },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      const maxSize = 10 * 1024 * 1024 // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize
    })

    setUploadedFiles([...uploadedFiles, ...validFiles])
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Here you would typically make an API call to submit the files
    console.log("Files submitted:", uploadedFiles)

    const formData = new FormData();
    // append all files
    Array.from(uploadedFiles).forEach((file) => {
      formData.append("files", file); // "files" must match your backend field name
    });

    try {
      const result = await createAppiDoc(appicationId, formData)
      if (result.success) {
        toast.success(result.message || "doc update successfull")
        window.location.reload()
      } else {
        toast.error(result.message || "doc update Faild!")
      }
    } catch (error) {

    }
  }

  console.log(additionalDocumentSubmit)

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return "🖼️"
    } else if (fileType === "application/pdf") {
      return "📄"
    } else if (fileType.includes("word")) {        
      return "📝"
    }
    return "📎"
  }

  const handlePreview = (file: File) => {
    setPreviewFile(file)
    setShowPreview(true)
  }

  const closePreview = () => {
    setShowPreview(false)
    setPreviewFile(null)
  }

  const renderPreview = () => {
    if (!previewFile) return null

    const fileUrl = URL.createObjectURL(previewFile)

    if (previewFile.type.startsWith("image/")) {
      return (
        <div className="max-w-full max-h-96 overflow-auto">
          <Image height={200} width={200} src={fileUrl || "/placeholder.svg"} alt={previewFile.name} className="max-w-full h-auto rounded-lg" />
        </div>
      )
    } else if (previewFile.type === "application/pdf") {
      return (
        <div className="w-full h-96">
          <iframe src={fileUrl} className="w-full h-full border rounded-lg" title={previewFile.name} />
        </div>
      )
    } else {
      return (
        <div className="text-center py-8">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Preview not available for this file type</p>
          <Button
            onClick={() => {
              const link = document.createElement("a")
              link.href = fileUrl
              link.download = previewFile.name
              link.click()
            }}
            className="mt-4"
          >
            <Download className="h-4 w-4 mr-2" />
            Download File
          </Button>
        </div>
      )
    }
  }

  return (
    <>
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            Additional Documents
          </CardTitle>
          <CardDescription>Upload required documents to complete your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          { additionalDocuments &&  (
            <>
              {/* File Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Supports: JPG, PNG, PDF, DOC, DOCX (Max 10MB each)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mx-auto"
                >
                  Choose Files
                </Button>
              </div>

              {/* File Preview List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-2xl">{getFileIcon(file.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {file.type.split("/")[1].toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handlePreview(file)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {uploadedFiles.length > 0 && (
                <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Documents
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {showPreview && previewFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{previewFile.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatFileSize(previewFile.size)} • {previewFile.type}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={closePreview}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-120px)]">{renderPreview()}</div>
          </div>
        </div>
      )}
    </>
  )
}

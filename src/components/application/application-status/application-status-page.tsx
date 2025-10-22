"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { Calendar, Clock, FileText, User, AlertCircle, CheckCircle2, Send, PlayCircle, XCircle } from "lucide-react"
import { AdminNotesSection } from "./admin-notes-section"
import { FileUploadSection } from "./file-upload-section"
import { ApplicationStatusBar } from "@/components/small-component/ApplicationStatusBar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface TApplicationData {
    additionalDocumentSubmit: boolean
    additionalDocuments: boolean
    adminNotes: string
    applicationId: string
    eligibleLoanOffer: TEligibleLoanOffer
    createdAt: string
    id: string
    isActive: boolean
    isDeleted: boolean
    status: "SUBMITTED" | "PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED" | "COMPLETED"
    updatedAt: string
    userId: string
}

interface TEligibleLoanOffer {
    loanType: string
}

interface ApplicationStatusPageProps {
    applicationData: TApplicationData
}

export function ApplicationStatusForm({ applicationData }: ApplicationStatusPageProps) {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])


    console.log(applicationData)

    const getStatusColor = (status: string) => {
        switch (status.toUpperCase()) {
            case "SUBMITTED":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            case "PENDING":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            case "IN_PROGRESS":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
            case "APPROVED":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            case "REJECTED":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            case "COMPLETED":
                return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status.toUpperCase()) {
            case "SUBMITTED":
                return <Send className="h-4 w-4" />
            case "PENDING":
                return <Clock className="h-4 w-4" />
            case "IN_PROGRESS":
                return <PlayCircle className="h-4 w-4" />
            case "APPROVED":
                return <CheckCircle2 className="h-4 w-4" />
            case "REJECTED":
                return <XCircle className="h-4 w-4" />
            case "COMPLETED":
                return <CheckCircle2 className="h-4 w-4" />
            default:
                return <FileText className="h-4 w-4" />
        }
    }



    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }




    return (
        <div className="container mx-auto px-4 py-8 ">
            {/* Header Section */}
            <div >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Application Status</h1>
                <div className="flex justify-between">
                    <p className="text-gray-600 dark:text-gray-400">
                        Track your application progress and manage required documents
                    </p>
                    {
                        applicationData?.eligibleLoanOffer?.loanType === "INSTANT_LOAN" && applicationData?.status === "APPROVED" &&
                        <Link href={`/user/my-application/agreement-copy/${applicationData.id}`}>
                            <Button>Print Agrement Copy</Button>
                        </Link>
                    }

                </div>
            </div>
            <div className="my-10">
                <ApplicationStatusBar status={applicationData?.status} />
            </div>

            {/* Status Overview Card */}
            <Card className="mb-6 shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-semibold">Application ID #{applicationData.applicationId}</CardTitle>
                            <CardDescription className="mt-1">Submitted on {formatDate(applicationData.createdAt)}</CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(applicationData.status)} flex items-center gap-1 px-3 py-1`}>
                            {getStatusIcon(applicationData.status)}
                            {applicationData.status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Created</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{formatDate(applicationData.createdAt)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Last Updated</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{formatDate(applicationData.updatedAt)}</p>
                            </div>
                        </div>
                        {/* <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">User ID</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                                    {applicationData.userId.slice(0, 8)}...
                                </p>
                            </div>
                        </div> */}
                    </div>
                </CardContent>
            </Card>

            {/* Admin Notes Section - Always show when additionalDocuments is true */}
            {applicationData.adminNotes && (
                <AdminNotesSection adminNotes={applicationData.adminNotes} />
            )}

            {/* Conditional Content Based on additionalDocuments */}
            {applicationData.additionalDocuments && (
                <FileUploadSection
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                    additionalDocumentSubmit={applicationData.additionalDocumentSubmit}
                    additionalDocuments={applicationData.additionalDocuments}
                    appicationId={applicationData.id}
                />
            )}
        </div>
    )
}

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateString, formatEnums, formatToBDTCurrency } from "@/utils";
import { ArrowRight, CheckCircle, Clock, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ApplicationStatusData } from "./TrackingApplicationTypes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TrackApplicationStatus({
  applicationStatusData,
}: {
  applicationStatusData: ApplicationStatusData;
}) {
  const getStatusStep = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return 1;
      case "IN_PROCESS":
        return 2;
      case "PENDING":
        return 3;
      case "APPROVED":
      case "REJECTED":
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = getStatusStep(applicationStatusData.status);


  return (
    <div >
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <ArrowRight className="mx-2 h-3 w-3" />
          <span className="font-medium text-gray-700">Track Application</span>
        </nav>

        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Track Application
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Main Status Card */}
          <Card className="border-0 shadow-md md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Application Status</CardTitle>
              <CardDescription>
                Your application ID:{" "}
                <span className="font-medium">
                  {applicationStatusData.applicationId}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="mb-8 text-center text-base font-semibold md:text-lg">
                  Your Application is{" "}
                  {applicationStatusData.status === "SUBMITTED"
                    ? "under review"
                    : applicationStatusData?.status
                      .toLowerCase()
                      .replace("_", " ")}
                </h3>

                {/* Status Tracker */}
                <div className="relative overflow-x-auto pb-6">
                  {/* Progress Line */}
                  <div className="absolute left-0 right-0 top-5 h-1 bg-gray-200">
                    <div
                      className="h-full bg-green-500 transition-all duration-500"
                      style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                    />
                  </div>

                  {/* Status Steps */}
                  <div className="relative flex flex-col gap-8 sm:flex-row sm:justify-between">
                    {/* Step 1 */}
                    <div className="flex min-w-[70px] flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 1
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                          }`}
                      >
                        {currentStep > 1 ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </div>
                      <span className="mt-2 text-sm font-medium">
                        Submitted
                      </span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex min-w-[70px] flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 2
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                          }`}
                      >
                        {currentStep > 2 ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <span className="mt-2 text-sm font-medium">
                        In Process
                      </span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex min-w-[70px] flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 3
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-200 text-gray-500"
                          }`}
                      >
                        {currentStep > 3 ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <span className="mt-2 text-sm font-medium">Pending</span>
                    </div>

                    {/* Step 4 */}
                    <div className="flex min-w-[70px] flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${currentStep >= 4
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                          }`}
                      >
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <span className="mt-2 text-sm font-medium">
                        Approved/Rejected
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {applicationStatusData.adminNotes !== "NULL" && (
                <Alert variant="destructive"   className="mb-4 text-left animate-pulse">
                  <AlertTitle >Note:</AlertTitle>
                  <AlertDescription  className="text-base">
                    {applicationStatusData.adminNotes}
                  </AlertDescription>
                </Alert>
              )}

              {/* Application Details */}
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="mb-4 text-base font-semibold md:text-lg">
                    Requested Loan Details
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-500">Loan Type</p>
                      <p className="font-medium">
                        {formatEnums(
                          applicationStatusData?.eligibleLoanOffer?.loanType,
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Loan Amount</p>
                      <p className="font-medium">
                        {formatToBDTCurrency(
                          applicationStatusData.loanRequest.loanAmount,
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tenure</p>
                      <p className="font-medium">
                        {applicationStatusData.loanRequest.loanTenure} months
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Application Details */}
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="mb-4 text-base font-semibold md:text-lg">
                    Eligible for Loan
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-500">Bank name</p>
                      <p className="font-medium">
                        {applicationStatusData?.eligibleLoanOffer?.bankName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Eligble Loan Amount
                      </p>
                      <p className="font-medium">
                        {formatToBDTCurrency(
                          applicationStatusData?.eligibleLoanOffer
                            ?.eligibleLoan,
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tenure</p>
                      <p className="font-medium">
                        {applicationStatusData.eligibleLoanOffer?.periodMonths}{" "}
                        months
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">InterestRate</p>
                      <p className="font-medium">
                        {applicationStatusData.eligibleLoanOffer?.interestRate}{" "}
                        %
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ProcessingFee</p>
                      <p className="font-medium">
                        {applicationStatusData.eligibleLoanOffer?.processingFee}{" "}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applicant Info Card */}
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Applicant Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-3 h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${applicationStatusData?.user?.profile?.avatar}`}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-center text-base font-semibold md:text-lg">
                  {applicationStatusData?.user?.profile?.nameAsNid}
                </h3>
                <p className="text-center text-sm text-gray-500">
                  ID: {applicationStatusData?.user?.userId}
                </p>
              </div>

              <div className="space-y-4 text-sm md:text-base">
                <div>
                  <p className="text-gray-500">National ID</p>
                  <p className="font-medium">
                    {applicationStatusData?.user?.profile?.nationalIdNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Gender</p>
                  <p className="font-medium">
                    {applicationStatusData?.user?.profile?.gender === "MALE"
                      ? "Male"
                      : "Female"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {formatDateString(
                      applicationStatusData?.user?.profile?.dateOfBirth,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Address</p>
                  <p className="font-medium">
                    {applicationStatusData?.user?.profile?.address},{" "}
                    {applicationStatusData?.user?.profile?.city}
                  </p>
                </div>
                <div className="pt-4 text-center">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 px-3 py-1 text-green-700"
                  >
                    {applicationStatusData.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

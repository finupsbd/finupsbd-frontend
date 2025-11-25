/* eslint-disable react-hooks/exhaustive-deps */
// /components/EligibilityCheckDataShow.tsx
"use client";

import CompareModal from "@/components/modules/compare/CompareModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCompare } from "@/context/CompareContext";
import { useDebounce } from "@/hooks/useDebounce";
import { formatBDT, formatEnums } from "@/utils";
import { Heart, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { banks } from "./EligibilityConostant";
import { EligibilityData, TEligibilityCheckDataShow } from "./EligibilityTypes";
import { PaginationComponent } from "@/components/small-component/PaginationComponent";

// Format number to BDT format

type PageProps = {
  submissionData: TEligibilityCheckDataShow;
  onSendData: (data: any) => void;
};

function EligibilityCheckDataShow({ submissionData, onSendData }: PageProps) {
  const { data: eligibilityData, pagination } = submissionData;
  const [showDetails, setShowDetails] = useState(false);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [amount, setLoanAmount] = useState(100000);
  const debounceAmount = useDebounce(amount, 500); // Assuming you have a debounce hook, replace this with the actual hook
  const [interestRate, setProfitRate] = useState(12);
  const [searchTerm, setSelectedBanks] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const { setCompareData, compareData } = useCompare();
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);    // Current page
  const [totalPages, setTotalPages] = useState(3);     // Backend থেকে আসবে


  // Send filter/query data to parent
  useEffect(() => {
    const queryData = {
      amount: debounceAmount,
      interestRate,
      searchTerm,
      sortOrder,
      page: currentPage,
      limit: totalPages,
      sortKey,
    };
    onSendData(queryData);
  }, [interestRate, searchTerm, sortOrder, sortKey, currentPage, debounceAmount]);





  // Toggle wishlist
  const handleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Toggle compare selection (limit to 3 items)
  const handleCompare = (id: number) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length < 3) {
          return [...prev, id];
        } else {
          toast.warning("You can only compare up to 3 items.");
          return prev;
        }
      }
    });
  };

  // Open compare modal if at least 2 items are selected
  const navigateToCompare = () => {
    if (compareList.length < 2) {
      toast.info("Please select at least two items to compare.");
      return;
    }
    // Prepare dynamic data for comparison.
    const selectedData = eligibilityData.filter(
      (data: EligibilityData, index: number) => compareList.includes(index),
    );
    // Save compare data in context
    setCompareData({
      ids: compareList,
      dynamicData: selectedData,
    });
    // Open the modal
    setIsCompareModalOpen(true);
  };

  const handleSort = (key: string, order: string) => {
    setSortKey(key);
    setSortOrder(order);
  };

  const handelApplication = (data: EligibilityData) => {
    console.log(data);
    const loanRequest = {
      bankName: data?.bankName,
      bankImage: data?.coverImage,
      loanType: data?.loanType,
      eligibleLoan: data?.eligibleLoan,
      periodMonths: data?.periodMonths,
      amount: data?.amount,
      interestRate: data?.interestRate,
      processingFee: data?.processingFee,
    };
    localStorage.setItem("loanRequest", JSON.stringify(loanRequest));
    router.push(`/user/loan-application`);
  };









  return (
    <div className="min-h-screen bg-[#F8F9FA] py-10">
      <div className="container mx-auto bg-[#F8F9FA]">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Filter Sidebar */}
          <div className="w-full rounded-xl bg-white px-6 py-4 pb-8 shadow-md lg:sticky lg:top-28 lg:w-3/12 lg:self-start">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-tertiary-dark">
                Filter
              </h2>
              <Button
                variant="ghost"
                className="text-tertiary-primay flex text-base hover:bg-[#FFF2EB] hover:text-[#FF5F00]"
                onClick={() => {
                  setLoanAmount(100000);
                  setProfitRate(12);
                  setSelectedBanks([]);
                }}
              >
                <RotateCcw size={15} />
                Reset
              </Button>
            </div>
            <div className="line-seperator my-4 mb-6" />
            <div>
              {/* Loan Amount Slider */}
              <div className="space-y-4">
                <h3 className="mb-4 text-base font-medium text-tertiary-dark">
                  Loan Amount
                </h3>

                <Slider
                  value={[amount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  max={500000}
                  step={5}
                  className="w-full bg-[#EAECF0]"
                />
                <div className="relative flex items-center gap-2">
                  <span className="text-tertiary-primay absolute left-4 top-[17px] z-10 text-base font-bold">
                    BDT
                  </span>
                  <input
                    type="text"
                    className="text-tertiary-primay relative mt-2 w-full rounded-md border border-gray-300 px-3 py-2 pl-14 text-base font-bold focus:border-gray-400 focus-visible:outline-none"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                      setLoanAmount(value ? Number(value) : 0);
                    }}
                  />
                </div>
              </div>
              {/* Profit Rate Slider */}
              {/* <div className="space-y-2">
              <label className="text-sm font-medium">Profit Rate</label>
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setProfitRate(parseFloat(value[0].toFixed(1)))}
                max={30}
                min={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>1%</span>
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
                  {interestRate.toFixed(1)}%
                </span>
                <span>30%</span>
              </div>
            </div> */}
              <div className="line-seperator my-6" />
              {/* Bank Checkbox Filter */}
              <div>
                <h3 className="mb-4 text-base font-medium text-tertiary-dark">
                  Bank
                </h3>
                <div className="space-y-4">
                  {banks.slice(0, 6).map((bank) => (
                    <div key={bank} className="flex items-center space-x-2">
                      <Checkbox
                        id={bank}
                        checked={searchTerm.includes(bank)}
                        onCheckedChange={(checked) => {
                          setSelectedBanks((prev) =>
                            checked
                              ? [...prev, bank]
                              : prev.filter((item) => item !== bank),
                          );
                        }}
                        className="border-[#344054]"
                      />
                      <label htmlFor={bank} className="text-sm leading-none">
                        {bank}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="w-full space-y-6 lg:w-9/12">
            <div className="flex flex-wrap gap-2 rounded-lg border border-[#B4B7D0]/30 bg-white p-2 shadow-md lg:gap-4">
              <Button
                variant="outline"
                className={`cursor-pointer border-none shadow-none ${sortKey === "interestRate" && sortOrder === "asc"
                    ? "!border-transparent bg-[#E7FDE2] text-primary"
                    : "hover:bg-[#E7FDE2] hover:text-primary"
                  }`}
                onClick={() => handleSort("interestRate", "asc")}
              >
                Lowest Interest Rate
              </Button>
              <Button
                variant="outline"
                className={`cursor-pointer border-none shadow-none ${sortKey === "interestRate" && sortOrder === "desc"
                    ? "border-transparent bg-[#E7FDE2] text-primary"
                    : "hover:bg-[#E7FDE2] hover:text-primary"
                  }`}
                onClick={() => handleSort("interestRate", "desc")}
              >
                Highest Interest Rate
              </Button>
              <Button
                variant="outline"
                className={`cursor-pointer border-none shadow-none ${sortKey === "eligibleLoan" && sortOrder === "desc"
                    ? "border-transparent bg-[#E7FDE2] text-primary"
                    : "hover:bg-[#E7FDE2] hover:text-primary"
                  }`}
                onClick={() => handleSort("eligibleLoan", "desc")}
              >
                Highest Loan Amount
              </Button>
              <Button
                variant="outline"
                className={`cursor-pointer border-none shadow-none ${sortKey === "eligibleLoan" && sortOrder === "asc"
                    ? "border-transparent bg-[#E7FDE2] text-primary"
                    : "hover:bg-[#E7FDE2] hover:text-primary"
                  }`}
                onClick={() => handleSort("eligibleLoan", "asc")}
              >
                Lowest Loan Amount
              </Button>
            </div>

            <div className="text-sm">
              We found {pagination.total} {formatEnums(eligibilityData[0]?.loanType)} 
            </div>

            {compareList.length > 1 && (
              <Button
                onClick={navigateToCompare}
                className="mb-4 bg-primary hover:bg-primary/90"
              >
                Compare Selected ({compareList.length})
              </Button>
            )}

            {/* Loan Cards */}
            <div className="space-y-4">
              {eligibilityData?.map((data: EligibilityData, index: number) => (
                <Card key={index} className="transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 lg:flex-row">
                      {/* Left Section */}
                      <div className="flex-1 space-y-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.coverImage}`}
                              alt={`${data.bankName} Logo`}
                              width={80}
                              height={80}
                              className="rounded"
                              priority
                            />
                            <div>
                              <h3 className="font-semibold">{`${formatEnums(data.bankName)}, ${formatEnums(data.loanType)}`}</h3>
                              <div className="mt-2 flex gap-2">
                                <Badge
                                  variant="secondary"
                                  className="border-transparent bg-[#E8F8F0] text-primary"
                                >
                                  100% Paperless Approval
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className="border-transparent bg-orange-50 text-[#FF6634]"
                                >
                                  30% Cashback on Interest Rate
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleWishlist(index)}
                            className={
                              wishlist.includes(index) ? "text-primary" : ""
                            }
                          >
                            <Heart
                              className="h-5 w-5"
                              fill={
                                wishlist.includes(index)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </Button>
                        </div>
                        {/* Summary Information */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Amount:
                            </div>
                            <div className="font-semibold">
                              BDT {formatBDT(data?.amount)}/-
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Interest Rate:
                            </div>
                            <div className="font-semibold">
                              {data?.interestRate}%
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Period (Months):
                            </div>
                            <div className="font-semibold">
                              {data?.periodMonths} Months
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Monthly EMI:
                            </div>
                            <div className="font-semibold">
                              BDT {formatBDT(data?.monthlyEMI)}/-
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Processing Fee:
                            </div>
                            <div className="font-semibold">
                              {data?.processingFee}%
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">
                              Total Amount:
                            </div>
                            <div className="font-semibold">
                              BDT {formatBDT(data?.totalRepayment)}/-
                            </div>
                          </div>
                        </div>
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => setShowDetails(!showDetails)}
                          className="mt-4"
                        >
                          {showDetails ? "Hide Details" : "Show Details"}
                        </Button>
                        {showDetails && (
                          <Tabs defaultValue="features">
                            <TabsList className="gap-6 border-b bg-transparent p-0">
                              <TabsTrigger
                                value="features"
                                className="border-b-2 border-transparent bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
                              >
                                Features
                              </TabsTrigger>
                              <TabsTrigger
                                value="eligibility"
                                className="border-b-2 border-transparent bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
                              >
                                Eligibility
                              </TabsTrigger>
                              <TabsTrigger
                                value="fees"
                                className="border-b-2 border-transparent bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
                              >
                                Fees & Charges
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent
                              value="features"
                              className="mt-4 space-y-2"
                            >
                              <div className="font-medium">Features</div>
                              <ul className="list-inside list-disc space-y-1 text-sm">
                                <li>
                                  <strong>Loan Amount: </strong>
                                  {data?.features?.loanAmount}
                                </li>
                                <li>
                                  <strong>
                                    {" "}
                                    Minimum: BDT {formatBDT(50000)}/- - Maximum:
                                    BDT {formatBDT(2000000)}/-
                                  </strong>{" "}
                                </li>
                                <li>
                                  <strong>Loan Tenure: </strong>
                                  {data?.features?.loanTenure}
                                </li>
                                <li>
                                  <strong>
                                    Minimum {data?.features?.minimumYear} Year -
                                    Maximum {data?.features?.maximumYear} Years
                                  </strong>
                                </li>
                              </ul>
                            </TabsContent>
                            <TabsContent value="eligibility" className="mt-4">
                              <div className="mb-2 font-medium">
                                Eligibility Criteria
                              </div>
                              <ul className="list-inside list-disc space-y-1 text-sm">
                                <li>{data?.eligibility?.condition}.</li>
                                <li>
                                  <strong>Offer: </strong>
                                  {data?.eligibility?.offer}.
                                </li>
                                <li>
                                  {" "}
                                  <strong>Minimum Income:</strong> BDT{" "}
                                  {formatBDT(data?.eligibility?.minimumIncome)}
                                  /-
                                </li>
                                <li>
                                  <strong>Minimum Experience:</strong>{" "}
                                  {data?.eligibility?.minimumExperience} years
                                </li>
                                <li>
                                  <strong>Age Requirement:</strong>{" "}
                                  {data?.eligibility?.ageRequirement} years
                                </li>
                              </ul>
                            </TabsContent>
                            <TabsContent value="fees" className="mt-4">
                              <div className="mb-2 font-medium">
                                Fees & Charges
                              </div>
                              <ul className="list-inside list-disc space-y-1 text-sm">
                                <li>
                                  <strong>Processing Fee:</strong>{" "}
                                  {data?.feesCharges?.processingFee}.
                                </li>
                                <li>
                                  <strong>Early Settlement Fee:</strong>
                                  {data?.feesCharges?.earlySettlementFee}.
                                </li>
                                <li>
                                  <strong>Prepayment Fee:</strong>{" "}
                                  {data?.feesCharges?.prepaymentFee}
                                </li>
                                <li>
                                  <strong>Loan Re-scheduling Fee:</strong>{" "}
                                  {data?.feesCharges?.LoanReSchedulingFee}{" "}
                                </li>
                                <li>
                                  <strong>Penal Charge:</strong>{" "}
                                  {data?.feesCharges?.penalCharge}
                                </li>
                              </ul>
                            </TabsContent>
                          </Tabs>
                        )}
                      </div>
                      {/* Right Section */}
                      <div className="space-y-4 lg:w-64">
                        <div className="rounded-lg bg-[#E8F8F0] p-4">
                          <div className="text-sm">Eligible Loan</div>
                          <div className="text-xl font-bold">
                            BDT {formatBDT(data?.eligibleLoan)}/-
                          </div>
                        </div>
                        {/* <Button
                          onClick={() => handelApplication(data)}
                          className="w-full bg-primary hover:bg-primary/90"
                        >
                          Apply Now
                        </Button> */}
                        <Button
                          variant="outline"
                          onClick={() => handleCompare(Number(index))}
                          className={`w-full border-primary text-primary hover:bg-primary hover:text-white ${compareList.includes(index)
                              ? "bg-primary text-white"
                              : ""
                            }`}
                        >
                          {compareList.includes(index)
                            ? "Selected"
                            : "Compare Now"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Pagination UI */}
            {/* <div className="mt-6 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <div className="text-sm">
                Page {page} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div> */}
            <PaginationComponent
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        </div>
      </div>
      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareData={compareData}
      />
    </div>
  );
}

export default EligibilityCheckDataShow;

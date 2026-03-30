"use client";

import LoadingComponent from "@/components/loading/LoadingComponent";
import EligibilityInstantLoanDataShow from "@/components/modules/eligibility/instantLoan/EligibilityInstantLoanDataShow";
import RateLimitModal from "@/components/small-component/RateLimitModal";
import { Button } from "@/components/ui/button";
import { eligibilityCheckData } from "@/services/eligibilityCheck";
import { useEffect, useRef, useState } from "react";


export interface QueryDataProps {
  tenure: number;
}




const InastantLoanPage = () => {
  const [submissionData, setSubmissionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryData, setQueryData] = useState<{ tenure: number }>();


  const handleQueryData = (data: QueryDataProps) => {
    setQueryData(data);
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = sessionStorage.getItem("eligibilityData");
        if (data && queryData) {
          const parsedData = JSON.parse(data);
          const result = await eligibilityCheckData(parsedData, queryData);
          setSubmissionData(result?.data);
        }

      } catch (error) {
        console.error("Error parsing eligibility data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [queryData]);



  if (isLoading) {
    return <LoadingComponent />;
  }




  function handleStartEligibilityCheck(): void {
    window.location.href = "/";
  }

  return (
    <div> {submissionData ? (<EligibilityInstantLoanDataShow submissionData={submissionData} onSendData={handleQueryData} isLoading={isLoading} />) : (
      <div className="flex h-screen flex-col items-center justify-center py-8">
        <p className="mb-4 text-lg font-semibold text-gray-700">
          You are not eligibility for instant loan
        </p>
        <Button
          variant="default"
          onClick={() => handleStartEligibilityCheck()}
        >
          Start Eligibility Check
        </Button>
      </div>
    )}
    </div>
  );
};

export default InastantLoanPage;

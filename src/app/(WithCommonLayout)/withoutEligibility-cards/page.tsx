"use client";

import LoadingComponent from "@/components/loading/LoadingComponent";
import EligibilityCardDataShow from "@/components/modules/eligibility/cards/EligibilityCardsDataShow";

import { FiltersType, TCardsResponse } from "@/components/modules/eligibility/EligibilityTypes";
import { Button } from "@/components/ui/button";
import { eligibilityCheckData, withoutEligiblityCards } from "@/services/eligibilityCheck";
import { useEffect, useState } from "react";


export interface QueryDataProps {
  tenure: number;
}




const WithoutEligibilityCardsPage = () => {
  const [submissionData, setSubmissionData] = useState<TCardsResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [queryDataBody, setQueryDataBody] = useState<FiltersType>()




  const handleQueryDataBody = (data: FiltersType) => {
    setQueryDataBody(data);
  };





  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = sessionStorage.getItem("cardType");
        if (query) {
          const result = await withoutEligiblityCards(query as any);

          if (result.success) {
            setSubmissionData(result.data);
          } else {
            console.log(result)
          }
        }
      } catch (error) {
        console.error("Error parsing eligibility data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ queryDataBody]);


  if (isLoading) {
    return <LoadingComponent />;
  }

  function handleStartEligibilityCheck(): void {
    window.location.href = "/";
  }


  



  return (
    <div> {submissionData?.data ? (< EligibilityCardDataShow handleQueryDataBody={handleQueryDataBody} submissionData={submissionData}  />) : (
      <div className="flex h-screen flex-col items-center justify-center py-8">
        <p className="mb-4 text-lg font-semibold text-gray-700">
          You are not eligibility for Cards
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

export default WithoutEligibilityCardsPage;

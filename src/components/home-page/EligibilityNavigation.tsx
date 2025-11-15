"use client";
import { useEffect, useState } from "react";
// (Below imports assume you have these shadcn (or Radix-based) components set up in a non-Next.js project)
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveUpRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EligibilityCheckModal from "../modules/eligibility/EligibilityCheckModal";
import { cards, loanTypes } from "../modules/eligibility/form-steps/form-data-oprions";





function EligibilityNavigation() {
  // Track the selected loan type
  const [loanType, setLoanType] = useState("");
  const [openEligibility, setOpenEligibility] = useState(false);
  const router = useRouter();
  // const [openCommingSoon, setOpenCommingSoon] = useState(false);


  
  // Send data to backend (Compare Loan)
  async function handleCompareLoan() {
    if (loanType == "") {
      return toast.error("Please Select any loan option for compare Loan");
    }
    router.push(`/eligibility?loanType=${loanType}&compare=true`);
  }

  // Send data to backend (Check Eligibility)
  async function handleCheckEligibility() {
    if (loanType == "") {
      return toast.error("Select any loans or cards for eligiblity check");
    }

    if (loanType === "DEBIT_CARD" || loanType === "PREPAID_CARD") {
      router.push('/eligibility-cards')
    }
    else {
      setOpenEligibility(true);
    }
    //   return setOpenCommingSoon(true);
    // }

  }

  // useEffect(() => {
  //   if (
  //     loanType == "HOME_LOAN" ||
  //     loanType == "CAR_LOAN" ||
  //     loanType == "SME_LOAN" ||
  //     loanType == "DEBIT_CARD" ||
  //     loanType == "PREPAID_CARD"
  //   ) {
  //     setOpenCommingSoon(true);
  //   }

  //   return () => {
  //     setOpenCommingSoon(false);
  //   };
  // }, [loanType]);



  return (
    <div className="container-sm relative z-10 p-6">
      {/* Outer container */}
      <div className="flex items-center justify-center">
        <Tabs defaultValue="loans" className="w-full">
          {/* Tabs List */}

          {/* Loans tab content */}
          <div className="relative m-2 min-h-44 rounded-xl bg-white p-6 pt-10 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.1)] lg:pt-10">
            <div className="flex items-center justify-center">

              { }
              <TabsList className="absolute -top-6 z-10 bg-white px-2 py-6 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.1)] md:space-x-12">
                <TabsTrigger
                  value="loans"
                  className="rounded-lg px-3 py-2 text-sm font-semibold !text-primary hover:bg-[#E7FDE2] data-[state=active]:!bg-primary data-[state=active]:!text-white lg:px-6 lg:text-base"
                >
                  Loans
                </TabsTrigger>
                <TabsTrigger
                  value="cards"
                  className="rounded-lg px-3 py-2 text-sm font-semibold !text-primary hover:bg-[#E7FDE2] data-[state=active]:!bg-primary data-[state=active]:!text-white lg:px-6 lg:text-base"
                >
                  Cards
                </TabsTrigger>
                {/* TODO: WILL ENABLE FUTURE */}
                <TabsTrigger
                  value="insurance"
                  className="rounded-lg px-3 py-2 text-sm font-semibold !text-primary hover:bg-[#E7FDE2] data-[state=active]:!bg-primary data-[state=active]:!text-white lg:px-6 lg:text-base"
                >
                  Bima/Insurance
                </TabsTrigger>
                <TabsTrigger
                  value="investment"
                  className="rounded-lg px-3 py-2 text-sm font-semibold !text-primary hover:bg-[#E7FDE2] data-[state=active]:!bg-primary data-[state=active]:!text-white lg:px-6 lg:text-base"
                >
                  Investment
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="loans">

              <div className="flex flex-col space-y-4">
                {/* Radio buttons for loan types */}
                <RadioGroup
                  value={loanType}
                  onValueChange={setLoanType} // track changes
                  className="gird mb-4 mt-2 flex-none grid-cols-2 justify-center gap-6 lg:flex lg:flex-row lg:items-center"
                >
                  {loanTypes?.map((type) => (
                    <div
                      key={type.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem id={type.value} value={type.value} />
                      <Label className="cursor-pointer" htmlFor={type.value}>
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Action buttons */}
                <div className="flex w-full flex-col justify-center gap-4 lg:flex-row">
                  {/* <Button
                    variant="default"
                    className="h-12 w-full lg:w-1/2"
                    onClick={handleCompareLoan}
                  >
                    Compare Loan
                    <MoveUpRight size={28} strokeWidth={2.5} />
                  </Button> */}
                  <Button
                    className="flex items-center justify-center gap-2 h-12 w-full lg:w-1/3"
                    onClick={handleCheckEligibility}
                  >
                    {loanType === "DEBIT_CARD" ? "Compare Card" : "Check Eligibility"}
                    <MoveUpRight size={22} strokeWidth={2.5} />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Other tabs: Cards, Investment, Bima/Insurance */}
            <TabsContent value="cards">
              <div className="flex flex-col space-y-4">
                {/* Radio buttons for loan types */}
                <RadioGroup
                  value={loanType}
                  onValueChange={setLoanType} // track changes
                  className="gird mb-4 mt-2 flex-none grid-cols-2 justify-center gap-6 lg:flex lg:flex-row lg:items-center"
                >

                  {cards?.map((card) => (
                    <div
                      key={card.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem id={card.value} value={card.value} />
                      <Label className="cursor-pointer" htmlFor={card.value}>
                        {card.label}
                      </Label>
                    </div>
                  ))}

                </RadioGroup>

                {/* Action buttons */}
                <div className="flex w-full flex-col justify-center gap-4 lg:flex-row">
                  {/* <Button
                    variant="default"
                    className="h-12 w-full lg:w-1/2"
                    onClick={handleCompareLoan}
                  >
                    Compare Loan
                    <MoveUpRight size={28} strokeWidth={2.5} />
                  </Button> */}
                  <Button
                    disabled={loanType === "HOME_LOAN"}
                    className="flex h-12 w-full items-center justify-center gap-2 lg:w-1/3"
                    onClick={handleCheckEligibility}
                  >
                    Check Eligibility
                    <MoveUpRight size={20} strokeWidth={2} />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              className="flex items-center justify-center"
              value="insurance"
            >
              <div>Comming Soon.........</div>
            </TabsContent>
            <TabsContent
              className="flex items-center justify-center"
              value="investment"
            >
              <div>Comming Soon.........</div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      {/* <CommingSoon open={openCommingSoon} onOpenChange={setOpenCommingSoon} /> */}

      {/* Eligiblity Check model  open*/}
      <EligibilityCheckModal
        open={openEligibility}
        onOpenChange={setOpenEligibility} // pass setState so the modal can close itself
        loanType={loanType}
      />
    </div>
  );
}

export default EligibilityNavigation;

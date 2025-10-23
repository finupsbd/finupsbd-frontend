"use client";

import { Button } from "@/components/ui/button";
import { EligibilityData } from "../eligibility/EligibilityTypes";
import { useRouter } from "next/navigation";

type CompareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  compareData: {
    ids: number[];
    dynamicData: EligibilityData[];
  };
};

export default function CompareModal({
  isOpen,
  onClose,
  compareData,
}: CompareModalProps) {
  const router = useRouter()
  if (!isOpen) return null;

  // Define which fields you want to show as rows
  const fields = [
    { label: "Loan Amount (BDT)", key: "amount" },
    { label: "Interest Rate %", key: "interestRate" },
    { label: "Period (Months)", key: "periodMonths" },
    { label: "Monthly EMI (BDT)", key: "monthlyEMI" },
    { label: "Processing Fees %", key: "processingFee" },
    { label: "Total Payment (BDT)", key: "totalRepayment" },
  ];

  console.log(compareData.dynamicData);

  const handelApplication = (data: any) => {
  console.log(data);
    const loanRequest = {
      bankName: data?.bankName,
      bankImage: data?.coverImage,
      loanType: data?.loanType,
      eligibleLoan: data?.eligibleLoan,
      periodMonths: data?.periodMonths,
      amount: data?.amount,
      interestRate: data?.interestRate,
      processingFee: data?.processingFee
    }
    localStorage.setItem("loanRequest", JSON.stringify(loanRequest))
    router.push(`/user/loan-application`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="relative w-full max-w-3xl scale-100 transform rounded bg-white p-6 shadow-lg transition-transform duration-300">
        {/* Close button (top-right corner) */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-3xl leading-none text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Compare</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-200 p-3 text-left font-semibold">
                  Details / Bank Name
                </th>
                {compareData.dynamicData.map((bank, idx) => (
                  <th
                    key={idx}
                    className="border border-gray-200 p-3 text-center font-semibold"
                  >
                    {bank.bankName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fields.map((field) => (
                <tr key={field.key}>
                  <td className="border border-gray-200 p-3 font-medium">
                    {field.label}
                  </td>
                  {compareData.dynamicData.map((bank, index) => (
                    <td
                      key={index}
                      className="border border-gray-200 p-3 text-center"
                    >
                      {String(bank[field.key as keyof typeof bank])}
                    </td>
                  ))}
                </tr>
              ))}

              {/* "Apply" button row */}
              <tr>
                <td className="border border-gray-200 p-3 font-medium">
                  Action
                </td>
                {compareData.dynamicData.map((bank, idx) => (
                  <td
                    key={idx}
                    className="border border-gray-200 p-3 text-center"
                  >
                    {/* <Button
                      onClick={() => handelApplication(bank)}
                      className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                    >
                      Apply
                    </Button> */}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-300"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

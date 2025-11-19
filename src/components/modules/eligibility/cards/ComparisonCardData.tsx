
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TCardsResponse } from "../EligibilityTypes";
import { formatEnums } from "@/utils";



type ComparisonCardDataProps = {
    submissionData: TCardsResponse
    open: boolean
    onOpenChange: (open: boolean) => void
}




const ComparisonCardData = ({submissionData, open,  onOpenChange}: ComparisonCardDataProps) => {
    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="border-b pb-4">
                        <DialogTitle className="text-xl font-semibold text-center">
                            Choose your best suitable Credit cards
                        </DialogTitle>
                    </DialogHeader>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Header Row */}
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-4 font-medium">Details / Bank Name</th>
                                    {submissionData.data.map((card) => (
                                        <th key={card.id} className="text-center p-4 min-w-[200px]">
                                            <div className="flex flex-col items-center gap-2">
                                                <Image
                                                    height={200}
                                                    width={200}
                                                    src={card.coverImage || "/placeholder.svg"}
                                                    alt={`${card.bankName} ${card.cardFeaturesType}`}
                                                    className="w-16 h-10 object-contain"
                                                />
                                                <div className="text-sm font-medium">{formatEnums(card.bankName)}</div>
                                                <div className="text-xs text-gray-600">
                                                    {card.cardFeaturesType} {card.cardNetwork}
                                                </div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {/* Annual Fee Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={submissionData.data.length + 1} className="p-3 font-semibold">
                                        Annual Fee
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Pro Annual Fee</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.freeAnnualFee === "Yes" ? "1st Year Free" : "Not Available"}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Regular Annual Fee</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.regularAnnualFee}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Annual fee waived</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {/* {card?.feesChargesCreditCard?.annualFeeWaived} */}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Annual fee waived Reward Point</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card?.annualFeeWaivedReward}
                                        </td>
                                    ))}
                                </tr>

                                {/* Interest Per Day Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={submissionData.data.length + 1} className="p-3 font-semibold">
                                        Interest Per Day
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Interest Per Day</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.interestPerDay}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Interest free period</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.interestFreePeriod}
                                        </td>
                                    ))}
                                </tr>

                                {/* Supplementary Card Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={submissionData.data.length + 1} className="p-3 font-semibold">
                                        Supplementary Card
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Free Supplementary Cards</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.freeSupplementaryCards} Cards
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Max Supplementary Cards</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.maxSupplementaryCards} Cards
                                        </td>
                                    ))}
                                </tr>

                                {/* Balance Transfer Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={submissionData.data.length + 1} className="p-3 font-semibold">
                                        Balance Transfer
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Balance Transfer Availability</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.balanceTransferAvailability}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Own Bank ATM Fee</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.ownBankATMFee}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Other Bank ATM Fee</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.otherBankATMFee}
                                        </td>
                                    ))}
                                </tr>

                                {/* Travel Facilities (Local) Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={submissionData.data.length + 1} className="p-3 font-semibold">
                                        Travel Facilities (Local)
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Lounge Facility</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.loungeFacility}
                                        </td>
                                    ))}
                                </tr>

                                {/* Travel Facilities (International) Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={submissionData.data.length + 1} className="p-3 font-semibold">
                                        Travel Facilities (International)
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Lounge visit</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.loungeVisit}
                                        </td>
                                    ))}
                                </tr>

                                {/* Card Charges for Local Section */}
                                <tr className="bg-green-600 text-white">
                                    <td colSpan={submissionData.data.length + 1} className="p-3 font-semibold">
                                        Card Charges for Local
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Card Charges Processing Fee</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {/* {card?.cardChequeProcessingFee} */}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">Processing Fee Minimum</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.processingFeeMinimum}
                                        </td>
                                    ))}
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium">Cash Withdrawal Limit</td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-3 text-center">
                                            {card.cashWithdrawalLimit}
                                        </td>
                                    ))}
                                </tr>

                                {/* Apply Now Buttons */}
                                <tr>
                                    <td className="p-4"></td>
                                    {submissionData.data.map((card) => (
                                        <td key={card.id} className="p-4 text-center">
                                            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
                                                Apply Now
                                            </Button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ComparisonCardData

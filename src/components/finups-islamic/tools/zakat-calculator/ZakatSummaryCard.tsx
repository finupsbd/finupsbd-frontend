import { Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ZakatSummaryCardProps {
  amount: number
  lastUpdated: string
}

export default function ZakatSummaryCard({
  amount,
  lastUpdated,
}: ZakatSummaryCardProps) {
  return (
    <Card className="bg-emerald-100 border-none rounded-2xl">
      <CardContent className="py-4 text-center space-y-3">
        <p className="text-emerald-900 font-semibold text-lg">
          যাকাতের নিসাব
        </p>

        <div className="flex items-center justify-center gap-2">
          <h2 className="text-emerald-800 font-bold text-4xl">
            ৳ {amount.toLocaleString("bn-BD")}
          </h2>
          <Info className="w-5 h-5 text-emerald-700" />
        </div>

        <p className="text-sm text-emerald-800 underline underline-offset-4">
          সর্বশেষ হালনাগাদ {lastUpdated}
        </p>
      </CardContent>
    </Card>
  )
}

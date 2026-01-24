"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Info,
  Download,
  RotateCcw,
  Calculator,
  TrendingUp,
  Briefcase,
  History,
  FileText,
  BarChart3,
  Zap,
  Share2,
  Percent,
  Target,
  Copy,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import ZakatWarning from "./ZakatWarning"


type CalculationType = "wealth" | "income" | "business" | "comparative"
type IslamicSchool = keyof typeof ISLAMIC_SCHOOLS

interface SavedCalculation {
  id: string
  date: string
  type: CalculationType
  result: number
  details: string
  shareLink?: string
}

interface PriceData {
  goldPrice: number
  silverPrice: number
  lastUpdated: string
  source: "manual" | "live" | "bhori"
}

interface TaxData {
  taxRate: number
  includeTax: boolean
  taxableIncome: number
}

const COLORS = ["#10b981", "#059669", "#047857", "#065f46", "#34d399"]

const BHORI_TO_GRAMS = 11.66 // 1 Bhori = 11.66 grams
const GOLD_NISAB_GRAMS = 87.48
const SILVER_NISAB_GRAMS = 612

const ISLAMIC_SCHOOLS = {
  hanafi: {
    name: "হানাফি",
    nisabType: "min", // gold OR silver
    zakatRate: 0.025,
  },
  maliki: {
    name: "মালিকি",
    nisabType: "gold",
    zakatRate: 0.025,
  },
  shafi: {
    name: "শাফেয়ী",
    nisabType: "gold",
    zakatRate: 0.025,
  },
  hanbali: {
    name: "হাম্বলী",
    nisabType: "gold",
    zakatRate: 0.025,
  },
} as const



export default function ZakatCalculator() {
  const [activeTab, setActiveTab] = useState<CalculationType>("wealth")
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([])
  const [islamicSchool, setIslamicSchool] = useState<IslamicSchool>("hanafi")

  // Price Data State
  const [priceData, setPriceData] = useState<PriceData>({
    goldPrice: 7500,
    silverPrice: 850,
    lastUpdated: new Date().toLocaleDateString("bn-BD"),
    source: "manual",
  })

  const [priceSource, setPriceSource] = useState<"manual" | "live" | "bhori">("manual")
  const [bhoriGoldPrice, setBhoriGoldPrice] = useState("")
  const [bhoriSilverPrice, setBhoriSilverPrice] = useState("")

  // Wealth Zakat State
  const [gold, setGold] = useState("")
  const [silver, setSilver] = useState("")
  const [cash, setCash] = useState("")
  const [realEstate, setRealEstate] = useState("")
  const [stocks, setStocks] = useState("")
  const [businessInventory, setBusinessInventory] = useState("")
  const [debts, setDebts] = useState("")
  const [wealthResult, setWealthResult] = useState<any>(null)

  // Income Zakat State
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [totalExpenses, setTotalExpenses] = useState("")
  const [dependents, setDependents] = useState("0")
  const [incomeResult, setIncomeResult] = useState<any>(null)

  // Business Zakat State
  const [businessAssets, setBusinessAssets] = useState("")
  const [businessDebts, setBusinessDebts] = useState("")
  const [businessCash, setBusinessCash] = useState("")
  const [businessIncome, setBusinessIncome] = useState("")
  const [businessResult, setBusinessResult] = useState<any>(null)

  // Tax Data State
  const [taxRate, setTaxRate] = useState("15")
  const [includeTax, setIncludeTax] = useState(false)

  const [comparativeData, setComparativeData] = useState<any>(null)
  const [priceHistory, setPriceHistory] = useState<any[]>([])
  const [shareableLink, setShareableLink] = useState("")
  const [showShareModal, setShowShareModal] = useState(false)

  // Load saved calculations on mount
useEffect(() => {
  const saved = localStorage.getItem("zakatCalculations")
  if (saved) {
    setSavedCalculations(JSON.parse(saved))
  }
}, [])

  // Handle Bhori conversion
  const handleBhoriConversion = () => {
    const bhoriGold = Number.parseFloat(bhoriGoldPrice) || 0
    const bhoriSilver = Number.parseFloat(bhoriSilverPrice) || 0

    const gramsGold = bhoriGold * BHORI_TO_GRAMS
    const gramsSilver = bhoriSilver * BHORI_TO_GRAMS

    // Calculate price per gram (assuming market rate)
    const goldPerGram = 18076 // Default BDT per gram
    const silverPerGram = 850

    const newGoldPrice = gramsGold * goldPerGram
    const newSilverPrice = gramsSilver * silverPerGram

    setPriceData({
      ...priceData,
      goldPrice: newGoldPrice / BHORI_TO_GRAMS,
      silverPrice: newSilverPrice / BHORI_TO_GRAMS,
      source: "bhori",
    })
    setPriceSource("bhori")
  }

 const getNisabValueByMetal = () => {
  const goldNisabValue =
    GOLD_NISAB_GRAMS * priceData.goldPrice

  const silverNisabValue =
    SILVER_NISAB_GRAMS * priceData.silverPrice

  const school = ISLAMIC_SCHOOLS[islamicSchool]

  // Hanafi: gold OR silver (min)
  if (school.nisabType === "min") {
    return Math.min(goldNisabValue, silverNisabValue)
  }

  // Shafi, Maliki, Hanbali: gold only
  return goldNisabValue
}


  const saveCalculation = (type: CalculationType, result: number, details: string) => {
  const newCalc: SavedCalculation = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString("bn-BD"),
    type,
    result,
    details,
  }

  // Add new calculation at the beginning
  const updated = [newCalc, ...savedCalculations]

  // Keep only the latest 5 calculations
  const limited = updated.slice(0, 5)

  setSavedCalculations(limited)
  localStorage.setItem("zakatCalculations", JSON.stringify(limited))
}



///// calculator main logic

  const handleWealthCalculate = () => {
    const parsedGold = Number.parseFloat(gold) || 0
    const parsedSilver = Number.parseFloat(silver) || 0
    const parsedCash = Number.parseFloat(cash) || 0
    const parsedRealEstate = Number.parseFloat(realEstate) || 0
    const parsedStocks = Number.parseFloat(stocks) || 0
    const parsedInventory = Number.parseFloat(businessInventory) || 0
    const parsedDebts = Number.parseFloat(debts) || 0

    const goldValue = parsedGold * priceData.goldPrice
    const silverValue = parsedSilver * priceData.silverPrice
    const previousMetalsValue = goldValue + silverValue

    const totalAssets = previousMetalsValue + parsedCash + parsedRealEstate + parsedStocks + parsedInventory
    const netWealth = totalAssets - parsedDebts
    const effectiveNisab = getNisabValueByMetal()
    const isEligible = netWealth >= effectiveNisab
    const zakatRate = ISLAMIC_SCHOOLS[islamicSchool].zakatRate
    const zakatDue = isEligible ? netWealth * zakatRate : 0

    // Tax calculation
    let taxAmount = 0
    if (includeTax) {
      taxAmount = zakatDue * (Number.parseFloat(taxRate) / 100)
    }

    const result = {
      totalAssets,
      totalDebts: parsedDebts,
      netWealth,
      zakatDue,
      taxAmount,
      totalWithTax: zakatDue + taxAmount,
      isEligible,
      effectiveNisab,
      islamicSchool: ISLAMIC_SCHOOLS[islamicSchool].name,
      breakdown: {
        goldValue,
        silverValue,
        previousMetalsValue,
        cash: parsedCash,
        realEstate: parsedRealEstate,
        stocks: parsedStocks,
        inventory: parsedInventory,
      },
    }

    setWealthResult(result)
    saveCalculation("wealth", zakatDue, `সম্পদ: ${totalAssets.toLocaleString("bn-BD")} টাকা`)
  }

  const handleIncomeCalculate = () => {
    const parsedIncome = Number.parseFloat(monthlyIncome) || 0
    const parsedExpenses = Number.parseFloat(totalExpenses) || 0
    const parsedDependents = Number.parseFloat(dependents) || 0

    const dependentDeduction = parsedDependents * 5000
    const adjustedExpenses = parsedExpenses + dependentDeduction
    const netIncome = parsedIncome - adjustedExpenses
    const yearlyIncome = Math.max(netIncome, 0) * 12
    const effectiveNisab = getNisabValueByMetal()
    const isEligible = yearlyIncome >= effectiveNisab
    const zakatRate = ISLAMIC_SCHOOLS[islamicSchool].zakatRate
    const zakatDue = isEligible ? yearlyIncome * zakatRate : 0

    let taxAmount = 0
    if (includeTax) {
      const taxableIncome = yearlyIncome - effectiveNisab
      taxAmount = (taxableIncome > 0 ? taxableIncome * zakatRate : 0) * (Number.parseFloat(taxRate) / 100)
    }

    const result = {
      monthlyIncome: parsedIncome,
      monthlyExpenses: parsedExpenses,
      dependentDeduction,
      adjustedExpenses,
      netMonthly: netIncome,
      yearlyIncome,
      zakatDue,
      taxAmount,
      totalWithTax: zakatDue + taxAmount,
      isEligible,
      effectiveNisab,
      islamicSchool: ISLAMIC_SCHOOLS[islamicSchool].name,
    }

    setIncomeResult(result)
    saveCalculation("income", zakatDue, `বার্ষিক আয়: ${yearlyIncome.toLocaleString("bn-BD")} টাকা`)
  }

  const handleBusinessCalculate = () => {
    const parsedAssets = Number.parseFloat(businessAssets) || 0
    const parsedDebts = Number.parseFloat(businessDebts) || 0
    const parsedCash = Number.parseFloat(businessCash) || 0
    const parsedIncome = Number.parseFloat(businessIncome) || 0

    const totalBusiness = parsedAssets + parsedCash + parsedIncome * 12
    const netBusiness = totalBusiness - parsedDebts
    const effectiveNisab = getNisabValueByMetal()
    const isEligible = netBusiness >= effectiveNisab
    const zakatRate = ISLAMIC_SCHOOLS[islamicSchool].zakatRate
    const zakatDue = isEligible ? netBusiness * zakatRate : 0

    let taxAmount = 0
    if (includeTax) {
      taxAmount = zakatDue * (Number.parseFloat(taxRate) / 100)
    }

    const result = {
      totalAssets: totalBusiness,
      totalDebts: parsedDebts,
      netAssets: netBusiness,
      zakatDue,
      taxAmount,
      totalWithTax: zakatDue + taxAmount,
      isEligible,
      effectiveNisab,
      islamicSchool: ISLAMIC_SCHOOLS[islamicSchool].name,
      breakdown: {
        assets: parsedAssets,
        cash: parsedCash,
        income: parsedIncome * 12,
        debts: parsedDebts,
      },
    }

    setBusinessResult(result)
    saveCalculation("business", zakatDue, `ব্যবসায়িক সম্পদ: ${netBusiness.toLocaleString("bn-BD")} টাকা`)
  }

  const handleComparativeAnalysis = () => {
    const wealthZakat = wealthResult?.zakatDue || 0
    const incomeZakat = incomeResult?.zakatDue || 0
    const businessZakat = businessResult?.zakatDue || 0

    const data = [
      { name: "সম্পদ", জাকাত: Math.round(wealthZakat) },
      { name: "আয়", জাকাত: Math.round(incomeZakat) },
      { name: "ব্যবসা", জাকাত: Math.round(businessZakat) },
    ]

    const pieData = [
      { name: "সম্পদ", value: wealthZakat },
      { name: "আয়", value: incomeZakat },
      { name: "ব্যবসা", value: businessZakat },
    ]

    setComparativeData({
      barChart: data,
      pieChart: pieData.filter((item) => item.value > 0),
      totalZakat: wealthZakat + incomeZakat + businessZakat,
    })
  }




  const handleGenerateShareLink = () => {
    const data = {
      wealth: wealthResult,
      income: incomeResult,
      business: businessResult,
      school: islamicSchool,
    }
    const encoded = btoa(JSON.stringify(data))
    const link = `${window.location.origin}?share=${encoded}`
    setShareableLink(link)
    setShowShareModal(true)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
    alert("শেয়ার লিঙ্ক কপি হয়েছে!")
  }

  const handleReset = () => {
    if (activeTab === "wealth") {
      setGold("")
      setSilver("")
      setCash("")
      setRealEstate("")
      setStocks("")
      setBusinessInventory("")
      setDebts("")
      setWealthResult(null)
    } else if (activeTab === "income") {
      setMonthlyIncome("")
      setTotalExpenses("")
      setDependents("0")
      setIncomeResult(null)
    } else if (activeTab === "business") {
      setBusinessAssets("")
      setBusinessDebts("")
      setBusinessCash("")
      setBusinessIncome("")
      setBusinessResult(null)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    const data = {
      date: new Date().toLocaleDateString("bn-BD"),
      wealth: wealthResult,
      income: incomeResult,
      business: businessResult,
      goldPrice: priceData.goldPrice,
      silverPrice: priceData.silverPrice,
      islamicSchool: ISLAMIC_SCHOOLS[islamicSchool].name,
      taxIncluded: includeTax,
      taxRate: taxRate,
    }
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `জাকাত-হিসাব-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
   
      <ZakatWarning/>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Islamic School Selection */}
        <Card className="border-0 shadow-lg mb-6 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Target className="w-5 h-5" />
              ইসলামিক মাজহাব নির্বাচন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.entries(ISLAMIC_SCHOOLS) as [IslamicSchool, any][]).map(([key, school]) => (
                <button
                  key={key}
                  onClick={() => setIslamicSchool(key)}
                  className={`p-3 rounded-lg font-semibold transition ${
                    islamicSchool === key ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {school.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Control Panel */}
        <Card className="border-0 shadow-lg mb-6 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Zap className="w-5 h-5" />
              স্বর্ণ ও রূপার মূল্য ব্যবস্থাপনা
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Source Selection */}
            <div className="flex gap-3">
              <button
                onClick={() => setPriceSource("manual")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  priceSource === "manual" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ম্যানুয়াল মূল্য
              </button>
              <button
                onClick={() => setPriceSource("bhori")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  priceSource === "bhori" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ভরি হিসাব
              </button>
            </div>

            {/* Manual Price Input */}
            {priceSource === "manual" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">সোনার মূল্য (প্রতি গ্রাম)(87.48g × 7500 = ৳656,100)</label>
                  <Input
                    type="number"
                    value={priceData.goldPrice}
                     disabled
                    onChange={(e) =>
                      setPriceData({
                        ...priceData,
                        goldPrice: Number.parseFloat(e.target.value) || 0,
                        source: "manual",
                      })
                    }
                    className="p-2 border-2 border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">রূপার মূল্য (প্রতি গ্রাম)( 612g × 850 = ৳520,200  ← কম ) </label>
                  <Input
                    type="number"
                    value={priceData.silverPrice}
                    disabled
                    onChange={(e) =>
                      setPriceData({
                        ...priceData,
                        silverPrice: Number.parseFloat(e.target.value) || 0,
                        source: "manual",
                      })
                    }
                    className="p-2 border-2 border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <p className="text-xs text-emerald-700 mb-1">কার্যকর নিসাব (ক্যালেন্ডার ইয়ার)</p>
                    <p className="text-xl font-bold text-emerald-700">
                      ৳{getNisabValueByMetal().toLocaleString("bn-BD")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bhori Price Input */}
            {priceSource === "bhori" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">সোনার দাম (প্রতি ভরি)</label>
                    <Input
                      type="number"
                      placeholder="ভরিতে দাম লিখুন"
                      value={bhoriGoldPrice}
                      onChange={(e) => setBhoriGoldPrice(e.target.value)}
                      className="p-2 border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">রূপার দাম (প্রতি ভরি)</label>
                    <Input
                      type="number"
                      placeholder="ভরিতে দাম লিখুন"
                      value={bhoriSilverPrice}
                      onChange={(e) => setBhoriSilverPrice(e.target.value)}
                      className="p-2 border-2 border-gray-200 rounded-lg"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleBhoriConversion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  ভরি থেকে গ্রাম রূপান্তর করুন
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tax Settings */}
        <Card className="border-0 shadow-lg mb-6 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <Percent className="w-5 h-5" />
              ট্যাক্স সেটিংস
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="taxInclude"
                  checked={includeTax}
                  onChange={(e) => setIncludeTax(e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="taxInclude" className="text-sm font-semibold text-gray-700 cursor-pointer">
                  ট্যাক্স অন্তর্ভুক্ত করুন
                </label>
              </div>
              {includeTax && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-20 px-3 py-1 border-2 border-gray-200 rounded-lg text-sm"
                  />
                  <span className="text-sm font-semibold text-gray-700">%</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calculator Section */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CalculationType)} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 m-4 rounded-lg">
                  <TabsTrigger value="wealth" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs">সম্পদ</span>
                  </TabsTrigger>
                  <TabsTrigger value="income" className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs">আয়</span>
                  </TabsTrigger>
                  <TabsTrigger value="business" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs">ব্যবসা</span>
                  </TabsTrigger>
                  <TabsTrigger value="comparative" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs">তুলনা</span>
                  </TabsTrigger>
                </TabsList>

                {/* Wealth Tab */}
                <TabsContent value="wealth" className="p-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        কার্যকর নিসাব: 
                        ৳<span className="font-bold">{getNisabValueByMetal().toLocaleString("bn-BD")}</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">সোনা (গ্রাম)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={gold}
                          onChange={(e) => setGold(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">রূপা (গ্রাম)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={silver}
                          onChange={(e) => setSilver(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">নগদ অর্থ (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={cash}
                          onChange={(e) => setCash(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">রিয়েল এস্টেট (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={realEstate}
                          onChange={(e) => setRealEstate(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">স্টক/শেয়ার (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={stocks}
                          onChange={(e) => setStocks(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ব্যবসায়িক মালামাল (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={businessInventory}
                          onChange={(e) => setBusinessInventory(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ঋণ (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={debts}
                          onChange={(e) => setDebts(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleWealthCalculate}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        হিসাব করুন
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 rounded-lg transition bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        রিসেট
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Income Tab */}
                <TabsContent value="income" className="p-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700">বার্ষিক আয় নিসাবের উপরে হলে জাকাত দিতে হবে</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">মাসিক আয় (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={monthlyIncome}
                          onChange={(e) => setMonthlyIncome(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">মাসিক খরচ (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={totalExpenses}
                          onChange={(e) => setTotalExpenses(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">আপনার উপর নির্ভরশীল সংখ্যা</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={dependents}
                          onChange={(e) => setDependents(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleIncomeCalculate}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        হিসাব করুন
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 rounded-lg transition bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        রিসেট
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Business Tab */}
                <TabsContent value="business" className="p-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700">ব্যবসায়িক সম্পদ নিসাবের উপরে হলে জাকাত প্রদান বাধ্যতামূলক</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ব্যবসায়িক সম্পদ (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={businessAssets}
                          onChange={(e) => setBusinessAssets(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">নগদ টাকা (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={businessCash}
                          onChange={(e) => setBusinessCash(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">মাসিক ব্যবসায়িক আয় (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={businessIncome}
                          onChange={(e) => setBusinessIncome(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ব্যবসায়িক ঋণ (টাকা)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={businessDebts}
                          onChange={(e) => setBusinessDebts(e.target.value)}
                          className="p-2 border-2 border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleBusinessCalculate}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        হিসাব করুন
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 rounded-lg transition bg-transparent"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        রিসেট
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Comparative Tab */}
                <TabsContent value="comparative" className="p-6">
                  <div className="space-y-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700">সম্পদ, আয় এবং ব্যবসার জাকাত তুলনা করুন</p>
                    </div>

                    <Button
                      onClick={handleComparativeAnalysis}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      বিশ্লেষণ তৈরি করুন
                    </Button>

                    {comparativeData && (
                      <div className="space-y-6">
                        {/* Bar Chart */}
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <h3 className="text-lg font-bold text-gray-800 mb-4">জাকাত তুলনা (বার চার্ট)</h3>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={comparativeData.barChart}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => `৳${value.toLocaleString("bn-BD")}`} />
                              <Bar dataKey="জাকাত" fill="#10b981" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Pie Chart */}
                        {comparativeData.pieChart.length > 0 && (
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">জাকাত বিতরণ (পাই চার্ট)</h3>
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={comparativeData.pieChart}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={({ name, value }) => `${name}: ৳${Math.round(value).toLocaleString("bn-BD")}`}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {comparativeData.pieChart.map((_entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        )}

                        {/* Summary */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-6 text-center">
                          <p className="text-sm font-semibold mb-2">মোট জাকাত দিতে হবে</p>
                          <p className="text-4xl font-bold">
                            ৳{comparativeData.totalZakat.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Results and History Sidebar */}
          <div className="space-y-6">
            {/* Results Card */}
            {(wealthResult || incomeResult || businessResult) && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 sticky top-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-700">জাকাত ফলাফল</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wealthResult && (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">মোট সম্পদ</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ৳ {wealthResult.totalAssets.toLocaleString("bn-BD")}
                        </p>
                      </div>
                      <div className="border-t border-green-200"></div>
                      {wealthResult.isEligible ? (
                        <div className="bg-green-600 text-white rounded-lg p-4 text-center">
                          <p className="text-sm font-semibold mb-1">জাকাত দিতে হবে</p>
                          <p className="text-3xl font-bold">
                            ৳ {wealthResult.zakatDue.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                          </p>
                          {includeTax && wealthResult.taxAmount > 0 && (
                            <>
                              <p className="text-xs mt-2 opacity-90">
                                ট্যাক্স (সহ): ৳
                                {wealthResult.taxAmount.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                              </p>
                              <p className="text-sm font-bold mt-1">
                                মোট: ৳{wealthResult.totalWithTax.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                              </p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-300 text-gray-800 rounded-lg p-4 text-center">
                          <p className="text-sm font-semibold">নিসাবের নিচে</p>
                          <p className="text-sm">এই সময় জাকাত দিতে হবে না</p>
                        </div>
                      )}
                    </>
                  )}

                  {incomeResult && (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">বার্ষিক আয়</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ৳ {incomeResult.yearlyIncome.toLocaleString("bn-BD")}
                        </p>
                      </div>
                      <div className="border-t border-green-200"></div>
                      {incomeResult.isEligible ? (
                        <div className="bg-green-600 text-white rounded-lg p-4 text-center">
                          <p className="text-sm font-semibold mb-1">জাকাত দিতে হবে</p>
                          <p className="text-3xl font-bold">
                            ৳ {incomeResult.zakatDue.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                          </p>
                          {includeTax && incomeResult.taxAmount > 0 && (
                            <>
                              <p className="text-xs mt-2 opacity-90">
                                ট্যাক্স (সহ): ৳
                                {incomeResult.taxAmount.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                              </p>
                              <p className="text-sm font-bold mt-1">
                                মোট: ৳{incomeResult.totalWithTax.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                              </p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-300 text-gray-800 rounded-lg p-4 text-center">
                          <p className="text-sm font-semibold">নিসাবের নিচে</p>
                          <p className="text-sm">এই সময় জাকাত দিতে হবে না</p>
                        </div>
                      )}
                    </>
                  )}

                  {businessResult && (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">মোট ব্যবসায়িক সম্পদ</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ৳ {businessResult.totalAssets.toLocaleString("bn-BD")}
                        </p>
                      </div>
                      <div className="border-t border-green-200"></div>
                      {businessResult.isEligible ? (
                        <div className="bg-green-600 text-white rounded-lg p-4 text-center">
                          <p className="text-sm font-semibold mb-1">জাকাত দিতে হবে</p>
                          <p className="text-3xl font-bold">
                            ৳ {businessResult.zakatDue.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                          </p>
                          {includeTax && businessResult.taxAmount > 0 && (
                            <>
                              <p className="text-xs mt-2 opacity-90">
                                ট্যাক্স (সহ): ৳
                                {businessResult.taxAmount.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                              </p>
                              <p className="text-sm font-bold mt-1">
                                মোট: ৳
                                {businessResult.totalWithTax.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                              </p>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-300 text-gray-800 rounded-lg p-4 text-center">
                          <p className="text-sm font-semibold">নিসাবের নিচে</p>
                          <p className="text-sm">এই সময় জাকাত দিতে হবে না</p>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex flex-col gap-2 pt-4">
                    <Button
                      onClick={handlePrint}
                      variant="outline"
                      className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold py-2 rounded-lg transition bg-transparent"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      প্রিন্ট
                    </Button>
                    <Button
                      onClick={handleExport}
                      variant="outline"
                      className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold py-2 rounded-lg transition bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      রপ্তানি
                    </Button>
                    <Button
                      onClick={handleGenerateShareLink}
                      variant="outline"
                      className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold py-2 rounded-lg transition bg-transparent"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      শেয়ার করুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* History */}
            {savedCalculations.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-700 flex items-center gap-2">
                    <History className="w-5 h-5" />
                    ইতিহাস
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {savedCalculations.slice(0, 10).map((calc) => (
                      <div key={calc.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">{calc.date}</p>
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          {calc.type === "wealth" && "সম্পদ"}
                          {calc.type === "income" && "আয়"}
                          {calc.type === "business" && "ব্যবসা"}
                        </p>
                        <p className="text-sm font-bold text-green-600">
                          ৳ {calc.result.toLocaleString("bn-BD", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="border-0 shadow-2xl max-w-md w-full">
              <CardHeader>
                <CardTitle className="text-lg">আপনার হিসাব শেয়ার করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg break-all text-xs font-mono">{shareableLink}</div>
                <Button
                  onClick={handleCopyLink}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  লিঙ্ক কপি করুন
                </Button>
                <Button
                  onClick={() => setShowShareModal(false)}
                  variant="outline"
                  className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 rounded-lg transition bg-transparent"
                >
                  বন্ধ করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

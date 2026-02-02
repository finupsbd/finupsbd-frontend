"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GoldAndSilverCalculator from './GoldSilverCalculator';
import Link from 'next/link';
import ZakatSummaryCard from './ZakatSummaryCard';

const ZakatCalculatorNew = () => {
  const [language, setLanguage] = useState<'english' | 'bangla'>('english');
  const [values, setValues] = useState({
    // Cash & Bank
    cashAtHome: '',
    cashInBank: '',
    
    // Gold & Silver
    // goldWeight: '',
    goldValue: '',
    // silverWeight: '',
    silverValue: '',
    
    // Investments
    sharesStocks: '',
    moneyLent: '',
    
    // Business
    stockInTrade: '',
    businessCash: '',
    
    // Property
    investmentProperty: '',
    
    // Pension
    pensionCash: '',
    
    // Other Assets
    otherAssets: '',
    
    // Liabilities
    debts: '',
    outstandingBills: '',
    overdraft: '',
    creditCards: '',
    otherLiabilities: ''
  });

  const translations = {
    english: {
      title: "Zakat Calculator",
      subtitle: "Calculate your Zakat obligation",
      cashBank: "Cash & Bank",
      cashAtHome: "Cash at Home",
      cashInBank: "Cash in Bank",
      goldSilver: "Gold & Silver",
      goldWeight: "Gold (grams)",
      goldValue: "Gold Value",
      silverWeight: "Silver (grams)",
      silverValue: "Silver Value",
      investments: "Investments",
      sharesStocks: "Shares/Stocks",
      moneyLent: "Money Lent to Others",
      business: "Business Assets",
      stockInTrade: "Stock in Trade",
      businessCash: "Business Cash/Bank Balance",
      property: "Property",
      investmentProperty: "Investment Property Value",
      pension: "Pension",
      pensionCash: "Pension Lump Sum (if accessible)",
      otherAssets: "Other Assets",
      otherAssetsLabel: "Other Zakatable Assets",
      liabilities: "Liabilities (Deductions)",
      debts: "Debts (Money Owed)",
      outstandingBills: "Outstanding Bills",
      overdraft: "Overdraft",
      creditCards: "Credit Card Balance",
      otherLiabilities: "Other Liabilities",
      totalAssets: "Total Assets",
      totalLiabilities: "Total Liabilities",
      netAssets: "Net Assets",
      zakatDue: "Zakat Due (2.5%)",
      print: "Print Calculator",
      note: "Note: Zakat is obligatory if your wealth exceeds the Nisab threshold and has been held for one lunar year.",
      disclaimer: "For detailed guidance, consult with a qualified Islamic scholar."
    },
    bangla: {
      title: "যাকাত ক্যালকুলেটর",
      subtitle: "আপনার যাকাতের পরিমাণ হিসাব করুন",
      cashBank: "নগদ অর্থ ও ব্যাংক",
      cashAtHome: "বাড়িতে নগদ অর্থ",
      cashInBank: "ব্যাংকে জমাকৃত অর্থ",
      goldSilver: "স্বর্ণ ও রৌপ্য",
      goldWeight: "স্বর্ণ (গ্রাম)",
      goldValue: "স্বর্ণের মূল্য",
      silverWeight: "রৌপ্য (গ্রাম)",
      silverValue: "রৌপ্যের মূল্য",
      investments: "বিনিয়োগ",
      sharesStocks: "শেয়ার/স্টক",
      moneyLent: "অন্যকে ধার দেওয়া অর্থ",
      business: "ব্যবসায়িক সম্পদ",
      stockInTrade: "ব্যবসায়িক পণ্য মজুদ",
      businessCash: "ব্যবসায়িক নগদ/ব্যাংক ব্যালেন্স",
      property: "সম্পত্তি",
      investmentProperty: "বিনিয়োগকৃত সম্পত্তির মূল্য",
      pension: "পেনশন",
      pensionCash: "পেনশন লাম্পসাম (যদি উত্তোলনযোগ্য হয়)",
      otherAssets: "অন্যান্য সম্পদ",
      otherAssetsLabel: "যাকাতযোগ্য অন্যান্য সম্পদ",
      liabilities: "দায় (বিয়োগ)",
      debts: "ঋণ (পরিশোধযোগ্য)",
      outstandingBills: "বকেয়া বিল",
      overdraft: "ওভারড্রাফট",
      creditCards: "ক্রেডিট কার্ড ব্যালেন্স",
      otherLiabilities: "অন্যান্য দায়",
      totalAssets: "মোট সম্পদ",
      totalLiabilities: "মোট দায়",
      netAssets: "নিট সম্পদ",
      zakatDue: "যাকাতের পরিমাণ (২.৫%)",
      print: "প্রিন্ট করুন",
      note: "দ্রষ্টব্য: যদি আপনার সম্পদ নিসাব সীমা অতিক্রম করে এবং এক চন্দ্র বছর অতিক্রান্ত হয় তবেই যাকাত ফরজ।",
      disclaimer: "বিস্তারিত জানতে একজন যোগ্য ইসলামিক স্কলারের পরামর্শ নিন।"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleInputChange = (field: any, value:any) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setValues(prev => ({ ...prev, [field]: value }));
    }
  };

  const parseNumber = (value: any) => {
    return value === '' ? 0 : parseFloat(value) || 0;
  };

  const totalAssets = 
    parseNumber(values.cashAtHome) +
    parseNumber(values.cashInBank) +
    parseNumber(values.goldValue) +
    parseNumber(values.silverValue) +
    parseNumber(values.sharesStocks) +
    parseNumber(values.moneyLent) +
    parseNumber(values.stockInTrade) +
    parseNumber(values.businessCash) +
    parseNumber(values.investmentProperty) +
    parseNumber(values.pensionCash) +
    parseNumber(values.otherAssets);

  const totalLiabilities = 
    parseNumber(values.debts) +
    parseNumber(values.outstandingBills) +
    parseNumber(values.overdraft) +
    parseNumber(values.creditCards) +
    parseNumber(values.otherLiabilities);

  const jakatNisab = 199500
  const netAssets = totalAssets - totalLiabilities;



  let zakatDue = 0

  if(jakatNisab < netAssets ){
    //  zakatDue = netAssets * 0.025;
     const zakat = netAssets - jakatNisab
     zakatDue = zakat * 0.025;
  }
  


  const handlePrint = () => {
    window.print();
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 print:bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 print:mb-4">
          {/* <h1 className="text-4xl font-bold text-emerald-800 mb-2 print:text-3xl">{t.title}</h1>
          <p className="text-gray-600 print:text-sm">{t.subtitle}</p> */}
          
          <div className="mt-4 flex justify-center gap-2 print:hidden">
            <Button
              onClick={() => setLanguage('english')}
              variant={language === 'english' ? 'default' : 'outline'}
              className={language === 'english' ? 'bg-emerald-600' : ''}
            >
              English
            </Button>
            <Button
              onClick={() => setLanguage('bangla')}
              variant={language === 'bangla' ? 'default' : 'outline'}
              className={language === 'bangla' ? 'bg-emerald-600' : ''}
            >
              বাংলা
            </Button>
          </div>
        </div>

        <Card className="shadow-lg print:shadow-none">
          <CardHeader className="bg-emerald-600 text-white print:bg-emerald-700">
            {/* <CardTitle className="text-2xl print:text-xl">{t.title}</CardTitle> */}
            {/* <CardDescription className="text-emerald-50">2.5% of net assets</CardDescription> */}
            <CardDescription>
              <ZakatSummaryCard
              amount={199500}
              lastUpdated="20/01/2026"
              />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 print:p-4">
            {/* Cash & Bank */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3 pb-2 border-b-2 border-emerald-200">
                {t.cashBank}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cashAtHome" className="text-sm font-medium">{t.cashAtHome}</Label>
                  <Input
                    id="cashAtHome"
                    type="text"
                    value={values.cashAtHome}
                    onChange={(e) => handleInputChange('cashAtHome', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cashInBank" className="text-sm font-medium">{t.cashInBank}</Label>
                  <Input
                    id="cashInBank"
                    type="text"
                    value={values.cashInBank}
                    onChange={(e) => handleInputChange('cashInBank', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Gold & Silver */}
            <div className="mb-6">
            <div>
                <h2 className="text-lg font-semibold mb-3 pb-2 border-b-2 ">
                {t.goldSilver}
              </h2>
                 <Button>
                  <Link href="/finups-islamic/tools/gold-silver-calculator" target='_blank'>Gold & Silver Calculator</Link>
                </Button>
              <div>
             
            
              </div>
            </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* <div>
                  <Label htmlFor="goldWeight" className="text-sm font-medium">{t.goldWeight}</Label>
                  <Input
                    id="goldWeight"
                    type="text"
                    value={values.goldWeight}
                    onChange={(e) => handleInputChange('goldWeight', e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div> */}

                <div>
                  <Label htmlFor="goldValue" className="text-sm font-medium">{t.goldValue}</Label>
                  <Input
                    id="goldValue"
                    type="text"
                    value={values.goldValue}
                    onChange={(e) => handleInputChange('goldValue', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
{/* 
                <div>
                  <Label htmlFor="silverWeight" className="text-sm font-medium">{t.silverWeight}</Label>
                  <Input
                    id="silverWeight"
                    type="text"
                    value={values.silverWeight}
                    onChange={(e) => handleInputChange('silverWeight', e.target.value)}
                    placeholder="0"
                    className="mt-1"
                  />
                </div> */}

                <div>
                  <Label htmlFor="silverValue" className="text-sm font-medium">{t.silverValue}</Label>
                  <Input
                    id="silverValue"
                    type="text"
                    value={values.silverValue}
                    onChange={(e) => handleInputChange('silverValue', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Investments */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3 pb-2 border-b-2 border-emerald-200">
                {t.investments}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sharesStocks" className="text-sm font-medium">{t.sharesStocks}</Label>
                  <Input
                    id="sharesStocks"
                    type="text"
                    value={values.sharesStocks}
                    onChange={(e) => handleInputChange('sharesStocks', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="moneyLent" className="text-sm font-medium">{t.moneyLent}</Label>
                  <Input
                    id="moneyLent"
                    type="text"
                    value={values.moneyLent}
                    onChange={(e) => handleInputChange('moneyLent', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Business Assets */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3 pb-2 border-b-2 border-emerald-200">
                {t.business}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stockInTrade" className="text-sm font-medium">{t.stockInTrade}</Label>
                  <Input
                    id="stockInTrade"
                    type="text"
                    value={values.stockInTrade}
                    onChange={(e) => handleInputChange('stockInTrade', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="businessCash" className="text-sm font-medium">{t.businessCash}</Label>
                  <Input
                    id="businessCash"
                    type="text"
                    value={values.businessCash}
                    onChange={(e) => handleInputChange('businessCash', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Property */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3 pb-2 border-b-2 border-emerald-200">
                {t.property}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="investmentProperty" className="text-sm font-medium">{t.investmentProperty}</Label>
                  <Input
                    id="investmentProperty"
                    type="text"
                    value={values.investmentProperty}
                    onChange={(e) => handleInputChange('investmentProperty', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Pension */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3 pb-2 border-b-2 border-emerald-200">
                {t.pension}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pensionCash" className="text-sm font-medium">{t.pensionCash}</Label>
                  <Input
                    id="pensionCash"
                    type="text"
                    value={values.pensionCash}
                    onChange={(e) => handleInputChange('pensionCash', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Other Assets */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3 pb-2 border-b-2 border-emerald-200">
                {t.otherAssets}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="otherAssets" className="text-sm font-medium">{t.otherAssetsLabel}</Label>
                  <Input
                    id="otherAssets"
                    type="text"
                    value={values.otherAssets}
                    onChange={(e) => handleInputChange('otherAssets', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="my-6 p-4 bg-emerald-50 rounded-lg print:bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-emerald-900 text-lg">{t.totalAssets}:</span>
                <span className="text-2xl font-bold text-emerald-700">{totalAssets.toFixed(2)}</span>
              </div>
            </div>

            {/* Liabilities Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-red-800 mb-3 pb-2 border-b-2 border-red-200">
                {t.liabilities}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="debts" className="text-sm font-medium">{t.debts}</Label>
                  <Input
                    id="debts"
                    type="text"
                    value={values.debts}
                    onChange={(e) => handleInputChange('debts', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="outstandingBills" className="text-sm font-medium">{t.outstandingBills}</Label>
                  <Input
                    id="outstandingBills"
                    type="text"
                    value={values.outstandingBills}
                    onChange={(e) => handleInputChange('outstandingBills', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="overdraft" className="text-sm font-medium">{t.overdraft}</Label>
                  <Input
                    id="overdraft"
                    type="text"
                    value={values.overdraft}
                    onChange={(e) => handleInputChange('overdraft', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="creditCards" className="text-sm font-medium">{t.creditCards}</Label>
                  <Input
                    id="creditCards"
                    type="text"
                    value={values.creditCards}
                    onChange={(e) => handleInputChange('creditCards', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="otherLiabilities" className="text-sm font-medium">{t.otherLiabilities}</Label>
                  <Input
                    id="otherLiabilities"
                    type="text"
                    value={values.otherLiabilities}
                    onChange={(e) => handleInputChange('otherLiabilities', e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="my-6 p-4 bg-red-50 rounded-lg print:bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-red-900 text-lg">{t.totalLiabilities}:</span>
                <span className="text-2xl font-bold text-red-700">{totalLiabilities.toFixed(2)}</span>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 print:bg-gray-100 print:border-gray-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-blue-900">{t.netAssets}:</span>
                  <span className="text-2xl font-bold text-blue-700">{netAssets.toFixed(2)}</span>
                </div>
                <p className="text-sm text-blue-600">{t.totalAssets} - {t.totalLiabilities}</p>
              </div>

              <div className="p-6 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-lg border-4 border-emerald-400 print:bg-gray-200 print:border-gray-400">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-bold text-emerald-900">{t.zakatDue}:</span>
                  {zakatDue === 0 ? <span className="text-3xl font-bold text-emerald-700">NO</span> : <span className="text-3xl font-bold text-emerald-700">{zakatDue.toFixed(2)}</span> }
                </div>
              </div>

              {netAssets > 0 && (
                <Alert className="bg-amber-50 border-amber-200 print:bg-yellow-50">
                  <AlertDescription className="text-sm text-amber-800">
                    <strong>{language === 'english' ? 'Note' : 'দ্রষ্টব্য'}:</strong> {t.note}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="mt-8 flex justify-center print:hidden">
              <Button 
                onClick={handlePrint}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
              >
                {t.print}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600 print:mt-4 print:text-xs">
          <p>{t.disclaimer}</p>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculatorNew;
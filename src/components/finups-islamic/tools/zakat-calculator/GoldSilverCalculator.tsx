"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, TrendingUp, AlertTriangle, Edit2, Check, X, ExternalLink, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function GoldAndSilverCalculator() {
  const [metalType, setMetalType] = useState('gold');
  const [items, setItems] = useState([
    { id: 1, name: '', quantity: '', unit: 'gram', carat: '22' }
  ]);
  
  // Default BAJUS prices per gram - Updated January 18, 2026
  const defaultGoldPrices = {
    // '24': 20120,
    '22': 20120,
    '21': 19332,
    '18': 16560
  };
  const defaultSilverPrice = 510;
  
  const [goldPrices, setGoldPrices] = useState(defaultGoldPrices);
  const [silverPrice, setSilverPrice] = useState(defaultSilverPrice);
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const [tempPrices, setTempPrices] = useState(goldPrices);
  const [tempSilverPrice, setTempSilverPrice] = useState(silverPrice);
  const [isLoading, setIsLoading] = useState(true);

  // Load prices from storage on mount
  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = async () => {
    try {
      const goldResult = localStorage.get('gold-prices');
      const silverResult = localStorage.get('silver-price');
      
      if (goldResult?.value) {
        const savedGoldPrices = JSON.parse(goldResult.value);
        setGoldPrices(savedGoldPrices);
        setTempPrices(savedGoldPrices);
      }
      
      if (silverResult?.value) {
        const savedSilverPrice = JSON.parse(silverResult.value);
        setSilverPrice(savedSilverPrice);
        setTempSilverPrice(savedSilverPrice);
      }
    } catch (error) {
      console.log('No saved prices found, using defaults');
    } finally {
      setIsLoading(false);
    }
  };

  const savePrices = async (goldPricesData: any, silverPriceData: any) => {
    try {
       localStorage.set('gold-prices', JSON.stringify(goldPricesData));
       localStorage.set('silver-price', JSON.stringify(silverPriceData));
    } catch (error) {
      console.error('Failed to save prices:', error);
    }
  };

  const resetToDefaults = async () => {
    setGoldPrices(defaultGoldPrices);
    setSilverPrice(defaultSilverPrice);
    setTempPrices(defaultGoldPrices);
    setTempSilverPrice(defaultSilverPrice);
    await savePrices(defaultGoldPrices, defaultSilverPrice);
  };

  const addItem = () => {
    setItems([...items, { 
      id: Date.now(), 
      name: '', 
      quantity: '', 
      unit: 'gram',
      carat: metalType === 'gold' ? '22' : 'pure'
    }]);
  };

  const removeItem = (id : number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id : number, field: string, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      let quantity = parseFloat(item.quantity) || 0;
      
      // Convert vori to grams if needed
      if (item.unit === 'vori') {
        quantity = quantity * 11.664;
      }
      
      let pricePerGram;
      if (metalType === 'gold') {
        pricePerGram = goldPrices[item?.carat as keyof typeof goldPrices] || 0;
      } else {
        pricePerGram = silverPrice;
      }
      
      return total + (quantity * pricePerGram);
    }, 0);
  };

  const totalPrice = calculateTotal();
  const withDiscount = totalPrice * 0.80;

  const handleSavePrices = async () => {
    setGoldPrices(tempPrices);
    setSilverPrice(tempSilverPrice);
    await savePrices(tempPrices, tempSilverPrice);
    setIsEditingPrices(false);
  };

  const handleCancelEdit = () => {
    setTempPrices(goldPrices);
    setTempSilverPrice(silverPrice);
    setIsEditingPrices(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-slate-50 p-4 md:p-8">
      {isLoading ? (
        <div className="max-w-4xl mx-auto flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-slate-600">লোড হচ্ছে...</p>
          </div>
        </div>
      ) : (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            স্বর্ণ এবং রূপা হিসাব ক্যালকুলেটর
          </h1>
          <p className="text-slate-600">স্বর্ণ এবং রূপার বর্তমান বাজার মূল্য হিসাব করুন</p>
        </div>

        {/* Critical Warning Alert */}
        <Alert className="mb-6 border-2 border-red-500 bg-red-50">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-900 font-bold text-lg">⚠️ গুরুত্বপূর্ণ সতর্কতা</AlertTitle>
          <AlertDescription className="text-red-800 mt-2">
            <p className="font-semibold mb-2">দয়া করে সাবধানে মূল্য যাচাই করুন!</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>নিচের মূল্য <span className="font-bold">১৮ জানুয়ারী ২০২৬</span> তারিখের BAJUS অনুযায়ী</li>
              <li>প্রতিদিন মূল্য পরিবর্তন হতে পারে</li>
              <li>ক্রয়-বিক্রয়ের আগে অবশ্যই <a href="https://www.bajus.org/gold-price" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-red-600">BAJUS ওয়েবসাইট</a> থেকে আজকের মূল্য যাচাই করুন</li>
              <li>এই ক্যালকুলেটর শুধুমাত্র আনুমানিক হিসাবের জন্য</li>
            </ul>
            <div className="mt-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <a 
                href="https://www.bajus.org/gold-price" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold underline hover:text-red-600"
              >
                BAJUS অফিসিয়াল ওয়েবসাইট দেখুন
              </a>
            </div>
          </AlertDescription>
        </Alert>

        {/* Price Management Section */}
        <Card className="mb-6 border-2 border-amber-300">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <CardTitle className="text-amber-900">বর্তমান বাজার মূল্য</CardTitle>
                <CardDescription className="text-amber-700">
                  শেষ আপডেট: ১৮ জানুয়ারী ২০২৬ | প্রতি গ্রাম মূল্য পরিবর্তন করুন, ভরি স্বয়ংক্রিয় গণনা হবে
                </CardDescription>
              </div>
              <div className="flex gap-2 items-center">
              {!isEditingPrices ? (
                <Button
                  onClick={() => setIsEditingPrices(true)}
                  variant="outline"
                  className="border-amber-400 text-amber-700 hover:bg-amber-100"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  মূল্য পরিবর্তন করুন
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSavePrices}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    সংরক্ষণ
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="border-red-400 text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    বাতিল
                  </Button>
                </div>
              )}
            </div>
            <Button
              onClick={resetToDefaults}
              variant="outline"
              size="sm"
              className="border-slate-300 text-slate-600 hover:bg-slate-100"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              ডিফল্ট মূল্য পুনরুদ্ধার করুন
            </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={metalType} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="gold">স্বর্ণ</TabsTrigger>
                <TabsTrigger value="silver">রূপা</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gold">
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-amber-800 mb-2">প্রতি গ্রাম মূল্য:</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['22', '21', '18'].map((carat) => (
                      <div key={carat} className="p-4 rounded-lg bg-amber-50 border-2 border-amber-300">
                        <div className="text-sm text-amber-700 font-medium mb-1">
                          {carat} ক্যারেট
                        </div>
                        {isEditingPrices ? (
                          <Input
                            type="number"
                            value={tempPrices[carat as keyof typeof tempPrices]}
                            onChange={(e) => setTempPrices({...tempPrices, [carat]: parseFloat(e.target.value) || 0})}
                            className="text-lg font-bold border-2 border-amber-400"
                            placeholder="প্রতি গ্রাম"
                          />
                        ) : (
                          <div className="text-xl font-bold text-amber-900">
                            ৳ {goldPrices[carat as keyof typeof goldPrices]?.toLocaleString('bn-BD', {maximumFractionDigits: 2})}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm font-semibold text-amber-800 mb-2 mt-6">প্রতি ভরি মূল্য (স্বয়ংক্রিয় হিসাব):</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['22', '21', '18'].map((carat) => (
                      <div key={`vori-${carat}`} className="p-4 rounded-lg bg-amber-100 border border-amber-300">
                        <div className="text-sm text-amber-700 font-medium mb-1">
                          {carat} ক্যারেট
                        </div>
                        <div className="text-lg font-bold text-amber-900">
                          ৳ {((isEditingPrices ? tempPrices[carat as keyof typeof tempPrices] : goldPrices[carat as keyof typeof goldPrices]) * 11.664).toLocaleString('bn-BD', {maximumFractionDigits: 0})}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="silver">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border-2 border-slate-300">
                    <div className="text-sm text-slate-700 font-medium mb-1">
                      রূপা (প্রতি গ্রাম) - সম্পাদনা করুন
                    </div>
                    {isEditingPrices ? (
                      <Input
                        type="number"
                        value={tempSilverPrice}
                        onChange={(e) => setTempSilverPrice(parseFloat(e.target.value) || 0)}
                        className="text-lg font-bold border-2 border-slate-400"
                        placeholder="প্রতি গ্রাম"
                      />
                    ) : (
                      <div className="text-xl font-bold text-slate-900">
                        ৳ {silverPrice.toLocaleString('bn-BD', {maximumFractionDigits: 2})}
                      </div>
                    )}
                  </div>
                  <div className="p-4 rounded-lg bg-slate-100 border border-slate-300">
                    <div className="text-sm text-slate-600 font-medium mb-1">
                      রূপা (প্রতি ভরি) - স্বয়ংক্রিয় হিসাব
                    </div>
                    <div className="text-xl font-bold text-slate-800">
                      ৳ {((isEditingPrices ? tempSilverPrice : silverPrice) * 11.664).toLocaleString('bn-BD', {maximumFractionDigits: 0})}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {isEditingPrices && (
              <Alert className="mt-4 border-yellow-500 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 text-sm">
                  <strong>গুরুত্বপূর্ণ:</strong> প্রতি গ্রাম মূল্য পরিবর্তন করুন, ভরির মূল্য স্বয়ংক্রিয়ভাবে হিসাব হবে (১ ভরি = ১১.৬৬৪ গ্রাম)। BAJUS ওয়েবসাইট থেকে সঠিক মূল্য যাচাই করুন। সংরক্ষণ করলে মূল্য স্থায়ীভাবে সংরক্ষিত হবে।
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Calculator Section */}
        <Tabs value={metalType} onValueChange={setMetalType}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="gold" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-yellow-500">
              স্বর্ণ হিসাব
            </TabsTrigger>
            <TabsTrigger value="silver" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-400 data-[state=active]:to-slate-500">
              রূপা হিসাব
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gold">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                <CardTitle className="text-amber-900">স্বর্ণের মূল্য হিসাব</CardTitle>
                <CardDescription className="text-amber-700">
                  বর্তমান হারে স্বর্ণের মূল্যের ৮০% ধরে নেওয়া হবে
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="col-span-12 md:col-span-3">
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          পণ্যের নাম:
                        </label>
                        <Input
                          placeholder="লিখুন"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          className="border-slate-300"
                        />
                      </div>
                      
                      <div className="col-span-6 md:col-span-3">
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          একক:
                        </label>
                        <Select
                          value={item.unit}
                          onValueChange={(value) => updateItem(item.id, 'unit', value)}
                        >
                          <SelectTrigger className="border-slate-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gram">গ্রাম</SelectItem>
                            <SelectItem value="vori">ভরি</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-6 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          ক্যারেট:
                        </label>
                        <Select
                          value={item.carat}
                          onValueChange={(value) => updateItem(item.id, 'carat', value)}
                        >
                          <SelectTrigger className="border-slate-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24">২৪</SelectItem>
                            <SelectItem value="22">২২</SelectItem>
                            <SelectItem value="21">২১</SelectItem>
                            <SelectItem value="18">১৮</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-10 md:col-span-3">
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          পরিমাণ:
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          className="border-slate-300"
                        />
                      </div>

                      <div className="col-span-2 md:col-span-1 flex items-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={addItem}
                    variant="outline"
                    className="w-full border-dashed border-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    আরও যোগ করুন
                  </Button>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center text-lg p-3 bg-amber-50 rounded-lg">
                    <span className="font-medium text-amber-900">মোট মূল্য:</span>
                    <span className="font-bold text-amber-700">৳ {totalPrice.toLocaleString('bn-BD', {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl p-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg border-2 border-amber-300">
                    <span className="font-semibold text-amber-900">বিক্রয় মূল্য (৮০%):</span>
                    <span className="font-bold text-2xl text-amber-700">৳ {withDiscount.toLocaleString('bn-BD', {maximumFractionDigits: 0})} (টাকা)</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white text-lg py-6">
                  বিক্রয় মূল্য নিশ্চিত করুন
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="silver">
            <Card className="border-slate-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <CardTitle className="text-slate-900">রূপার মূল্য হিসাব</CardTitle>
                <CardDescription className="text-slate-700">
                  বর্তমান হারে রূপার মূল্যের ৮০% ধরে নেওয়া হবে
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="col-span-12 md:col-span-4">
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          পণ্যের নাম:
                        </label>
                        <Input
                          placeholder="লিখুন"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          className="border-slate-300"
                        />
                      </div>
                      
                      <div className="col-span-6 md:col-span-3">
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          একক:
                        </label>
                        <Select
                          value={item.unit}
                          onValueChange={(value) => updateItem(item.id, 'unit', value)}
                        >
                          <SelectTrigger className="border-slate-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gram">গ্রাম</SelectItem>
                            <SelectItem value="vori">ভরি</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-4 md:col-span-4">
                        <label className="text-sm font-medium text-slate-700 mb-1 block">
                          পরিমাণ:
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          className="border-slate-300"
                        />
                      </div>

                      <div className="col-span-2 md:col-span-1 flex items-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={addItem}
                    variant="outline"
                    className="w-full border-dashed border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    আরও যোগ করুন
                  </Button>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center text-lg p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-900">মোট মূল্য:</span>
                    <span className="font-bold text-slate-700">৳ {totalPrice.toLocaleString('bn-BD', {maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl p-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg border-2 border-slate-300">
                    <span className="font-semibold text-slate-900">বিক্রয় মূল্য (৮০%):</span>
                    <span className="font-bold text-2xl text-slate-700">৳ {withDiscount.toLocaleString('bn-BD', {maximumFractionDigits: 0})} (টাকা)</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white text-lg py-6">
                  বিক্রয় মূল্য নিশ্চিত করুন
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      )}
    </div>
  );
}
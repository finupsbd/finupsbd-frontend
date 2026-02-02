"use client";

import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ZakatWarning() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 text-white py-10 px-4 text-center shadow-2xl">
        <h1 className="text-5xl font-bold mb-3">আপনার যাকাত সহজেই হিসাব করুন</h1>
        <p> আপনার যাকাতের হিসাব বের করার জন্য ধারাবাহিকভাবে সংশ্লিষ্ট ঘরগুলো বুঝে
          যত্নের সাথে পূরণ করুন। কোনো বিষয় না বুঝে পূরণ করবেন না। এতে যাকাতের
          প্রকৃত হিসাব করা সম্ভব হবে না।</p>
        <p className="text-lg opacity-95 font-semibold">অত্যাধুনিক হিসাব - সম্পদ, আয়, ব্যবসা, ট্যাক্স এবং তুলনামূলক বিশ্লেষণ

        </p>
      </div>
      <Card className="max-w-7xl mx-auto border-destructive/40 shadow-sm mt-2">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <CardTitle className="text-destructive text-lg font-semibold">
            সতর্কতাবাণী
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground space-y-3">
          <p>
            যাকাত একটি ফরয ইবাদত। সুক্ষ ও যথাযথভাবে যাকাত হিসাব করা যাকাত প্রদানকারী
            প্রত্যেকের কর্তব্য। এই ওয়েবসাইটটি যাকাত হিসাব কার্যে সহায়তাকারী মাত্র।
            এটি চূড়ান্ত নির্ভূল হিসাবের নিশ্চয়তা প্রদানকারী নয়।
          </p>
          <p>
            কেননা চূড়ান্তভাবে সঠিক হিসাব করার জন্য সঠিকভাবে তথ্য প্রদান করা ও ইনপুট
            দেওয়া আবশ্যক। সুতরাং ভুল তথ্য প্রদানের কারণে যাকাতের হিসাব ভুল হলে সেটি
            এককভাবে এই সার্ভিস ব্যবহারকারীর উপর বর্তাবে। আস-সুন্নাহ ফাউন্ডেশন এ
            সংক্রান্ত কোন ভুলের দায়ভার গ্রহণ করবে না।
          </p>
          <p>
            আমাদের পরামর্শ হলো, এই ক্যালকুলেটর এর মাধ্যমে প্রাথমিকভাবে যাকাতের হিসাব
            নির্ণয় করার পর সেটির যথার্থতা নিশ্চিত হওয়ার জন্য, এটি ব্যবহারকারী যেন কোন
            অভিজ্ঞ মুফতি সাহেবের শরণাপন্ন হয়ে হিসাবটি যাচাই করে নেন। এক্ষেত্রে আইএফএ
            কনসালটেন্সির যাকাত ক্যালকুলেশন সার্ভিস গ্রহণের মাধ্যমেও ব্যক্তি তার যাকাত
            হিসাবের নির্ভুলতা নিশ্চিত করতে পারেন।
          </p>
          <p className="text-red-600 text-xl"> এই ফরমের কোনো তথ্য সংরক্ষণ কিংবা পর্যবেক্ষণ করা হয় না।</p>
        </CardContent>
      </Card>
    </>
  );
}

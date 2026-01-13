import { Card, CardContent } from "@/components/ui/card";

export default function ZakatHeader() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      <Card className="border-muted shadow-sm">
        <CardContent className="space-y-4 p-6">
          {/* Headline */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground">
            আপনার যাকাত সহজেই হিসাব করুন
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify">
            আপনার যাকাতের হিসাব বের করার জন্য ধারাবাহিকভাবে সংশ্লিষ্ট ঘরগুলো বুঝে
            যত্নের সাথে পূরণ করুন। কোনো বিষয় না বুঝে পূরণ করবেন না। এতে যাকাতের
            প্রকৃত হিসাব করা সম্ভব হবে না।
          </p>

          {/* <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify">
            কোনো বিষয় বুঝতে অসুবিধা হলে{" "}
            <span className="font-semibold text-foreground">
              018987-73802 (WhatsApp)
            </span>{" "}
            নম্বরে যোগাযোগ করতে পারেন। আমাদের নির্ধারিত আলেমগণ আপনার প্রশ্নের
            কুরআন-সুন্নাহ ভিত্তিক উত্তর দেবেন।
          </p> */}
        </CardContent>
      </Card>
    </section>
  );
}

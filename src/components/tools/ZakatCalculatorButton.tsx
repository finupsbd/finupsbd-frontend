"use client";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFinupsMode } from "@/store/finups/useFinupsMode";
import Link from "next/link";

const ZakatCalculatorButton = () => {



  return (
    <div
      className={`fixed right-0 top-[75%] z-50 origin-top-right rotate-90 cursor-pointer rounded-bl-md bg-gradient-to-br from-blue-600 to-blue-500 px-6 py-2 text-sm font-semibold tracking-wider text-white shadow-xl transition-all hover:scale-105 hover:brightness-110 lg:text-base xl:top-1/2`}
      title="View Zakat Calculator"
    >
      <Link href="/finups-islamic/tools/zakat-calculator">
        <span className="inline-block">💸 Zakat Calculator</span>
      </Link>
    </div>
  );
};

export default ZakatCalculatorButton;



      // <Dialog>
      //   {/* <DialogTrigger>
      //     <span className="inline-block">💸 Zakat Calculator</span>
      //   </DialogTrigger> */}
      //   <DialogContent
      //     className="mt-24 w-full lg:max-w-3xl"
      //     onInteractOutside={(e) => {
      //       e.preventDefault();
      //     }}
      //   >
      //     <DialogHeader className="">
      //       <DialogTitle className="mb-2 text-center text-3xl font-bold tracking-tight">
      //         Zakat Calculator
      //       </DialogTitle>
      //       <DialogDescription className="mx-auto max-w-lg text-center text-sm text-muted-foreground">
      //           Easily calculate your monthly loan installment based on the
      //         disbursement date, loan amount, interest rate, and loan period.
      //       </DialogDescription>
      //     </DialogHeader>
      //     <div className="h-[70%] overflow-y-auto lg:h-auto lg:overflow-visible">
      //       {/* <EmiCalculator /> */}
      //     </div>
      //   </DialogContent>
      // </Dialog>
"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui
import Image from "next/image";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image as PDFImage,
} from "@react-pdf/renderer";
import { TAgreementDoc } from "@/types/applications";


try {
  Font.register({
    family: "NotoSansBengali",
    fonts: [
      { src: "/fonts/NotoSansBengali-Regular.ttf" },
      { src: "/fonts/NotoSansBengali-Bold.ttf", fontWeight: "bold" },
    ],
  });
} catch { }

/* -------------------- Types -------------------- */
export type LetterData = {
  logoUrl?: string;
  bankName: string;
  title: string;
  subTitle?: string;
  customerName: string;
  addressLines: string;
  accountNo?: string;
  nid?: string;
  sanctionRef?: string;
  sanctionDate: string;
  productName: string;
  loanAmount: string;
  interestRate: string;
  tenureMonths: string;
  emi: string;
  purpose: string;
  disbursementDate: string;
  expiryDate: string;
  fees: { label: string; value: string }[];
  notes: string[];
  terms: string;
  leftSignerLabel?: string;
  rightSignerLabel?: string;
};


/* -------------------- Helpers -------------------- */
const formatBDT = (v: number | string) => {
  const num = typeof v === "string" ? Number(v) : v;
  if (!isFinite(Number(num))) return String(v);
  return `BDT ${Number(num).toLocaleString("en-US")}`;
};

const formatPercent = (v: string | number) =>
  `${typeof v === "number" ? v : Number(v)}%`;

const formatDate = (iso: string | Date) => {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (isNaN(d?.getTime())) return String(iso);
  // 18-Jul-2023 style
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(d)
    .replace(/ /g, "-");
};


const purposeFromLoanType = (loanType: string): string => {
  switch (loanType) {
    case "INSTANT_LOAN":
    case "PERSONAL_LOAN":
      return "ভোক্তা ঋণ";
    case "SME_LOAN":
      return "এসএমই ঋণ";
    case "HOME_LOAN":
      return "গৃহঋণ";
    case "AUTO_LOAN":
      return "অটো ঋণ";
    default:
      return "ভোক্তা ঋণ";
  }
};




/* -------------------- Mapper: ApplicationData -> LetterData -------------------- */
const toLetterData = (app: TAgreementDoc): LetterData => {
  const sanctionDate = formatDate(app.applicationDate);
  const expiryDate = formatDate(app.dueDate);
  const purpose = purposeFromLoanType(app.loanType);

  return {
    logoUrl: "/logo-lg.png",
    bankName: "Finups Agrim",
    title: "Arrangement Letter",
    subTitle: "Customer Copy",
    customerName: app.fullName,
    addressLines: app.presrntAddress,
    accountNo: app.applicationId,
    nid: app.nid,
    sanctionRef: `FINUPS/${app.loanType}/${app.applicationId}`,
    sanctionDate,
    productName: `আপনার অনুরোধক্রমে ‘${app.loanName}’ এর পরিমাণ`,
    loanAmount: formatBDT(app.requstedAmount),
    interestRate: formatPercent(app.interestRate),
    tenureMonths: String(app.periodMonths ?? app.loanTenure ?? ""),
    emi: formatBDT(app.monthlyEMI),
    purpose,
    // If you have a true disbursement date, put it here. Using applicationDate as fallback:
    disbursementDate: sanctionDate,
    expiryDate,
    fees: [
      { label: "মোবাইল ব্যাংকিং প্রসেসিং ফি", value: "BDT – as per policy" },
      { label: "স্ট্যাম্প ডিউটি", value: "BDT 100/-" },
      { label: "ডিসবার্সমেন্ট চার্জ", value: "BDT – policy" },
      { label: "অন্যান্য চার্জ (ব্যাংকের নীতি অনুযায়ী)", value: "যথাযথ" },
      {
        label: "প্রসেসিং ফি",
        value:
          app.processingFee && !isNaN(Number(app.processingFee))
            ? `${app.processingFee}% (ঋণের পরিমাণের উপর)`
            : "নীতি অনুযায়ী",
      },
    ],
    notes: [
      `আপনার মাসিক কিস্তি পরিবর্তনশীল হতে পারে (প্রত্যাশিত EMI: ${formatBDT(app.monthlyEMI)}).`,
      "সরকারি কর বা অন্যান্য প্রযোজ্য চার্জ কিস্তির সাথে প্রযোজ্য হবে।",
      "ঋণের পরিমাণ, সুদহার ও মেয়াদ ব্যাংকের নীতিমালা অনুসারে।",
    ],
    terms:
      "ব্যাংকের মোবাইল অ্যাপ/ডিজিটাল চ্যানেলের মাধ্যমে আপনার ঋণ আবেদন, প্রয়োজনীয় যাচাই-বাছাই এবং অনুমোদিত নীতিমালা মেনে ঋণ প্রসেস করা হয়েছে। কিস্তি সময়মতো পরিশোধে ব্যর্থ হলে প্রযোজ্য চার্জ/দণ্ড আরোপ হতে পারে। এই চিঠি এবং শর্তাবলী ব্যাংকের যে কোন সময়ে পরিবর্তন সাপেক্ষ।",
    leftSignerLabel: "অনুমোদিত স্বাক্ষর",
    rightSignerLabel: "অনুমোদিত স্বাক্ষর",
  };
};


/* -------------------- PDF Styles (unchanged) -------------------- */
const pdfStyles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: "NotoSansBengali",
    fontSize: 10,
    lineHeight: 1.4,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between" },
  bankBlock: { flexDirection: "row", alignItems: "center" },
  bankName: { fontSize: 16, fontWeight: "bold", marginLeft: 6 },
  box: {
    border: 1,
    borderColor: "#000",
    padding: 6,
    width: 240,
    textAlign: "center",
  },
  boxTitle: { fontSize: 11, fontWeight: "bold" },
  boxSub: { fontSize: 9 },
  hr: { height: 1, backgroundColor: "#000", marginVertical: 8 },
  smallRow: { fontSize: 9, marginTop: 4 },
  sectionTitle: { fontWeight: "bold", marginVertical: 6 },
  table: { border: 1, borderColor: "#111" },
  tr: { flexDirection: "row" },
  th: {
    flex: 1,
    backgroundColor: "#efefef",
    borderRight: 1,
    borderColor: "#111",
    padding: 6,
    fontWeight: "bold",
    textAlign: "center",
  },
  td: { flex: 1, borderRight: 1, borderColor: "#111", padding: 6 },
  tdCenter: { textAlign: "center" },
  tdLast: { borderRight: 0 },
  list: { marginTop: 6, marginLeft: 10 },
  listItem: { marginBottom: 2 },
  signRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  signBox: { width: 180, textAlign: "center" },
});

/* -------------------- PDF Component (unchanged layout) -------------------- */
const LetterPDF: React.FC<{ data: LetterData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page} wrap>
      {/* Header */}
      <View style={pdfStyles.headerRow}>
        <View style={pdfStyles.bankBlock}>
          {data.logoUrl ? (
            <PDFImage src={data.logoUrl} style={{ width: 28, height: 28 }} />
          ) : null}
          <Text style={pdfStyles.bankName}>{data.bankName}</Text>
        </View>
        <View style={pdfStyles.box}>
          <Text style={pdfStyles.boxTitle}>{data.title}</Text>
          {data.subTitle ? (
            <Text style={pdfStyles.boxSub}>{data.subTitle}</Text>
          ) : null}
        </View>
      </View>

      <View style={pdfStyles.hr} />

      {/* To/Address */}
      <Text style={{ fontWeight: "bold" }}>{data.customerName}</Text>
      {/* {data.addressLines.map((line, i) => (
        <Text key={i}>{line}</Text>
      ))} */}
      <Text>{data.addressLines}</Text>
      {/* Meta rows */}
      <View style={{ marginTop: 8 }}>
        <Text style={pdfStyles.smallRow}>
          স্যানকশন রেফারেন্স: {data.sanctionRef ?? "—"}
        </Text>
        <Text style={pdfStyles.smallRow}>তারিখ: {data.sanctionDate}</Text>
        {data.accountNo ? (
          <Text style={pdfStyles.smallRow}>
            গ্রাহক আবেদন আইডি: {data.accountNo}
          </Text>
        ) : null}
        {data.nid ? (
          <Text style={pdfStyles.smallRow}>জাতীয় পরিচয়পত্র: {data.nid}</Text>
        ) : null}
      </View>

      {/* Product line */}
      <View style={{ marginTop: 10 }}>
        <Text>
          {data.productName} {data.loanAmount} (
          {/* Use Bangla words from dynamic data if available */}
          {/* NOTE: The DOM component also mirrors this logic below. */}
          {/* We only pass a single combined string here, so keep it as-is */}
          {/** This line just displays what was computed in productName+loanAmount; the actual "in words" is appended below in DOM and here combined for parity */}
          {/** If you want to explicitly show "in words" here too, add another Text line using the words. */}
          {/* Keeping consistent with your original layout: show words inline */}
          {/* We'll assume the caller already appended the (Bangla words) into productName or provide here: */}
          {/* For PDF we’ll keep words in a separate Text below for consistency */}
          )
        </Text>
      </View>

      {/* Summary Table */}
      <View style={{ marginTop: 10 }}>
        <Text style={pdfStyles.sectionTitle}>ঋণের সারসংক্ষেপ</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tr}>
            <Text style={pdfStyles.th}>ঋণের পরিমাণ</Text>
            <Text style={pdfStyles.th}>সুদের হার</Text>
            <Text style={pdfStyles.th}>ঋণের মেয়াদ (মাস)</Text>
            <Text style={pdfStyles.th}>ইএমআই/মাসিক কিস্তি</Text>
            <Text style={[pdfStyles.th, pdfStyles.tdLast]}>
              ঋণ সুবিধার উদ্দেশ্য
            </Text>
          </View>
          <View style={pdfStyles.tr}>
            <Text style={[pdfStyles.td, pdfStyles.tdCenter]}>
              {data.loanAmount}
            </Text>
            <Text style={[pdfStyles.td, pdfStyles.tdCenter]}>
              {data.interestRate}
            </Text>
            <Text style={[pdfStyles.td, pdfStyles.tdCenter]}>
              {data.tenureMonths}
            </Text>
            <Text style={[pdfStyles.td, pdfStyles.tdCenter]}>{data.emi}</Text>
            <Text
              style={[pdfStyles.td, pdfStyles.tdLast, pdfStyles.tdCenter]}
            >
              {data.purpose}
            </Text>
          </View>
        </View>
      </View>

      {/* Dates & Fees */}
      <View style={{ marginTop: 10 }}>
        <Text>
          পরিশোধ শুরুর সম্ভাব্য তারিখ: {data.disbursementDate} | মেয়াদপূর্তির
          তারিখ: {data.expiryDate}
        </Text>
        <View style={[pdfStyles.table, { marginTop: 6 }]}>
          <View style={pdfStyles.tr}>
            <Text style={[pdfStyles.th, { width: 260 }]}>ফি/চার্জ</Text>
            <Text style={[pdfStyles.th, pdfStyles.tdLast]}>পরিমাণ/নীতি</Text>
          </View>
          {data.fees.map((f, idx) => (
            <View key={idx} style={pdfStyles.tr}>
              <Text style={[pdfStyles.td, { width: 260 }]}>{f.label}</Text>
              <Text style={[pdfStyles.td, pdfStyles.tdLast]}>{f.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Notes */}
      <View style={{ marginTop: 8 }}>
        <Text style={pdfStyles.sectionTitle}>আপনার প্রতি গুরুত্বপূর্ণ নোটিস</Text>
        <View style={pdfStyles.list}>
          {data.notes.map((n, i) => (
            <Text key={i} style={pdfStyles.listItem}>
              • {n}
            </Text>
          ))}
        </View>
      </View>

      {/* Terms */}
      <View style={{ marginTop: 8 }}>
        <Text style={pdfStyles.sectionTitle}>শর্তাবলী:</Text>
        <Text>{data.terms}</Text>
      </View>

      {/* Signatures */}
      <View style={pdfStyles.signRow}>
        <View style={pdfStyles.signBox}>
          <Text>________________________</Text>
          <Text>{data.leftSignerLabel ?? ""}</Text>
        </View>
        <View style={pdfStyles.signBox}>
          <Text>________________________</Text>
          <Text>{data.rightSignerLabel ?? ""}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

/* -------------------- DOM Component (unchanged layout, words fixed) -------------------- */
const LetterDOM: React.FC<{ data: LetterData; amountWords?: string }> = ({
  data,
  amountWords,
}) => {
  return (
    <div className="mx-auto w-[794px] bg-white p-6 shadow-sm border rounded-md print:w-full print:shadow-none">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            {data.logoUrl ? (
              <Image src={data.logoUrl} alt="bank logo" width={150} height={150} />
            ) : null}
          </div>
          <h1 className="text-lg font-bold tracking-wide">{data.bankName}</h1>
        </div>
        <div className="border text-center px-4 py-2 w-64">
          <div className="text-sm font-semibold">{data.title}</div>
          {data.subTitle ? <div className="text-xs">{data.subTitle}</div> : null}
        </div>
      </div>

      <hr className="border-black my-3" />

      {/* To/Address */}
      <div className="text-sm leading-6">
        <div className="font-semibold">{data.customerName}</div>
        <div>{data.addressLines}</div>
        {/* {data.addressLines.map((l, i) => (
          <div key={i}>{l}</div>
        ))} */}
      </div>

      {/* Meta */}
      <div className="mt-3 grid grid-cols-2 gap-1 text-xs">
        <div>স্যানকশন রেফারেন্স: {data.sanctionRef ?? "—"}</div>
        <div className="text-right">তারিখ: {data.sanctionDate}</div>
        {data.accountNo ? <div>গ্রাহক আবেদন আইডি: {data.accountNo}</div> : null}
        {data.nid ? <div className="text-right">জাতীয় পরিচয়পত্র: {data.nid}</div> : null}
      </div>

      {/* Product */}
      <p className="mt-3 text-sm">
        {data.productName} <b>{data.loanAmount}</b>{" "}
        {amountWords ? <span>({amountWords})</span> : null}
      </p>

      {/* Summary Table */}
      <div className="mt-3">
        <div className="font-semibold mb-1 text-sm">ঋণের সারসংক্ষেপ</div>
        <div className="border">
          <div className="grid grid-cols-5 bg-gray-100 text-center text-[12px] font-semibold">
            <div className="border-r p-2">ঋণের পরিমাণ</div>
            <div className="border-r p-2">সুদের হার</div>
            <div className="border-r p-2">ঋণের মেয়াদ (মাস)</div>
            <div className="border-r p-2">ইএমআই/মাসিক কিস্তি</div>
            <div className="p-2">ঋণ সুবিধার উদ্দেশ্য</div>
          </div>
          <div className="grid grid-cols-5 text-center text-[12px]">
            <div className="border-r p-2">{data.loanAmount}</div>
            <div className="border-r p-2">{data.interestRate}</div>
            <div className="border-r p-2">{data.tenureMonths}</div>
            <div className="border-r p-2">{data.emi}</div>
            <div className="p-2">{data.purpose}</div>
          </div>
        </div>
      </div>

      {/* Dates & Fees */}
      <div className="mt-3 text-[12px]">
        <div>
          পরিশোধ শুরুর সম্ভাব্য তারিখ: {data.disbursementDate} | মেয়াদপূর্তির তারিখ: {data.expiryDate}
        </div>
        <div className="border mt-2">
          <div className="grid grid-cols-2 bg-gray-100 font-semibold text-center">
            <div className="border-r p-2">ফি/চার্জ</div>
            <div className="p-2">পরিমাণ/নীতি</div>
          </div>
          {data.fees.map((f, i) => (
            <div key={i} className="grid grid-cols-2 text-left text-[12px]">
              <div className="border-r p-2">{f.label}</div>
              <div className="p-2">{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mt-3">
        <div className="font-semibold text-sm">আপনার প্রতি গুরুত্বপূর্ণ নোটিস</div>
        <ul className="list-disc ml-6 text-[12px] mt-1">
          {data.notes.map((n, i) => (
            <li key={i} className="mb-1">
              {n}
            </li>
          ))}
        </ul>
      </div>

      {/* Terms */}
      <div className="mt-3 text-[12px]">
        <div className="font-semibold mb-1">শর্তাবলী:</div>
        <p>{data.terms}</p>
      </div>

      {/* Signatures */}
      <div className="flex justify-between mt-10 text-center text-sm">
        <div className="w-56">
          <div className="border-t pt-1">{data.leftSignerLabel ?? ""}</div>
        </div>
        <div className="w-56">
          <div className="border-t pt-1">{data.rightSignerLabel ?? ""}</div>
        </div>
      </div>
    </div>
  );
};


/* -------------------- Page Component -------------------- */
export default function ArrangementLetter({ applicationData }: { applicationData: TAgreementDoc }) {

  const data = toLetterData(applicationData);
  // Provide amount-in-words to DOM for the parenthesis after amount:
  const amountWords =
    applicationData.loanAmountInBangla ||
    applicationData.loanAmountInWord ||
    undefined;

  return (
    <div className="min-h-screen bg-muted/40 py-8">
      <div className="mx-auto max-w-[820px] px-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Finups Arrangement Letter (Preview)</h2>
          {/* <PDFDownloadLink
            document={<LetterPDF data={data} />}
            fileName={`banking-arrangement-letter-${Date.now()}.pdf`}
          >
            {({ loading }) => (
              <Button size="sm" variant="default">
                {loading ? "Preparing..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink> */}
        </div>

        <LetterDOM data={data} amountWords={amountWords} />

        {/* Optional: print to PDF via browser */}
        <div className="mt-3 flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            Print / Save as PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

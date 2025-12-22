import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/providers/Providers";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "sonner";
import "./globals.css";
import FinupsThemeSync from "@/components/sheared/FinupsThemeSync";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "FinupsBD",
  description:
    "Brief info about FinupsBD and its mission to empower financial decisions in Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en"  data-arp="" >
        <body className={`${inter.variable} antialiased`}>
          <Toaster position="top-center" richColors />
           <FinupsThemeSync />
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </html>
    </Providers>
  );
}

"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"; // shadcn helper
import Image from "next/image";
import * as React from "react";
import whatsapp_icon from "/public/icons/whatsapp-icon.gif";

type Props = {
  phone: string; // e.g. "8801531297879"
  message?: string; // preset message (optional)
  position?: "fixed" | "absolute";
  className?: string;
  ariaLabel?: string;
};

export default function WhatsAppFloatButton({
  phone,
  message,
  position = "fixed",
  className,
  ariaLabel = "Chat on WhatsApp",
}: Props) {
  const href = React.useMemo(() => {
    const base = `https://wa.me/${phone}`;
    if (!message) return base;
    return `${base}?text=${encodeURIComponent(message || "")}`;
  }, [phone, message]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={cn(
              position === "fixed" ? "fixed" : "absolute",
              // ✅ Safe-area padding + LEFT alignment
              "right-[calc(env(safe-area-inset-right,0)+16px)] bottom-[calc(env(safe-area-inset-bottom,0)+16px)]",
              // ✅ On md+ screens, use normal spacing
              "md:right-5 md:bottom-10",
              // Look & feel

              // subtle pulse ring
              "after:absolute after:inset-0 after:rounded-full after:bg-[#43C556]/30 after:content-[''] motion-safe:after:animate-[ping_2s_ease-in-out_infinite]",
              className,
            )}
          >
            {/* WhatsApp SVG */}
            <Image
              src={whatsapp_icon}
              alt="WhatsApp Icon"
              className="h-20 w-20 z-50"
            />
          </a>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-foreground text-background">
          WhatsApp
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

"use client";

import { useFinupsMode } from "@/store/finups/useFinupsMode";
import { useEffect } from "react";
import { toast } from "sonner";


export default function FinupsThemeSync() {
    const { mode } = useFinupsMode();

    useEffect(() => {
        document.documentElement.setAttribute("data-finups", mode);
        toast.success(mode === "GENERAL" ? "Finups General Mode Activated" : "Finups Islamic Mode Activated" )
    }, [mode]);

    return null;
}

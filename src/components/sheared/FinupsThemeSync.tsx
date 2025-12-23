"use client";

import { useFinupsMode } from "@/store/finups/useFinupsMode";
import { useEffect } from "react";
import { toast } from "sonner";


export default function FinupsThemeSync() {
    const { mode } = useFinupsMode();

    useEffect(() => {
        document.documentElement.setAttribute("data-finups", mode);
       if(mode === "ISLAMIC") {
        toast.success("Switched to Finups Islamic Mode");
       } 
    }, [mode]);

    return null;
}

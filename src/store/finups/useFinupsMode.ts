import { create } from "zustand";
import { persist } from "zustand/middleware";


type FinupsMode = "ISLAMIC" | "GENERAL";

interface FinupsModeState {
  mode: FinupsMode;
  setIslamic: () => void;
  setGeneral: () => void;
  toggleMode: () => void;
}



export const useFinupsMode = create<FinupsModeState>()(
  persist( (set, get) => ({
      mode: "GENERAL", // default

      setIslamic: () => set({ mode: "ISLAMIC" }),
      setGeneral: () => set({ mode: "GENERAL" }),

      toggleMode: () =>
        set({
          mode: get().mode === "GENERAL" ? "ISLAMIC" : "GENERAL",
        }),
    }),
    {
      name: "finups-mode", // stored in localStorage
    }
  )
);

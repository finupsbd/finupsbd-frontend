"use client";

import { Switch } from "@/components/ui/switch";
import { useFinupsMode } from "@/store/finups/useFinupsMode";
import { useRouter } from "next/navigation";


export default function FinupsModeToggle() {
  const { mode, toggleMode } = useFinupsMode();
  const router = useRouter();

  const isGeneral = mode === "GENERAL"
  const handleToggle = () => {
    toggleMode();
    router.push(isGeneral ? "/finups-islamic" : "/");
  };

  return (
    <div className="flex items-center gap-4 rounded-md border px-2 w-fit text-sm">
      <Switch
        id="finups-mode"
        checked={!isGeneral}
        onCheckedChange={handleToggle}
        className={
          !isGeneral
            ? "data-[state=checked]:bg-primary"
            : "data-[state=unchecked]:bg-primary"
        }
      />

      <h4 className={!isGeneral ? "font-semibold" : "text-muted-foreground"}>
        Finups Islamic
      </h4>
    </div>
  );
}
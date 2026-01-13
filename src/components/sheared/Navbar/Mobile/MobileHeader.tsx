import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import SiteLogo from "../../SiteLogo";
import MobileMenuContent from "./MobileMenuContent";
import UserLogin from "./UserLogin";
import FinupsModeToggle from "../../FinupsModeToggle";



const MobileHeader = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-2">
      <div className="w-2/12">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              aria-label="Open menu"
              className="h-12 p-0 px-2 [&_svg]:size-8"
            >
              <AlignJustify />
            </Button>
          </SheetTrigger>
          <MobileMenuContent />
        </Sheet>
      </div>
      <div className="w-8/12 text-center">
        <SiteLogo className="mx-auto w-52" />
      </div>
          <FinupsModeToggle />
      <div className="flex w-3/12 flex-col">
        <UserLogin />
      </div>
    </div>
  );
};

export default MobileHeader;

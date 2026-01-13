"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";
import { LogIn, User } from "lucide-react";
import Link from "next/link";
import MobileUserProfileMenu from "./UserProfileMenu";
import { use, useEffect } from "react";

const UserLogin = () => {

  const { user, setIsLoading } = useUser();



  return (
    <>
      {user ? (
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Avatar className="float-end mr-2">
                <AvatarImage src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.avater}` || ""} alt="User Image" />
                <AvatarFallback className="bg-primary">
                  <User className="text-white" />
                </AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <MobileUserProfileMenu user={user} setIsLoading={setIsLoading} />
          </Sheet>
        </div>
      ) : (
        <Link href="/login" className="gap-2 text-right">
          <Button className="px-3">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </Link>
      )}
    </>
  );
};

export default UserLogin;

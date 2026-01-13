"use client";

import type React from "react";

import {
  Building,
  Calendar,
  Check,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Info,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { useUserInfo } from "@/hooks/useUserInfo";
import ProfileSkeleton from "@/components/loading/ProfileSkeleton";

interface ProfileField {
  label: string;
  value: string | null;
  icon: React.ElementType;
  sensitive?: boolean;
  verified?: boolean;
  copyable?: boolean;
}

export default function UserProfile() {
  const [hideSensitiveInfo, setHideSensitiveInfo] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { user, isLoading, error } = useUserInfo();

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success("Copied to clipboard");
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  }; 



  const toggleSensitiveInfo = () => {
    setHideSensitiveInfo(!hideSensitiveInfo);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center py-10 pt-6">
          <Info className="mb-4 h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">Error Loading Profile</h3>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const profileFields: ProfileField[] = [
    { label: "Full Name", value: user?.profile?.nameAsNid, icon: User, copyable: true },
    {
      label: "Registered Mobile Number",
      value: user?.phone,
      icon: Phone,
      sensitive: true,
      verified: true,
      copyable: true,
    },
    {
      label: "Email Address",
      value: user?.email,
      icon: Mail,
      verified: true,
      copyable: true,
    },
    {
      label: "Gender",
      value: user?.profile?.gender,
      icon: User,
      sensitive: true,
    },
    {
      label: "Date of Birth",
      value: formatDate(user?.profile?.dateOfBirth, "Full date"),
      icon: Calendar,
      sensitive: true,
      copyable: true,
    },
    {
      label: "National ID Number (NID)",
      value: user?.profile?.nationalIdNumber,
      icon: CreditCard,
      sensitive: true,
      verified: true,
      copyable: true,
    },
    {
      label: "Address",
      value: user?.profile?.address,
      icon: MapPin,
      sensitive: true,
      copyable: true,
    },
    {
      label: "City",
      value: user?.profile?.city,
      icon: Building,
      sensitive: true,
    },
  ];

  return (
    <Card className="relative mx-auto w-full border-muted/30 shadow-sm rounded-xl">
      <CardHeader className="relative rounded-t-xl pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 items-center sm:items-start">
            <Avatar className="h-24 w-24 border-2 border-primary/20 shadow-sm">
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.profile?.avatar}` || ""}
                alt="Profile picture"
              />
              <AvatarFallback className="bg-primary/10 text-2xl font-semibold text-primary">
                {user?.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <h2 className="text-xl font-semibold truncate">{user?.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground break-all">
                {user?.email}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Member since{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:items-end items-start w-full sm:w-auto">
            <Link href="/user/update-profile" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 w-full sm:w-auto"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 px-0 text-sm hover:bg-transparent hover:text-primary w-full sm:w-auto"
              onClick={toggleSensitiveInfo}
            >
              {hideSensitiveInfo ? (
                <>
                  <Eye className="h-3 w-3" />
                  Show Personal Info
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3" />
                  Hide Personal Info
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6 space-y-6">
        {profileFields.map((field) => (
          <div
            key={field.label}
            className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 border-b border-muted/20 last:border-b-0"
          >
            <div className="flex items-center gap-2">
              <field.icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{field.label}</span>
              {field.verified && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Shield className="h-3 w-3 text-green-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Verified</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-sm font-medium truncate">
                {field.sensitive && hideSensitiveInfo
                  ? "••••••••••••"
                  : field.value || "Not provided"}
              </span>

              {field.copyable && field.value && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 !text-primary"
                        onClick={() =>
                          copyToClipboard(field.value as string, field.label)
                        }
                      >
                        {copiedField === field.label ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3 text-green-600" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {copiedField === field.label
                          ? "Copied!"
                          : "Copy to clipboard"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 border-t pt-4 text-xs text-muted-foreground">
        <span className="text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </span>
        <Button variant="link" size="sm" className="p-0 text-sm">
          Request Data Update
        </Button>
      </CardFooter>
    </Card>
  );
}


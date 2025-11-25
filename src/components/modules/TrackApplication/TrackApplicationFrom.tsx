"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applicationTracking } from "@/services/public";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TrackApplicationStatus from "./TrackApplicationStatus";
import { ApplicationStatusData } from "./TrackingApplicationTypes";

const FormSchema = z.object({
  applicationId: z
    .string()
    .min(12, "Application ID must be at least 12 characters"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 characters")
    .max(11, "Phone number must be at most 11 characters"),
});

export default function TrackApplicationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(false);
  const [applicationStatusData, setApplicationStatusData] = useState<
    ApplicationStatusData | null | undefined
  >();

  console.log(applicationStatusData);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applicationId: "",
      phone: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
    setIsLoading(true);
    const res = await applicationTracking(data);
    setIsLoading(false);
    setApplicationStatus(true);
    if (res.success) {
      console.log(res.data);
      toast.success("Application status fetched successfully!");
      setApplicationStatusData(res.data);
      setApplicationStatus(true);
    } else {
      console.log(res.error);
      toast.error(
        res?.error?.message ||
          "Please provide a valid application ID and phone number",
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center  p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1.04 }}
        transition={{ duration: 0.3 }}
       
      >
        {applicationStatus && applicationStatusData ? (
          <TrackApplicationStatus
            applicationStatusData={applicationStatusData}
          />
        ) : (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Track your Application
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-center text-gray-600">
                Enter your tracking number to see your application status
              </p>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {/* Tracking Number */}
                  <div>
                    <Label htmlFor="applicationId">Application ID</Label>
                    <Input
                      id="applicationId"
                      placeholder="Enter your Application ID"
                      {...form.register("applicationId")}
                    />
                    {form.formState.errors.applicationId && (
                      <p className="mt-1 text-sm text-red-500">
                        {form.formState.errors.applicationId.message}
                      </p>
                    )}
                  </div>
                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="01XXXXXXXXXX"
                      {...form.register("phone")}
                    />
                    {form.formState.errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Loading... " : "Track Application"}
                </Button>

                <div className="text-center text-sm">
                  <Link
                    href="/track-application/forgot-application"
                    className="text-blue-600 hover:underline"
                  >
                    Forgot Application ID?
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
// File: app/auth/reset-password/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logout, resetPassword } from "@/services/AuthService";
import { toast } from "sonner";

// 1. Define your Zod schema
const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type ResetForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm({token, email, phone}: { token?: string; email?: string, phone: string }) {

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ResetForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetForm) => {
    setIsSubmitting(true);

    console.log(phone)


  const payload = {
            email: email ?? "",
            newPassword: data.password,
            phone,
        }



    try {
      const res = await resetPassword(payload);
      
      if (res.success) {
        setIsSubmitting(false);
        await logout()
        toast.success("Password reset successfully! You can now log in.");
        router.push("/login");
      } else {
          setIsSubmitting(false);
        throw new Error(res.message || "Unknown error");
       
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to reset password.");
       setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Set Your New Password
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saveing....." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

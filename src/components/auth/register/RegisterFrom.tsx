"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import logo from "/public/logo.png";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerUser } from "@/services/AuthService";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { registerValidationSchema } from "./registerValidation";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "/";

  const form = useForm<z.infer<typeof registerValidationSchema>>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerValidationSchema>) {
    setIsLoading(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await registerUser(data);

      // if (result.message.includes("phone")) {
      //   return toast.error("Your phone number already use try anather number")
      // }

      // if (!result.success) {
      //   toast.error("Already have a account with this email please try another email!")
      // }

      if (result.success) {
        toast.success(result.message)
        router.push(`/otp-verification?phone=${result?.data?.phone}&redirectPath=${redirectPath}`);
      } else {
        return toast.error(result.message)
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  // const handleSocialLogin = (provider: "google" | "apple") => {
  //   // Implement social login logic
  //   console.log(`Logging in with ${provider}`);
  // };

  return (
    <div className="flex md:py-8 flex-col items-center justify-center bg-gray-50 p-4">
      {/* <div className="mb-8">
        <Image src={logo} alt="Logo" className="mx-auto mb-4 w-full" />
      </div> */}
      <Card className="w-full max-w-lg rounded-md border-[#D0D5DD] text-secondary shadow-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-green-950">
            Create New Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          {...field}
                          disabled={isLoading}
                          autoComplete="name"
                          className="text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          disabled={isLoading}
                          autoComplete="email"
                          className="text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+880XXXXXXXXX"
                          {...field}
                          disabled={isLoading}
                          autoComplete="tel"
                          className="text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                            disabled={isLoading}
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            className="text-black"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-0"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirm ? 'text' : 'password'}
                            {...field}
                            disabled={isLoading}
                            placeholder="Type your password again"
                            autoComplete="new-password"
                            className="text-black"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-0"
                          >
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm text-black">
            Don’t have an account?{" "}
            <Link
              href={`/login?redirectPath=${encodeURIComponent(redirectPath)}`}
              className="text-green-500 underline"
            >
              Login 
            </Link>
          </div>

          {/* <div className="mt-4 text-center text-sm text-black">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-primary text-green-500">
              Login
            </Link>
          </div> */}

          {/* <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <Google className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
            >
              <Apple className="mr-2 h-4 w-4" /> Apple
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

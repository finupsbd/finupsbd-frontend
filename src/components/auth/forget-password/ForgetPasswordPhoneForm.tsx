"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { forgotPasswordPhone } from "@/services/AuthService"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"


// Phone validation (simple)
const formSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, {
      message: "Enter a valid phone number (10–15 digits).",
    }),
})

export default function ForgotPasswordPhoneForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get("redirectPath") || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const res = await forgotPasswordPhone(values)
      if (res.success) {
        toast.success("Password reset SMS sent successfully.")
        router.push(`/otp-verification?phone=${res?.data?.phone}&redirectPath=/auth/reset-password?phone=${res?.data?.phone}`);
        setIsSuccess(true)
      } else {
        toast.error(res.message)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>
            Enter your phone number and we'll send you an SMS Otp.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Check your phone</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a reset password link via SMS.
                </p>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0170000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Reset SMS"}
                </Button>
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:underline mt-3"
                >
                  Forgot Password With Email
                </Link>
              </form>
            </Form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center border-t p-4">
          <Link href="/login">
            <Button variant="link" className="px-2 text-sm" onClick={() => setIsSuccess(false)}>
              Back to login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

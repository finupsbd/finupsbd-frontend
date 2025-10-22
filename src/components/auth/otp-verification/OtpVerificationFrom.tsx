/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { otpVerification } from "@/services/AuthService"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"

export default function OTPVerificationForm({ phone }: { phone: string }) {
    const [otp, setOtp] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [timeLeft, setTimeLeft] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get("redirectPath") || "/";




    // Countdown timer for resend
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [timeLeft])

    // Auto-submit when OTP is complete
    useEffect(() => {
        if (otp.length === 6) {
            handleVerify()
        }
    }, [])

    const handleVerify = async () => {
        if (otp.length !== 6) return

        setIsLoading(true)
        setError("")

        console.log(phone, otp)

        try {
            const response = await otpVerification(phone, otp)

            if (response.success) {
                setSuccess(true)
                toast.success(response.message)
                router.push(redirectPath);
            } else {
                console.error(response.message)
                toast.error(response.message)
                setOtp("")
            }
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong. Please try again.")
            setOtp("")
        } finally {
            setIsLoading(false)
        }
    }

    const handleResend = async () => {
        setIsResending(true)


        try {
            // Replace this with your actual resend API call

            console.log(phone, otp)

            const response = await otpVerification(phone, otp)
            if (response.success) {
                setTimeLeft(60)
                setCanResend(false)
                setOtp("")
            } else {
                toast.error("Failed to resend OTP. Please try again.")
            }
        } catch (err) {
            toast.error("Failed to resend OTP. Please try again")
        } finally {
            setIsResending(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                            <h2 className="text-2xl font-semibold text-gray-900">Verified!</h2>
                            <p className="text-gray-600">Your phone successfully verified.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold">Verify Your Phone</CardTitle>
                    <CardDescription>
                        We've sent a 6-digit verification code to your phone. Enter it below to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} disabled={isLoading}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button onClick={handleVerify} disabled={otp.length !== 6 || isLoading} className="w-full">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify Code"
                            )}
                        </Button>
                    </div>

                    <div className="text-center space-y-2">
                        <p className="text-sm text-gray-600">{"Didn't receive the code?"}</p>
                        <Button variant="ghost" onClick={handleResend} disabled={!canResend || isResending} className="text-sm">
                            {isResending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : canResend ? (
                                "Resend Code"
                            ) : (
                                `Resend in ${timeLeft}s`
                            )}
                        </Button>
                    </div>

                    {/* <div className="text-center">
                        <Button variant="ghost" className="text-sm text-gray-500">
                            Change Phone Number
                        </Button>
                    </div> */}
                </CardContent>
            </Card>
        </div>
    )
}

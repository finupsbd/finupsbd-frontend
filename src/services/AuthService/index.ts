"use server"

import { DecodedUser } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


import { FieldValues } from "react-hook-form"

export const registerUser = async (userData: FieldValues) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/signUp`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        console.log("Response Status:", res.status);

        // if (!res.ok) {
        //     const errorData = await res.json().catch(() => null);
        //     console.error("API Error Response:", errorData);
        //     throw new Error(`HTTP error! Status: ${res.status} - ${errorData?.message || "Unknown error"}`);
        // }


        return await res.json();
    } catch (error) {
        console.error("Error registering user:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred",
            error,
        };
    }
};







export const loginUser = async (userData: FieldValues) => {
    console.log("Sending Data:", JSON.stringify(userData));

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        // if (!res.ok) {
        //     const errorData = await res.json().catch(() => null);
        //     console.error("API Error Response:", errorData);
        //     throw new Error(`HTTP error! Status: ${res.status} - ${errorData?.message || "Unknown error"}`);
        // }
        const result = await res.json()
        console.log(result)
        if (result.statusCode === 400) {
    
            return result
        }

        if (result.success) {
            const cookieStore = await cookies()
            cookieStore.set("accessToken", result?.data?.accessToken)
        }
        return result
    } catch (error) {
        console.error("Error registering user:", { error });
    }
};






export const getCurrentUser = async (): Promise<DecodedUser | null> => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) return null;

    try {
        // Pass DecodedUser as a generic, so jwtDecode returns that type
        const decodedData = jwtDecode<DecodedUser>(accessToken);
        return decodedData;
    } catch (error) {
        console.error("Token decoding failed:", error);
        return null; // or throw an error
    }
};







export const logout = async () => {
    (await cookies()).delete("accessToken")
}





export const changePassword = async (payload: {oldPassword: string, newPassword: string}) => {

    const token = (await cookies()).get("accessToken")?.value;

    if (!token) {
        throw new Error("No authentication token found in cookies");
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        });

        return await res.json();
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}




export const forgotPassword = async (userData: FieldValues) => {
    console.log("Sending Data:", JSON.stringify(userData));

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/forget-password`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await res.json()
        return result
    } catch (error) {
        console.error("Error registering user:", { error });
    }
};



export const forgotPasswordPhone = async (userData: FieldValues) => {
    console.log("Sending Data:", JSON.stringify(userData));

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/forget-password-phone`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await res.json()
        return result
    } catch (error) {
        console.error("Error registering user:", { error });
    }
};











export const resetPassword = async (payload: {email: string, newPassword: string, phone: string}) => {

    console.log(payload)

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json()
        return result
    } catch (error) {
        console.error("Error Reset password:", { error });
    }
};







export const otpVerification = async (phone: string | null, pin: string) => {

    const payload = {
        phone,
        pin
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/validate-pin`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return res.json()
    } catch (error) {
        console.error("Token decoding failed:", error);
    }

};












// export const recaptchaTokenVerification = async (token: string) => {
//     try {
//         const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({
//                 secret: process.env.NEXT_PUBLIC_RECAPCHA_SERVER_KEY!, // Use correct env variable
//                 response: token,
//             }),
//         });

//         if (!res.ok) {
//             throw new Error(`Failed to verify reCAPTCHA: ${res.statusText}`);
//         }

//         return await res.json();
//     } catch (err) {
//         console.error("reCAPTCHA Verification Error:", err);
//         return { success: false, message: err instanceof Error ? err.message : "Unknown error occurred" };
//     }
// };


// export const logout = async() => {
//     (await cookies()).delete("accessToken")
// }

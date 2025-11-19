'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/reset-password/ResetPasswordFrom';


function ResetPassword() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token') ?? '';
    const email = searchParams.get('email') ?? '';
    const phone = searchParams.get('phone') ?? '';
    return <ResetPasswordForm token={token} email={email}  phone={phone}/>
}


export default function ResetPasswordPage() {


    return (
        // This ensures the page doesn’t fully bail to CSR
        <Suspense fallback={<div>Loading…</div>}>
            <ResetPassword />
        </Suspense>
    );
}

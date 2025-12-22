import React, { Suspense } from 'react';
import LoginFrom from '@/components/auth/login/LoginFrom';
import { Loader2 } from 'lucide-react';
import Navbar from "@/components/sheared/Header";
import Footer from '@/components/sheared/Footer';

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader2 className="mr-2 h-4 w-4 animate-spin max-h-fit mx-auto" />}>
        <Navbar />
        <LoginFrom />
        <Footer />
      </Suspense>
    </div>
  )
}

export default LoginPage
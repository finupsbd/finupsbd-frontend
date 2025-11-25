import RegisterFrom from '@/components/auth/register/RegisterFrom'
import Footer from '@/components/sheared/Footer'
import React from 'react'
import Navbar from "@/components/sheared/Header";

const RegisterPage = () => {
  return (
    <div>
       <Navbar />
          <RegisterFrom/>
        <Footer />
      
    </div>
  )
}

export default RegisterPage
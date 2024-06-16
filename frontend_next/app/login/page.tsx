import Image from 'next/image'
import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

export default function loginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div className="hidden lg:flex justify-center items-center h-screen">
        <Image
            src="/auth_img.svg"
            width={500}
            height={500}
            alt="auth_img"
            className="w-full object-contain"
          />
      </div>
      <div className="h-screen flex justify-center items-center flex-col">
        <div className='mb-6'>
          <Image src="/logo.svg" alt="logo" width={150} height={150} />
          <h1>Where developers suffer together</h1>
        </div>
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <Login/>
          <Register/>
        </Tabs>
      </div>
    </div>
  )
}

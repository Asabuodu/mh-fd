
"use client"
// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Navbar from './components/nav/Navbar';


export default function Home() {
  return (
    
    <div className=''>
      <Navbar/>

      <div className=" bg-cover bg h-screen flex justify-center items-center">

        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-6'>Welcome to the Home Page</h1>

        
        {/* <Link href="/auth/signup">I don&apos;t have an account</Link>
        <Link href="/auth/login">I already have an account</Link> */}
      </div>

      <div>

      </div>
    </div>
  );
}





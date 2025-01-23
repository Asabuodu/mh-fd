
"use client"
// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import bg from '../../public/assets/bg.jpg';

export default function Home() {
  return (
    <div className='bg-cover bg-center' style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,water')" }}>

      <div className="bg-purple-600 bg-opacity-25 h-screen flex justify-center items-center">
        <h1>Hello</h1>

        <Link href="/auth/signup">I don't have an account</Link>
      </div>
    </div>
  );
}

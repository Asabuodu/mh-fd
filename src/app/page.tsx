
"use client"
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>

      <Link href="/auth/signup">I don't have an account</Link>
    </div>
  );
}

'use client'

// import { Suspense } from 'react';
import CheckoutContent from '@/components/checkout-content';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <CheckoutContent />
    </div>
  );
}


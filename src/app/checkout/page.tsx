'use client'

// import { Suspense } from 'react';
import CheckoutContent from '@/components/checkout-content';

export default function CheckoutPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
            {/* <Suspense fallback={
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">Loading checkout...</p>
                </div>
            }> */}
                <CheckoutContent />
            {/* </Suspense> */}
        </div>
    );
}


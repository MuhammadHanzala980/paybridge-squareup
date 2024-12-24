
'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getOrderDetails } from '@/lib/woocommerce';
import { createCheckoutSession } from '@/lib/square';

// type PageProps = {
// params: Promise<{ orderId: string }>;
// };

export default function CheckoutContent() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const [stage, setStage] = useState<'initializing' | 'processing' | 'redirecting' | 'error'>('initializing');
    useEffect(() => {

        const getOrderId = async () => {
            // const id = (await params).orderId
            const id = searchParams.get('orderId');

            setOrderId(id);
        }
        getOrderId();
    }, [searchParams]);

    useEffect(() => {
        async function processCheckout() {
            if (!orderId) {
                // setError('Invalid order ID. Please try again.');
                return;
            }

            try {
                console.log('Fetching order details for:', orderId);
                const orderDetails = await getOrderDetails(orderId);
                console.log('Order details:', orderDetails);

                if (!orderDetails) {
                    throw new Error('Order not found');
                }

                console.log('Creating Square checkout session');
                const checkoutUrl = await createCheckoutSession(orderDetails);
                console.log('Square checkout URL:', checkoutUrl);

                // Use router.push for client-side navigation
                router.push(checkoutUrl);
            } catch (error: any) {
                console.log('Checkout error:', error);
                const errorMessage = error.Error === 'Order not found'
                    ? 'The specified order was not found. Please check your order ID and try again.'
                    : 'Order not found';
                setError(errorMessage);
            }
        }

        processCheckout();
    }, [orderId, searchParams]);


    const messages = {
        initializing: "Preparing your magical checkout experience...",
        processing: "Crafting your perfect order. This won't take long!",
        redirecting: "Your gateway to awesome products is opening...",
        error: "Oops! We've hit a snag. But don't worry, we're on it!"
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-white-100">

            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    {stage === 'error' ? 'Checkout Issue' : 'Secure Checkout'}
                </h1>
                {error ? (
                    <p className="text-red-500 mt-4">{error}</p>
                ) : (
                    <>
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-lg font-medium text-gray-700 mb-2">
                            {messages[stage]}
                        </p>

                    </>
                )}
            </div>
        </div>
    );
}





'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getOrderDetails } from '@/lib/woocommerce';
import { createCheckoutSession } from '@/lib/square';

type PageProps = {
    params: Promise<{ orderId: string }>;
};

export default function CheckoutPage({ params }: PageProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const getOrderId = async () => {
            const id = (await params).orderId
            setOrderId(id);
        }
        getOrderId();
    }, []);

    useEffect(() => {
        async function processCheckout() {
            if (!orderId) {
                setError('Invalid order ID. Please try again.');
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
                console.error('Checkout error:', error);
                const errorMessage = error.message === 'Order not found'
                    ? 'The specified order was not found. Please check your order ID and try again.'
                    : 'An unexpected error occurred during checkout. Please try again or contact support.';
                setError(errorMessage);
            }
        }

        processCheckout();
    }, [orderId, router]);

 
    return <div>Processing your order...</div>;
}



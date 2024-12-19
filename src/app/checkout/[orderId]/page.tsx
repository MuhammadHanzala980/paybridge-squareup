// import { redirect } from 'next/navigation';
// import { getOrderDetails } from '@/lib/woocommerce';
// import { createCheckoutSession } from '@/lib/square';

// export default async function CheckoutPage({ params }: { params: { orderId: string } }) {
//     const { orderId } = await params;
//     console.log(orderId)
//     if (!orderId) {
//         return <div>Invalid order ID. Please try again.</div>;
//     }

//     try {
//         // Fetch order details from WooCommerce
//         const orderDetails = await getOrderDetails(orderId);
//         console.log(orderDetails)
//         if (!orderDetails) {
//             throw new Error('Order not found');
//         }

//         // Create Square checkout session
//         const checkoutUrl = await createCheckoutSession(orderDetails);

//         // Redirect to Square checkout
//         redirect(checkoutUrl);
//     } catch (error: any) {
//         console.error('Checkout error:', error);
//         const errorMessage = error.message === 'Order not found'
//             ? 'The specified order was not found. Please check your order ID and try again.'
//             : 'An unexpected error occurred during checkout. Please try again or contact support.';
//         return <div>{errorMessage}</div>;
//     }
// }

'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getOrderDetails } from '@/lib/woocommerce';
import { createCheckoutSession } from '@/lib/square';

type CheckoutPageParams = {
    orderId: string;
};

export default function CheckoutPage() {
    const params = useParams() as CheckoutPageParams;
    const orderId: string = params.orderId;
    
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function processCheckout() {
            console.log('Order ID:', orderId);

            if (!orderId) {
                setError('Invalid order ID. Please try again.');
                return;
            }

            try {
                // Fetch order details from WooCommerce
                const orderDetails = await getOrderDetails(orderId);
                console.log('Order Details:', orderDetails);

                if (!orderDetails) {
                    throw new Error('Order not found');
                }

                // Create Square checkout session
                const checkoutUrl = await createCheckoutSession(orderDetails);
                console.log('Checkout URL:', checkoutUrl);

                // Redirect to Square checkout
                router.push(checkoutUrl);
            } catch (err: any) {
                console.error('Checkout error:', err);

                const errorMessage = err.message === 'Order not found'
                    ? 'The specified order was not found. Please check your order ID and try again.'
                    : 'An unexpected error occurred during checkout. Please try again or contact support.';

                setError(errorMessage);
            }
        }

        processCheckout();
    }, [orderId, router]);

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Processing your order...</div>;
}

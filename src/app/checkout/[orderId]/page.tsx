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
import { useRouter } from 'next/navigation';
import { getOrderDetails } from '@/lib/woocommerce';
import { createCheckoutSession } from '@/lib/square';

export default async function CheckoutPage({ params }: { params: { orderId: string } }) {
    const { orderId } = params;
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function processCheckout() {
            console.log(orderId);

            if (!orderId) {
                setError('Invalid order ID. Please try again.');
                return;
            }

            try {
                // Fetch order details from WooCommerce
                const orderDetails = await getOrderDetails(orderId);
                console.log(orderDetails);

                if (!orderDetails) {
                    throw new Error('Order not found');
                }

                // Create Square checkout session
                const checkoutUrl = await createCheckoutSession(orderDetails);

                // Redirect to Square checkout
                console.log(checkoutUrl)
                // router.push(checkoutUrl);
            } catch (error: any) {
                console.error('Checkout error:', error);
                const errorMessage = error.message === 'Order not found'
                    ? 'The specified order was not found. Please check your order ID and try again.'
                    : 'An unexpected error occurred during checkout. Please try again or contact support.';
                setError(errorMessage);
            }
        }

        processCheckout();
    }, [params, router]);

    if (error) {
        return <div>{error}</div>;
    }

    return <div>Processing your order...</div>;
}


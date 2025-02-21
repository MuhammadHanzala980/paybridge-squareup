'use server'

import { Client, Environment, CreatePaymentLinkRequest } from 'square';
 
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
});

export async function createCheckoutSession(orderDetails: any) {
  const { id: orderId, total, currency, line_items: lineItems } = orderDetails;
  console.log('Creating Square checkout session for order:', total, orderId);
  const formattedTotal = parseInt(total) * 100;
  const totalAmount = BigInt(formattedTotal) ;
 ;
  const body: CreatePaymentLinkRequest = {
    idempotencyKey: `${orderId}-${Date.now()}`,
    quickPay: {
      name: 'Amount',
      priceMoney: {
        amount: totalAmount,
        currency:currency 
      },
      locationId: process.env.SQUARE_LOCATION_ID!,
    },
    checkoutOptions: {
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
    },
  };


  try {
    const response = await client.checkoutApi.createPaymentLink(body);
    if (response.result.paymentLink?.url) {
      console.log('Square checkout session created successfully');
      return response;
    } else {
      throw new Error('Failed to create Square checkout session: No URL returned');
    }
  } catch (error: any) {
    console.error('Error creating Square checkout session:', JSON.stringify(error, null, 2));
    throw new Error(`Failed to create Square checkout session: ${error.message}`);
  }
}


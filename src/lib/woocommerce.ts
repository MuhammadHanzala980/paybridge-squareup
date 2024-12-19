'use server'

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_STORE_URL!,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET!,
  version: 'wc/v3'
});

export async function getOrderDetails(orderId: string) {
  console.log(`Attempting to fetch order details for order ID: ${orderId}`);
  console.log(`WooCommerce API URL: ${process.env.WOOCOMMERCE_STORE_URL}`);

  try {
    const response = await api.get(`orders/${orderId}`);
    console.log('Order details fetched successfully');
    console.log('Order details:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error: any) {
    console.error('Error fetching order details:', JSON.stringify(error, null, 2));

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }

    if (error.response && error.response.status === 404) {
      console.error(`Order with ID ${orderId} not found`);
      throw new Error(`Order not found: ${orderId}`);
    }

    throw new Error(`Failed to fetch order details: ${error.message}`);
  }
}


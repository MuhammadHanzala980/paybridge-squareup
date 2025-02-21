'use server'

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL!,
  consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY!,
  consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET!,
  version: 'wc/v3'
});

export async function getOrderDetails(id: string) {
  console.log(`Attempting to fetch order details for order ID: ${id}`);
  console.log(`WooCommerce API URL: ${process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL}`);

  try {
    const response = await api.get(`orders/${id}`);
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
      console.error(`Order with ID ${id} not found`);
      throw new Error(`Order not found: ${id}`);
    }

    throw new Error(`Failed to fetch order details: ${error.message}`);
  }
}

export async function updateOrderStatus(payload: any) {
  const { id, status, note, transaction_id } = payload;
  console.log(payload, "Payload loded")
  console.log(`Attempting to update order status for order ID: ${id} to ${status}`);

  try {
    const response = await api.put(`orders/${id}`, {
      status: status,
      note: note,
      transaction_id: transaction_id
    });
    console.log('Order status updated successfully');
    console.log('Updated order details:', JSON.stringify(response.data, null, 2));
    await createOrderNote(payload);
    return response.data;
  } catch (error: any) {
    console.error('Error updating order status:', JSON.stringify(error, null, 2));

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }

    throw new Error(`Failed to update order status: ${error.message}`);
  }
}


export async function createOrderNote(payload: any) {
  const { id, note } = payload;

  try {
    const response = await api.post(`orders/${id}/notes`, {
      note: note,
    });
    console.log('Order note created successfully');
    console.log('created order note:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error: any) {
    console.error('Error creating order note:', JSON.stringify(error, null, 2));

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }

    throw new Error(`Failed to create order note: ${error.message}`);
  }
}
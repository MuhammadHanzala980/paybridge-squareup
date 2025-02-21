 import { NextRequest, NextResponse } from 'next/server';
// import { updateOrderStatus } from '@/lib/woocommerce';

export async function POST(req: NextRequest) {
  // const body = await req.text();
  // const event = JSON.parse(body);

  // if (event.type === 'payment.updated') {
  //   const payment = event.data?.object?.payment;
  //   const orderId = payment.order_id;

  //   console.log(event, "event");
  //   console.log("payment", payment);
  //   if (payment && payment.status === 'COMPLETED') {
  //     try {
  //       await updateOrderStatus(orderId, 'completed');
  //       console.log(`Order ${payment.order_id} status updated to completed`);
  //       return NextResponse.json({ success: true });
  //     } catch (error) {
  //       console.error('Error updating order status:', error);
  //       return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  //     }
  //   }
  // }

  return NextResponse.json({ success: true, message: 'Webhook received' });
}

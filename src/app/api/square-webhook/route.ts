import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateOrderStatus } from '@/lib/woocommerce';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const squareSignature = req.headers.get('x-square-signature');
  console.log("Updating order status")
  // Verify Square signature
  const hmac = crypto.createHmac('sha256', process.env.SQUARE_WEBHOOK_SIGNATURE_KEY!);
  hmac.update(body);
  const expectedSignature = hmac.digest('base64');
  console.log("squareSignature:", squareSignature, "expectedSignature:", expectedSignature)
  if (squareSignature !== expectedSignature) {
    console.error('Invalid Square signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.type === 'payment.updated') {
    const payment = event.data.object.payment;
    const orderId = payment.order_id;
    const status = payment.status;

    if (status === 'COMPLETED') {
      try {
        await updateOrderStatus(orderId, 'completed');
        console.log(`Order ${orderId} status updated to completed`);
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ success: true });
}


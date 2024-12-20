import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { updateOrderStatus } from '@/lib/woocommerce';

export async function POST(req: NextRequest) {
  // Read raw request body as text for signature verification
  const body = await req.text();

  // Get the Square signature header
  const squareSignature = req.headers.get('x-square-hmacsha256-signature');

  // Verify that we have the signature key in the environment
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!signatureKey) {
    console.error('Missing SQUARE_WEBHOOK_SIGNATURE_KEY environment variable');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // Compute the expected signature
  const hmac = crypto.createHmac('sha256', signatureKey);
  hmac.update(body);
  const expectedSignature = hmac.digest('base64');

  // Compare Square's signature with our computed signature
  if (squareSignature !== expectedSignature) {
    console.error('Invalid Square signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Parse the event now that signature is verified
  const event = JSON.parse(body);

  // Handle payment updates (example: payment.updated)
  if (event.type === 'payment.updated') {
    const payment = event.data?.object?.payment;

    if (payment) {
      const orderId = payment.order_id;
      const status = payment.status;

      // If payment completed, update the order status in WooCommerce
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
  }

  // Return a success response for other events or no-action events
  return NextResponse.json({ success: true });
}

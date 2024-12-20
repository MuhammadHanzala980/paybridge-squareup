// import { NextRequest, NextResponse } from 'next/server';
// import crypto from 'crypto';
// import { updateOrderStatus } from '@/lib/woocommerce';

// export async function POST(req: NextRequest) {
//   const body = await req.text();
//   const squareSignature = req.headers.get('x-square-hmacsha256-signature');
//   const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY?.trim();

//   if (!signatureKey) {
//     console.error('Missing SQUARE_WEBHOOK_SIGNATURE_KEY environment variable');
//     return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
//   }

//   // Log the raw body and signature key length for debugging
//   console.log('Raw body:', body);
//   console.log('Body length:', body.length);
//   console.log('Signature key length:', signatureKey.length);

//   const hmac = crypto.createHmac('sha256', signatureKey);
//   hmac.update(body);
//   const expectedSignature = hmac.digest('base64');

//   console.log('Square Signature:', squareSignature);
//   console.log('Expected Signature:', expectedSignature);

//   if (squareSignature !== expectedSignature) {
//     console.error('Invalid Square signature');
//     return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
//   }

//   const event = JSON.parse(body);

//   if (event.type === 'payment.updated') {
//     const payment = event.data?.object?.payment;
//     if (payment && payment.status === 'COMPLETED') {
//       try {
//         await updateOrderStatus(payment.order_id, 'completed');
//         console.log(`Order ${payment.order_id} status updated to completed`);
//         return NextResponse.json({ success: true });
//       } catch (error) {
//         console.error('Error updating order status:', error);
//         return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
//       }
//     }
//   }

//   return NextResponse.json({ success: true });
// }


import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/woocommerce';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const event = JSON.parse(body);

  if (event.type === 'payment.updated') {
    const payment = event.data?.object?.payment;
    console.log("payment", payment);
    if (payment && payment.status === 'COMPLETED') {
      try {
        await updateOrderStatus(payment.order_id, 'completed');
        console.log(`Order ${payment.order_id} status updated to completed`);
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ success: true });
}

import { POST as verifyPaymentHandler } from '../../verify-payment/route';

export async function POST(request) {
  return verifyPaymentHandler(request);
}

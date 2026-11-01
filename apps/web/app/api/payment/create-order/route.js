import { POST as createOrderHandler } from '../../create-order/route';

export async function POST(request) {
  return createOrderHandler(request);
}

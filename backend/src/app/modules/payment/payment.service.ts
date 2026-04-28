import { paymentRepository } from './payment.repository';
import { orderEngine } from '../order/order.service';
import crypto from 'crypto';


const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
};

const initiateCheckout = async (userId: string, payload: any) => {
  const { items, shippingAddress, paymentMethod } = payload;

  // 1. Calculate totals
  const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const shippingCost = 100; // Fixed for now
  const totalAmount = subtotal + shippingCost;

  // 2. Create Order in DB (Pending)
  const orderData = {
    orderNumber: generateOrderNumber(),
    userId,
    subtotal,
    shippingCost,
    totalAmount,
    status: 'PENDING',
    paymentStatus: 'PENDING',
    paymentMethod,
    shippingSnapshot: shippingAddress,
  };

  const order = await orderEngine.placeOrder(orderData, items.map((item: any) => ({
    productId: item.productId,
    variantId: item.variantId,
    productName: item.name,
    quantity: item.quantity,
    unitPrice: item.price,
    totalPrice: item.price * item.quantity,
  })));


  // 3. Create initial Payment record
  const payment = await paymentRepository.createPaymentRecord({
    orderId: order.id,
    amount: totalAmount,
    method: paymentMethod,
    status: 'PENDING',
  });

  // 4. Interface with Gateway
  let gatewayUrl = '';
  if (paymentMethod === 'STRIPE') {
    // Stripe Checkout Session logic
    gatewayUrl = `https://checkout.stripe.com/pay/${order.orderNumber}`;
  } else if (paymentMethod === 'SSLCOMMERZ') {
    // SSLCommerz logic
    gatewayUrl = `https://sandbox.sslcommerz.com/pay/${order.orderNumber}`;
  }

  return { order, payment, gatewayUrl };
};

const verifyPayment = async (orderId: string, paymentId: string, gatewayTxId: string, response: any) => {
  return await paymentRepository.completeOrderPayment(orderId, paymentId, gatewayTxId, response);
};

export const paymentServices = {
  initiateCheckout,
  verifyPayment,
};

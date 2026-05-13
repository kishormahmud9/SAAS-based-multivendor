import { paymentRepository } from './payment.repository';
import { orderEngine } from '../order/order.service';
import crypto from 'crypto';
import { prisma } from '../../db_connection';


const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
};

const initiateCheckout = async (userId: string, payload: any) => {
  const { items, shippingAddress, paymentMethod, addressId } = payload;

  // 1. Get Shipping Address Info
  let addressData = shippingAddress;
  if (addressId) {
    const address = await (prisma as any).address.findUnique({ where: { id: addressId } });
    if (address) {
      addressData = {
        fullName: address.fullName,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
      };
    }
  }

  // 2. Calculate totals
  const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 1000 ? 0 : 60; // Free shipping over 1000, else 60
  const totalAmount = subtotal + shippingCost;

  // 3. Create Order in DB (Pending)
  const orderData = {
    orderNumber: generateOrderNumber(),
    userId,
    subtotal,
    shippingCost,
    totalAmount,
    status: 'PENDING',
    paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PENDING',
    paymentMethod,
    shippingSnapshot: addressData,
    addressId: addressId || null,
  };

  const order = await orderEngine.placeOrder(orderData, items.map((item: any) => ({
    productId: item.productId,
    variantId: item.variantId,
    productName: item.name,
    quantity: item.quantity,
    unitPrice: item.price,
    totalPrice: item.price * item.quantity,
  })));

  // 4. Create initial Payment record
  const payment = await paymentRepository.createPaymentRecord({
    orderId: order.id,
    amount: totalAmount,
    method: paymentMethod,
    status: 'PENDING',
  });

  // 5. Interface with Gateway
  let gatewayUrl = '';
  if (paymentMethod === 'STRIPE') {
    // Stripe Checkout Session logic
    gatewayUrl = `https://checkout.stripe.com/pay/${order.orderNumber}`;
  } else if (paymentMethod === 'SSLCOMMERZ') {
    // SSLCommerz logic
    gatewayUrl = `https://sandbox.sslcommerz.com/pay/${order.orderNumber}`;
  } else if (paymentMethod === 'COD') {
    // For COD, we don't need a gateway URL, order is already created
    gatewayUrl = '';
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

import { EventEmitter } from 'events';
import { notificationHelper } from './notificationHelper';

const eventEmitter = new EventEmitter();

// Event: Order Placed
eventEmitter.on('order.placed', async (order) => {
  // Notify Customer
  await notificationHelper.sendInApp({
    userId: order.userId,
    type: 'ORDER',
    title: 'Order Placed Successful!',
    body: `Your order ${order.orderNumber} has been received.`,
    data: { orderId: order.id },
  });

  // Notify Store Vendor (Future logic: find vendor and notify)
  console.log(`[EVENT] Order ${order.orderNumber} placed. Notifying relevant parties...`);
});

// Event: User Registered
eventEmitter.on('user.registered', async (user) => {
  await notificationHelper.sendEmail(user.email, 'Welcome to SAAS-ECOM', 'welcome_email', { name: user.name });
});

export default eventEmitter;

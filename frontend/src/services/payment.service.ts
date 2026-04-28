import { apiClient } from '../lib/api-client';

export const paymentService = {
  createPaymentIntent: async (orderId: string, gateway: 'STRIPE' | 'SSLCOMMERZ' | 'BKASH'): Promise<any> => {
    return apiClient('/payments/create-session', {
      method: 'POST',
      body: { orderId, gateway },
    });
  },

  verifyPayment: async (transactionId: string): Promise<any> => {
    return apiClient(`/payments/verify/${transactionId}`, {
      method: 'GET',
    });
  },
};

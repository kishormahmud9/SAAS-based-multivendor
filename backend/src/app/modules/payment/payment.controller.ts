import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { paymentServices } from './payment.service';

const checkout = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentServices.initiateCheckout(req.user!.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Checkout initiated',
    data: result,
  });
});

const stripeWebhook = catchAsync(async (req: Request, res: Response) => {
  // 1. Verify signature
  // 2. Extract data
  // 3. Update DB
  console.log('Stripe Webhook received');
  res.status(200).send({ received: true });
});

const sslSuccess = catchAsync(async (req: Request, res: Response) => {
  const { tran_id, val_id } = req.body;
  // Verify with SSLCommerz then complete order
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment successful',
    data: { tran_id },
  });
});

export const paymentControllers = {
  checkout,
  stripeWebhook,
  sslSuccess,
};

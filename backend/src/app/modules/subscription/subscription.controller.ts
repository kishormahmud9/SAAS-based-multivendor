import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { subscriptionServices } from './subscription.service';

const getAllPlans = catchAsync(async (req, res) => {
  const result = await subscriptionServices.getPlans();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pricing plans fetched successfully',
    data: result,
  });
});

const buySubscription = catchAsync(async (req, res) => {
  const { planId } = req.body;
  const result = await subscriptionServices.subscribe(req.tenant!.storeId!, planId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Subscribed successfully',
    data: result,
  });
});

const getMySub = catchAsync(async (req, res) => {
  const result = await subscriptionServices.getMySubscription(req.tenant!.storeId!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription details fetched',
    data: result,
  });
});

export const subscriptionControllers = {
  getAllPlans,
  buySubscription,
  getMySub,
};

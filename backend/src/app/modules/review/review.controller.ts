import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewRepository } from './review.repository';

const createReview = catchAsync(async (req, res) => {
  const result = await reviewRepository.createReview(req.user!.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review submitted successfully',
    data: result,
  });
});

export const reviewControllers = {
  createReview,
};

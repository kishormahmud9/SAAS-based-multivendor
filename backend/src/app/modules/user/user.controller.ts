import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userRepository } from './user.repository';

const getProfile = catchAsync(async (req, res) => {
  const result = await userRepository.getProfile(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await userRepository.updateProfile(req.user!.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const getAddresses = catchAsync(async (req, res) => {
  const result = await userRepository.getAddresses(req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Addresses fetched successfully',
    data: result,
  });
});

const createAddress = catchAsync(async (req, res) => {
  const result = await userRepository.createAddress(req.user!.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Address created successfully',
    data: result,
  });
});

const updateAddress = catchAsync(async (req, res) => {
  const result = await userRepository.updateAddress(req.params.id, req.user!.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Address updated successfully',
    data: result,
  });
});

const deleteAddress = catchAsync(async (req, res) => {
  await userRepository.deleteAddress(req.params.id, req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Address deleted successfully',
    data: null,
  });
});

export const userControllers = {
  getProfile,
  updateProfile,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};

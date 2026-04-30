import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userRepository } from './user.repository';
import { userServices } from './user.service';
import { optimizeAndSaveImage } from '../../utils/uploadHandler';

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
  const result = await userRepository.updateAddress(req.params.id as string, req.user!.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Address updated successfully',
    data: result,
  });
});

const deleteAddress = catchAsync(async (req, res) => {
  await userRepository.deleteAddress(req.params.id as string, req.user!.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Address deleted successfully',
    data: null,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUsers(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const createUser = catchAsync(async (req, res) => {
  // Parse addresses if sent as string (from FormData)
  if (typeof req.body.addresses === 'string') {
    req.body.addresses = JSON.parse(req.body.addresses);
  }

  // Cast verification fields to Dates for Prisma
  if (req.body.emailVerified === 'true' || req.body.emailVerified === true) {
    req.body.emailVerified = new Date();
  } else if (req.body.emailVerified === 'false' || req.body.emailVerified === false) {
    req.body.emailVerified = null;
  }

  if (req.body.phoneVerified === 'true' || req.body.phoneVerified === true) {
    req.body.phoneVerified = new Date();
  } else if (req.body.phoneVerified === 'false' || req.body.phoneVerified === false) {
    req.body.phoneVerified = null;
  }

  // Transform dateOfBirth to Date object or null if empty
  if (req.body.dateOfBirth && req.body.dateOfBirth !== "") {
    const dob = new Date(req.body.dateOfBirth);
    req.body.dateOfBirth = isNaN(dob.getTime()) ? null : dob;
  } else {
    req.body.dateOfBirth = null;
  }

  if (req.file) {
    req.body.avatar = await optimizeAndSaveImage(req.file, 'avatars');
  }
  const result = await userServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const result = await userServices.getUserById(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  // Parse addresses if sent as string (from FormData)
  if (typeof req.body.addresses === 'string') {
    req.body.addresses = JSON.parse(req.body.addresses);
  }

  // Cast verification fields to Dates for Prisma
  if (req.body.emailVerified === 'true' || req.body.emailVerified === true) {
    req.body.emailVerified = new Date();
  } else if (req.body.emailVerified === 'false' || req.body.emailVerified === false) {
    req.body.emailVerified = null;
  }

  if (req.body.phoneVerified === 'true' || req.body.phoneVerified === true) {
    req.body.phoneVerified = new Date();
  } else if (req.body.phoneVerified === 'false' || req.body.phoneVerified === false) {
    req.body.phoneVerified = null;
  }

  // Transform dateOfBirth to Date object or null if empty
  if (req.body.dateOfBirth && req.body.dateOfBirth !== "") {
    const dob = new Date(req.body.dateOfBirth);
    req.body.dateOfBirth = isNaN(dob.getTime()) ? null : dob;
  } else {
    req.body.dateOfBirth = null;
  }

  if (req.file) {
    req.body.avatar = await optimizeAndSaveImage(req.file, 'avatars');
  }
  const result = await userServices.updateUser(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const updateStatus = catchAsync(async (req, res) => {
  const result = await userServices.updateStatus(req.params.id as string, req.body.status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User status updated successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const result = await userServices.resetPassword(req.params.id as string, req.body.password);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

export const userControllers = {
  getProfile,
  updateProfile,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateStatus,
  resetPassword,
};

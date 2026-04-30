import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import ApiError from '../../errors/ApiError';
import { userRepository } from './user.repository';

const getUsers = async (query: any) => {
  return await userRepository.getUsers(query);
};

const getUserById = async (id: string) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const createUser = async (payload: any) => {
  const { email, password, roleId, ...userData } = payload;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Email already exists', [{ field: 'email', message: 'Email already exists' }]);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  return await userRepository.createUser(
    { ...userData, email, password: hashedPassword },
    roleId
  );
};

const updateUser = async (id: string, payload: any) => {
  const { roleId, ...userData } = payload;

  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (userData.email && userData.email !== user.email) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ApiError(httpStatus.CONFLICT, 'Email already exists', [{ field: 'email', message: 'Email already exists' }]);
    }
  }

  return await userRepository.updateUser(id, userData, roleId);
};

const updateStatus = async (id: string, status: string) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return await userRepository.updateUser(id, { status });
};

const resetPassword = async (id: string, newPassword?: string) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const passwordToSet = newPassword || Math.random().toString(36).slice(-8);
  const hashedPassword = await bcrypt.hash(passwordToSet, 10);

  await userRepository.updateUser(id, { password: hashedPassword });

  return { temporaryPassword: passwordToSet };
};

export const userServices = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateStatus,
  resetPassword,
};

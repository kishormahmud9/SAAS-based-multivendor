import { prisma } from '../../db_connection';

const findUserByEmail = async (email: string) => {
  return await (prisma as any).user.findUnique({
    where: { email, isDeleted: false },
  });
};

const findUserById = async (id: string) => {
  return await (prisma as any).user.findUnique({
    where: { id, isDeleted: false },
  });
};

const createUser = async (data: any) => {
  return await (prisma as any).user.create({ data });
};

const updateUser = async (id: string, data: any) => {
  return await (prisma as any).user.update({ where: { id }, data });
};

// ─── OTP ──────────────────────────────────────────────────────────────────────

const createOtp = async (data: any) => {
  return await (prisma as any).oTPVerification.create({ data });
};

const findRecentOtp = async (target: string, purpose: string) => {
  return await (prisma as any).oTPVerification.findFirst({
    where: { target, purpose, verified: false },
    orderBy: { createdAt: 'desc' },
  });
};

const verifyOtp = async (id: string) => {
  return await (prisma as any).oTPVerification.update({
    where: { id },
    data: { verified: true },
  });
};

const deleteOtps = async (target: string, purpose: string) => {
  return await (prisma as any).oTPVerification.deleteMany({
    where: { target, purpose },
  });
};

const getUserPermissions = async (userId: string) => {
  const userWithRoles = await (prisma as any).user.findUnique({
    where: { id: userId },
    include: {
      roleAssignments: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!userWithRoles) return [];

  const permissions = userWithRoles.roleAssignments.flatMap((assignment: any) =>
    assignment.role.permissions.map((p: any) => p.permission.name),
  );

  return [...new Set(permissions)]; // Unique permissions
};

// ─── Verification Tokens ──────────────────────────────────────────────────────
const createVerificationToken = async (data: any) => {
  return await (prisma as any).verificationToken.create({ data });
};

const findVerificationToken = async (token: string, type: string) => {
  return await (prisma as any).verificationToken.findUnique({
    where: { token, type, usedAt: null },
  });
};

const useVerificationToken = async (id: string) => {
  return await (prisma as any).verificationToken.update({
    where: { id },
    data: { usedAt: new Date() },
  });
};

export const authRepository = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  createOtp,
  findRecentOtp,
  verifyOtp,
  deleteOtps,
  getUserPermissions,
  createVerificationToken,
  findVerificationToken,
  useVerificationToken,
};



import { prisma } from "../../db_connection";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { sendEmail } from "../../utils/sendEmail";
import crypto from "crypto";
import { generateToken, verifyToken } from "../../utils/jwt";
import config from "../../config";

const db = prisma as any;

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.status === 'BLOCKED' || (user.lockedUntil && user.lockedUntil > new Date())) {
    throw new ApiError(httpStatus.FORBIDDEN, "User is locked or blocked");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // Optionally: Increment failed login attempts here and lock out after 5
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  return user;
};

const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  contactNo: string;
}) => {
  const result = await prisma.$transaction(async (tx) => {
    const existingUser = await tx.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new ApiError(httpStatus.CONFLICT, "Email already exists");
    }

    const hashed = await bcrypt.hash(payload.password, 12); // Increased cost factor to 12

    const user = await tx.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashed,
        phone: payload.contactNo,
      },
    });

    const otp = crypto.randomInt(100000, 999999).toString();
    await tx.oTPVerification.deleteMany({
      where: { target: payload.email, purpose: "EMAIL_VERIFY" }
    });
    await tx.oTPVerification.create({
      data: {
        target: payload.email,
        otp,
        purpose: "EMAIL_VERIFY",
        expiresAt: new Date(Date.now() + 2 * 60 * 1000) // 2 minutes
      }
    });

    return { user, otp };
  });

  await sendEmail({
    to: payload.email,
    subject: "Verify Your Email - ReadyMart",
    tempName: "otp",
    tempData: {
      name: payload.name,
      otp: result.otp,
    },
  });

  return result.user;
};

// Forget Password
const generateOtp = (length = 6) => {
  const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString().padStart(length, '0');
  return otp;
};

const forgotPassword_sendPassword = async (email: string) => {
  const isUserExist = await db.user.findUnique({
    where: { email: email },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  const otp = generateOtp();

  await prisma.oTPVerification.deleteMany({
    where: { target: email, purpose: "PASSWORD_RESET" }
  });

  await prisma.oTPVerification.create({
    data: {
      target: email,
      otp,
      purpose: "PASSWORD_RESET",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes validity
    }
  });

  await sendEmail({
    to: email,
    subject: "Your OTP Code for Password Reset",
    tempName: "otp",
    tempData: {
      name: isUserExist.name,
      otp: otp,
    },
  });
};

// verify OTP for forgot password and return Reset Token
const verifyOTP = async (email: string, otp: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const record = await prisma.oTPVerification.findFirst({
    where: {
      target: email,
      otp,
      purpose: "PASSWORD_RESET",
      verified: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!record) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid OTP");
  }

  if (record.expiresAt < new Date()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "OTP expired");
  }

  await prisma.oTPVerification.update({
    where: { id: record.id },
    data: { verified: true },
  });

  // Generate a short-lived Password Reset Token (valid for 15 mins)
  const resetSecret = process.env.JWT_RESET_SECRET || "default_reset_secret_please_change";
  const resetToken = generateToken({ email: user.email, id: user.id, name: user.name }, resetSecret, "15m");

  return { resetToken };
};

const changePassword = async (resetToken: string, newPassword: string) => {

  if (!resetToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Reset token is required");
  }

  const resetSecret = process.env.JWT_RESET_SECRET || "default_reset_secret_please_change";
  let decoded;
  try {
    decoded = verifyToken(resetToken, resetSecret);
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid or expired reset token");
  }

  const email = decoded.email;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!newPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "New password is required");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await db.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      passwordChangedAt: new Date(),
      refreshToken: null // Invalidate existing sessions
    },
  });

  await prisma.oTPVerification.deleteMany({
    where: { target: email, purpose: "PASSWORD_RESET" },
  });

  return {
    success: true,
    message: "Password changed successfully",
  };
};

const verifyRegistrationEmail = async (email: string, otp: string) => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  
  if (user.status === "ACTIVE" && user.emailVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already verified");
  }

  const record = await prisma.oTPVerification.findFirst({
    where: { target: email, otp, purpose: "EMAIL_VERIFY", verified: false },
    orderBy: { createdAt: "desc" },
  });

  if (!record) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid OTP");
  if (record.expiresAt < new Date()) throw new ApiError(httpStatus.UNAUTHORIZED, "OTP expired");

  await prisma.$transaction(async (tx) => {
    await tx.oTPVerification.update({
      where: { id: record.id },
      data: { verified: true },
    });
    await tx.user.update({
      where: { email },
      data: {
        status: "ACTIVE",
        emailVerified: new Date(),
      },
    });
  });

  return { success: true, message: "Email verified successfully" };
};

export const authServices = {
  loginUser,
  registerUser,
  forgotPassword_sendPassword,
  verifyOTP,
  changePassword,
  verifyRegistrationEmail,
};

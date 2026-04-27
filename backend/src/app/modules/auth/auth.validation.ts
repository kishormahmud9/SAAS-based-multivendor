import { z } from "zod";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    contactNo: z.string().min(1, "Contact number is required"),
  }),
});

export const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
  }),
});

export const verifyOTPValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    otp: z.string().min(4, "OTP is required"),
  }),
});

export const changePasswordValidationSchema = z.object({
  body: z.object({
    resetToken: z.string({ required_error: "Reset token is required" }),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const authValidations = {
  loginValidationSchema,
  registerValidationSchema,
  forgotPasswordValidationSchema,
  verifyOTPValidationSchema,
  changePasswordValidationSchema,
};

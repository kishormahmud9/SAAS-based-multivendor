import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authRateLimiter } from "../../middlewares/rateLimiter";

const router = Router()

router.post("/login", authRateLimiter, validateRequest(authValidations.loginValidationSchema), authControllers.userLogin)
router.post("/register", validateRequest(authValidations.registerValidationSchema), authControllers.userRegister)
router.post("/logout", authControllers.userLogout)
router.post("/forgot-password", authRateLimiter, validateRequest(authValidations.forgotPasswordValidationSchema), authControllers.userForgotPassword)  // OTP SEND
router.post("/verify-otp", authRateLimiter, validateRequest(authValidations.verifyOTPValidationSchema), authControllers.userVerifyOTP) // OTP CHECK -> Return Reset Token
router.post("/change-password", validateRequest(authValidations.changePasswordValidationSchema), authControllers.userChangePassword) // Change Password securely
router.post("/verify-email", authRateLimiter, validateRequest(authValidations.verifyOTPValidationSchema), authControllers.verifyRegistrationEmail) // Verify Email OTP

export const authRouter = router;

import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes",
    statusCode: 429
  },
  standardHeaders: true,
  legacyHeaders: false,
});

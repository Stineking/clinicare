import { ipKeyGenerator, rateLimit } from "express-rate-limit";

export const rateLimiter = rateLimit({
  windows: 1 * 6 * 1000, //1 minute
  max: 3, //attempts within a 1 minute window
  message: "Too many requests, please try again later.",
  standardHeaders: true, //return rate limit info in headers
  keyGenerator: (req) => {
    return `${ipKeyGenerator(req.ip)}-${req.headers["user-agent"] || "unknown-user-agent"}`;
  },
  legacyHeaders: false, //disable X-RateLimit headers
  trustProxy: true, //trust the X-Forwarded-For header.
});

//rate Limit for refresh token endpoint
export const refreshTokenLimit = rateLimit({
  windowMs: 2 * 60 * 1000, //1 minute
  max: 10, //attempts within a 1 minute window
  message: "Too many requests, please try again later.",
  standardHeaders: true, //return rate limit info in headers
  keyGenerator: (req) => {
    return `${ipKeyGenerator(req.ip)}-${req.headers["user-agent"] || "unknown-user-agent"}`;
  },

  legacyHeaders: false, //disable X-RateLimit headers
  trustProxy: true, //trust the X-Forwarded-For header.
});


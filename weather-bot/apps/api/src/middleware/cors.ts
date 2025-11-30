import { cors } from "hono/cors";

export const corsMiddleware = cors({
  origin: (origin) => {
    // to accept postman request
    if (!origin) return origin;

    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
      return origin;
    }

    // allow production domains
    if (origin.endsWith(".vercel.app")) return origin;
    if (origin.endsWith(".pages.dev")) return origin;
    //if (origin === "https://www.real-domain.com") return origin;

    return undefined;
  },

  credentials: true,
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400, //cache
});

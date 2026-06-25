import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { verifyToken } from "../utils/verifyToken";

export const protectRoute = createMiddleware(async (c, next) => {
  try {
    const token = getCookie(c, "token");

    if (!token) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    const decoded = verifyToken(token);

    c.set("userId", decoded.userId);

    await next();
  } catch {
    return c.json(
      {
        success: false,
        message: "Invalid or expired token",
      },
      401
    );
  }
});
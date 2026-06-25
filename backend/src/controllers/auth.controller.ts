import type { Context, Handler } from "hono";
import { setCookie, deleteCookie, getCookie } from "hono/cookie";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User.model.ts";
import { generateToken } from "../utils/generateToken.ts";
import { verifyToken } from "../utils/verifyToken.ts";

export const register = async (c: Context) => {
  try {
    const { username, email, password } = await c.req.json();

    if (!username || !email || !password) {
      return c.json(
        {
          success: false,
          message: "All fields are required",
        },
        400
      );
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return c.json(
        {
          success: false,
          message: "Username or email already exists",
        },
        409
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    setCookie(c, "token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return c.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      201
    );
  } catch (error) {
    console.error(error);

    return c.json(
      {
        success: false,
        message: "Internal server error",
      },
      500
    );
  }
};

export const login: Handler = async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json(
        {
          success: false,
          message: "Email and password are required",
        },
        400
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return c.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        401
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return c.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        401
      );
    }

    const token = generateToken(user._id.toString());

    setCookie(c, "token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return c.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return c.json(
      {
        success: false,
        message: "Internal server error",
      },
      500
    );
  }
};

export const logout: Handler = async (c) => {
  try {
    deleteCookie(c, "token", {
      path: "/",
    });

    return c.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return c.json(
      {
        success: false,
        message: "Internal server error",
      },
      500
    );
  }
};

export const me: Handler = async (c) => {
  try {
    const token = getCookie(c, "token");

    if (!token) {
      return c.json(
        {
          authenticated: false,
          message: "Not authenticated",
        },
        401
      );
    }

    const decoded = verifyToken(token) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);

    if (!user) {
      return c.json(
        {
          authenticated: false,
          message: "User not found",
        },
        401
      );
    }

    return c.json({
      authenticated: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return c.json(
      {
        authenticated: false,
        message: "Invalid token",
      },
      401
    );
  }
};
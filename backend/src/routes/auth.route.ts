import { Hono } from "hono";

import { register, login, logout, me } from "../controllers/auth.controller.ts";

const authRoutes = new Hono();

authRoutes.post("/login", login);

authRoutes.post("/register", register);

authRoutes.post("/logout", logout);

authRoutes.get("/me", me);

export default authRoutes;
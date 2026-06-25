import { Hono } from "hono";

const authRoutes = new Hono();

authRoutes.post("/login", (c) => {
  return c.json({ message: "Login route" });
});

authRoutes.post("/register", (c) => {
  return c.json({ message: "Register route" });
});

authRoutes.post("/logout", (c) => {
    return c.json({ message: "Logout route" });
});

authRoutes.post("/me", (c) => {
    return c.json({ message: "me route" });
});

export default authRoutes;
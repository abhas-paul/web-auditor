import api from "@/lib/axios";

const authService = {
  /**
   * Register a new user
   */
  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  /**
   * Login
   */
  login: async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  /**
   * Logout
   */
  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  /**
   * Get current authenticated user
   */
  me: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export default authService;
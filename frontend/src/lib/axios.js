import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// -----------------------------
// Request Interceptor
// -----------------------------
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------
// Response Interceptor
// -----------------------------
api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Server didn't respond
    if (!error.response) {
      return Promise.reject({
        ...error,
        message:
          "Unable to connect to the server. Please try again.",
      });
    }

    // We DO NOT redirect on 401 here.
    // Let useAuth() and protected routes decide what to do.
    return Promise.reject(error);
  }
);

export default api;
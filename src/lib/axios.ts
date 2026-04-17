/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔥 required for refresh cookies
});

/* ================= REQUEST INTERCEPTOR ================= */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vendor_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* ================= RESPONSE INTERCEPTOR ================= */

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const errorCode = error.response?.data?.error_code;

    // ✅ Trigger refresh for BOTH cases
    if (
      (status === 401 || errorCode === "TOKEN_EXPIRED") &&
      !originalRequest._retry
    ) {
      // 🔁 If already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("🔄 Refreshing token...");

        // 🔥 IMPORTANT: use plain axios (NOT axiosInstance)
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newToken = res.data.data.token;

        if (!newToken) {
          throw new Error("No token returned from refresh");
        }

        // ✅ Save new token
        localStorage.setItem("vendor_token", newToken);

        // ✅ Update axios defaults
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${newToken}`;

        // ✅ Retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // ✅ Process queued requests
        processQueue(null, newToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        console.error("❌ Refresh failed → logging out");

        // ❌ Clear everything
        localStorage.removeItem("vendor_token");
        localStorage.removeItem("vendor_user");
        localStorage.removeItem("vendor_profile");

        // 🔥 redirect to login
        window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

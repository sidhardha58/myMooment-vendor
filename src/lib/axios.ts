import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR =================
   Automatically attach vendor token to every request
*/
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

/* ================= RESPONSE INTERCEPTOR =================
   Handle global API errors
*/
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: handle unauthorized globally
    if (error.response?.status === 401) {
      console.error("Unauthorized request");
      // Later we can redirect to login
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

import axios from "axios";

// Environment variables
const API_URL = import.meta.env.VITE_OCSF_API_URL || "https://schema.ocsf.io";
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || "10000");
const API_RETRY_ATTEMPTS = parseInt(
  import.meta.env.VITE_API_RETRY_ATTEMPTS || "3"
);
const API_RETRY_DELAY = parseInt(
  import.meta.env.VITE_API_RETRY_DELAY || "1000"
);
const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === "true";
const LOG_API_CALLS = import.meta.env.VITE_LOG_API_CALLS === "true";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (LOG_API_CALLS) {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
    }
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    if (LOG_API_CALLS) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (LOG_API_CALLS) {
      console.error(
        `❌ API Error: ${error.response?.status} ${error.config?.url}`,
        error.response?.data
      );
    }
    return Promise.reject(error);
  }
);

// Retry mechanism
const retryRequest = async (config, retries = API_RETRY_ATTEMPTS) => {
  try {
    return await apiClient(config);
  } catch (error) {
    if (retries > 0 && error.response?.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, API_RETRY_DELAY));
      return retryRequest(config, retries - 1);
    }
    throw error;
  }
};

// Generic API request function
export const apiRequest = async (config, retry = true) => {
  try {
    const response = retry
      ? await retryRequest(config)
      : await apiClient(config);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const apiError = {
      error: error.response?.data?.error || "Unknown error",
      message: error.response?.data?.message || error.message,
      status: error.response?.status || 500,
    };

    if (DEBUG_MODE) {
      console.error("API Error Details:", apiError);
    }

    throw apiError;
  }
};

// Export the configured axios instance
export default apiClient;

// Export configuration constants
export const API_CONFIG = {
  BASE_URL: API_URL,
  TIMEOUT: API_TIMEOUT,
  RETRY_ATTEMPTS: API_RETRY_ATTEMPTS,
  RETRY_DELAY: API_RETRY_DELAY,
  DEBUG_MODE,
  LOG_API_CALLS,
};

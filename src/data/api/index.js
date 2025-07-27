// Main API service exports
export * from "./categories.js";
export * from "./objects.js";
export * from "./schema.js";
export * from "./sample.js";

// Re-export API configuration
export { default as apiClient, apiRequest, API_CONFIG } from "@/config/api.js";

import { apiRequest } from "@/config/api.js";

/**
 * Get OCSF schema base event class
 */
export const getBaseEvent = async () => {
  return apiRequest({
    method: "GET",
    url: "/api/base_event",
  });
};

/**
 * Get OCSF schema categories
 */
export const getCategories = async () => {
  return apiRequest({
    method: "GET",
    url: "/api/categories",
  });
};

/**
 * Get OCSF schema classes defined in the named category
 * @param categoryName - The category name (may contain extension name, e.g., "dev/policy")
 */
export const getClassesByCategory = async (categoryName) => {
  return apiRequest({
    method: "GET",
    url: `/api/categories/${encodeURIComponent(categoryName)}`,
  });
};

/**
 * Get OCSF schema classes
 */
export const getAllClasses = async () => {
  return apiRequest({
    method: "GET",
    url: "/api/classes",
  });
};

/**
 * Get OCSF schema class by name
 * @param className - The class name (may contain extension name, e.g., "dev/cpu_usage")
 */
export const getClassByName = async (className) => {
  return apiRequest({
    method: "GET",
    url: `/api/classes/${encodeURIComponent(className)}`,
  });
};

/**
 * Search classes by keyword
 * @param keyword - Search term
 */
export const searchClasses = async (keyword) => {
  const allClasses = await getAllClasses();
  const filteredClasses = allClasses.data.filter(
    (cls) =>
      cls.name.toLowerCase().includes(keyword.toLowerCase()) ||
      cls.description.toLowerCase().includes(keyword.toLowerCase()) ||
      cls.category.toLowerCase().includes(keyword.toLowerCase())
  );

  return {
    data: filteredClasses,
    status: 200,
  };
};

/**
 * Get classes by multiple categories
 * @param categoryNames - Array of category names
 */
export const getClassesByCategories = async (categoryNames) => {
  const allClasses = [];

  for (const categoryName of categoryNames) {
    try {
      const response = await getClassesByCategory(categoryName);
      allClasses.push(...response.data);
    } catch (error) {
      console.warn(
        `Failed to fetch classes for category: ${categoryName}`,
        error
      );
    }
  }

  return {
    data: allClasses,
    status: 200,
  };
};

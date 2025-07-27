import { apiRequest } from "@/config/api.js";

/**
 * Get randomly generated sample data for the base event class
 */
export const getBaseEventSample = async () => {
  return apiRequest({
    method: "GET",
    url: "/sample/base_event",
  });
};

/**
 * Get randomly generated sample data for the given event class name
 * @param className - The class name (may contain extension name, e.g., "dev/cpu_usage")
 */
export const getClassSample = async (className) => {
  return apiRequest({
    method: "GET",
    url: `/sample/classes/${encodeURIComponent(className)}`,
  });
};

/**
 * Get randomly generated sample data for the given object name
 * @param objectName - The object name (may contain extension name, e.g., "dev/os_service")
 */
export const getObjectSample = async (objectName) => {
  return apiRequest({
    method: "GET",
    url: `/sample/objects/${encodeURIComponent(objectName)}`,
  });
};

/**
 * Generate multiple sample events for a class
 * @param className - The class name
 * @param count - Number of samples to generate
 */
export const generateMultipleClassSamples = async (className, count = 5) => {
  const samples = [];

  for (let i = 0; i < count; i++) {
    try {
      const response = await getClassSample(className);
      samples.push(response.data);
    } catch (error) {
      console.warn(
        `Failed to generate sample ${i + 1} for class: ${className}`,
        error
      );
    }
  }

  return {
    data: samples,
    status: 200,
  };
};

/**
 * Generate sample events for multiple classes
 * @param classNames - Array of class names
 * @param samplesPerClass - Number of samples per class
 */
export const generateSamplesForClasses = async (
  classNames,
  samplesPerClass = 3
) => {
  const allSamples = [];

  for (const className of classNames) {
    try {
      const response = await generateMultipleClassSamples(
        className,
        samplesPerClass
      );
      allSamples.push(...response.data);
    } catch (error) {
      console.warn(`Failed to generate samples for class: ${className}`, error);
    }
  }

  return {
    data: allSamples,
    status: 200,
  };
};

/**
 * Generate sample objects for multiple object names
 * @param objectNames - Array of object names
 */
export const generateObjectSamples = async (objectNames) => {
  const allSamples = [];

  for (const objectName of objectNames) {
    try {
      const response = await getObjectSample(objectName);
      allSamples.push(response.data);
    } catch (error) {
      console.warn(
        `Failed to generate sample for object: ${objectName}`,
        error
      );
    }
  }

  return {
    data: allSamples,
    status: 200,
  };
};

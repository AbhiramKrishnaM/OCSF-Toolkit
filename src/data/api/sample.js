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
  try {
    // Make a single API call with count parameter if the API supports it
    const response = await apiRequest({
      method: "GET",
      url: `/sample/classes/${encodeURIComponent(className)}?count=${count}`,
    });


    
    // If the API returns an array, use it; otherwise, create a single item array
    const data = response.data;
    const samples = Array.isArray(data) ? data : [data];
    
    // If we need more samples than returned, duplicate the first one
    while (samples.length < count) {
      samples.push({ ...samples[0], id: `duplicate_${samples.length}` });
    }
    
    return {
      data: samples.slice(0, count),
      status: 200,
    };
  } catch (error) {
    console.warn(`Failed to generate samples for class: ${className}`, error);
    
    // Return mock data if API fails
    const mockSamples = [];
    for (let i = 0; i < count; i++) {
      mockSamples.push({
        activity_name: `${className} sample ${i + 1}`,
        timestamp: new Date().toISOString(),
        status: 'mock_data',
        id: `mock_${i}`
      });
    }
    
    return {
      data: mockSamples,
      status: 200,
    };
  }
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

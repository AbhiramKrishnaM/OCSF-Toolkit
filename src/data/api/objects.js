import { apiRequest } from "@/config/api.js";

/**
 * Get OCSF schema data types
 */
export const getDataTypes = async () => {
  return apiRequest({
    method: "GET",
    url: "/api/data_types",
  });
};

/**
 * Get OCSF schema objects
 */
export const getAllObjects = async () => {
  return apiRequest({
    method: "GET",
    url: "/api/objects",
  });
};

/**
 * Get OCSF schema object by name
 * @param objectName - The object name (may contain extension name, e.g., "dev/os_service")
 */
export const getObjectByName = async (objectName) => {
  return apiRequest({
    method: "GET",
    url: `/api/objects/${encodeURIComponent(objectName)}`,
  });
};

/**
 * Search objects by keyword
 * @param keyword - Search term
 */
export const searchObjects = async (keyword) => {
  const allObjects = await getAllObjects();
  const filteredObjects = allObjects.data.filter(
    (obj) =>
      obj.name.toLowerCase().includes(keyword.toLowerCase()) ||
      obj.description.toLowerCase().includes(keyword.toLowerCase())
  );

  return {
    data: filteredObjects,
    status: 200,
  };
};

/**
 * Get objects by multiple names
 * @param objectNames - Array of object names
 */
export const getObjectsByNames = async (objectNames) => {
  const objects = [];

  for (const objectName of objectNames) {
    try {
      const response = await getObjectByName(objectName);
      objects.push(response.data);
    } catch (error) {
      console.warn(`Failed to fetch object: ${objectName}`, error);
    }
  }

  return {
    data: objects,
    status: 200,
  };
};

/**
 * Get data type by name
 * @param typeName - The data type name
 */
export const getDataTypeByName = async (typeName) => {
  const allTypes = await getDataTypes();
  const dataType = allTypes.data.find((type) => type.name === typeName);

  if (!dataType) {
    throw new Error(`Data type not found: ${typeName}`);
  }

  return {
    data: dataType,
    status: 200,
  };
};

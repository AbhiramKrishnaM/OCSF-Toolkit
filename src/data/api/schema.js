import { apiRequest } from "@/config/api.js";

/**
 * Get OCSF schema extensions
 */
export const getExtensions = async () => {
  return apiRequest({
    method: "GET",
    url: "/api/extensions",
  });
};

/**
 * Get OCSF schema profiles
 */
export const getProfiles = async () => {
  return apiRequest({
    method: "GET",
    url: "/api/profiles",
  });
};

/**
 * Get OCSF schema profile by name
 * @param profileName - The profile name (may contain extension name, e.g., "linux/linux_users")
 */
export const getProfileByName = async (profileName) => {
  return apiRequest({
    method: "GET",
    url: `/api/profiles/${encodeURIComponent(profileName)}`,
  });
};

/**
 * Get OCSF schema version
 */
export const getVersion = async () => {
  return apiRequest({
    method: "GET",
    url: "/api/version",
  });
};

/**
 * Get available OCSF schema versions
 */
export const getVersions = async () => {
  return apiRequest({
    method: "GET",
    url: "/api/versions",
  });
};

/**
 * Get OCSF schema definitions (complete schema)
 */
export const getSchemaDefinitions = async () => {
  return apiRequest({
    method: "GET",
    url: "/export/schema",
  });
};

/**
 * Get extension by name
 * @param extensionName - The extension name
 */
export const getExtensionByName = async (extensionName) => {
  const allExtensions = await getExtensions();
  const extension = allExtensions.data.find(
    (ext) => ext.name === extensionName
  );

  if (!extension) {
    throw new Error(`Extension not found: ${extensionName}`);
  }

  return {
    data: extension,
    status: 200,
  };
};

/**
 * Get profiles by extension
 * @param extensionName - The extension name
 */
export const getProfilesByExtension = async (extensionName) => {
  const allProfiles = await getProfiles();
  const extensionProfiles = allProfiles.data.filter((profile) =>
    profile.name.startsWith(`${extensionName}/`)
  );

  return {
    data: extensionProfiles,
    status: 200,
  };
};

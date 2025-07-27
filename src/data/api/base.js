// Documentation for available APIs

const BASE_URL = "https://schema.ocsf.io/";

/**
 * The OCSF Schema API
 *
 * Categories and Classes
 * All the requests listed below for Categories and Classes are available at the following URL and they all are get requests
 *
 * 1. https://schema.ocsf.io/api/base_event
 * Get OCSF schema base event class.
 * 2. https://schema.ocsf.io/api/categories
 * Get OCSF schema categories.
 * 3. /api/categories/{name} https://schema.ocsf.io/api/categories/t
 * Get OCSF schema classes defined in the named category. The category name may contain an extension name. For example, "dev/policy".
 * 4. https://schema.ocsf.io/api/classes
 * Get OCSF schema classes.
 * 5. /api/classes/{name} https://schema.ocsf.io/api/classes/t
 * Get OCSF schema class by name. The class name may contain an extension name. For example, "dev/cpu_usage".
 *
 * Objects and Types
 * All the requests listed below for Objects and Types are available at the following URL and they all are get requests
 *
 * 1. /api/data_types
 * Get OCSF schema data types.
 * 2. /api/objects
 * Get OCSF schema objects.
 * 3. /api/objects/{name}
 * Get OCSF schema object by name. The object name may contain an extension name. For example, "dev/os_service".
 *
 * Dictionary
 * All the requests listed below for Dictionary are available at the following URL and they all are get requests
 *
 * 1. /api/dictionary
 * Get OCSF schema dictionary.
 *
 * Schema
 * All the requests listed below for Schema are available at the following URL and they all are get requests
 * 1. /api/extensions
 * Get OCSF schema extensions.
 * 2. /api/profiles
 * Get OCSF schema profiles.
 * 3. /api/profiles/{name}
 * Get OCSF schema profile by name. The profile name may contain an extension name. For example, "linux/linux_users".
 * 4. /api/version
 * Get OCSF schema version.
 * 5. /api/versions
 * Get available OCSF schema versions.
 *
 * Schema Export
 * All the requests listed below for Schema Export are available at the following URL and they all are get requests
 * 1. /export/base_event
 * Get OCSF schema base event class.
 * 2. /export/classes
 * Get OCSF schema classes.
 * 3. /export/objects
 * Get OCSF schema objects.
 * 4. /export/schema
 * Get OCSF schema definitions, including data types, objects, classes, and the dictionary of attributes.
 *
 * Sample Data
 * All the requests listed below for Sample Data are available at the following URL and they all are get requests
 * 1. /sample/base_event
 * This API returns randomly generated sample data for the base event class.
 * 2. /sample/classes/{name}
 * This API returns randomly generated sample data for the given event class name. The class name may contain an extension name. For example, "dev/cpu_usage".
 * 3. /sample/objects/{name}
 * This API returns randomly generated sample data for the given object name. The object name may contain an extension name. For example, "dev/os_service".
 *
 * JSON Schema
 * All the requests listed below for JSON Schema are available at the following URL and they all are get requests
 * 1. /schema/classes/{name}
 * Get OCSF schema class by name, using JSON schema Draft-07 format (see http://json-schema.org). The class name may contain an extension name. For example, "dev/cpu_usage".
 * 2. /schema/objects/{name}
 * Get OCSF object by name, using JSON schema Draft-07 format (see http://json-schema.org). The object name may contain an extension name. For example, "dev/printer".
 *
 */

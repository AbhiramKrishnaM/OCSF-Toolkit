export class OcsfValidator {
    constructor() {
      // OCSF field definitions for common event classes
      this.ocsfSchemas = {
        process_activity: {
          required_fields: ['activity_name', 'timestamp', 'process'],
          optional_fields: ['actor', 'device', 'metadata', 'severity', 'status'],
          field_types: {
            'activity_name': 'string',
            'timestamp': 'string',
            'process': 'object',
            'actor': 'object',
            'device': 'object',
            'metadata': 'object',
            'severity': 'string',
            'status': 'string'
          },
          field_descriptions: {
            'activity_name': 'The name of the activity that occurred',
            'timestamp': 'When the event occurred (ISO 8601 format)',
            'process': 'Information about the process involved',
            'actor': 'Information about who/what performed the action',
            'device': 'Information about the device where this occurred',
            'metadata': 'Additional metadata about the event',
            'severity': 'How serious this event is (Info, Low, Medium, High, Critical)',
            'status': 'The status of the activity (Success, Failure, Other)'
          }
        },
        
        file_activity: {
          required_fields: ['activity_name', 'timestamp', 'file'],
          optional_fields: ['actor', 'device', 'metadata', 'severity', 'status'],
          field_types: {
            'activity_name': 'string',
            'timestamp': 'string',
            'file': 'object',
            'actor': 'object',
            'device': 'object',
            'metadata': 'object',
            'severity': 'string',
            'status': 'string'
          },
          field_descriptions: {
            'activity_name': 'The type of file activity (create, read, write, delete)',
            'timestamp': 'When the event occurred (ISO 8601 format)',
            'file': 'Information about the file involved',
            'actor': 'Information about who/what performed the action',
            'device': 'Information about the device where this occurred',
            'metadata': 'Additional metadata about the event',
            'severity': 'How serious this event is (Info, Low, Medium, High, Critical)',
            'status': 'The status of the activity (Success, Failure, Other)'
          }
        },
        
        network_activity: {
          required_fields: ['activity_name', 'timestamp', 'src_endpoint', 'dst_endpoint'],
          optional_fields: ['actor', 'device', 'metadata', 'severity', 'status', 'traffic'],
          field_types: {
            'activity_name': 'string',
            'timestamp': 'string',
            'src_endpoint': 'object',
            'dst_endpoint': 'object',
            'actor': 'object',
            'device': 'object',
            'metadata': 'object',
            'severity': 'string',
            'status': 'string',
            'traffic': 'object'
          },
          field_descriptions: {
            'activity_name': 'The type of network activity (connection, traffic, etc.)',
            'timestamp': 'When the event occurred (ISO 8601 format)',
            'src_endpoint': 'Information about the source endpoint',
            'dst_endpoint': 'Information about the destination endpoint',
            'actor': 'Information about who/what performed the action',
            'device': 'Information about the device where this occurred',
            'metadata': 'Additional metadata about the event',
            'severity': 'How serious this event is (Info, Low, Medium, High, Critical)',
            'status': 'The status of the activity (Success, Failure, Other)',
            'traffic': 'Information about the network traffic'
          }
        },
        
        authentication: {
          required_fields: ['activity_name', 'timestamp', 'actor', 'service'],
          optional_fields: ['device', 'metadata', 'severity', 'status', 'dst_endpoint'],
          field_types: {
            'activity_name': 'string',
            'timestamp': 'string',
            'actor': 'object',
            'service': 'object',
            'device': 'object',
            'metadata': 'object',
            'severity': 'string',
            'status': 'string',
            'dst_endpoint': 'object'
          },
          field_descriptions: {
            'activity_name': 'The type of authentication activity (login, logout, etc.)',
            'timestamp': 'When the event occurred (ISO 8601 format)',
            'actor': 'Information about who is being authenticated',
            'service': 'Information about the authentication service',
            'device': 'Information about the device where this occurred',
            'metadata': 'Additional metadata about the event',
            'severity': 'How serious this event is (Info, Low, Medium, High, Critical)',
            'status': 'The status of the activity (Success, Failure, Other)',
            'dst_endpoint': 'Information about the destination endpoint'
          }
        },
        
        security_finding: {
          required_fields: ['activity_name', 'timestamp', 'finding_info'],
          optional_fields: ['actor', 'device', 'metadata', 'severity', 'status', 'vulnerabilities'],
          field_types: {
            'activity_name': 'string',
            'timestamp': 'string',
            'finding_info': 'object',
            'actor': 'object',
            'device': 'object',
            'metadata': 'object',
            'severity': 'string',
            'status': 'string',
            'vulnerabilities': 'array'
          },
          field_descriptions: {
            'activity_name': 'The type of security finding (detection, alert, etc.)',
            'timestamp': 'When the event occurred (ISO 8601 format)',
            'finding_info': 'Information about the security finding',
            'actor': 'Information about who/what is involved',
            'device': 'Information about the device where this occurred',
            'metadata': 'Additional metadata about the event',
            'severity': 'How serious this event is (Info, Low, Medium, High, Critical)',
            'status': 'The status of the activity (Success, Failure, Other)',
            'vulnerabilities': 'List of vulnerabilities found'
          }
        },
        
        vulnerability_finding: {
          required_fields: ['activity_name', 'timestamp', 'vulnerabilities'],
          optional_fields: ['actor', 'device', 'metadata', 'severity', 'status', 'finding_info'],
          field_types: {
            'activity_name': 'string',
            'timestamp': 'string',
            'vulnerabilities': 'array',
            'actor': 'object',
            'device': 'object',
            'metadata': 'object',
            'severity': 'string',
            'status': 'string',
            'finding_info': 'object'
          },
          field_descriptions: {
            'activity_name': 'The type of vulnerability finding (scan, assessment, etc.)',
            'timestamp': 'When the event occurred (ISO 8601 format)',
            'vulnerabilities': 'List of vulnerabilities found',
            'actor': 'Information about who/what is involved',
            'device': 'Information about the device where this occurred',
            'metadata': 'Additional metadata about the event',
            'severity': 'How serious this event is (Info, Low, Medium, High, Critical)',
            'status': 'The status of the activity (Success, Failure, Other)',
            'finding_info': 'Information about the finding'
          }
        }
      };
    }
  
    validateData(data, ocsfClass) {
      if (!this.ocsfSchemas[ocsfClass]) {
        throw new Error(`Unknown OCSF class: ${ocsfClass}`);
      }
  
      const schema = this.ocsfSchemas[ocsfClass];
      const results = {
        ocsf_class: ocsfClass,
        total_events: data.length,
        validation_summary: {
          overall_score: 0,
          required_fields_coverage: 0,
          optional_fields_coverage: 0,
          data_type_accuracy: 0
        },
        field_analysis: {},
        event_samples: [],
        recommendations: []
      };
  
      // Analyze each event
          const fieldStats = {};
    let totalDataTypeMatches = 0;
    let totalDataTypeChecks = 0;
  
      data.forEach((event, index) => {
        // Sample first few events for detailed analysis
        if (index < 3) {
          results.event_samples.push({
            event_index: index,
            data: event,
            validation: this.validateEvent(event, schema)
          });
        }
  
        // Count field presence
        Object.keys(schema.field_types).forEach(fieldName => {
          if (!fieldStats[fieldName]) {
            fieldStats[fieldName] = {
              present: 0,
              missing: 0,
              correct_type: 0,
              incorrect_type: 0,
              total: 0
            };
          }
  
          fieldStats[fieldName].total++;
          
                  if (Object.prototype.hasOwnProperty.call(event, fieldName)) {
          fieldStats[fieldName].present++;
          
          // Check data type
          if (this.checkDataType(event[fieldName], schema.field_types[fieldName])) {
            fieldStats[fieldName].correct_type++;
            totalDataTypeMatches++;
          } else {
            fieldStats[fieldName].incorrect_type++;
          }
          totalDataTypeChecks++;
        } else {
          fieldStats[fieldName].missing++;
        }
        });
  
              // Count required vs optional fields
      schema.required_fields.forEach(field => {
        if (Object.prototype.hasOwnProperty.call(event, field)) {
          // Field is present
        }
      });
      });
  
      // Calculate overall scores
      const requiredFieldsPresent = Object.values(fieldStats)
        .filter(stat => schema.required_fields.includes(Object.keys(schema.field_types)[Object.values(fieldStats).indexOf(stat)]))
        .reduce((sum, stat) => sum + stat.present, 0);
      
      const totalRequiredFieldChecks = schema.required_fields.length * data.length;
      const totalOptionalFieldChecks = (Object.keys(schema.field_types).length - schema.required_fields.length) * data.length;
      const totalOptionalFieldsPresent = Object.values(fieldStats)
        .filter(stat => !schema.required_fields.includes(Object.keys(schema.field_types)[Object.values(fieldStats).indexOf(stat)]))
        .reduce((sum, stat) => sum + stat.present, 0);
  
      results.validation_summary.required_fields_coverage = 
        totalRequiredFieldChecks > 0 ? (requiredFieldsPresent / totalRequiredFieldChecks) * 100 : 0;
      
      results.validation_summary.optional_fields_coverage = 
        totalOptionalFieldChecks > 0 ? (totalOptionalFieldsPresent / totalOptionalFieldChecks) * 100 : 0;
      
      results.validation_summary.data_type_accuracy = 
        totalDataTypeChecks > 0 ? (totalDataTypeMatches / totalDataTypeChecks) * 100 : 0;
  
      // Calculate overall score (weighted average)
      const weights = { required: 0.5, optional: 0.3, types: 0.2 };
      results.validation_summary.overall_score = 
        (results.validation_summary.required_fields_coverage * weights.required) +
        (results.validation_summary.optional_fields_coverage * weights.optional) +
        (results.validation_summary.data_type_accuracy * weights.types);
  
      // Build field analysis
      results.field_analysis = Object.keys(fieldStats).map(fieldName => {
        const stat = fieldStats[fieldName];
        const isRequired = schema.required_fields.includes(fieldName);
        
        return {
          field_name: fieldName,
          is_required: isRequired,
          presence_rate: (stat.present / stat.total) * 100,
          data_type_accuracy: stat.total > 0 ? (stat.correct_type / stat.total) * 100 : 0,
          description: schema.field_descriptions[fieldName],
          expected_type: schema.field_types[fieldName],
          recommendations: this.getFieldRecommendations(fieldName, stat, isRequired, schema)
        };
      });
  
      // Generate overall recommendations
      results.recommendations = this.generateOverallRecommendations(results);
  
      return results;
    }
  
    validateEvent(event, schema) {
      const validation = {
        required_fields_missing: [],
        data_type_issues: [],
        score: 0
      };
  
          // Check required fields
    schema.required_fields.forEach(field => {
      if (!Object.prototype.hasOwnProperty.call(event, field)) {
        validation.required_fields_missing.push(field);
      }
    });

    // Check data types
    Object.keys(schema.field_types).forEach(field => {
      if (Object.prototype.hasOwnProperty.call(event, field)) {
        if (!this.checkDataType(event[field], schema.field_types[field])) {
          validation.data_type_issues.push({
            field,
            expected: schema.field_types[field],
            actual: typeof event[field]
          });
        }
      }
    });
  
      // Calculate event score
      const totalChecks = schema.required_fields.length + Object.keys(schema.field_types).length;
      const passedChecks = (schema.required_fields.length - validation.required_fields_missing.length) +
        (Object.keys(schema.field_types).length - validation.data_type_issues.length);
      
      validation.score = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 0;
  
      return validation;
    }
  
    checkDataType(value, expectedType) {
      switch (expectedType) {
        case 'string':
          return typeof value === 'string';
        case 'number':
          return typeof value === 'number';
        case 'boolean':
          return typeof value === 'boolean';
        case 'object':
          return typeof value === 'object' && value !== null && !Array.isArray(value);
        case 'array':
          return Array.isArray(value);
        default:
          return true; // Unknown type, assume valid
      }
    }
  
    getFieldRecommendations(fieldName, stat, isRequired, schema) {
      const recommendations = [];
      
      if (isRequired && stat.presence_rate < 100) {
        recommendations.push(`This field is required but missing in ${(100 - stat.presence_rate).toFixed(1)}% of events`);
      }
      
      if (stat.data_type_accuracy < 100) {
        recommendations.push(`Data type mismatches detected. Expected: ${schema.field_types[fieldName]}`);
      }
      
      if (stat.presence_rate < 50) {
        recommendations.push('Consider adding this field to your data collection');
      }
      
      return recommendations;
    }
  
    generateOverallRecommendations(results) {
      const recommendations = [];
      
      if (results.validation_summary.required_fields_coverage < 90) {
        recommendations.push('Focus on improving required field coverage. Missing required fields can cause data quality issues.');
      }
      
      if (results.validation_summary.data_type_accuracy < 95) {
        recommendations.push('Data type consistency needs improvement. Inconsistent types can cause parsing errors.');
      }
      
      if (results.validation_summary.overall_score < 70) {
        recommendations.push('Overall data quality needs significant improvement. Consider reviewing your data collection and mapping processes.');
      }
      
      if (results.validation_summary.overall_score >= 90) {
        recommendations.push('Excellent data quality! Your data maps well to OCSF standards.');
      }
      
      return recommendations;
    }
  }
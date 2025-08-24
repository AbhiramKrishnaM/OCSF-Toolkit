import { useState, useCallback } from "react";
import { FileUpload } from "./FileUpload.jsx";
import { QualityMetrics } from "./QualityMetrics.jsx";
import { ValidationResults } from "./ValidationResults.jsx";
import { OcsfValidator } from "./OcsfValidator.jsx";

export default function DataQualityDashboard() {
  const [uploadedData, setUploadedData] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [selectedOcsfClass, setSelectedOcsfClass] = useState(null);

  const handleFileUpload = useCallback((data, fileName) => {
    setUploadedData({ data, fileName });
    setValidationResults(null); // Reset previous results
  }, []);

  const handleValidation = useCallback(async (ocsfClass) => {
    if (!uploadedData || !ocsfClass) return;
    
    setIsValidating(true);
    try {
      const validator = new OcsfValidator();
      const results = validator.validateData(uploadedData.data, ocsfClass);
      setValidationResults(results);
      setSelectedOcsfClass(ocsfClass);
    } catch (error) {
      console.error('Validation failed:', error);
      setValidationResults({ error: 'Validation failed. Please check your data format.' });
    } finally {
      setIsValidating(false);
    }
  }, [uploadedData]);

  const resetData = useCallback(() => {
    setUploadedData(null);
    setValidationResults(null);
    setSelectedOcsfClass(null);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            Data Quality & Normalization Dashboard
          </h1>
          <p className="text-neutral-300">
            Upload your security data and see how well it maps to OCSF standards
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Upload & Validation */}
          <div className="space-y-6">
            <FileUpload onFileUpload={handleFileUpload} />
            
            {uploadedData && (
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-400 mb-3">
                  📁 File Uploaded Successfully
                </h3>
                <div className="text-sm text-neutral-300 mb-4">
                  <strong>File:</strong> {uploadedData.fileName}<br />
                  <strong>Records:</strong> {uploadedData.data.length} events<br />
                  <strong>Size:</strong> {(JSON.stringify(uploadedData.data).length / 1024).toFixed(1)} KB
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={resetData}
                    className="px-3 py-1.5 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
                  >
                    Clear Data
                  </button>
                </div>
              </div>
            )}

            {/* OCSF Class Selection */}
            {uploadedData && (
              <div className="bg-neutral-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  🎯 Select OCSF Class for Validation
                </h3>
                <p className="text-sm text-neutral-400 mb-3">
                  Choose the OCSF event class that best matches your data
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {['process_activity', 'file_activity', 'network_activity', 'authentication', 
                    'security_finding', 'vulnerability_finding'].map((className) => (
                    <button
                      key={className}
                      onClick={() => handleValidation(className)}
                      disabled={isValidating}
                      className={`p-2 text-sm rounded border transition-colors ${
                        selectedOcsfClass === className
                          ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                          : 'border-neutral-700 bg-neutral-750 hover:bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      {className.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                
                {isValidating && (
                  <div className="mt-3 text-sm text-yellow-400">
                    🔄 Validating data against OCSF standards...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Results & Metrics */}
          <div className="space-y-6">
            {validationResults && !validationResults.error && (
              <>
                <QualityMetrics results={validationResults} />
                <ValidationResults results={validationResults} />
              </>
            )}
            
            {validationResults?.error && (
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  ❌ Validation Error
                </h3>
                <p className="text-red-300">{validationResults.error}</p>
              </div>
            )}

            {/* Instructions */}
            {!uploadedData && (
              <div className="bg-neutral-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                  📋 How to Use This Dashboard
                </h3>
                <div className="space-y-3 text-sm text-neutral-300">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">1.</span>
                    <span>Upload your security data file (CSV or JSON format)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">2.</span>
                    <span>Select the OCSF event class that matches your data</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">3.</span>
                    <span>Review quality metrics and validation results</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">4.</span>
                    <span>Use insights to improve your data quality</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800 rounded">
                  <h4 className="font-medium text-blue-300 mb-2">💡 Supported Formats:</h4>
                  <ul className="text-sm text-blue-200 space-y-1">
                    <li>• CSV files with security event data</li>
                    <li>• JSON files with event objects</li>
                    <li>• Syslog format files</li>
                    <li>• Custom log formats (with field mapping)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

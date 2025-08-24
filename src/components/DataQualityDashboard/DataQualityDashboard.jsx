import { useState, useCallback } from "react";
import { FileUpload } from "./FileUpload.jsx";
import { QualityMetrics } from "./QualityMetrics.jsx";
import { ValidationResults } from "./ValidationResults.jsx";
import { OcsfValidator } from "./OcsfValidator.jsx";
import SampleDataGenerator from "./SampleDataGenerator.jsx";
import { Upload, FileText, BarChart3, CheckCircle, AlertCircle, Info, Download } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-900/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Data Quality & Normalization Dashboard
            </h1>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl">
            Upload your security data and see how well it maps to OCSF standards. 
            Get detailed insights into data quality, missing fields, and improvement recommendations.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Data Input */}
          <div className="xl:col-span-2 space-y-6">
            {/* Sample Data Generator */}
            <SampleDataGenerator onDataGenerated={handleFileUpload} />
            
            {/* File Upload */}
            <FileUpload onFileUpload={handleFileUpload} />
            
            {/* Upload Status */}
            {uploadedData && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        File Uploaded Successfully
                      </h3>
                      <p className="text-slate-400">
                        Ready for OCSF validation
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetData}
                    className="text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-sm font-medium text-slate-400">File Name</div>
                    <div className="text-sm text-white font-mono truncate">
                      {uploadedData.fileName}
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-sm font-medium text-slate-400">Records</div>
                    <div className="text-lg font-semibold text-white">
                      {uploadedData.data.length.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-sm font-medium text-slate-400">File Size</div>
                    <div className="text-sm text-white">
                      {(JSON.stringify(uploadedData.data).length / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>

                {/* File Preview & Download */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-white mb-3">File Preview & Actions</h4>
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-400">Preview (first 3 records):</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const dataStr = JSON.stringify(uploadedData.data, null, 2);
                            const blob = new Blob([dataStr], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = uploadedData.fileName.replace(/\.[^/.]+$/, '') + '_processed.json';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Download Processed
                        </button>
                        <button
                          onClick={() => {
                            const dataStr = JSON.stringify(uploadedData.data, null, 2);
                            navigator.clipboard.writeText(dataStr);
                          }}
                          className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-xs rounded-md transition-colors flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          Copy to Clipboard
                        </button>
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded border border-slate-700 p-3 max-h-48 overflow-y-auto">
                      <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap">
                        {JSON.stringify(uploadedData.data.slice(0, 3), null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
                
                {/* OCSF Class Selection */}
                <div className="border-t border-slate-700 pt-4">
                  <h4 className="text-sm font-medium text-white mb-3">
                    Select OCSF Class for Validation
                  </h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Choose the OCSF event class that best matches your data structure
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'process_activity', name: 'Process Activity', icon: '⚙️' },
                      { id: 'file_activity', name: 'File Activity', icon: '📁' },
                      { id: 'network_activity', name: 'Network Activity', icon: '🌐' },
                      { id: 'authentication', name: 'Authentication', icon: '🔐' },
                      { id: 'security_finding', name: 'Security Finding', icon: '🚨' },
                      { id: 'vulnerability_finding', name: 'Vulnerability Finding', icon: '🛡️' }
                    ].map((cls) => (
                      <button
                        key={cls.id}
                        onClick={() => handleValidation(cls.id)}
                        disabled={isValidating}
                        className={`p-3 text-left rounded-lg border transition-all ${
                          selectedOcsfClass === cls.id
                            ? 'border-blue-500 bg-blue-900/20 text-blue-300'
                            : 'border-slate-700 bg-slate-800 hover:border-slate-600 text-slate-300'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="text-lg mb-1">{cls.icon}</div>
                        <div className="text-sm font-medium">{cls.name}</div>
                      </button>
                    ))}
                  </div>
                  
                  {isValidating && (
                    <div className="mt-4 flex items-center gap-2 text-blue-400">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent"></div>
                      <span className="text-sm">Validating data against OCSF standards...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results & Instructions */}
          <div className="space-y-6">
            {/* Validation Results */}
            {validationResults && !validationResults.error && (
              <>
                <QualityMetrics results={validationResults} />
                <ValidationResults results={validationResults} />
              </>
            )}
            
            {validationResults?.error && (
              <div className="bg-red-900/20 border border-red-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-900/30 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-red-400">
                    Validation Error
                  </h3>
                </div>
                <p className="text-red-300">{validationResults.error}</p>
              </div>
            )}

            {/* Instructions */}
            {!uploadedData && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-900/20 rounded-lg">
                    <Info className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    How to Use This Dashboard
                  </h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <div>
                      <div className="font-medium text-white">Generate Sample Data</div>
                      <div className="text-sm text-slate-400">
                        Use the built-in generator to create realistic OCSF-compliant test data
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <div>
                      <div className="font-medium text-white">Upload Your Data</div>
                      <div className="text-sm text-slate-400">
                        Drag & drop or browse for your security data files
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <div>
                      <div className="font-medium text-white">Select OCSF Class</div>
                      <div className="text-sm text-slate-400">
                        Choose the event class that matches your data structure
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                      4
                    </div>
                    <div>
                      <div className="font-medium text-white">Review Results</div>
                      <div className="text-sm text-slate-400">
                        Analyze quality metrics and get improvement recommendations
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                  <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Supported Formats
                  </h4>
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

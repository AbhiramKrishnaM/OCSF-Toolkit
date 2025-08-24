import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";

export function FileUpload({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const extractTimestamp = (line) => {
    // Simple timestamp extraction for common formats
    const timestampRegex = /(\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}|\d{2}:\d{2}:\d{2})/;
    const match = line.match(timestampRegex);
    return match ? match[1] : new Date().toISOString();
  };

  const extractSource = (line) => {
    // Simple source extraction
    if (line.includes('firewall')) return 'firewall';
    if (line.includes('ids')) return 'ids';
    if (line.includes('antivirus')) return 'antivirus';
    return 'unknown';
  };

  const parseLogFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          const lines = content.split('\n').filter(line => line.trim());
          
          // Try to parse as JSON lines (one JSON object per line)
          const jsonLines = lines.filter(line => {
            try {
              JSON.parse(line);
              return true;
            } catch {
              return false;
            }
          });
          
          if (jsonLines.length > 0) {
            const data = jsonLines.map(line => JSON.parse(line));
            resolve(data);
          } else {
            // Try to parse as syslog format
            const data = lines.map(line => ({
              raw_message: line,
              timestamp: extractTimestamp(line),
              source: extractSource(line),
              message: line
            }));
            resolve(data);
          }
        } catch {
          reject(new Error('Failed to parse log file. Please check the format.'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read log file.'));
      reader.readAsText(file);
    });
  };



  const parseCSV = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csv = e.target.result;
          const lines = csv.split('\n');
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          
          const data = lines.slice(1)
            .filter(line => line.trim())
            .map(line => {
              const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
              const obj = {};
              headers.forEach((header, index) => {
                obj[header] = values[index] || '';
              });
              return obj;
            });
          
          resolve(data);
        } catch {
          reject(new Error('Failed to parse CSV file. Please check the format.'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read CSV file.'));
      reader.readAsText(file);
    });
  };

  const parseJSON = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          // Handle different JSON structures
          if (Array.isArray(data)) {
            resolve(data);
          } else if (data.events && Array.isArray(data.events)) {
            resolve(data.events);
          } else if (data.data && Array.isArray(data.data)) {
            resolve(data.data);
          } else {
            reject(new Error('JSON file must contain an array of events or an object with events/data array.'));
          }
        } catch {
          reject(new Error('Invalid JSON format. Please check your file.'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read JSON file.'));
      reader.readAsText(file);
    });
  };

  const parseFile = useCallback(async (file) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      let data;
      
      if (fileExtension === 'csv') {
        data = await parseCSV(file);
      } else if (fileExtension === 'json') {
        data = await parseJSON(file);
      } else if (fileExtension === 'log' || fileExtension === 'txt') {
        data = await parseLogFile(file);
      } else {
        throw new Error(`Unsupported file format: ${fileExtension}. Please use CSV, JSON, or LOG files.`);
      }
      
      // Basic validation that this looks like security data
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('File must contain an array of security events.');
      }
      
      if (data.length > 10000) {
        throw new Error('File too large. Please limit to 10,000 events for browser processing.');
      }
      
      onFileUpload(data, file.name);
      
    } catch (err) {
      setError(err.message);
      console.error('File parsing failed:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      parseFile(files[0]);
    }
  }, [parseFile]);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      parseFile(file);
    }
  }, [parseFile]);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-900/20 rounded-lg">
          <Upload className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Upload Security Data
          </h3>
          <p className="text-sm text-slate-400">
            Import your security logs and event data for OCSF validation
          </p>
        </div>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-900/10'
            : 'border-slate-600 hover:border-slate-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
            <div className="text-blue-600 dark:text-blue-400 font-medium">Processing file...</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Please wait while we parse your data</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                <Upload className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-medium text-white">
                Drop your security data file here
              </div>
              <div className="text-sm text-slate-400">
                or click to browse files
              </div>
            </div>
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".csv,.json,.log,.txt"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors font-medium"
            >
              <FileText className="w-4 h-4" />
              Choose File
            </label>
            
            <div className="text-xs text-slate-400">
              Supported formats: CSV, JSON, LOG, TXT (max 10MB)
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-red-900/30 rounded">
              <X className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-red-300 text-sm">
              <div className="font-medium mb-1">Upload Error</div>
              {error}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
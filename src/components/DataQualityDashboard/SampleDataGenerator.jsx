import { useState } from "react";
import { generateMultipleClassSamples } from "@/data/api/sample.js";
import { Sparkles, Download, Play } from "lucide-react";

export default function SampleDataGenerator({ onDataGenerated }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedClass, setSelectedClass] = useState("process_activity");
  const [sampleCount, setSampleCount] = useState(10);

  const ocsfClasses = [
    { value: "process_activity", label: "Process Activity", description: "Process creation, termination, and manipulation", icon: "⚙️" },
    { value: "file_activity", label: "File Activity", description: "File creation, modification, and access", icon: "📁" },
    { value: "network_activity", label: "Network Activity", description: "Network connections and traffic", icon: "🌐" },
    { value: "authentication", label: "Authentication", description: "Login, logout, and access attempts", icon: "🔐" },
    { value: "security_finding", label: "Security Finding", description: "Security alerts and detections", icon: "🚨" },
    { value: "vulnerability_finding", label: "Vulnerability Finding", description: "Vulnerability scan results", icon: "🛡️" }
  ];

  const generateSamples = async () => {
    setIsGenerating(true);
    try {
      const response = await generateMultipleClassSamples(selectedClass, sampleCount);
      if (response.data && response.data.length > 0) {
        onDataGenerated(response.data, `${selectedClass}_samples.json`);
      } else {
        // Fallback to mock data if API fails
        const mockData = generateMockData(selectedClass, sampleCount);
        onDataGenerated(mockData, `${selectedClass}_mock_samples.json`);
      }
    } catch (error) {
      console.warn('API failed, using mock data:', error);
      const mockData = generateMockData(selectedClass, sampleCount);
      onDataGenerated(mockData, `${selectedClass}_mock_samples.json`);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockData = (className, count) => {
    const samples = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(now.getTime() - (i * 60000)).toISOString();
      
      switch (className) {
        case "process_activity":
          samples.push({
            activity_name: ["process_created", "process_terminated", "process_injected"][i % 3],
            timestamp: timestamp,
            process: {
              name: `sample_process_${i + 1}.exe`,
              pid: 1000 + i,
              path: `C:\\Program Files\\Sample\\process_${i + 1}.exe`,
              command_line: `process_${i + 1}.exe --param=${i + 1}`,
              parent_process: {
                name: "explorer.exe",
                pid: 1234
              }
            },
            actor: {
              user: {
                name: `user_${i % 3}`,
                uid: `100${i % 3}`,
                domain: "WORKSTATION"
              }
            },
            device: {
              hostname: `workstation-${i % 5}`,
              ip: `192.168.1.${100 + i}`,
              os: {
                name: "Windows",
                version: "10.0.19044"
              }
            },
            metadata: {
              product: "Sample Security Tool",
              version: "1.0.0"
            },
            severity: ["Info", "Low", "Medium"][i % 3],
            status: "Success"
          });
          break;
          
        case "file_activity":
          samples.push({
            activity_name: ["file_created", "file_modified", "file_accessed"][i % 3],
            timestamp: timestamp,
            file: {
              name: `sample_file_${i + 1}.txt`,
              path: `C:\\Users\\user\\Documents\\file_${i + 1}.txt`,
              size: 1024 + (i * 100),
              hash: `sha256_hash_${i + 1}`,
              extension: "txt"
            },
            actor: {
              user: {
                name: `user_${i % 3}`,
                uid: `100${i % 3}`,
                domain: "WORKSTATION"
              }
            },
            device: {
              hostname: `workstation-${i % 5}`,
              ip: `192.168.1.${100 + i}`,
              os: {
                name: "Windows",
                version: "10.0.19044"
              }
            },
            metadata: {
              product: "Sample Security Tool",
              version: "1.0.0"
            },
            severity: ["Info", "Low", "Medium"][i % 3],
            status: "Success"
          });
          break;
          
        case "network_activity":
          samples.push({
            activity_name: ["network_connection", "network_traffic", "dns_query"][i % 3],
            timestamp: timestamp,
            src_endpoint: {
              ip: `192.168.1.${100 + i}`,
              port: 50000 + i,
              mac: `00:1B:44:11:3A:B${i % 9}`
            },
            dst_endpoint: {
              ip: `8.8.8.${i % 255}`,
              port: [80, 443, 53][i % 3],
              domain: `example${i + 1}.com`
            },
            actor: {
              user: {
                name: `user_${i % 3}`,
                uid: `100${i % 3}`,
                domain: "WORKSTATION"
              }
            },
            device: {
              hostname: `workstation-${i % 5}`,
              ip: `192.168.1.${100 + i}`,
              os: {
                name: "Windows",
                version: "10.0.19044"
              }
            },
            metadata: {
              product: "Sample Security Tool",
              version: "1.0.0"
            },
            severity: ["Info", "Low", "Medium"][i % 3],
            status: "Success"
          });
          break;
          
        case "authentication":
          samples.push({
            activity_name: ["user_login", "user_logout", "authentication_failure"][i % 3],
            timestamp: timestamp,
            actor: {
              user: {
                name: `user_${i % 3}`,
                uid: `100${i % 3}`,
                domain: "WORKSTATION"
              }
            },
            service: {
              name: "Local Security Authority",
              uid: "lsass.exe"
            },
            device: {
              hostname: `workstation-${i % 5}`,
              ip: `192.168.1.${100 + i}`,
              os: {
                name: "Windows",
                version: "10.0.19044"
              }
            },
            metadata: {
              product: "Sample Security Tool",
              version: "1.0.0"
            },
            severity: ["Info", "Low", "Medium"][i % 3],
            status: i % 3 === 2 ? "Failure" : "Success"
          });
          break;
          
        case "security_finding":
          samples.push({
            activity_name: ["malware_detected", "suspicious_activity", "policy_violation"][i % 3],
            timestamp: timestamp,
            finding_info: {
              title: `Security Alert ${i + 1}`,
              description: `Sample security finding description ${i + 1}`,
              confidence: ["High", "Medium", "Low"][i % 3],
              category: ["Malware", "Suspicious", "Policy"][i % 3]
            },
            actor: {
              user: {
                name: `user_${i % 3}`,
                uid: `100${i % 3}`,
                domain: "WORKSTATION"
              }
            },
            device: {
              hostname: `workstation-${i % 5}`,
              ip: `192.168.1.${100 + i}`,
              os: {
                name: "Windows",
                version: "10.0.19044"
              }
            },
            metadata: {
              product: "Sample Security Tool",
              version: "1.0.0"
            },
            severity: ["High", "Medium", "Low"][i % 3],
            status: "Active"
          });
          break;
          
        case "vulnerability_finding":
          samples.push({
            activity_name: ["vulnerability_scan", "vulnerability_detected", "patch_available"][i % 3],
            timestamp: timestamp,
            vulnerabilities: [
              {
                name: `CVE-2023-${1000 + i}`,
                description: `Sample vulnerability description ${i + 1}`,
                severity: ["Critical", "High", "Medium"][i % 3],
                cvss_score: 7.5 + (i * 0.5),
                status: "Open"
              }
            ],
            actor: {
              user: {
                name: `user_${i % 3}`,
                uid: `100${i % 3}`,
                domain: "WORKSTATION"
              }
            },
            device: {
              hostname: `workstation-${i % 5}`,
              ip: `192.168.1.${100 + i}`,
              os: {
                name: "Windows",
                version: "10.0.19044"
              }
            },
            metadata: {
              product: "Sample Security Tool",
              version: "1.0.0"
            },
            severity: ["High", "Medium", "Low"][i % 3],
            status: "Active"
          });
          break;
      }
    }
    
    return samples;
  };

  const downloadSampleData = () => {
    const mockData = generateMockData(selectedClass, sampleCount);
    const dataStr = JSON.stringify(mockData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedClass}_${sampleCount}_samples.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-900/20 rounded-lg">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Generate Sample Data
          </h3>
          <p className="text-sm text-slate-400">
            Create realistic OCSF-compliant test data for validation
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* OCSF Class Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            OCSF Event Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {ocsfClasses.map((cls) => (
              <option key={cls.value} value={cls.value}>
                {cls.icon} {cls.label} - {cls.description}
              </option>
            ))}
          </select>
        </div>

        {/* Sample Count */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Number of Samples
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={sampleCount}
            onChange={(e) => setSampleCount(parseInt(e.target.value) || 10)}
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={generateSamples}
            disabled={isGenerating}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Generating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Generate & Use
              </>
            )}
          </button>
          
          <button
            onClick={downloadSampleData}
            className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <div className="text-xs text-slate-400 text-center pt-2">
          💡 Generate realistic OCSF-compliant data for testing your dashboard
        </div>
      </div>
    </div>
  );
}

import { AlertCircle, FileText, Download, FileDown, Share2 } from "lucide-react";

export function ValidationResults({ results }) {
  const { field_analysis, event_samples, recommendations } = results;

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-900/20 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Validation Results & Recommendations
          </h3>
          <p className="text-sm text-slate-400">
            Detailed analysis and actionable insights for improvement
          </p>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Key Recommendations
        </h4>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
              <div className="text-sm text-blue-200 leading-relaxed">
                {rec}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field Analysis Details */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Field Analysis Details</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {field_analysis.map((field, index) => (
            <div key={index} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    field.is_required ? 'bg-red-400' : 'bg-blue-400'
                  }`}></div>
                  <div>
                    <div className="font-medium text-white">{field.field_name}</div>
                    {field.is_required && (
                      <span className="text-xs px-2 py-1 bg-red-900/30 text-red-300 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-slate-300 font-medium">
                    {field.presence_rate.toFixed(1)}% present
                  </div>
                  <div className="text-slate-400">
                    {field.data_type_accuracy.toFixed(1)}% types correct
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-slate-400 mb-3 leading-relaxed">
                {field.description}
              </div>
              
              <div className="text-xs text-slate-500 mb-3">
                Expected type: <span className="text-blue-400 font-medium">{field.expected_type}</span>
              </div>
              
              {field.recommendations.length > 0 && (
                <div className="space-y-2">
                  {field.recommendations.map((rec, recIndex) => (
                    <div key={recIndex} className="text-xs text-amber-300 bg-amber-900/20 px-3 py-2 rounded-md">
                      💡 {rec}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Event Samples */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          Event Samples
        </h4>
        <div className="space-y-4">
          {event_samples.map((sample, index) => (
            <div key={index} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-300">
                  Event #{sample.event_index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                    sample.validation.score >= 90 ? 'bg-emerald-900/30 text-emerald-300' :
                    sample.validation.score >= 70 ? 'bg-amber-900/30 text-amber-300' :
                    sample.validation.score >= 50 ? 'bg-orange-900/30 text-orange-300' :
                    'bg-red-900/30 text-red-300'
                  }`}>
                    Score: {sample.validation.score.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Sample Data Preview */}
              <div className="mb-4">
                <div className="text-xs text-slate-400 mb-2 font-medium">Data Preview:</div>
                <div className="bg-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300 max-h-24 overflow-y-auto">
                  {Object.entries(sample.data).slice(0, 5).map(([key, value]) => (
                    <div key={key} className="flex gap-2 mb-1">
                      <span className="text-blue-400 font-medium">{key}:</span>
                      <span className="text-slate-300">
                        {typeof value === 'object' ? JSON.stringify(value).slice(0, 50) + '...' : String(value)}
                      </span>
                    </div>
                  ))}
                  {Object.keys(sample.data).length > 5 && (
                    <div className="text-slate-400 italic">
                      ... and {Object.keys(sample.data).length - 5} more fields
                    </div>
                  )}
                </div>
              </div>
              
              {/* Validation Issues */}
              {sample.validation.required_fields_missing.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs text-red-400 mb-2 font-medium">❌ Missing Required Fields:</div>
                  <div className="flex flex-wrap gap-2">
                    {sample.validation.required_fields_missing.map((field, fieldIndex) => (
                      <span key={fieldIndex} className="text-xs px-2 py-1 bg-red-900/30 text-red-300 rounded-md">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {sample.validation.data_type_issues.length > 0 && (
                <div>
                  <div className="text-xs text-amber-400 mb-2 font-medium">⚠️ Data Type Issues:</div>
                  <div className="space-y-1">
                    {sample.validation.data_type_issues.map((issue, issueIndex) => (
                      <div key={issueIndex} className="text-xs text-slate-400">
                        <span className="text-amber-400 font-medium">{issue.field}</span>: expected {issue.expected}, got {issue.actual}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="border-t border-slate-700 pt-6">
        <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
          <Download className="w-4 h-4 text-slate-400" />
          Export Results
        </h4>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            <FileDown className="w-4 h-4" />
            Export JSON Report
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors">
            <FileText className="w-4 h-4" />
            Export CSV Summary
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors">
            <Share2 className="w-4 h-4" />
            Generate PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}

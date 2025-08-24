export function ValidationResults({ results }) {
  const { field_analysis, event_samples, recommendations } = results;

  return (
    <div className="bg-neutral-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-blue-400 mb-4">
        🔍 Validation Results & Recommendations
      </h3>
      
      {/* Recommendations */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-neutral-200 mb-3">💡 Key Recommendations</h4>
        <div className="space-y-2">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-3 bg-blue-900/20 border border-blue-800 rounded text-sm text-blue-200">
              {rec}
            </div>
          ))}
        </div>
      </div>

      {/* Field Analysis Details */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-neutral-200 mb-3">📋 Field Analysis Details</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {field_analysis.map((field, index) => (
            <div key={index} className="p-3 bg-neutral-800 rounded border border-neutral-700">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    field.is_required ? 'bg-red-400' : 'bg-blue-400'
                  }`}></span>
                  <span className="font-medium text-neutral-200">{field.field_name}</span>
                  {field.is_required && (
                    <span className="text-xs px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">
                      Required
                    </span>
                  )}
                </div>
                <div className="text-right text-sm">
                  <div className="text-neutral-300">
                    {field.presence_rate.toFixed(1)}% present
                  </div>
                  <div className="text-neutral-400">
                    {field.data_type_accuracy.toFixed(1)}% types correct
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-neutral-400 mb-2">
                {field.description}
              </div>
              
              <div className="text-xs text-neutral-500 mb-2">
                Expected type: <span className="text-blue-400">{field.expected_type}</span>
              </div>
              
              {field.recommendations.length > 0 && (
                <div className="space-y-1">
                  {field.recommendations.map((rec, recIndex) => (
                    <div key={recIndex} className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded">
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
      <div className="mb-6">
        <h4 className="text-md font-medium text-neutral-200 mb-3">📄 Event Samples</h4>
        <div className="space-y-3">
          {event_samples.map((sample, index) => (
            <div key={index} className="p-3 bg-neutral-800 rounded border border-neutral-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-300">
                  Event #{sample.event_index + 1}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    sample.validation.score >= 90 ? 'bg-green-500/20 text-green-400' :
                    sample.validation.score >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                    sample.validation.score >= 50 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    Score: {sample.validation.score.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Sample Data Preview */}
              <div className="mb-3">
                <div className="text-xs text-neutral-400 mb-1">Data Preview:</div>
                <div className="bg-neutral-900 rounded p-2 text-xs font-mono text-neutral-300 max-h-20 overflow-y-auto">
                  {Object.entries(sample.data).slice(0, 5).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <span className="text-blue-400">{key}:</span>
                      <span className="text-neutral-300">
                        {typeof value === 'object' ? JSON.stringify(value).slice(0, 50) + '...' : String(value)}
                      </span>
                    </div>
                  ))}
                  {Object.keys(sample.data).length > 5 && (
                    <div className="text-neutral-500">... and {Object.keys(sample.data).length - 5} more fields</div>
                  )}
                </div>
              </div>
              
              {/* Validation Issues */}
              {sample.validation.required_fields_missing.length > 0 && (
                <div className="mb-2">
                  <div className="text-xs text-red-400 mb-1">❌ Missing Required Fields:</div>
                  <div className="flex flex-wrap gap-1">
                    {sample.validation.required_fields_missing.map((field, fieldIndex) => (
                      <span key={fieldIndex} className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {sample.validation.data_type_issues.length > 0 && (
                <div>
                  <div className="text-xs text-yellow-400 mb-1">⚠️ Data Type Issues:</div>
                  <div className="space-y-1">
                    {sample.validation.data_type_issues.map((issue, issueIndex) => (
                      <div key={issueIndex} className="text-xs text-neutral-400">
                        <span className="text-yellow-400">{issue.field}</span>: expected {issue.expected}, got {issue.actual}
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
      <div className="border-t border-neutral-700 pt-4">
        <h4 className="text-md font-medium text-neutral-200 mb-3">📤 Export Results</h4>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">
            Export JSON Report
          </button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded text-sm transition-colors">
            Export CSV Summary
          </button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded text-sm transition-colors">
            Generate PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}

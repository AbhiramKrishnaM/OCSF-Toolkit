export function QualityMetrics({ results }) {
  const { validation_summary, field_analysis } = results;
  
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-500/20 border-green-500';
    if (score >= 70) return 'bg-yellow-500/20 border-yellow-500';
    if (score >= 50) return 'bg-orange-500/20 border-orange-500';
    return 'bg-red-500/20 border-red-500';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return '🎯';
    if (score >= 70) return '⚠️';
    if (score >= 50) return '🔶';
    return '❌';
  };

  return (
    <div className="bg-neutral-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-green-400 mb-4">
        📊 Data Quality Metrics
      </h3>
      
      {/* Overall Score */}
      <div className="mb-6">
        <div className={`p-4 rounded-lg border ${getScoreBgColor(validation_summary.overall_score)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-300">Overall Quality Score</span>
            <span className="text-2xl">{getScoreIcon(validation_summary.overall_score)}</span>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(validation_summary.overall_score)}`}>
            {validation_summary.overall_score.toFixed(1)}%
          </div>
          <div className="text-sm text-neutral-400 mt-1">
            Based on field coverage, data types, and completeness
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Required Fields Coverage */}
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-300">Required Fields</span>
            <span className="text-lg">📋</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(validation_summary.required_fields_coverage)}`}>
            {validation_summary.required_fields_coverage.toFixed(1)}%
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            Critical fields present
          </div>
        </div>

        {/* Optional Fields Coverage */}
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-300">Optional Fields</span>
            <span className="text-lg">🔍</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(validation_summary.optional_fields_coverage)}`}>
            {validation_summary.optional_fields_coverage.toFixed(1)}%
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            Enhanced data present
          </div>
        </div>

        {/* Data Type Accuracy */}
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-300">Data Types</span>
            <span className="text-lg">🔧</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(validation_summary.data_type_accuracy)}`}>
            {validation_summary.data_type_accuracy.toFixed(1)}%
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            Type consistency
          </div>
        </div>
      </div>

      {/* Field Analysis Summary */}
      <div className="mb-4">
        <h4 className="text-md font-medium text-neutral-200 mb-3">Field Analysis</h4>
        <div className="space-y-2">
          {field_analysis.slice(0, 5).map((field, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-neutral-800 rounded border border-neutral-700">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  field.is_required ? 'bg-red-400' : 'bg-blue-400'
                }`}></span>
                <span className="text-sm font-medium text-neutral-200">
                  {field.field_name}
                </span>
                {field.is_required && (
                  <span className="text-xs px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">
                    Required
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getScoreColor(field.presence_rate)}`}>
                  {field.presence_rate.toFixed(1)}%
                </div>
                <div className="text-xs text-neutral-400">
                  {field.data_type_accuracy.toFixed(1)}% types
                </div>
              </div>
            </div>
          ))}
          
          {field_analysis.length > 5 && (
            <div className="text-center text-sm text-neutral-400 py-2">
              +{field_analysis.length - 5} more fields analyzed
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-neutral-800 rounded p-3 border border-neutral-700">
          <div className="text-neutral-400">Total Events</div>
          <div className="text-lg font-semibold text-neutral-200">{results.total_events}</div>
        </div>
        <div className="bg-neutral-800 rounded p-3 border border-neutral-700">
          <div className="text-neutral-400">OCSF Class</div>
          <div className="text-lg font-semibold text-blue-400">{results.ocsf_class}</div>
        </div>
      </div>
    </div>
  );
}

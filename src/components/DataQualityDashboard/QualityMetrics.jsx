import { TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export function QualityMetrics({ results }) {
  const { validation_summary, field_analysis } = results;
  
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 70) return 'text-amber-600 dark:text-amber-400';
    if (score >= 50) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
    if (score >= 70) return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
    if (score >= 50) return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  const getScoreIcon = (score) => {
    if (score >= 90) return <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    if (score >= 70) return <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
    if (score >= 50) return <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />;
    return <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />;
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-900/20 rounded-lg">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Data Quality Metrics
          </h3>
          <p className="text-sm text-slate-400">
            Comprehensive analysis of your data against OCSF standards
          </p>
        </div>
      </div>
      
      {/* Overall Score */}
      <div className="mb-6">
        <div className={`p-4 rounded-lg border ${getScoreBgColor(validation_summary.overall_score)}`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-slate-700 mb-1">
                Overall Quality Score
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {validation_summary.overall_score.toFixed(1)}%
              </div>
            </div>
            <div className="p-2 bg-white rounded-full">
              {getScoreIcon(validation_summary.overall_score)}
            </div>
          </div>
          <div className="text-sm text-slate-600">
            Based on field coverage, data types, and completeness analysis
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {/* Required Fields Coverage */}
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-900/30 rounded">
              <CheckCircle className="w-3 h-3 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide leading-tight truncate">
              REQ
            </span>
          </div>
          <div className={`text-xl font-bold ${getScoreColor(validation_summary.required_fields_coverage)}`}>
            {validation_summary.required_fields_coverage.toFixed(1)}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Critical fields present
          </div>
        </div>

        {/* Optional Fields Coverage */}
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-slate-700 rounded">
              <TrendingUp className="w-3 h-3 text-slate-400" />
            </div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide leading-tight truncate">
              OPT
            </span>
          </div>
          <div className={`text-xl font-bold ${getScoreColor(validation_summary.optional_fields_coverage)}`}>
            {validation_summary.optional_fields_coverage.toFixed(1)}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Enhanced data present
          </div>
        </div>

        {/* Data Type Accuracy */}
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-purple-900/30 rounded">
              <CheckCircle className="w-3 h-3 text-purple-400" />
            </div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide leading-tight truncate">
              TYPES
            </span>
          </div>
          <div className={`text-xl font-bold ${getScoreColor(validation_summary.data_type_accuracy)}`}>
            {validation_summary.data_type_accuracy.toFixed(1)}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Type consistency
          </div>
        </div>
      </div>

      {/* Field Analysis Summary */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-3">Field Analysis Overview</h4>
        <div className="space-y-2">
          {field_analysis.slice(0, 5).map((field, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-slate-800 rounded border border-slate-700">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  field.is_required ? 'bg-red-400' : 'bg-blue-400'
                }`}></div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {field.field_name}
                  </div>
                  {field.is_required && (
                    <span className="text-xs px-1.5 py-0.5 bg-red-900/30 text-red-300 rounded-full">
                      Required
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getScoreColor(field.presence_rate)}`}>
                  {field.presence_rate.toFixed(1)}%
                </div>
                <div className="text-xs text-slate-400">
                  {field.data_type_accuracy.toFixed(1)}% types
                </div>
              </div>
            </div>
          ))}
          
          {field_analysis.length > 5 && (
            <div className="text-center text-sm text-slate-400 py-2">
              +{field_analysis.length - 5} more fields analyzed
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700">
        <div className="bg-slate-800 rounded p-2 border border-slate-700">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
            Total Events
          </div>
          <div className="text-base font-semibold text-white">
            {results.total_events.toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-800 rounded p-2 border border-slate-700">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
            OCSF Class
          </div>
          <div className="text-base font-semibold text-blue-400">
            {results.ocsf_class}
          </div>
        </div>
      </div>
    </div>
  );
}


import React from 'react';

interface ResultViewProps {
  result: {
    riskPercentage: number;
    riskLevel: string;
    explanation: string;
    recommendations: string[];
  } | null;
}

const ResultView: React.FC<ResultViewProps> = ({ result }) => {
  if (!result) return null;

  const getRiskColor = (percent: number) => {
    if (percent < 30) return 'text-green-600';
    if (percent < 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getBgColor = (percent: number) => {
    if (percent < 30) return 'bg-green-50 border-green-200';
    if (percent < 70) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className={`mt-6 p-6 rounded-xl border animate-in fade-in slide-in-from-bottom-4 duration-500 ${getBgColor(result.riskPercentage)}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-1">Risk Assessment Result</h3>
          <p className={`text-4xl font-bold ${getRiskColor(result.riskPercentage)}`}>
            {result.riskPercentage}% <span className="text-2xl font-normal text-slate-600 ml-2">({result.riskLevel})</span>
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full animate-pulse ${getRiskColor(result.riskPercentage).replace('text', 'bg')}`}></div>
          <span className="text-sm font-medium text-slate-700">AI Verified Analysis</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-slate-800 mb-2">Medical Reasoning</h4>
          <p className="text-slate-700 leading-relaxed">{result.explanation}</p>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 mb-3">Health Recommendations</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start space-x-2 bg-white/50 p-3 rounded-lg text-slate-700 text-sm">
                <span className="text-blue-500 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultView;

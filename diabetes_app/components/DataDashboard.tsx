
import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';
import { DiabetesData } from '../types';

interface DataDashboardProps {
  data: DiabetesData[];
}

const DataDashboard: React.FC<DataDashboardProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Transform data for scatter plot (Glucose vs BMI)
  const plotData = data.slice(0, 150).map(d => ({
    x: d.BMI,
    y: d.Glucose,
    z: d.Outcome === 1 ? 50 : 20,
    outcome: d.Outcome
  }));

  const stats = {
    avgGlucose: (data.reduce((acc, curr) => acc + curr.Glucose, 0) / data.length).toFixed(1),
    avgBMI: (data.reduce((acc, curr) => acc + curr.BMI, 0) / data.length).toFixed(1),
    diabetesRate: ((data.filter(d => d.Outcome === 1).length / data.length) * 100).toFixed(1)
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Avg. Glucose</p>
          <p className="text-2xl font-bold text-blue-600">{stats.avgGlucose} <span className="text-xs font-normal text-slate-400">mg/dL</span></p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Avg. BMI</p>
          <p className="text-2xl font-bold text-indigo-600">{stats.avgBMI} <span className="text-xs font-normal text-slate-400">kg/m²</span></p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Diabetes Rate</p>
          <p className="text-2xl font-bold text-rose-600">{stats.diabetesRate}% <span className="text-xs font-normal text-slate-400">in dataset</span></p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2">
          <span>Dataset Correlation: Glucose vs BMI</span>
          <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Sample size: 150</span>
        </h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
              <XAxis type="number" dataKey="x" name="BMI" unit="kg/m²" label={{ value: 'BMI', position: 'insideBottom', offset: -10 }} />
              <YAxis type="number" dataKey="y" name="Glucose" unit="mg/dL" label={{ value: 'Glucose', angle: -90, position: 'insideLeft' }} />
              <ZAxis type="number" dataKey="z" range={[20, 100]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Patients" data={plotData}>
                {plotData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.outcome === 1 ? '#e11d48' : '#2563eb'} opacity={0.6} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4 text-sm font-medium">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 opacity-60"></div>
            <span>Diabetic</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 opacity-60"></div>
            <span>Non-Diabetic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDashboard;

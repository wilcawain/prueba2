
import React, { useState, useEffect } from 'react';
import PredictorForm from './components/PredictorForm';
import ResultView from './components/ResultView';
import DataDashboard from './components/DataDashboard';
import { analyzeDiabetesRisk } from './services/geminiService';
import { DiabetesData } from './types';

const App: React.FC = () => {
  const [dataset, setDataset] = useState<DiabetesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'predictor' | 'insights'>('predictor');
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/LuisPerezTimana/Webinars/main/diabetes.csv');
        const text = await response.text();
        const rows = text.split('\n').slice(1); // Skip header
        const parsedData: DiabetesData[] = rows
          .filter(row => row.trim() !== '')
          .map(row => {
            const cols = row.split(',');
            return {
              Pregnancies: parseInt(cols[0]),
              Glucose: parseInt(cols[1]),
              BloodPressure: parseInt(cols[2]),
              SkinThickness: parseInt(cols[3]),
              Insulin: parseInt(cols[4]),
              BMI: parseFloat(cols[5]),
              DiabetesPedigreeFunction: parseFloat(cols[6]),
              Age: parseInt(cols[7]),
              Outcome: parseInt(cols[8])
            };
          });
        setDataset(parsedData);
      } catch (err) {
        console.error("Failed to load dataset", err);
      }
    };

    fetchData();
  }, []);

  const handlePredict = async (data: Partial<DiabetesData>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeDiabetesRisk(data);
      setPredictionResult(result);
      setActiveTab('predictor'); // Ensure we stay on predictor tab to see result
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0a11.955 11.955 0 00-11.76-9.274m11.76 9.274a11.955 11.955 0 01-11.76 9.274m11.76-9.274a11.955 11.955 0 00-11.76-9.274m11.76 9.274V21m0-11.76H3" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">Diabetes Predictor AI</h1>
          </div>
          
          <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('predictor')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'predictor' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Predictor
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'insights' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Data Insights
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeTab === 'predictor' ? 'Risk Prediction Engine' : 'Historical Data Analysis'}
          </h2>
          <p className="text-slate-600 mt-2">
            {activeTab === 'predictor' 
              ? 'Input biometric markers to evaluate potential diabetes risk using Gemini AI.' 
              : 'Statistical visualization of the Pima Indians Diabetes dataset patterns.'}
          </p>
        </div>

        {activeTab === 'predictor' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <PredictorForm onSubmit={handlePredict} isLoading={loading} />
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>
            <div className="lg:col-span-7">
              {predictionResult ? (
                <ResultView result={predictionResult} />
              ) : (
                <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-12 text-center text-slate-400">
                  <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-600 mb-2">Ready for Analysis</h3>
                  <p className="max-w-xs">Fill out the form to the left and click "Generate Prediction" to receive your AI-powered risk assessment.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <DataDashboard data={dataset} />
        )}
      </main>

      {/* Footer Info */}
      <footer className="mt-12 py-10 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-500">
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">About the Dataset</h4>
              <p className="leading-relaxed">
                This app utilizes the Pima Indians Diabetes Dataset, which records diagnostic measurements for female patients of Pima Indian heritage. It includes features like Glucose levels, BMI, and Insulin to predict diabetes outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wider text-xs">Medical Disclaimer</h4>
              <p className="leading-relaxed">
                This tool is for educational purposes only. It uses machine learning models and AI to provide risk estimates and should not be used as a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

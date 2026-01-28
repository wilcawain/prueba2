
import React from 'react';
import { DiabetesData } from '../types';

interface PredictorFormProps {
  onSubmit: (data: Partial<DiabetesData>) => void;
  isLoading: boolean;
}

const PredictorForm: React.FC<PredictorFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<Partial<DiabetesData>>({
    Pregnancies: 0,
    Glucose: 100,
    BloodPressure: 70,
    SkinThickness: 20,
    Insulin: 80,
    BMI: 25,
    DiabetesPedigreeFunction: 0.5,
    Age: 30
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
  const labelClasses = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Risk Assessment Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Pregnancies</label>
          <input type="number" name="Pregnancies" value={formData.Pregnancies} onChange={handleChange} className={inputClasses} required />
        </div>
        <div>
          <label className={labelClasses}>Glucose (mg/dL)</label>
          <input type="number" name="Glucose" value={formData.Glucose} onChange={handleChange} className={inputClasses} required />
        </div>
        <div>
          <label className={labelClasses}>Blood Pressure (mm Hg)</label>
          <input type="number" name="BloodPressure" value={formData.BloodPressure} onChange={handleChange} className={inputClasses} required />
        </div>
        <div>
          <label className={labelClasses}>Skin Thickness (mm)</label>
          <input type="number" name="SkinThickness" value={formData.SkinThickness} onChange={handleChange} className={inputClasses} required />
        </div>
        <div>
          <label className={labelClasses}>Insulin (mu U/ml)</label>
          <input type="number" name="Insulin" value={formData.Insulin} onChange={handleChange} className={inputClasses} required />
        </div>
        <div>
          <label className={labelClasses}>BMI (kg/m²)</label>
          <input type="number" step="0.1" name="BMI" value={formData.BMI} onChange={handleChange} className={inputClasses} required />
        </div>
        <div>
          <label className={labelClasses}>Pedigree Function</label>
          <input type="number" step="0.001" name="DiabetesPedigreeFunction" value={formData.DiabetesPedigreeFunction} onChange={handleChange} className={inputClasses} required />
        </div>
        <div>
          <label className={labelClasses}>Age</label>
          <input type="number" name="Age" value={formData.Age} onChange={handleChange} className={inputClasses} required />
        </div>
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-300"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Analyzing...</span>
          </>
        ) : (
          <span>Generate Prediction</span>
        )}
      </button>
    </form>
  );
};

export default PredictorForm;

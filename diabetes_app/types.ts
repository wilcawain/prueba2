
export interface DiabetesData {
  Pregnancies: number;
  Glucose: number;
  BloodPressure: number;
  SkinThickness: number;
  Insulin: number;
  BMI: number;
  DiabetesPedigreeFunction: number;
  Age: number;
  Outcome: number;
}

export interface PredictionState {
  loading: boolean;
  result: string | null;
  error: string | null;
  insights: string | null;
}

export interface ChartDataPoint {
  name: string | number;
  glucose: number;
  bmi: number;
  outcome: number;
}

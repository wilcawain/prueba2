
import { GoogleGenAI, Type } from "@google/genai";
import { DiabetesData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDiabetesRisk = async (data: Partial<DiabetesData>) => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analyze the following patient data for diabetes risk. 
    Context: This is based on the Pima Indians Diabetes Dataset parameters.
    
    Patient Data:
    - Pregnancies: ${data.Pregnancies}
    - Glucose: ${data.Glucose} mg/dL
    - Blood Pressure: ${data.BloodPressure} mm Hg
    - Skin Thickness: ${data.SkinThickness} mm
    - Insulin: ${data.Insulin} mu U/ml
    - BMI: ${data.BMI}
    - Diabetes Pedigree Function: ${data.DiabetesPedigreeFunction}
    - Age: ${data.Age} years

    Task:
    1. Provide a risk percentage (0-100%).
    2. Give a brief explanation of why the risk is high or low based on medical standards (WHO/ADA).
    3. Suggest the most critical parameters that the user should monitor.
    4. Provide a JSON response format.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskPercentage: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING },
            explanation: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["riskPercentage", "riskLevel", "explanation", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to generate AI analysis. Please check your inputs.");
  }
};

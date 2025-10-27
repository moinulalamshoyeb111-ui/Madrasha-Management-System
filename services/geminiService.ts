
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the key is available.
  console.warn("API_KEY environment variable not set.");
}

// Fix: Pass API_KEY inside an object with the apiKey property
const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateDashboardReport = async (kpis: {
    totalStudents: number,
    totalTeachers: number,
    feeCollectionPercentage: number,
    todayAttendancePercentage: number
}): Promise<string> => {
    const { totalStudents, totalTeachers, feeCollectionPercentage, todayAttendancePercentage } = kpis;

    const prompt = `
      As an expert educational administrator, analyze the following key performance indicators for a Madrasha and provide a concise, insightful report. 
      The report should be in markdown format.

      **Madrasha KPIs:**
      - Total Students: ${totalStudents}
      - Total Teachers: ${totalTeachers}
      - Monthly Fee Collection: ${feeCollectionPercentage}%
      - Today's Student Attendance: ${todayAttendancePercentage}%

      **Instructions:**
      1.  Start with a brief overall summary.
      2.  Highlight key strengths.
      3.  Identify potential areas for improvement or concern.
      4.  Suggest one or two actionable recommendations.
      5.  Keep the entire report under 150 words.
    `;

    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        // FIX: Directly access the text property from the response object
        return response.text;
    } catch (error) {
        console.error("Error generating report with Gemini API:", error);
        return "An error occurred while generating the report. Please check the console for details.";
    }
};

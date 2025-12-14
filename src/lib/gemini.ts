import { GoogleGenerativeAI } from '@google/generative-ai';
import { RepoData, AnalysisResult } from './types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeRepo(repoData: RepoData): Promise<AnalysisResult | null> {
    if (!process.env.GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY is not set');
        return null;
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
      You are an expert Senior Software Engineer and Tech Lead. Your task is to evaluate a GitHub repository based on the provided metadata and generate a constructive, honest, and actionable report.
      
      **Repository Data:**
      ${JSON.stringify(repoData, null, 2)}

      **Evaluation Criteria:**
      1. **Code Quality**: Best practices, consistency, modern standards.
      2. **Structure**: File organization, modularity, separation of concerns.
      3. **Documentation**: README quality, comments, setup instructions.
      4. **Testing**: Presence and quality of tests (unit, integration).
      5. **Maintainability**: CI/CD, dependency management, version control practices.

      **Output Requirements:**
      Return a JSON object strictly adhering to the following structure (no markdown formatting, just raw JSON):
      {
        "score": number (0-100),
        "summary": "Short, honest, recruiter-style evaluation. Clear strengths + weaknesses. No fluff.",
        "strengths": ["Point 1", "Point 2", "Point 3"],
        "weaknesses": ["Point 1", "Point 2", "Point 3"],
        "breakdown": {
          "codeQuality": number (0-100),
          "structure": number (0-100),
          "documentation": number (0-100),
          "testing": number (0-100),
          "maintainability": number (0-100)
        },
        "roadmap": [
          {
            "title": "Actionable Step Title",
            "description": "Detailed instruction on how to improve.",
            "priority": "High" | "Medium" | "Low"
          }
        ]
      }

      **Tone:**
      Act as an AI mentor guiding a student. Be encouraging but critical. Do not hallucinate features that are not there. If tests are missing, say so. If the README is empty, penalize it.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanedText) as AnalysisResult;
    } catch (error) {
        console.error('Error analyzing repo with Gemini:', error);
        return null;
    }
}


import { GoogleGenAI, Type } from "@google/genai";
import { SecurityTip, EmailAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSecurityAdvice = async (context: string): Promise<SecurityTip[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 practical security awareness tips for employees of a small agency focusing on ${context}. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              urgency: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
            },
            required: ["title", "content", "urgency"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Advice Error:", error);
    return [];
  }
};

export const analyzeEmail = async (emailContent: string): Promise<EmailAnalysisResult | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze the following email content for security risks. Provide a risk score (0-100), threat classification, findings, and actionable recommendations.
      Email content: "${emailContent}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            threatLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Critical'] },
            classification: { type: Type.STRING },
            findings: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            explanation: { type: Type.STRING }
          },
          required: ["riskScore", "threatLevel", "classification", "findings", "recommendations", "explanation"]
        }
      }
    });

    return JSON.parse(response.text || "null");
  } catch (error) {
    console.error("Email Analysis Error:", error);
    return null;
  }
};

export const getChatbotResponse = async (history: { role: string, parts: { text: string }[] }[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are Sentinel AI, a cybersecurity concierge for small agencies. You help employees identify phishing, manage passwords, and understand security policies. Keep responses professional, concise, and helpful.",
      },
    });

    // We don't use history in the simple call for now to keep it lightweight, but we can expand.
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chatbot Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};

export const generateCampaignTemplate = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create an educational simulated phishing email template for a training campaign about ${topic}. The goal is to teach employees what red flags to look for. Include a section explaining the red flags at the bottom. Return plain markdown text.`,
    });
    return response.text || "Failed to generate template.";
  } catch (error) {
    console.error("Gemini Template Error:", error);
    return "Error generating template.";
  }
};

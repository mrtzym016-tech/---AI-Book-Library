
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getAI() {
    if (!this.ai) {
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    }
    return this.ai;
  }

  async generateBookDetails(title: string, author: string, category: string) {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `المطلوب إنشاء محتوى سيو (SEO) لكتاب بعنوان "${title}" للكاتب "${author}" في قسم "${category}".`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              shortDescription: { type: Type.STRING },
              seoKeywords: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              metaDescription: { type: Type.STRING }
            },
            required: ["description", "shortDescription", "seoKeywords", "metaDescription"]
          }
        }
      });

      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Error:", error);
      return {
        description: `تحميل كتاب ${title} للكاتب ${author} مجاناً بصيغة PDF.`,
        shortDescription: `كتاب مميز في ${category} بقلم ${author}.`,
        seoKeywords: [title, author, category],
        metaDescription: `تحميل كتاب ${title} مجاناً.`
      };
    }
  }

  async suggestSimilarBooks(bookTitle: string, category: string) {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `اقترح 3 كتب مشابهة للكتاب "${bookTitle}" في فئة "${category}".`
      });
      return response.text || "";
    } catch (error) {
      return "العادات الذرية، الأب الغني والأب الفقير";
    }
  }
}

export const geminiService = new GeminiService();

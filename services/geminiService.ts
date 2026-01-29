
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  /**
   * Generates book details (SEO content) using the Gemini 3 Pro model.
   * Instantiates a new GoogleGenAI instance for each call to ensure the latest API key is used.
   */
  async generateBookDetails(title: string, author: string, category: string) {
    try {
      // Always create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `المطلوب إنشاء محتوى سيو (SEO) احترافي لكتاب بعنوان "${title}" للكاتب "${author}" في قسم "${category}". يجب أن يكون الرد بصيغة JSON حصراً.`,
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

      // The text property directly returns the extracted string output
      const text = response.text;
      if (!text) throw new Error("Empty AI response");
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini Details Error:", error);
      return {
        description: `تحميل كتاب ${title} للكاتب ${author} مجاناً بصيغة PDF.`,
        shortDescription: `كتاب مميز في ${category} بقلم ${author}.`,
        seoKeywords: [title, author, category],
        metaDescription: `تحميل كتاب ${title} مجاناً بصيغة PDF.`
      };
    }
  }

  /**
   * Suggests similar books based on the title and category using the Gemini 3 Flash model.
   * Instantiates a new GoogleGenAI instance for each call to ensure the latest API key is used.
   */
  async suggestSimilarBooks(bookTitle: string, category: string) {
    try {
      // Always create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `اقترح 3 كتب مشابهة للكتاب "${bookTitle}" في فئة "${category}". اذكر الأسماء فقط.`
      });
      // The text property directly returns the extracted string output
      return response.text || "العادات الذرية، الأب الغني والأب الفقير";
    } catch (error) {
      console.error("Gemini Suggestion Error:", error);
      return "العادات الذرية، الأب الغني والأب الفقير";
    }
  }
}

export const geminiService = new GeminiService();

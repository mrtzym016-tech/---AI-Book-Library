
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateBookDetails(title: string, author: string, category: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `المطلوب إنشاء محتوى سيو (SEO) "خارق" وشامل لكتاب بعنوان "${title}" للكاتب "${author}" في قسم "${category}".`,
        config: {
          systemInstruction: `أنت خبير سيو (SEO) وتسويق محتوى بمستوى عالمي. مهمتك هي كتابة صفحة كتاب تجعل الموقع يحتل النتيجة الأولى في بحث جوجل.
          
          المتطلبات التقنية للمحتوى:
          1. وصف طويل (Description): يجب أن يكون بين 350 إلى 500 كلمة. استخدم أسلوب "Storytelling" و "Copywriting" لبيع فكرة الكتاب. قسّم النص إلى فقرات جذابة، ركز على المشاكل التي يحلها الكتاب، الفوائد النفسية والمادية للقارئ، ولماذا يعتبر هذا الكتاب "ترند" حالياً.
          2. وصف مختصر (Short Description): جملة تسويقية مكثفة جداً لا تتجاوز 15 كلمة.
          3. كلمات مفتاحية (SEO Keywords): استخرج 20 كلمة مفتاحية (مزيج بين قصيرة وطويلة الذيل) التي يبحث عنها المستخدمون العرب فعلياً في محرك بحث جوجل ويوتيوب.
          4. وصف ميتا (Meta Description): نص إعلاني بطول 155 حرفاً يتضمن عبارات تحفيزية مثل "حمل الآن حصرياً"، "نسخة كاملة"، "أفضل مراجعة".
          
          لغة المحتوى: العربية الفصحى الحديثة والمؤثرة. لا تستخدم أكواد برمجية أو markdown، فقط نصاً خاماً مقسماً بفقرات واضحة.`,
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
        description: `تحميل كتاب ${title} للكاتب ${author} مجاناً بصيغة PDF. يعتبر هذا الكتاب من أهم المراجع في قسم ${category}، حيث يتناول بعمق وبأسلوب شيق كافة التفاصيل المتعلقة بهذا المجال. إذا كنت تبحث عن مصدر موثوق وشامل يقدم لك خلاصة تجارب المؤلف ورؤيته الفريدة، فإن هذا الكتاب هو الخيار الأمثل لك. نضمن لك تجربة قراءة ممتعة ومفيدة تساعدك على تطوير مهاراتك واكتساب معرفة جديدة تتناسب مع تطلعاتك الشخصية والمهنية. لا تفوت فرصة الحصول على نسختك الآن عبر رابط التحميل المباشر والحصري في مكتبتنا الذكية.\n\nلماذا يفضل القراء هذا الكتاب؟\nلأنه يقدم حلولاً واقعية ومبنية على أسس علمية رصينة، بالإضافة إلى كونه متاحاً للتحميل المباشر وبجودة عالية. اكتشف أسرار النجاح والتميز مع كتاب ${title} المتاح الآن لكل زوارنا الكرام.`,
        shortDescription: `كتاب مميز في ${category} بقلم ${author}، متاح الآن للتحميل المباشر بجودة عالية.`,
        seoKeywords: [title, author, category, `تحميل كتاب ${title}`, `كتاب ${title} pdf`, `ملخص ${title}`, `قراءة ${title} أونلاين`],
        metaDescription: `تحميل كتاب ${title} للكاتب ${author} مجاناً PDF. الموقع الأسرع لتحميل كتب ${category} بروابط مباشرة.`
      };
    }
  }

  async suggestSimilarBooks(bookTitle: string, category: string) {
    const prompt = `بناءً على الكتاب "${bookTitle}" من فئة "${category}"، اقترح 3 كتب مشابهة جداً ومشهورة عالمياً (عناوين فقط مفصولة بفاصلة).`;
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      return response.text || "";
    } catch (error) {
      return "العادات الذرية، الأب الغني والأب الفقير، فن اللامبالاة";
    }
  }
}

export const geminiService = new GeminiService();

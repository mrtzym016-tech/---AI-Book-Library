
import { Book } from './types.ts';

const SAMPLE_PDF = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
const START_WITH_WHY_LINK = 'https://upfiles.com/AJZC';
const ATOMIC_HABITS_LINK = 'https://www.mediafire.com/file/l50l9gjj9nqz7a2/%2528mktbtypdf.com%2529-%25D8%25B9%25D8%25AF%25D8%25A7%25D8%25AD-%25D8%25B0%25D8%25B1%25D9%258A%25D8%25A9.pdf/file';
const ANTICHRISTOS_LINK = 'https://upfiles.com/C1M6G8nL';
const THE_5AM_CLUB_LINK = 'https://upfiles.com/JOKL';
const HEAR_WHISPER_LINK = 'https://upfiles.com/hckrOE';
const FORTY_RULES_LOVE_LINK = 'https://upfiles.com/I7RK393T';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'start-with-why',
    title: 'ابدأ بلماذا (Start with Why)',
    author: 'سايمون سينك',
    shortDescription: 'كيف يلهم القادة العظام الجميع لاتخاذ إجراءات من خلال البدء بـ "لماذا".',
    description: 'كتاب "ابدأ بلماذا" للكاتب والمحاضر الملهم سايمون سينك هو ثورة في عالم القيادة والتسويق. يشرح سينك من خلال مفهوم "الدائرة الذهبية" لماذا تنجح بعض الشركات والأشخاص في الإلهام والابتكار بينما يفشل الآخرون.',
    coverImage: 'https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80&w=400&h=600',
    downloadUrl: START_WITH_WHY_LINK,
    category: 'إدارة أعمال',
    views: 18000,
    downloads: 6200,
    trending: true,
    price: 'مجاني',
    format: 'PDF',
    pagesCount: 324,
    rating: 4.8,
    ratingCount: 21030,
    seoKeywords: ['ابدأ بلماذا', 'سايمون سينك', 'Start with Why بالعربي'],
    metaDescription: 'تحميل كتاب ابدأ بلماذا لسايمون سينك PDF.'
  },
  {
    id: 'antichristos',
    title: 'أنتيخريستوس',
    author: 'أحمد خالد مصطفى',
    shortDescription: 'رواية تمزج بين الواقع والخيال التاريخي حول السحر والجن والمؤامرات العالمية.',
    description: 'رواية "أنتيخريستوس" للدكتور أحمد خالد مصطفى هي واحدة من أكثر الروايات إثارة للجدل في الوطن العربي. تأخذك الرواية في رحلة عبر الزمن لتعرض أحداثاً تاريخية غامضة.',
    coverImage: 'https://images.unsplash.com/photo-1514593214839-ce18510cd85a?auto=format&fit=crop&q=80&w=400&h=600',
    downloadUrl: ANTICHRISTOS_LINK,
    category: 'روايات',
    views: 68000,
    downloads: 32000,
    trending: true,
    price: 'مجاني',
    format: 'PDF',
    pagesCount: 450,
    rating: 4.5,
    ratingCount: 12000,
    seoKeywords: ['أنتيخريستوس', 'تحميل أنتيخريستوس pdf'],
    metaDescription: 'تحميل رواية أنتيخريستوس PDF مجاناً.'
  },
  {
    id: 'trending-1',
    title: 'العادات الذرية (Atomic Habits)',
    author: 'جيمس كلير',
    shortDescription: 'دليل عملي لبناء عادات جيدة والتخلص من العادات السيئة لتحقيق نتائج مذهلة.',
    description: 'كتاب العادات الذرية لجيمس كلير هو المرجع الأهم عالمياً في تطوير الذات وإدارة السلوك. يشرح الكتاب كيف أن التغييرات البسيطة جداً يمكن أن تؤدي إلى نتائج تراكمية هائلة.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600',
    downloadUrl: ATOMIC_HABITS_LINK,
    category: 'تطوير الذات',
    views: 95200,
    downloads: 41850,
    trending: true,
    price: 'مجاني',
    format: 'PDF',
    pagesCount: 280,
    rating: 4.9,
    ratingCount: 15400,
    seoKeywords: ['العادات الذرية', 'تحميل العادات الذرية pdf'],
    metaDescription: 'تحميل كتاب العادات الذرية لجيمس كلير مجاناً.'
  }
];

export const CATEGORIES = [
  'تطوير الذات',
  'روايات',
  'علم نفس',
  'إدارة أعمال',
  'تاريخ',
  'تكنولوجيا',
  'أدب'
];

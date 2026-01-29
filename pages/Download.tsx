
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../types.ts';
import { INITIAL_BOOKS } from '../constants.ts';

const Download: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [countdown, setCountdown] = useState(15);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('books');
    let found: Book | undefined;
    
    if (saved) {
      const allBooks: Book[] = JSON.parse(saved);
      found = allBooks.find(b => b.id === id);
    }
    
    if (!found) {
      found = INITIAL_BOOKS.find(b => b.id === id);
    }
    
    if (found) {
      setBook(found);
    }
  }, [id]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    const currentProgress = ((15 - countdown) / 15) * 100;
    setProgress(currentProgress);
  }, [countdown]);

  const handleFinalDownload = () => {
    if (book?.downloadUrl) {
      const saved = localStorage.getItem('books');
      if (saved) {
        const allBooks: Book[] = JSON.parse(saved);
        const updated = allBooks.map(b => b.id === book.id ? { ...b, downloads: b.downloads + 1 } : b);
        localStorage.setItem('books', JSON.stringify(updated));
      }
      window.open(book.downloadUrl, '_blank');
    }
  };

  if (!book) return (
    <div className="py-20 text-center flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-500 font-bold">جاري جلب بيانات التحميل الآمن...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-indigo-600 mb-2">مكتبتي الذكية</h1>
        <p className="text-indigo-500/80 font-bold">استمتع بتحميل كتب وروايات pdf مجاناً</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] border border-gray-100">
        <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white">
          <h2 className="text-3xl font-black text-gray-800 mb-2">جاري تجهيز رابط التحميل</h2>
          <p className="text-gray-500 mb-8 font-semibold">
            سيبدأ التحميل تلقائياً خلال <span className="text-indigo-600 font-bold">{countdown}</span> ثانية
          </p>

          <div className="w-full max-w-md bg-gray-100 h-3 rounded-full mb-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 h-full text-[10px] text-gray-500 font-black pr-2 z-10 flex items-center">جاري التجهيز {Math.round(progress)}%</div>
             <div 
               className="h-full bg-indigo-500 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(79,70,229,0.5)]" 
               style={{ width: `${progress}%` }}
             ></div>
          </div>

          <div className="relative w-32 h-32 mb-10">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
              <circle
                cx="64" cy="64" r="58"
                stroke="currentColor" strokeWidth="8"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * progress) / 100}
                strokeLinecap="round"
                className="text-indigo-500 transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-indigo-600">
              {countdown}
            </div>
          </div>

          <button 
            disabled={countdown > 0}
            onClick={handleFinalDownload}
            className={`flex items-center gap-3 px-12 py-4 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95 ${
              countdown > 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed scale-95 opacity-50' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 animate-bounce'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            اضغط للتحميل المباشر
          </button>
          
          <p className="mt-6 text-gray-400 text-sm font-semibold">تحميل آمن وسريع • لا يتطلب تسجيل • فحص فيروسات آلي</p>
        </div>

        <div className="md:w-[40%] bg-gradient-to-br from-indigo-500 to-indigo-700 p-8 flex flex-col items-center justify-center text-white text-center">
          <div className="w-48 h-72 mb-8 transform -rotate-2 hover:rotate-0 transition-all duration-500 group">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-full object-cover rounded-lg shadow-[20px_20px_40px_rgba(0,0,0,0.4)] border-2 border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]" 
            />
          </div>
          <h3 className="text-2xl font-black mb-3 leading-tight">كتاب {book.title}</h3>
          <p className="text-indigo-50/80 mb-6 font-bold">كتاب إلكتروني • {book.pagesCount || 300} صفحة</p>
        </div>
      </div>

      <div className="mt-16 bg-white rounded-[2.5rem] p-10 md:p-16 shadow-sm border border-gray-100">
        <h2 className="text-3xl md:text-4xl font-black text-indigo-800 mb-10 text-center leading-tight">
          لماذا تختار مكتبتنا الذكية؟
        </h2>
        <div className="grid md:grid-cols-2 gap-12 text-gray-600 leading-relaxed text-lg text-right">
          <div className="space-y-8">
            <section>
              <h3 className="text-2xl font-black text-indigo-600 mb-4">تقنيات تحميل متطورة</h3>
              <p>نستخدم أحدث التقنيات لضمان وصولك للمحتوى بسرعة فائقة وبشكل آمن تماماً.</p>
            </section>
          </div>
          <div className="space-y-8">
            <section>
              <h3 className="text-2xl font-black text-indigo-600 mb-4">ذكاء اصطناعي مدمج</h3>
              <p>موقعنا لا يوفر الكتب فقط، بل يساعدك الذكاء الاصطناعي في اختيار ما يناسب ذوقك القرائي.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;

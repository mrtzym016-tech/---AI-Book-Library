
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Book } from '../types';
import { INITIAL_BOOKS } from '../constants';

const Download: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [countdown, setCountdown] = useState(15);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // محاولة جلب الكتاب من LocalStorage أولاً (لأنه قد يحتوي على كتب مضافة يدوياً)
    const saved = localStorage.getItem('books');
    let found: Book | undefined;
    
    if (saved) {
      const allBooks: Book[] = JSON.parse(saved);
      found = allBooks.find(b => b.id === id);
    }
    
    // إذا لم يوجد في LocalStorage، نبحث في القائمة الافتراضية
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
    // تحديث شريط التقدم بناءً على العداد التنازلي
    const currentProgress = ((15 - countdown) / 15) * 100;
    setProgress(currentProgress);
  }, [countdown]);

  const handleFinalDownload = () => {
    if (book?.downloadUrl) {
      // زيادة عدد التحميلات وهمياً عند الضغط
      const saved = localStorage.getItem('books');
      if (saved) {
        const allBooks: Book[] = JSON.parse(saved);
        const updated = allBooks.map(b => b.id === book.id ? { ...b, downloads: b.downloads + 1 } : b);
        localStorage.setItem('books', JSON.stringify(updated));
      }
      
      // فتح رابط التحميل في نافذة جديدة أو في نفس النافذة حسب نوع الرابط
      window.open(book.downloadUrl, '_blank');
    }
  };

  if (!book) return (
    <div className="py-20 text-center flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
      <p className="text-gray-500 font-bold">جاري جلب بيانات التحميل الآمن...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header Branding */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-teal-600 mb-2">مكتبة القمر</h1>
        <p className="text-teal-500/80 font-bold">استمتع بتحميل كتب وروايات pdf مجاناً</p>
      </div>

      {/* Main Download Card */}
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] border border-gray-100">
        
        {/* Left Side: Preparation Area */}
        <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white">
          <h2 className="text-3xl font-black text-gray-800 mb-2">جاري تجهيز رابط التحميل</h2>
          <p className="text-gray-500 mb-8 font-semibold">
            سيبدأ التحميل تلقائياً خلال <span className="text-teal-600 font-bold">{countdown}</span> ثانية
          </p>

          {/* Progress Bar Container */}
          <div className="w-full max-w-md bg-gray-100 h-3 rounded-full mb-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 h-full text-[10px] text-gray-500 font-black pr-2 z-10 flex items-center">جاري التجهيز {Math.round(progress)}%</div>
             <div 
               className="h-full bg-teal-500 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(20,184,166,0.5)]" 
               style={{ width: `${progress}%` }}
             ></div>
          </div>

          {/* Circular Timer */}
          <div className="relative w-32 h-32 mb-10">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64" cy="64" r="58"
                stroke="currentColor" strokeWidth="8"
                fill="transparent"
                className="text-gray-100"
              />
              <circle
                cx="64" cy="64" r="58"
                stroke="currentColor" strokeWidth="8"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * progress) / 100}
                strokeLinecap="round"
                className="text-teal-500 transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-teal-600">
              {countdown}
            </div>
          </div>

          <button 
            disabled={countdown > 0}
            onClick={handleFinalDownload}
            className={`flex items-center gap-3 px-12 py-4 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-95 ${
              countdown > 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed scale-95 opacity-50' 
              : 'bg-teal-600 text-white hover:bg-teal-700 animate-bounce'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            اضغط للتحميل المباشر
          </button>
          
          <p className="mt-6 text-gray-400 text-sm font-semibold">تحميل آمن وسريع • لا يتطلب تسجيل • فحص فيروسات آلي</p>
        </div>

        {/* Right Side: Book Highlight */}
        <div className="md:w-[40%] bg-gradient-to-br from-teal-500 to-emerald-600 p-8 flex flex-col items-center justify-center text-white text-center">
          <div className="w-48 h-72 mb-8 transform -rotate-2 hover:rotate-0 transition-all duration-500 group">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-full object-cover rounded-lg shadow-[20px_20px_40px_rgba(0,0,0,0.4)] border-2 border-white/20 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]" 
            />
          </div>
          <h3 className="text-2xl font-black mb-3 leading-tight">كتاب {book.title}</h3>
          <p className="text-teal-50/80 mb-6 font-bold">كتاب إلكتروني • {book.pagesCount || 300} صفحة</p>
          
          <div className="flex items-center gap-1 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
            <span className="text-sm font-bold">({book.ratingCount || 1000} تقييم)</span>
            <span className="text-lg font-black">{book.rating || 4.5}</span>
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          </div>
        </div>
      </div>

      {/* Telegram Banner */}
      <div className="mt-10 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-[2rem] p-8 flex flex-col items-center gap-6 shadow-xl border border-sky-400/20">
        <p className="text-white text-xl md:text-2xl font-black text-center leading-relaxed">
          المزيد من الكتب في انتظارك مثل كتاب {book.title} هنا 👇 💯
        </p>
        <a 
          href="https://t.me/your_channel" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-sky-600 px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:shadow-2xl transition-all active:scale-95 group"
        >
          <svg className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.462 8.246c.145.584.028 2.038-.122 2.716-.225 1.024-.538 2.622-.893 4.471-.156.812-.599 1.203-1.102 1.26-.912.101-1.219-.446-1.702-.781-.303-.21-.503-.348-.893-.603-.437-.29-.824-.511-1.242-.785-.341-.223-.75-.353-.75-.853 0-.1.03-.2.09-.3.303-.513.791-1.343 1.343-2.28.027-.047.052-.092.076-.136.122-.224.279-.514.375-.75-.045.03-.09.061-.135.093-.728.525-2.022 1.455-2.535 1.838-.345.255-.674.383-.982.383-.162 0-.325-.037-.487-.112-1.204-.555-1.503-.78-2.197-1.147-.238-.124-.431-.226-.431-.526 0-.3.239-.45.478-.6.75-.45 2.146-.941 4.545-1.921 1.2-.495 2.1-.855 2.7-.105z" /></svg>
          انضم الينا عبر تيليجرام
        </a>
      </div>

      {/* SEO Content Section */}
      <div className="mt-16 bg-white rounded-[2.5rem] p-10 md:p-16 shadow-sm border border-gray-100">
        <h2 className="text-3xl md:text-4xl font-black text-teal-800 mb-10 text-center leading-tight">
          Unlock Your Potential: Wealth, Business, and Lifestyle Strategies
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 text-gray-600 leading-relaxed text-lg text-right">
          <div className="space-y-8">
            <section>
              <h3 className="text-2xl font-black text-teal-600 mb-4">Earn Money Online: The Digital Revolution</h3>
              <p>In today's digital age, the opportunities to <span className="bg-teal-50 px-1 font-bold text-teal-700">earn online money</span> have never been more abundant. Whether you're looking to supplement your income or build a full-time career, the internet offers countless avenues for financial growth.</p>
            </section>
            
            <section>
              <h3 className="text-2xl font-black text-teal-600 mb-4">Mastering Forex Trading</h3>
              <p>Learning how to <span className="bg-teal-50 px-1 font-bold text-teal-700">learn Forex</span> trading can be a game-changer for your financial future. The foreign exchange market is the largest financial market in the world, with daily trading volumes exceeding $6 trillion.</p>
            </section>

            <section>
              <h3 className="text-2xl font-black text-teal-600 mb-4">Building Your Online Business</h3>
              <p>Starting an <span className="bg-teal-50 px-1 font-bold text-teal-700">online business</span> has become increasingly accessible. From e-commerce stores to digital services, the barriers to entry have never been lower.</p>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-2xl font-black text-teal-600 mb-4">The Modern Dating Landscape</h3>
              <p><span className="bg-teal-50 px-1 font-bold text-teal-700">Online dating</span> has transformed how people connect and form relationships. With millions of users worldwide, dating platforms offer unprecedented access to potential partners.</p>
            </section>

            <section>
              <h3 className="text-2xl font-black text-teal-600 mb-4">Exploring Dubai's Nightlife</h3>
              <p>Experience the legendary <span className="bg-teal-50 px-1 font-bold text-teal-700">Dubai night life</span>, where luxury and entertainment converge. From rooftop bars with stunning city views to world-class nightclubs, Dubai offers an unparalleled experience.</p>
            </section>

            <section>
              <h3 className="text-2xl font-black text-teal-600 mb-4">International Relocation Guide</h3>
              <p><span className="bg-teal-50 px-1 font-bold text-teal-700">Immigration</span> can open doors to new opportunities. Countries like Canada, Australia, and Germany offer various pathways for skilled professionals and entrepreneurs.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;

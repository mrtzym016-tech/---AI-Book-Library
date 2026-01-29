
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';
import BookCard from '../components/BookCard';
import AdSection from '../components/AdSection';
import { INITIAL_BOOKS, CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
      const savedBooks: Book[] = JSON.parse(saved);
      // نجعل الكتب المحفوظة تظهر أولاً كأحدث إضافات
      const uniqueSaved = savedBooks.filter(sb => !INITIAL_BOOKS.find(ib => ib.id === sb.id));
      setAllBooks([...uniqueSaved, ...INITIAL_BOOKS]);
    } else {
      setAllBooks(INITIAL_BOOKS);
      localStorage.setItem('books', JSON.stringify(INITIAL_BOOKS));
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/search?cat=${encodeURIComponent(category)}`);
  };

  // وظيفة التمرير السلس التي تحل مشكلة "الصفحة السوداء"
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // إزاحة بسيطة لتجاوز الهيدر الثابت
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="mb-12 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 rounded-[2.5rem] p-8 md:p-20 text-white shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold mb-8 border border-white/20 uppercase tracking-widest animate-pulse">
            🌟 استكشف مستقبل القراءة الرقمية
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
            حمّل كُتبك المفضلة <br/><span className="text-indigo-400">بلمحة بصر</span>
          </h1>
          <p className="text-lg md:text-2xl opacity-90 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
            مكتبة ذكية مدعومة بالذكاء الاصطناعي لاقتراح الكتب، مع روابط تحميل مباشرة وسريعة جداً.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => scrollToSection('trending-section')}
              className="bg-white text-indigo-900 px-12 py-5 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] text-xl active:scale-95"
            >
              اكتشف الترند 🔥
            </button>
            <button 
              onClick={() => scrollToSection('latest-section')}
              className="bg-indigo-700/40 backdrop-blur-md text-white border-2 border-white/20 px-12 py-5 rounded-2xl font-black hover:bg-white/10 transition-all text-xl active:scale-95"
            >
              أحدث الإضافات ✨
            </button>
          </div>
        </div>
        
        {/* Decorative Light Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-500 blur-[150px] opacity-30 rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-500 blur-[150px] opacity-30 rounded-full"></div>
      </section>

      <AdSection slot="top-banner" />

      {/* Trending Section */}
      <section id="trending-section" className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4 border-r-8 border-orange-500 pr-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">🔥 كتب تتصدر الترند</h2>
            <p className="text-gray-500 text-lg">الكتب الأكثر تحميلاً وبحثاً في الوطن العربي حالياً</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
          >
            تحديث القائمة
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {allBooks.filter(b => b.trending).slice(0, 5).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Ad Break */}
      <div className="my-16">
        <AdSection slot="mid-home" />
      </div>

      {/* Latest Additions Section */}
      <section id="latest-section" className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4 border-r-8 border-indigo-600 pr-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">📚 أحدث ما تم رفعه</h2>
            <p className="text-gray-500 text-lg">كن أول من يقرأ الإصدارات الجديدة والكنوز المضافة حديثاً</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* عرض الكتب التي لم تظهر في الترند أو عرض الكل مرتباً من الأحدث */}
          {allBooks.slice(0, 10).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Professional Categories Section */}
      <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 mb-16 text-center">
        <h3 className="text-2xl font-black mb-10 text-gray-800">تصفح المكتبة حسب التصنيفات الرائجة</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => handleCategoryClick(cat)}
              className="bg-gray-50 border-2 border-transparent px-10 py-4 rounded-2xl font-bold text-gray-700 hover:border-indigo-600 hover:text-indigo-600 hover:bg-white hover:shadow-xl transition-all active:scale-95"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

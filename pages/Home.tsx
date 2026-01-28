
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
      // دمج الكتب المحفوظة مع الكتب الافتراضية مع إزالة التكرار
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="mb-12 bg-indigo-900 rounded-[2rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-block bg-indigo-500/30 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold mb-6 border border-indigo-400/30 uppercase tracking-widest">
            AI-Powered Digital Library
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.2]">
            تصفح وحمّل آلاف <br/> الكتب المجانية بذكاء
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-10 font-medium max-w-xl mx-auto">
            نستخدم الذكاء الاصطناعي لنقدم لك أفضل التلخيصات والتوصيات لكتابك القادم مع تحسينات سيو فائقة.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('trending')}
              className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-xl text-lg active:scale-95"
            >
              استكشف الترند
            </button>
            <button 
              onClick={() => scrollToSection('latest')}
              className="bg-indigo-700/50 backdrop-blur-sm text-white border border-indigo-500/50 px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all text-lg active:scale-95"
            >
              أحدث الإضافات
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 blur-[120px] opacity-20"></div>
      </section>

      <AdSection slot="top-banner" />

      {/* Main Grid Section */}
      <section id="trending" className="mb-16 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center">
              🔥 كتب رائجة عالمياً
              <span className="mr-3 text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-lg">بحث مكثف</span>
            </h2>
            <p className="text-gray-500 font-medium italic">أكثر الكتب طلباً في الوطن العربي حسب مؤشرات جوجل لهذا الأسبوع</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              تحديث
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* عرض أول 5 كتب ترند */}
          {allBooks.filter(b => b.trending).slice(0, 5).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
          
          {/* قسم أحدث الإضافات في المنتصف */}
          <div id="latest" className="col-span-full py-4 scroll-mt-24">
             <AdSection slot="in-grid-banner" />
             <div className="mt-8 mb-6">
               <h2 className="text-3xl font-black text-gray-900">📚 أحدث الكتب المضافة</h2>
               <p className="text-gray-500 font-medium italic">اكتشف آخر الكنوز التي أضيفت للمكتبة حديثاً</p>
             </div>
          </div>

          {/* عرض باقي الكتب */}
          {allBooks.filter(b => !b.trending || allBooks.indexOf(b) >= 5).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Categories Fast Links */}
      <section className="bg-gray-100/50 rounded-3xl p-10 border border-gray-200/50 mb-16">
        <h3 className="text-xl font-bold mb-8 text-center text-gray-800">تصفح حسب التصنيفات الأكثر طلباً</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => handleCategoryClick(cat)}
              className="bg-white border border-gray-200 px-8 py-3 rounded-2xl font-bold text-gray-600 hover:border-indigo-600 hover:text-indigo-600 hover:shadow-md transition-all active:scale-95"
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


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types.ts';
import BookCard from '../components/BookCard.tsx';
import AdSection from '../components/AdSection.tsx';
import { INITIAL_BOOKS, CATEGORIES } from '../constants.ts';

const Home: React.FC = () => {
  // الفحص المطلوب لضمان بيئة التشغيل
  if (typeof window === "undefined") {
    return null;
  }

  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
      try {
        const savedBooks: Book[] = JSON.parse(saved);
        const uniqueSaved = savedBooks.filter(sb => !INITIAL_BOOKS.find(ib => ib.id === sb.id));
        setAllBooks([...uniqueSaved, ...INITIAL_BOOKS]);
      } catch (e) {
        setAllBooks(INITIAL_BOOKS);
      }
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
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="py-8">
      <section className="mb-12 bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-[2.5rem] p-8 md:p-20 text-white shadow-2xl text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl font-black mb-8">حمّل كُتبك المفضلة <br/><span className="text-indigo-400">بلمحة بصر</span></h1>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => scrollToSection('trending-section')} className="bg-white text-indigo-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-indigo-50 transition-all shadow-lg active:scale-95">اكتشف الترند 🔥</button>
            <button onClick={() => scrollToSection('latest-section')} className="bg-indigo-700/40 text-white border-2 border-white/20 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all active:scale-95">أحدث الإضافات ✨</button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </section>

      <AdSection slot="top-banner" />

      <section id="trending-section" className="mb-20">
        <h2 className="text-4xl font-black text-gray-900 mb-8 border-r-8 border-orange-500 pr-6">🔥 كتب تتصدر الترند</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {allBooks.filter(b => b.trending).slice(0, 5).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section id="latest-section" className="mb-20">
        <h2 className="text-4xl font-black text-gray-900 mb-8 border-r-8 border-indigo-600 pr-6">📚 أحدث ما تم رفعه</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {allBooks.slice(0, 10).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100 text-center">
        <h3 className="text-2xl font-black mb-10 text-gray-800">تصفح حسب التصنيفات</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => handleCategoryClick(cat)} 
              className="bg-gray-50 px-10 py-4 rounded-2xl font-bold text-gray-700 hover:border-indigo-600 border-2 border-transparent transition-all active:scale-95 hover:bg-white hover:shadow-md"
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

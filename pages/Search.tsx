
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Book } from '../types';
import BookCard from '../components/BookCard';
import AdSection from '../components/AdSection';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const catFilter = searchParams.get('cat') || '';
  const [results, setResults] = useState<Book[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
      const allBooks: Book[] = JSON.parse(saved);
      let filtered = allBooks;

      if (catFilter) {
        // إذا كان هناك فلتر تصنيف، نقوم بالتصفية بناءً عليه أولاً
        filtered = filtered.filter(b => b.category === catFilter);
      } else if (query) {
        // إذا كان بحثاً عاماً
        filtered = filtered.filter(b => 
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.category.toLowerCase().includes(query.toLowerCase()) ||
          (b.seoKeywords && b.seoKeywords.some(kw => kw.toLowerCase().includes(query.toLowerCase())))
        );
      }
      
      setResults(filtered);
    }
  }, [query, catFilter]);

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {catFilter ? `قسم: ${catFilter}` : `نتائج البحث عن: "${query}"`}
        </h1>
        <p className="text-gray-500">تم العثور على {results.length} كتاب</p>
      </div>

      <AdSection slot="search-top" />

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-20 text-center border shadow-sm">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">عذراً، لم نجد كتباً في هذا القسم حالياً</h2>
          <p className="text-gray-500 mb-8">حاول تصفح أقسام أخرى أو استخدام محرك البحث العام</p>
          <Link to="/" className="text-indigo-600 font-bold hover:underline">الرجوع للرئيسية</Link>
        </div>
      )}

      <AdSection slot="search-bottom" />
    </div>
  );
};

export default Search;

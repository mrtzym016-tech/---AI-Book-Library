
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Book } from '../types.ts';
import AdSection from '../components/AdSection.tsx';
import { geminiService } from '../services/geminiService.ts';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showReader, setShowReader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('books');
    if (saved) {
      const allBooks: Book[] = JSON.parse(saved);
      const found = allBooks.find(b => b.id === id);
      if (found) {
        setBook(found);
        geminiService.suggestSimilarBooks(found.title, found.category).then(setRecommendations);
      }
    }
    setLoading(false);
  }, [id]);

  const handleDownloadClick = () => {
    if (!book) return;
    navigate(`/download/${book.id}`);
  };

  const openReader = () => {
    if (book?.downloadUrl && book.downloadUrl !== '#') {
      setShowReader(true);
    } else {
      alert('عذراً، خاصية القراءة أونلاين غير متاحة لهذا الكتاب حالياً.');
    }
  };

  if (loading) return <div className="py-20 text-center font-bold text-indigo-600">جاري جلب بيانات الكتاب...</div>;
  if (!book) return <div className="py-20 text-center text-red-500 font-bold">عذراً، هذا الكتاب غير متاح في مكتبتنا حالياً.</div>;

  return (
    <div className="py-8">
      <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-indigo-600 transition-colors">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-bold">{book.title}</span>
      </nav>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <div className="sticky top-24">
            <img src={book.coverImage} alt={book.title} className="w-full rounded-2xl shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform" />
            <div className="mt-6 space-y-3">
              <button 
                onClick={handleDownloadClick}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg hover:bg-indigo-700 shadow-lg flex items-center justify-center space-x-2 space-x-reverse active:scale-95 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <span>تحميل PDF</span>
              </button>
              <button 
                onClick={openReader}
                className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 active:scale-95 transition-all"
              >
                قراءة أونلاين
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-4">{book.category}</span>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 leading-tight">{book.title}</h1>
          <p className="text-xl text-indigo-600 font-bold mb-8">المؤلف: {book.author}</p>
          
          <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed mb-10">
            <h3 className="text-2xl font-black text-gray-900 mb-6 border-r-8 border-indigo-600 pr-4 bg-gray-50 py-2">عن الكتاب</h3>
            {book.description.split('\n').map((para, i) => (
              <p key={i} className="mb-4 text-lg">{para}</p>
            ))}
          </div>

          <AdSection slot="detail-after-content" />

          {book.seoKeywords && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h4 className="font-black text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-indigo-500 ml-2" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" /></svg>
                الكلمات المفتاحية
              </h4>
              <div className="flex flex-wrap gap-2">
                {book.seoKeywords.map(kw => (
                  <span key={kw} className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition-all cursor-default">#{kw}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showReader && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-2 md:p-10 transition-opacity duration-300">
          <div className="w-full max-w-6xl h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-indigo-600 text-white p-4 flex justify-between items-center shrink-0">
              <h3 className="font-black truncate pr-4">{book.title} - وضع القراءة</h3>
              <button 
                onClick={() => setShowReader(false)}
                className="bg-white/10 hover:bg-red-500 p-2 rounded-xl transition-all"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-grow bg-gray-100 relative">
              <iframe 
                src={`${book.downloadUrl}#toolbar=0`} 
                className="w-full h-full border-none"
                title="PDF Reader"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;

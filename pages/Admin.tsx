
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService.ts';
import { Book } from '../types.ts';
import { CATEGORIES } from '../constants.ts';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: CATEGORIES[0],
    downloadUrl: '',
    coverImage: 'https://picsum.photos/seed/' + Math.random() + '/400/600',
    price: 'مجاني',
    format: 'PDF'
  });
  const [loading, setLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState('');
  const navigate = useNavigate();

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAiStatus('🤖 الذكاء الاصطناعي يقوم الآن بكتابة وصف تسويقي احترافي وتحسين السيو...');

    try {
      const aiResponse = await geminiService.generateBookDetails(formData.title, formData.author, formData.category);
      
      const newBook: Book = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        description: aiResponse.description || `تحميل كتاب ${formData.title} مجاناً.`,
        shortDescription: aiResponse.shortDescription || `كتاب ${formData.title} من تأليف ${formData.author}.`,
        seoKeywords: aiResponse.seoKeywords || [formData.title, formData.author],
        metaDescription: aiResponse.metaDescription || `تحميل كتاب ${formData.title} PDF.`,
        views: Math.floor(Math.random() * 100),
        downloads: 0,
        trending: true
      };

      const existing = JSON.parse(localStorage.getItem('books') || '[]');
      const updated = [newBook, ...existing];
      localStorage.setItem('books', JSON.stringify(updated));

      setAiStatus('✨ تم النشر وتوليد المحتوى بنجاح!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      setAiStatus('❌ حدث خطأ، تم حفظ الكتاب بوصف افتراضي.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-indigo-600 p-10 text-white text-center">
          <h1 className="text-3xl font-black mb-2">إضافة كتاب جديد للمكتبة</h1>
          <p className="text-indigo-100 opacity-80">أدخل البيانات الأساسية وسيتولى الذكاء الاصطناعي الباقي</p>
        </div>

        <form onSubmit={handleAddBook} className="p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 mr-2">عنوان الكتاب</label>
              <input 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold" 
                placeholder="مثال: فن الإقناع" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 mr-2">المؤلف</label>
              <input 
                required
                value={formData.author}
                onChange={e => setFormData({...formData, author: e.target.value})}
                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold" 
                placeholder="اسم الكاتب الكامل" 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 mr-2">التصنيف</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-gray-600"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 mr-2">السعر الظاهري</label>
              <select 
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-gray-600"
              >
                <option value="مجاني">مجاني</option>
                <option value="مدفوع">مدفوع</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 mr-2">تنسيق الملف</label>
              <select 
                value={formData.format}
                onChange={e => setFormData({...formData, format: e.target.value})}
                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-gray-600"
              >
                <option value="PDF">PDF</option>
                <option value="EPUB">EPUB</option>
                <option value="Audio">كتاب صوتي</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 mr-2">رابط التحميل</label>
            <input 
              required
              type="url"
              value={formData.downloadUrl}
              onChange={e => setFormData({...formData, downloadUrl: e.target.value})}
              className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold" 
              placeholder="https://..." 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 mr-2">رابط الغلاف</label>
            <input 
              required
              type="url"
              value={formData.coverImage}
              onChange={e => setFormData({...formData, coverImage: e.target.value})}
              className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-semibold" 
              placeholder="https://..." 
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-5 rounded-2xl text-white font-black text-xl transition-all shadow-2xl flex items-center justify-center space-x-3 space-x-reverse ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}`}
            >
              {loading && <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              <span>{loading ? 'جاري التحليل والنشر...' : 'توليد المحتوى ونشر الكتاب'}</span>
            </button>
            {aiStatus && (
              <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-center text-sm font-bold text-indigo-700 animate-pulse">
                {aiStatus}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;

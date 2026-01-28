
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem('is_admin') === 'true';
      setIsAdmin(adminStatus);
    };

    checkAdmin();
    // مراقبة التغييرات في localStorage لتحديث الحالة فوراً
    window.addEventListener('storage', checkAdmin);
    return () => window.removeEventListener('storage', checkAdmin);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const logoutAdmin = () => {
    if (window.confirm('هل تريد تسجيل الخروج؟')) {
      localStorage.removeItem('is_admin');
      setIsAdmin(false);
      navigate('/');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* منطقة اللوجو */}
        <div className="flex items-center space-x-2 space-x-reverse shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-indigo-900 hidden sm:inline-block">مكتبتي الذكية</span>
          </Link>
        </div>

        {/* محرك البحث */}
        <form onSubmit={handleSearch} className="flex-grow max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن كتاب، مؤلف، أو تصنيف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-sm transition-all"
            />
            <button type="submit" className="absolute left-3 top-2.5">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* أزرار الإدارة */}
        <div className="flex items-center space-x-4 space-x-reverse shrink-0">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <Link 
                to="/admin" 
                className="bg-green-600 text-white font-bold hover:bg-green-700 text-xs px-4 py-2 rounded-xl shadow-sm transition-all flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                رفع كتاب
              </Link>
              <button 
                onClick={logoutAdmin} 
                className="bg-gray-100 text-gray-600 hover:text-red-500 transition-colors p-2 rounded-xl"
                title="خروج"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          ) : (
             <Link to="/login" className="text-gray-400 hover:text-indigo-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
             </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

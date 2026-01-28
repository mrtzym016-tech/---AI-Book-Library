
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Admin from './pages/Admin';
import Search from './pages/Search';
import Login from './pages/Login';

// Explicitly define types for children to resolve the missing prop error in certain TS environments
interface AdminRouteProps {
  children: React.ReactNode;
}

// Wrap the component with React.FC to properly handle children in modern React types
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAdmin = localStorage.getItem('is_admin') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              } 
            />
            <Route path="/search" element={<Search />} />
            {/* أي مسار آخر غير معروف يوجه للرئيسية */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

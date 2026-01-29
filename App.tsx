
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.tsx';
import Home from './pages/Home.tsx';
import BookDetail from './pages/BookDetail.tsx';
import Admin from './pages/Admin.tsx';
import Search from './pages/Search.tsx';
import Login from './pages/Login.tsx';
import Download from './pages/Download.tsx';
import FooterComponent from './components/Footer.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('is_admin') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/download/:id" element={<Download />} />
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
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <FooterComponent />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;

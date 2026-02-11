import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';

// ── Route-level code splitting ──
// Each page (and its deps like framer-motion, reviewsData) is only
// fetched when the user navigates to that route.
const Home = React.lazy(() => import('./pages/Home'));
const AccessControl = React.lazy(() => import('./pages/AccessControl'));
const Fences = React.lazy(() => import('./pages/Fences'));
const Gates = React.lazy(() => import('./pages/Gates'));
const Railings = React.lazy(() => import('./pages/Railings'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Careers = React.lazy(() => import('./pages/Careers'));

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-body antialiased">
        <Header />
        <main className="flex-1">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-iron-900">
              <div className="w-10 h-10 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/access-control" element={<AccessControl />} />
              <Route path="/fences" element={<Fences />} />
              <Route path="/gates" element={<Gates />} />
              <Route path="/railings" element={<Railings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/careers" element={<Careers />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AccessControl from './pages/AccessControl';
import Fences from './pages/Fences';
import Gates from './pages/Gates';
import Railings from './pages/Railings';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-body antialiased">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/access-control" element={<AccessControl />} />
            <Route path="/fences" element={<Fences />} />
            <Route path="/gates" element={<Gates />} />
            <Route path="/railings" element={<Railings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

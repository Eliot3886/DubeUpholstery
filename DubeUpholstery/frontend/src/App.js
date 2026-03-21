import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Customer Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import RequestQuote from './pages/RequestQuote';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

import MobileBottomNav from './components/MobileBottomNav';

const AdminRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Admin Routes - without standard Navbar/Footer */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />

          {/* Customer Routes - with standard Navbar/Footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/quote" element={<RequestQuote />} />
                </Routes>
              </main>
              <Footer />
              <MobileBottomNav />
              <a 
                href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%2C%20How%20can%20we%20help%20you%3F" 
                className="whatsapp-float animate-pulse-green"
                target="_blank" 
                rel="noopener noreferrer"
                title="Chat with us on WhatsApp"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.996 2C6.474 2 2 6.473 2 11.996c0 1.944.502 3.766 1.413 5.385l-1.4 5.118 5.234-1.372A9.945 9.945 0 0 0 11.996 22c5.522 0 9.996-4.474 9.996-9.996C21.992 6.473 17.518 2 11.996 2zm5.405 14.394c-.23.642-1.334 1.206-1.84 1.276-.505.07-1.16-.046-3.328-.946-2.612-1.082-4.282-3.754-4.412-3.926-.13-.172-1.054-1.4-1.054-2.67 0-1.27.662-1.896.892-2.158.23-.263.504-.328.672-.328.17 0 .34 0 .484.006.155.006.357-.058.558.423.208.5 .713 1.737.776 1.865.064.13.104.28.02.45-.083.172-.128.28-.26.435-.13.15-.276.33-.393.45-.128.128-.262.27-.116.524.145.253.643 1.065 1.38 1.718.95.84 1.742 1.096 1.997 1.222.254.128.4.106.55-.062.148-.172.64-.746.812-1.002.17-.255.342-.213.575-.128.23.085 1.46.69 1.714.818.254.128.422.19.485.3.063.107.063.633-.167 1.274z"/>
                </svg>
              </a>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

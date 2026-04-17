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

import MobileBottomNav from './components/MobileBottomNav';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>

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
                </Routes>
              </main>
              <Footer />
              <MobileBottomNav />
              <a 
                href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20If%20you%20want%20Sofas%2C%20Car%20Seat%2C%20Headboard%2C%20Car%20triming%20or%20other." 
                className="whatsapp-float animate-pulse-green"
                target="_blank" 
                rel="noopener noreferrer"
                title="Chat with us on WhatsApp"
              >
                Chat on WhatsApp
              </a>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

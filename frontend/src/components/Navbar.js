import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">DUBE</span>
          <span className="logo-subtext">UPHOLSTERY</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu desktop-only">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
          <Link to="/gallery" className={`nav-link ${isActive('/gallery')}`}>Gallery</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>

          <div className="nav-actions">
            <a href="tel:+27647083636" className="nav-contact">
              <Phone size={18} />
              <span>Call Us</span>
            </a>
            <Link to="/quote" className="btn btn-primary nav-cta">
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Mobile Get Quote Button (Always visible on top right for mobile) */}
        <div className="mobile-cta d-md-none">
          <Link to="/quote" className="btn btn-primary btn-sm mobile-quote-btn">
            Get Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

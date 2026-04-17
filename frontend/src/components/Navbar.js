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
          <img src="/logo.jpeg" alt="Dube Upholstery" className="nav-logo-img" />
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
            <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-primary nav-cta" target="_blank" rel="noopener noreferrer">
              Get a Quote
            </a>
          </div>
        </div>

        {/* Mobile Get Quote Button (Always visible on top right for mobile) */}
        <div className="mobile-cta d-md-none">
          <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-primary btn-sm mobile-quote-btn" target="_blank" rel="noopener noreferrer">
            Get a Quote
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Image as ImageIcon, MessageCircle } from 'lucide-react';
import './MobileBottomNav.css';

const MobileBottomNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="mobile-bottom-nav d-md-none">
      <Link to="/" className={`bottom-nav-item ${isActive('/')}`}>
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link to="/services" className={`bottom-nav-item ${isActive('/services')}`}>
        <Briefcase size={20} />
        <span>Services</span>
      </Link>
      <Link to="/gallery" className={`bottom-nav-item ${isActive('/gallery')}`}>
        <ImageIcon size={20} />
        <span>Gallery</span>
      </Link>
      <Link to="/contact" className={`bottom-nav-item ${isActive('/contact')}`}>
        <MessageCircle size={20} />
        <span>Contact</span>
      </Link>
    </nav>
  );
};

export default MobileBottomNav;

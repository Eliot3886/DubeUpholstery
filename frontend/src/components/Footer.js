import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="navbar-logo footer-logo">
            <span className="logo-text">DUBE</span>
            <span className="logo-subtext text-white">UPHOLSTERY</span>
          </Link>
          <p className="footer-bio">
            Premium custom upholstery, furniture repair, and design services. Transforming your spaces with craftsmanship and elegance.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61583552411795" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook size={20} /></a>
            <a href="https://tiktok.com/@dube.upholstery" target="_blank" rel="noopener noreferrer" className="social-icon tiktok-hover">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 1.15-.14 2.3-.14 3.45 0 1.93-.35 3.85-1.35 5.48-1.57 2.65-4.66 4.31-7.72 3.91-1.92-.25-3.71-1.33-4.81-2.91-1.1-1.57-1.46-3.56-1-5.41.4-1.63 1.4-3.13 2.81-4.1 1.62-1.11 3.73-1.51 5.62-1.07V6.03c-2.13-.37-4.41.13-6.12 1.55-1.7 1.41-2.6 3.65-2.3 5.8 0 0.01 0 0.01 0 0.02 0 0.44 0.05 0.88 0.14 1.32 0.38 2.05 1.76 3.91 3.66 4.88 1.91.97 4.25 1.05 6.22.25 1.83-.75 3.25-2.36 3.83-4.24 0.17-.55 0.25-1.13 0.25-1.71 0-2.3 0-4.61 0-6.91v-.01c-1.3-.84-2.21-2.09-2.58-3.56-.03-.13-.05-.27-.06-.41z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services#sofa">Sofa Repair</Link></li>
            <li><Link to="/services#custom">Custom Design</Link></li>
            <li><Link to="/services#headboard">Headboards</Link></li>
            <li><Link to="/services#upholstery">Reupholstery</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact#contact-form">Contact</Link></li>
            <li><Link to="/quote#quote-form">Request Quote</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <a href="tel:+27647083636" className="contact-item" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Phone size={18} />
            <span>+27 64 708 3636</span>
          </a>
          <div className="contact-item">
            <Mail size={18} />
            <span>dubeupholstery@gmail.com</span>
          </div>
          <div className="contact-item">
            <MapPin size={18} />
            <span>Kwa-Guqa, eMalahleni, 1073</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Dube Upholstery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

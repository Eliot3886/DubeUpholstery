import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear about your furniture restoration needs.</p>
        </div>
      </div>

      <div className="container section-padding">
        {/* Contact Information */}
        <div className="contact-info">
          <h2 className="mb-4 text-center">Our Details</h2>
          <div className="glass-card mx-auto" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2.5rem' }}>
            <a href="tel:+27647083636" className="info-item" style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '280px', margin: '0 auto', gap: '1.5rem', color: 'inherit', textDecoration: 'none' }}>
              <div className="icon-wrapper" style={{ flexShrink: 0 }}>
                <Phone size={24} />
              </div>
              <div className="card-content" style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--secondary)' }}>Call Us</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>+27 64 708 3636</p>
              </div>
            </a>

            <a href="mailto:sheltonchihota7@gmail.com" className="info-item" style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '280px', margin: '0 auto', gap: '1.5rem', color: 'inherit', textDecoration: 'none' }}>
              <div className="icon-wrapper" style={{ flexShrink: 0 }}>
                <Mail size={24} />
              </div>
              <div className="card-content" style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--secondary)' }}>Email Us</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', overflowWrap: 'break-word', wordBreak: 'break-all' }}>sheltonchihota7@gmail.com</p>
              </div>
            </a>

            <div className="info-item" style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '280px', margin: '0 auto', gap: '1.5rem' }}>
              <div className="icon-wrapper" style={{ flexShrink: 0 }}>
                <MapPin size={24} />
              </div>
              <div className="card-content" style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--secondary)' }}>Visit Us</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', overflowWrap: 'break-word', wordBreak: 'break-word' }}>Kwa-Guqa, eMalahleni</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="map-section mt-5 pt-5 pb-4">
          <h2 className="mb-4 text-center">Our Location</h2>
          <div className="map-container glass-card p-0 overflow-hidden mx-auto" style={{ borderRadius: '15px', maxWidth: '800px', height: '400px' }}>
            <iframe
              src="https://maps.google.com/maps?q=-25.858097,29.1087421&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dube Upholstery Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

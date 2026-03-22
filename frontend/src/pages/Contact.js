import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch("https://dubeupholstery-1.onrender.com/api/contacts/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error submitting contact form", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-page container text-center pt-5 pb-5 mt-5">
        <div className="glass-card success-card mx-auto" style={{ maxWidth: '500px' }}>
          <CheckCircle size={64} className="text-primary mx-auto mb-3" />
          <h2>Message Sent!</h2>
          <p className="text-muted mb-4">
            Thank you, {formData.name}. We have received your message and will get back to you shortly.
          </p>
          <button className="btn btn-outline" onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
          }}>Send Another Message</button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear about your furniture restoration needs.</p>
        </div>
      </div>

      <div className="container section-padding">
        
        {/* 1. Contact Form - NOW ON TOP */}
        <div className="contact-form-wrapper glass-card mb-5 mx-auto" id="contact-form" style={{ maxWidth: '800px' }}>
          <h2 className="mb-4 text-center">Send a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group flex-1">
                <label htmlFor="name">Full Name *</label>
                <input type="text" id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group flex-1">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" placeholder="+27 64 708 3636" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" rows="5" placeholder="How can we help you?" value={formData.message} onChange={handleChange} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Sending...' : <>Send Message <Send size={18} className="ml-2" /></>}
            </button>
          </form>
        </div>

        {/* 2. Contact Information - NOW BELOW FORM */}
        <div className="contact-info mt-5">
          <h2 className="mb-4 text-center">Our Details</h2>
          <div className="info-cards-grid">
            <a href="tel:+27647083636" className="info-card glass-card" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="icon-wrapper">
                <Phone size={24} />
              </div>
              <div className="card-content">
                <h3>Call Us</h3>
                <p>+27 64 708 3636</p>
              </div>
            </a>

            <div className="info-card glass-card">
              <div className="icon-wrapper">
                <Mail size={24} />
              </div>
              <div className="card-content">
                <h3>Email Us</h3>
                <p>dubeupholstery@gmail.com</p>
              </div>
            </div>

            <div className="info-card glass-card">
              <div className="icon-wrapper">
                <MapPin size={24} />
              </div>
              <div className="card-content">
                <h3>Visit Us</h3>
                <p>Kwa-Guqa, eMalahleni</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Map Embed - WITH NEW HEADING AND EXTRA SPACE */}
        <div className="map-section mt-5 pt-5 pb-4">
          <h2 className="mb-4 text-center">Click to view our location</h2>
          <div className="map-container glass-card p-0 overflow-hidden mx-auto" style={{ borderRadius: '15px', maxWidth: '500px', height: '500px' }}>
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

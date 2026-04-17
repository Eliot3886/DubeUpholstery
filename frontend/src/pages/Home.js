import React from 'react';
import { ArrowRight, Star, Shield, Clock, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

// Fallback images if API fails or images are missing
import sofaRepairImg from '../assets/images/sofa_repair.jpeg';
import customDesignImg from '../assets/images/sofa.jpeg';
import headboardsImg from '../assets/images/headboards.jpeg';
import bedRepairImg from '../assets/images/bed.png';
import carSeatRepairImg from '../assets/images/carSeat.png';
import carTrimmingsImg from '../assets/images/Car_trimming.jpg';

const Home = () => {
  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content container">
          <div className="hero-text glass-card">
            <h1>Masterful Upholstery & Fine Craftsmanship</h1>
            <p>
              Breathing new life into cherished furniture. We specialize in expert repair and premium reupholstery for residential and commercial spaces.
            </p>
            <div className="hero-buttons">
              <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Get a Free Quote
                <ArrowRight size={18} />
              </a>
              <Link to="/gallery" className="btn btn-outline">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <section className="trust-bar bg-white">
        <div className="container trust-container">
          <div className="trust-item">
            <Star className="trust-icon" />
            <div className="trust-info">
              <h4>15+ Years</h4>
              <p>Experience</p>
            </div>
          </div>
          <div className="trust-item">
            <ThumbsUp className="trust-icon" />
            <div className="trust-info">
              <h4>1000+</h4>
              <p>Projects Completed</p>
            </div>
          </div>
          <div className="trust-item">
            <Shield className="trust-icon" />
            <div className="trust-info">
              <h4>Premium</h4>
              <p>Quality Materials</p>
            </div>
          </div>
          <div className="trust-item">
            <Clock className="trust-icon" />
            <div className="trust-info">
              <h4>On-Time</h4>
              <p>Delivery Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="services-highlight container section-padding">
        <div className="section-header text-center mb-4">
          <span className="subtitle">What We Do</span>
          <h2>Our Expertise</h2>
          <div className="header-line"></div>
        </div>

        <div className="services-grid">
          <div className="service-card glass-card">
            <img src={sofaRepairImg} alt="Sofa and chair repair" className="service-img" />
            <div className="service-content">
              <h3>Sofa and chair repair</h3>
              <p>Professional restoration and repair for all types of sofas and household chairs.</p>
              <Link to="/services#sofa" className="service-link">Learn More <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="service-card glass-card">
            <img src={carSeatRepairImg} alt="Car seat repair" className="service-img" />
            <div className="service-content">
              <h3>Car seat repair</h3>
              <p>Expert repair for vehicle interiors, restoring seats to their original condition.</p>
              <Link to="/services#car-seat" className="service-link">Learn More <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="service-card glass-card">
            <img src={headboardsImg} alt="Headboards" className="service-img" />
            <div className="service-content">
              <h3>Headboards</h3>
              <p>Custom-made upholstered headboards designed to match your bedroom's aesthetic.</p>
              <Link to="/services#headboard" className="service-link">Learn More <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="service-card glass-card">
            <img src={customDesignImg} alt="Complete reupholstery" className="service-img" />
            <div className="service-content">
              <h3>Complete reupholstery</h3>
              <p>Full transformation of your furniture with new fabric and foam for a fresh look.</p>
              <Link to="/services#upholstery" className="service-link">Learn More <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="service-card glass-card">
            <img src={carTrimmingsImg} alt="Car trimming" className="service-img" />
            <div className="service-content">
              <h3>Car trimming</h3>
              <p>Precision trimming services for various automotive interior components.</p>
              <Link to="/services#car-trimmings" className="service-link">Learn More <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="service-card glass-card">
            <img src={bedRepairImg} alt="Bed repair" className="service-img" />
            <div className="service-content">
              <h3>Bed repair</h3>
              <p>Structural repairs and reupholstery for bed frames and bedroom furniture.</p>
              <Link to="/services#bed" className="service-link">Learn More <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="/services" className="btn btn-secondary">Explore All Services</Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-overlay container">
          <div className="cta-content glass-card text-center">
            <h2>Ready to Transform Your Furniture?</h2>
            <p>Send us a photo of your project, and we'll provide a detailed estimate.</p>
            <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-primary mt-4" target="_blank" rel="noopener noreferrer">
              Start Your Project Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

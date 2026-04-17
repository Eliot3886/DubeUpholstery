import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import './Services.css';
import sofaRepairImg from '../assets/images/sofa_repair.jpeg';
import customDesignImg from '../assets/images/sofa.jpeg';
import headboardsImg from '../assets/images/headboards.jpeg';
import bedRepairImg from '../assets/images/bed.png';
import carSeatImg from '../assets/images/carSeat.png';
import carTrimmingImg from '../assets/images/Car_trimming.jpg';
import fabricCatalogImg from '../assets/images/fabric-catalog.png';

const Services = () => {
  return (
    <div className="services-page animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Expert craftsmanship tailored to your space</p>
        </div>
      </div>

      {/* Fabric Catalog Section */}
      <div className="container" style={{ paddingBottom: '3rem' }}>
        <div className="section-header text-center mb-5">
          <span className="subtitle">Expert Materials</span>
          <h2>Our Fabric Catalog</h2>
          <div className="header-line"></div>
          <p className="mt-3">We offer a wide selection of premium fabrics to suit your style and durability needs.</p>
        </div>

        <div className="text-center p-5 glass-card">
          {/* Static image of fabrics */}
          <div className="fabric-catalog-placeholder mt-4 mx-auto" style={{ maxWidth: '500px' }}>
            <img src={fabricCatalogImg} alt="Fabric selection" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="container section-padding">
        
        {/* Service 1: Sofa Repair */}
        <div className="service-detail-card glass-card" id="sofa">
          <img src={sofaRepairImg} alt="Sofa & Chair Repair" className="service-detail-image" />
          <div className="service-detail-content">
            <h2>Sofa & Chair Repair</h2>
            <p>We breathe new life into your cherished seating. From fixing broken frames and replacing worn springs to repairing torn fabric, our expert craftsmen reconstruct your furniture from the inside out to ensure it looks and feels as good as new.</p>
            <ul className="service-features">
              <li><CheckCircle2 size={18} className="text-primary" /> Structural frame repair</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Spring & webbing replacement</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Foam replacement & cushioning upgrade</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Fabric tear and seam repair</li>
            </ul>
            <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-outline mt-3" target="_blank" rel="noopener noreferrer">Request a Quote</a>
          </div>
        </div>

        {/* Service 2: Complete reupholstery */}
        <div className="service-detail-card glass-card" id="upholstery">
          <img src={customDesignImg} alt="Complete reupholstery" className="service-detail-image" />
          <div className="service-detail-content">
            <h2>Complete reupholstery</h2>
            <p>Full transformation of your furniture with new fabric and foam. We provide a fresh, modern look for your existing pieces while maintaining their structural integrity.</p>
            <ul className="service-features">
              <li><CheckCircle2 size={18} className="text-primary" /> Complete fabric replacement</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Foam & padding upgrades</li>
              <li><CheckCircle2 size={18} className="text-primary" /> New modern fabric selections</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Detailed piping & finishing</li>
            </ul>
            <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-outline mt-3" target="_blank" rel="noopener noreferrer">Request a Quote</a>
          </div>
        </div>

        {/* Service 3: Headboards */}
        <div className="service-detail-card glass-card" id="headboard">
          <img src={headboardsImg} alt="Headboards" className="service-detail-image" />
          <div className="service-detail-content">
            <h2>Headboards</h2>
            <p>Transform your bedroom with a custom-upholstered headboard. We design and create headboards in any shape, size, or style, featuring beautiful detailing.</p>
            <ul className="service-features">
              <li><CheckCircle2 size={18} className="text-primary" /> Custom tufted & paneled designs</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Wide range of textures & colors</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Precision wall mounting</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Matching bed base options</li>
            </ul>
            <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-outline mt-3" target="_blank" rel="noopener noreferrer">Request a Quote</a>
          </div>
        </div>

        {/* Service 4: Bed Repair */}
        <div className="service-detail-card glass-card" id="bed">
          <img src={bedRepairImg} alt="Bed repair" className="service-detail-image" />
          <div className="service-detail-content">
            <h2>Bed repair</h2>
            <p>Structural repairs and reupholstery for bed frames. We ensure your bed is both functional and aesthetically pleasing.</p>
            <ul className="service-features">
              <li><CheckCircle2 size={18} className="text-primary" /> Frame reinforcement</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Slat & support repair</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Headboard & base upholstery</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Fabric & leather options</li>
            </ul>
            <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-outline mt-3" target="_blank" rel="noopener noreferrer">Request a Quote</a>
          </div>
        </div>

        {/* Service 5: Car Seat Repair */}
        <div className="service-detail-card glass-card" id="car-seat">
          <img src={carSeatImg} alt="Car Seat Repair" className="service-detail-image" />
          <div className="service-detail-content">
            <h2>Car Seat Repair</h2>
            <p>We offer professional car seat repair services to restore the comfort and appearance of your vehicle's interior. Whether it's a torn seam, worn leather or damaged foam, we handle it all with precision.</p>
            <ul className="service-features">
              <li><CheckCircle2 size={18} className="text-primary" /> Leather & fabric seat repair</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Foam padding replacement</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Seam & stitching restoration</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Color matching & refinishing</li>
            </ul>
            <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-outline mt-3" target="_blank" rel="noopener noreferrer">Request a Quote</a>
          </div>
        </div>

        {/* Service 6: Car Trimming */}
        <div className="service-detail-card glass-card" id="car-trimmings">
          <img src={carTrimmingImg} alt="Car Trimming" className="service-detail-image" />
          <div className="service-detail-content">
            <h2>Car Trimming</h2>
            <p>We provide expert car trimming services to enhance and restore your vehicle's interior panels, headlinings, door cards and more. Exceptional finish guaranteed.</p>
            <ul className="service-features">
              <li><CheckCircle2 size={18} className="text-primary" /> Headlining replacement</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Door card & panel trimming</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Dashboard & console wrapping</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Custom interior upgrades</li>
            </ul>
            <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-outline mt-3" target="_blank" rel="noopener noreferrer">Request a Quote</a>
          </div>
        </div>

      </div>

      {/* Ready CTA */}
      <div className="container text-center mb-5 mt-4">
        <div className="glass-card ready-cta-card">
          <h2>Have a project in mind?</h2>
          <p className="mb-3 text-muted">We're ready to bring your vision to life with unparalleled craftsmanship.</p>
          <a href="https://wa.me/27647083636?text=Welcome%20to%20Dube%20Upholstery%20and%20You%20are%20free%20to%20request%20a%20quotation%20on%20Sofas%20%2C%20Car%20Seat%20repair%2C%20Headboards%2C%20Car%20triming%20or%20others." className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Start Your Project <ArrowRight size={16} /></a>
        </div>
      </div>
    </div>
  );
};

export default Services;

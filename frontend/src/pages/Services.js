import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';
import sofaRepairImg from '../assets/images/sofa_repair.jpeg';
import customDesignImg from '../assets/images/sofa.jpeg';
import headboardsImg from '../assets/images/headboards.jpeg';
import bedRepairImg from '../assets/images/bed.png';
import carSeatImg from '../assets/images/carSeat.png';
import carTrimmingImg from '../assets/images/Car_trimming.jpg';

const Services = () => {
  const [customServices, setCustomServices] = useState([]);
  const [fabrics, setFabrics] = useState([]);

  useEffect(() => {
    const fetchFabrics = async () => {
      try {
        const response = await fetch('https://dubeupholstery-1.onrender.com/api/fabrics/');
        if (response.ok) {
          const data = await response.json();
          setFabrics(data);
        }
      } catch (error) {
        console.error("Failed to load fabrics", error);
      }
    };
    fetchFabrics();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://dubeupholstery-1.onrender.com/api/services/');
        if (response.ok) {
          const data = await response.json();
          setCustomServices(data);
        }
      } catch (error) {
        console.error("Failed to load services", error);
      }
    };
    fetchServices();
  }, []);

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
      <div className="container section-padding">
        <div className="section-header text-center mb-5">
          <span className="subtitle">Expert Materials</span>
          <h2>Our Fabric Catalog</h2>
          <div className="header-line"></div>
          <p className="mt-3">We offer a wide selection of premium fabrics to suit your style and durability needs.</p>
        </div>

        {fabrics.length > 0 ? (
          <div className="fabric-catalog-grid">
            {fabrics.map(fabric => (
              <div key={fabric.id} className="fabric-card glass-card">
                <div className="fabric-image-container">
                  <img
                    src={fabric.image}
                    alt={fabric.title || "Fabric"}
                    className="fabric-image"
                  />
                </div>
                {(fabric.title || fabric.description) && (
                  <div className="fabric-info">
                    {fabric.title && <h3>{fabric.title}</h3>}
                    {fabric.description && <p>{fabric.description}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-5 glass-card">
            <p className="text-muted">Explore our catalog of premium upholstery fabrics below.</p>
            {/* Fallback image if no dynamic fabrics exist yet */}
            <div className="fabric-catalog-placeholder mt-4">
              <img src="/assets/images/fabrics_placeholder.jpg" alt="Fabric selection" style={{ maxWidth: '100%', borderRadius: 'var(--radius-lg)' }} />
            </div>
          </div>
        )}
      </div>

      {/* Services List */}
      <div className="container section-padding">
        {/* Dynamic Custom Services (Newest First) */}
        {customServices.map((srv, idx) => {
          const isVideo = srv.img.endsWith('.mp4') || srv.img.includes('youtube.com') || srv.img.includes('youtu.be');
          return (
            <div key={`custom-${srv.id}`} className="service-detail-card glass-card">
              <div className="service-image-container" style={{ flex: '1' }}>
                {isVideo ? (
                  <video src={srv.img} className="service-detail-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} autoPlay muted loop controls playsInline />
                ) : (
                  <img src={srv.img} alt={srv.title} className="service-detail-image" />
                )}
              </div>

              <div className="service-detail-content">
                <h2>{srv.title}</h2>
                <p>{srv.desc}</p>
                <Link to="/quote?service=custom" className="btn btn-outline mt-3">Request a Quote</Link>
              </div>
            </div>
          );
        })}

        {/* Static Default Services (Below new admin services) */}
        {/* Service 1: Sofa Repair */}
        <div className="service-detail-card glass-card" id="sofa">
          <img src={sofaRepairImg} alt="Sofa & Chair Repair" className="service-detail-image" />
          <div className="service-detail-content">
            <h2>Sofa & Chair Repair</h2>
            <p>We breathe new life into your cherished seating. From fixing broken frames and replacing worn springs to repairing torn fabric, our expert craftsmen reconstruct your furniture from the inside out to ensure it looks and feels as good as new.</p>
            <ul className="service-features">
              <li><CheckCircle2 size={18} className="text-primary" /> Structural frame repair</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Spring &amp; webbing replacement</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Foam replacement &amp; cushioning upgrade</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Fabric tear and seam repair</li>
            </ul>
            <Link to="/quote?service=sofa-repair" className="btn btn-outline mt-3">Request a Quote</Link>
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
              <li><CheckCircle2 size={18} className="text-primary" /> Foam &amp; padding upgrades</li>
              <li><CheckCircle2 size={18} className="text-primary" /> New modern fabric selections</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Detailed piping &amp; finishing</li>
            </ul>
            <Link to="/quote?service=Complete reupholstery" className="btn btn-outline mt-3">Request a Quote</Link>
          </div>
        </div>

        {/* Service 3: Headboards */}
        <div className="service-detail-card glass-card" id="headboard">
          <img src={headboardsImg} alt="Headboards" className="service-detail-image" />
          <div className="service-detail-content">
            <h2>Headboards</h2>
            <p>Transform your bedroom with a custom-upholstered headboard. We design and create headboards in any shape, size, or style, featuring beautiful detailing.</p>
            <ul className="service-features">
              <li><CheckCircle2 size={18} className="text-primary" /> Custom tufted &amp; paneled designs</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Wide range of textures &amp; colors</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Precision wall mounting</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Matching bed base options</li>
            </ul>
            <Link to="/quote?service=Headboards" className="btn btn-outline mt-3">Request a Quote</Link>
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
              <li><CheckCircle2 size={18} className="text-primary" /> Slat &amp; support repair</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Headboard &amp; base upholstery</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Fabric &amp; leather options</li>
            </ul>
            <Link to="/quote?service=Bed repair" className="btn btn-outline mt-3">Request a Quote</Link>
          </div>
        </div>

        {/* Service 5: Car Seat Repair */}
        <div className="service-detail-card glass-card" id="car-seat">
          <img src={carSeatImg} alt="Car Seat Repair" className="service-detail-image" />
          <div className="service-detail-content">
            <h2>Car Seat Repair</h2>
            <p>We offer professional car seat repair services to restore the comfort and appearance of your vehicle's interior. Whether it's a torn seam, worn leather or damaged foam, we handle it all with precision.</p>
            <ul className="service-features">
              <li><CheckCircle2 size={18} className="text-primary" /> Leather &amp; fabric seat repair</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Foam padding replacement</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Seam &amp; stitching restoration</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Color matching &amp; refinishing</li>
            </ul>
            <Link to="/quote?service=car-seat" className="btn btn-outline mt-3">Request a Quote</Link>
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
              <li><CheckCircle2 size={18} className="text-primary" /> Door card &amp; panel trimming</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Dashboard &amp; console wrapping</li>
              <li><CheckCircle2 size={18} className="text-primary" /> Custom interior upgrades</li>
            </ul>
            <Link to="/quote?service=car-trimming" className="btn btn-outline mt-3">Request a Quote</Link>
          </div>
        </div>

      </div>

      {/* Ready CTA */}
      <div className="container text-center mb-5 mt-4">
        <div className="glass-card ready-cta-card">
          <h2>Have a project in mind?</h2>
          <p className="mb-3 text-muted">We're ready to bring your vision to life with unparalleled craftsmanship.</p>
          <Link to="/quote" className="btn btn-primary btn-sm">Start Your Project <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
};

export default Services;

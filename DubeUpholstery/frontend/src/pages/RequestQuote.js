import React, { useState } from 'react';
import { Upload, CheckCircle, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './RequestQuote.css';

const RequestQuote = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultService = queryParams.get('service') || '';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService,
    description: ''
  });
  const [images, setImages] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch('https://dubeupholstery-1.onrender.com/api/quotes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const result = await response.json();

        if (images && images.length > 0) {
          const imgData = new FormData();
          for (let i = 0; i < images.length; i++) {
            imgData.append('images', images[i]);
          }
          await fetch(`https://dubeupholstery-1.onrender.com/api/quotes/${result.id}/upload_images/`, {
            method: 'POST',
            body: imgData
          });
        }

        setSubmitted(true);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error submitting quote", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  if (submitted) {
    return (
      <div className="quote-page container text-center pt-5 pb-5">
        <div className="glass-card success-card mx-auto">
          <CheckCircle size={64} className="text-primary mx-auto mb-3" />
          <h2>Request Received!</h2>
          <p className="text-muted mb-4">
            Thank you, {formData.name}. We have received your quote request and will review the details. One of our specialists will contact you within 24 hours.
          </p>
          <button className="btn btn-outline" onClick={() => {
            setSubmitted(false);
            setLoading(false);
          }}>Submit Another Request</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Request a Free Quote</h1>
          <p>Tell us about your project, upload some photos, and we'll get back to you with an estimate.</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="quote-wrapper glass-card" id="quote-form">
          <form className="quote-form" onSubmit={handleSubmit}>

            <div className="form-section">
              <h3>1. Personal Information</h3>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group flex-1">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-section">
              <h3>2. Project Details</h3>
              <div className="form-group">
                <label>Type of Service Required *</label>
                <select name="service" value={formData.service} onChange={handleChange} className="form-select" required>
                  <option value="" disabled>Select a service...</option>
                  <option value="Sofa and chair repair">Sofa and chair repair</option>
                  <option value="Car seat repair">Car seat repair</option>
                  <option value="Headboards">Headboards</option>
                  <option value="Complete reupholstery">Complete reupholstery</option>
                  <option value="Car trimming">Car trimming</option>
                  <option value="Bed repair">Bed repair</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description of the Job *</label>
                <textarea
                  name="description"
                  rows="6"
                  placeholder="Please describe what needs to be done. Include details like dimensions, preferred materials, style, etc."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="form-section">
              <h3>3. Upload Photos</h3>
              <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>Please upload detailed photos of the furniture piece so we can accurately assess the work required.</p>

              <div className="upload-area">
                <Upload size={32} className="upload-icon mb-2" />
                <h4>Drag & Drop or Click to Upload</h4>
                <p>Supports JPG, PNG (Max 5MB each)</p>
                <input type="file" multiple className="file-input" onChange={handleFileChange} accept="image/*" />
              </div>

              {imagePreviews.length > 0 && (
                <div className="image-previews mt-3" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <p className="w-100 text-success mb-2"><CheckCircle size={16} className="mr-1" inline="true" /> {imagePreviews.length} image(s) selected successfully.</p>
                  {imagePreviews.map((url, index) => (
                    <img key={index} src={url} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #ddd' }} />
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary submit-btn mt-4" disabled={loading}>
              {loading ? 'Submitting...' : <>Submit Request <ArrowRight size={18} /></>}
            </button>
            <p className="text-muted text-center mt-3" style={{ fontSize: '0.85rem' }}>
              By submitting this form, you agree to our privacy policy.
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;

import React, { useState } from 'react';
import './Gallery.css';
import sofaRepairImg from '../assets/images/sofa_repair.jpeg';
import customDesignImg from '../assets/images/sofa.jpeg';
import headboardsImg from '../assets/images/headboards.jpeg';
import bedRepairImg from '../assets/images/bed.png';
import carSeatImg from '../assets/images/carSeat.png';
import carTrimmingImg from '../assets/images/Car_trimming.jpg';

const projects = [
  { id: 1, category: 'Sofa & Chair Repair', title: 'Sofa Restoration', img: sofaRepairImg },
  { id: 2, category: 'Complete Reupholstery', title: 'Whole Sofa Reupholstery', img: customDesignImg },
  { id: 3, category: 'Headboards', title: 'Tufted King Headboard', img: headboardsImg },
  { id: 4, category: 'Car Seat Repair', title: 'Professional Car Seat Repair', img: carSeatImg },
  { id: 5, category: 'Bed Repair', title: 'Luxury Bed Reupholstery', img: bedRepairImg },
  { id: 6, category: 'Car Trimming', title: 'Custom Interior Trimming', img: carTrimmingImg },
];

const Gallery = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category && p.category.trim().toLowerCase() === filter.trim().toLowerCase());

  return (
    <div className="gallery-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Our Portfolio</h1>
          <p>Explore our recent transformations and custom creations.</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="filter-buttons text-center mb-4">
          {['All', 'Sofa & Chair Repair', 'Car Seat Repair', 'Headboards', 'Complete Reupholstery', 'Car Trimming', 'Bed Repair'].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="gallery-item glass-card"
              data-category={project.category}
            >
              <img src={project.img} alt={project.title} className="gallery-img" />
              <div className="gallery-info">
                <h3>{project.title}</h3>
                <span className="category-tag">{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;

"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiSearch, FiFilter, FiStar, FiChevronRight, FiX, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
// import './ExploreDesigns.css';

// Sample designs data for each category
const designsData = {
  'teak-wood': {
    name: 'Teak Wood Doors',
    description: 'Premium quality teak wood doors with exceptional durability and termite resistance',
    designs: [
      {
        id: 1,
        name: 'Classic Teak Entrance Door',
        image: '/images/designs/teak-1.jpg',
        price: '₹45,000',
        rating: 4.9,
        reviews: 45,
        features: ['Solid Teak Wood', 'Hand Carved', 'Weather Resistant']
      },
      {
        id: 2,
        name: 'Modern Teak Panel Door',
        image: '/images/designs/teak-2.jpg',
        price: '₹38,000',
        rating: 4.7,
        reviews: 32,
        features: ['Premium Teak', 'Minimal Design', 'UV Protection']
      },
      // Add more designs...
    ]
  },
  'sagwan-wood': {
    name: 'Sagwan Wood Doors',
    description: 'Elegant sagwan wood doors with beautiful natural grain patterns',
    designs: [
      // Design data...
    ]
  },
  // Add all other categories...
};

export default function ExploreDesignsPage() {
  const params = useParams();
  const category = params.category;
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categoryData = designsData[category] || {
    name: 'Category Not Found',
    description: 'This category does not exist',
    designs: []
  };

  const handleWhatsApp = (designName) => {
    const phoneNumber = '+917028426042';
    const message = `Hello Maa Kripa Wood Art! I'm interested in ${designName}. Please share more details.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+917028426042';
  };

  return (
    <div className="explore-designs-page">
      {/* Header */}
      <header className="explore-header">
        <div className="container">
          <div className="header-content">
            <Link href="/categories" className="back-button">
              <FiArrowLeft />
              <span>Back to Categories</span>
            </Link>
            
            <div className="category-info">
              <h1 className="category-title">{categoryData.name}</h1>
              <p className="category-description">{categoryData.description}</p>
              
              <div className="category-stats">
                <div className="stat">
                  <span className="stat-number">{categoryData.designs.length}+</span>
                  <span className="stat-label">Designs</span>
                </div>
                <div className="stat">
                  <span className="stat-number">4.8</span>
                  <span className="stat-label">Avg Rating</span>
                </div>
                <div className="stat">
                  <span className="stat-number">28+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Controls */}
      <section className="designs-controls">
        <div className="container">
          <div className="controls-grid">
            <div className="search-box">
              <FiSearch />
              <input type="text" placeholder="Search designs..." />
            </div>
            
            <div className="filter-buttons">
              <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                All Designs
              </button>
              <button className={`filter-btn ${filter === 'popular' ? 'active' : ''}`} onClick={() => setFilter('popular')}>
                Most Popular
              </button>
              <button className={`filter-btn ${filter === 'new' ? 'active' : ''}`} onClick={() => setFilter('new')}>
                New Arrivals
              </button>
            </div>
            
            <div className="sort-dropdown">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Designs Grid */}
      <section className="designs-grid-section">
        <div className="container">
          {categoryData.designs.length > 0 ? (
            <div className="designs-grid">
              {categoryData.designs.map((design) => (
                <div key={design.id} className="design-card">
                  <div className="design-image">
                    <Image
                      src={design.image}
                      alt={design.name}
                      width={400}
                      height={300}
                      className="design-img"
                    />
                    <div className="design-overlay">
                      <button 
                        className="quick-view-btn"
                        onClick={() => {
                          setSelectedDesign(design);
                          setShowModal(true);
                        }}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                  
                  <div className="design-info">
                    <div className="design-header">
                      <h3 className="design-name">{design.name}</h3>
                      <div className="design-rating">
                        <FiStar />
                        <span>{design.rating}</span>
                        <span className="reviews">({design.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="design-features">
                      {design.features.map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                    
                    <div className="design-footer">
                      <div className="price">
                        <span className="price-label">Starting from</span>
                        <span className="price-value">{design.price}</span>
                      </div>
                      
                      <div className="design-actions">
                        <button 
                          className="whatsapp-btn"
                          onClick={() => handleWhatsApp(design.name)}
                        >
                          <FaWhatsapp /> Get Quote
                        </button>
                        <button 
                          className="view-details-btn"
                          onClick={() => {
                            setSelectedDesign(design);
                            setShowModal(true);
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-designs">
              <h3>No designs available for this category</h3>
              <p>Please check back later or contact us for custom designs.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="explore-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need Custom Design?</h2>
            <p>Our expert craftsmen can create a door exactly as per your requirements.</p>
            <div className="cta-buttons">
              <button className="cta-btn primary" onClick={() => handleWhatsApp('Custom Design Requirement')}>
                <FaWhatsapp /> Discuss Custom Design
              </button>
              <button className="cta-btn secondary" onClick={handleCall}>
                <FaPhone /> Call for Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Modal */}
      {showModal && selectedDesign && (
        <DesignModal
          design={selectedDesign}
          categoryName={categoryData.name}
          onClose={() => {
            setShowModal(false);
            setSelectedDesign(null);
          }}
          onWhatsApp={handleWhatsApp}
          onCall={handleCall}
        />
      )}
    </div>
  );
}

// Design Modal Component
function DesignModal({ design, categoryName, onClose, onWhatsApp, onCall }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="design-modal-overlay" onClick={onClose}>
      <div className="design-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>
        
        <div className="modal-content">
          <div className="modal-images">
            <Image
              src={design.image}
              alt={design.name}
              width={600}
              height={450}
              className="modal-main-image"
            />
          </div>
          
          <div className="modal-details">
            <div className="modal-header">
              <span className="modal-category">{categoryName}</span>
              <h2 className="modal-title">{design.name}</h2>
            </div>
            
            <div className="modal-rating">
              <FiStar />
              <span>{design.rating}/5</span>
              <span className="reviews">({design.reviews} reviews)</span>
            </div>
            
            <div className="modal-features">
              <h4>Features</h4>
              <ul>
                {design.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="modal-price">
              <span className="price-label">Starting Price</span>
              <div className="price-main">{design.price}</div>
              <span className="price-note">*Customization may affect final price</span>
            </div>
            
            <div className="modal-actions">
              <button className="modal-btn whatsapp" onClick={() => onWhatsApp(design.name)}>
                <FaWhatsapp /> Get Quote on WhatsApp
              </button>
              <button className="modal-btn call" onClick={onCall}>
                <FaPhone /> Call Now
              </button>
              <button className="modal-btn share">
                <FiShare2 /> Share Design
              </button>
            </div>
            
            <div className="modal-note">
              <p>✅ Free Installation (within city limits)</p>
              <p>✅ 5 Years Warranty</p>
              <p>✅ Custom Designs Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
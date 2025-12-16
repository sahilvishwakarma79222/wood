'use client';

import React, { useState, useEffect } from 'react';
import './page.css';
import Navbar from '@/components/Navbar';

const Page = () => {
  // Category data with images
  const categoryData = [
    { id: "all", name: "All", count: 12, img: "https://images.unsplash.com/photo-1518834103327-0d0c6bf07002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-globe" },
    { id: "nature", name: "Nature", count: 2, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-leaf" },
    { id: "architecture", name: "Architecture", count: 3, img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-building" },
    { id: "art", name: "Art", count: 1, img: "https://images.unsplash.com/photo-1543857778-c4a1a569e388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-palette" },
    { id: "technology", name: "Technology", count: 1, img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-microchip" },
    { id: "travel", name: "Travel", count: 1, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-plane-departure" },
    { id: "food", name: "Food", count: 1, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-utensils" },
    { id: "people", name: "People", count: 1, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-users" },
    { id: "business", name: "Business", count: 1, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-chart-line" },
    { id: "sports", name: "Sports", count: 1, img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-football-ball" },
    { id: "abstract", name: "Abstract", count: 1, img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-shapes" },
    { id: "animals", name: "Animals", count: 1, img: "https://images.unsplash.com/photo-1519068737630-e5db30e12e42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60", icon: "fas fa-paw" }
  ];

  // Image data for the gallery with multiple images per item
  const imageData = [
    { 
      id: 1, 
      title: "Mountain Landscape", 
      category: "nature", 
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ], 
      dimensions: "1920x1080", 
      material: "Digital Print", 
      price: "$49.99", 
      format: "JPEG/PNG" 
    },
    { 
      id: 2, 
      title: "Modern Architecture", 
      category: "architecture", 
      images: [
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ], 
      dimensions: "2400x1600", 
      material: "Canvas", 
      price: "$79.99", 
      format: "JPEG/TIFF" 
    },
    { 
      id: 3, 
      title: "Abstract Art", 
      category: "art", 
      images: [
        "https://images.unsplash.com/photo-1543857778-c4a1a569e388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ], 
      dimensions: "1600x1200", 
      material: "Acrylic", 
      price: "$129.99", 
      format: "JPEG/RAW" 
    },
    { 
      id: 4, 
      title: "Tech Devices", 
      category: "technology", 
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ], 
      dimensions: "2560x1440", 
      material: "Digital Print", 
      price: "$39.99", 
      format: "JPEG/PNG" 
    },
    { 
      id: 5, 
      title: "Exotic Travel", 
      category: "travel", 
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ], 
      dimensions: "3000x2000", 
      material: "Photographic Paper", 
      price: "$89.99", 
      format: "JPEG/RAW" 
    },
    { 
      id: 6, 
      title: "Gourmet Food", 
      category: "food", 
      images: [
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ], 
      dimensions: "2200x1600", 
      material: "Fine Art Paper", 
      price: "$59.99", 
      format: "JPEG/TIFF" 
    }
  ];

  // State management
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState(imageData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter images based on active category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredImages(imageData);
    } else {
      const filtered = imageData.filter(image => image.category === activeCategory);
      setFilteredImages(filtered);
    }
  }, [activeCategory]);

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Handle view details click
  const handleViewDetails = (image) => {
    setSelectedImage(image);
    setCurrentImageIndex(0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Navigate to next image
  const nextImage = () => {
    if (selectedImage) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedImage.images.length
      );
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (selectedImage) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex - 1 + selectedImage.images.length) % selectedImage.images.length
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalOpen) {
        if (e.key === 'Escape') {
          closeModal();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <div className="page-container">
         <Navbar />
    <div className="premium-gallery">
      {/* Header & Navbar */}
      <header id="main-header">
        <div className="container">
         
        </div>
      </header>

      {/* Category Section with Images */}
      <section className="category-section">
        <div className="container">
          <h2 className="section-title">Browse Categories</h2>
          <p className="section-subtitle">Click on any category to filter the gallery</p>
          
          <div className="category-grid" id="category-grid">
            {categoryData.map(category => (
              <div 
                key={category.id}
                className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="category-img-container">
                  <img src={category.img} alt={category.name} />
                  <div className="category-count">{category.count}</div>
                </div>
                <div className="category-name">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <h3 className="gallery-title">
              {activeCategory === 'all' ? 'All Images' : `${categoryData.find(cat => cat.id === activeCategory)?.name} Images`}
            </h3>
            <div className="gallery-count">Showing {filteredImages.length} images</div>
          </div>
          
          <div className="gallery">
            {filteredImages.map(image => (
              <div key={image.id} className="image-card" data-category={image.category}>
                <div className="image-container">
                  <img src={image.images[0]} alt={image.title} />
                  <div className="image-overlay">
                    <div className="image-info">
                      <p><i className="fas fa-ruler-combined"></i> {image.dimensions}</p>
                      <p><i className="fas fa-palette"></i> {image.material}</p>
                      <p><i className="fas fa-tag"></i> {image.price}</p>
                    </div>
                    <button className="view-btn" onClick={() => handleViewDetails(image)}>
                      <i className="fas fa-expand"></i> View Details
                    </button>
                  </div>
                </div>
                <div className="card-title">{image.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Image Preview Modal with Multiple Images */}
      {modalOpen && selectedImage && (
        <div className={`modal-overlay ${modalOpen ? 'active' : ''}`}>
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Image Details</h3>
              <button className="close-btn" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-images-container">
                <div 
                  className="modal-images-slider" 
                  style={{ transform: `translateX(-${currentImageIndex * (100 / 3)}%)` }}
                >
                  {selectedImage.images.map((img, index) => (
                    <div key={index} className="modal-image">
                      <img src={img} alt={`${selectedImage.title} - View ${index + 1}`} />
                    </div>
                  ))}
                </div>
                
                {/* Navigation arrows */}
                <button className="modal-nav prev" onClick={prevImage}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="modal-nav next" onClick={nextImage}>
                  <i className="fas fa-chevron-right"></i>
                </button>
                
                {/* Image indicators */}
                <div className="image-indicators">
                  {selectedImage.images.map((_, index) => (
                    <div 
                      key={index}
                      className={`indicator ${currentImageIndex === index ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-label">Title:</span>
                  <span className="detail-value" id="modal-title-text">{selectedImage.title}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value" id="modal-category">
                    {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Dimensions:</span>
                  <span className="detail-value" id="modal-dimensions">{selectedImage.dimensions}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Material:</span>
                  <span className="detail-value" id="modal-material">{selectedImage.material}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value" id="modal-price">{selectedImage.price}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Format:</span>
                  <span className="detail-value" id="modal-format">{selectedImage.format}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <a href="#" className="footer-logo">
              <i className="fas fa-camera-retro"></i>
              <span>Premium Gallery</span>
            </a>
            
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
            
            <p className="copyright">© 2023 Premium Gallery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default Page;
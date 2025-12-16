'use client';

import React, { useState, useEffect, useRef } from 'react';
import './page.css';
import Navbar from '@/components/Navbar';

const Page = () => {
  // Enhanced category data with modern colors
  const categoryData = [
    { id: "all", name: "All", count: 12, color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", icon: "fas fa-grid" },
    { id: "nature", name: "Nature", count: 2, color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", icon: "fas fa-mountain" },
    { id: "architecture", name: "Architecture", count: 3, color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", icon: "fas fa-building" },
    { id: "art", name: "Art", count: 1, color: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", icon: "fas fa-palette" },
    { id: "technology", name: "Technology", count: 1, color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", icon: "fas fa-microchip" },
    { id: "travel", name: "Travel", count: 1, color: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", icon: "fas fa-plane" },
    { id: "food", name: "Food", count: 1, color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", icon: "fas fa-utensils" },
    { id: "people", name: "People", count: 1, color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", icon: "fas fa-user-friends" },
    { id: "business", name: "Business", count: 1, color: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)", icon: "fas fa-chart-line" },
    { id: "sports", name: "Sports", count: 1, color: "linear-gradient(135deg, #ff8177 0%, #ff867a 100%)", icon: "fas fa-running" },
    { id: "abstract", name: "Abstract", count: 1, color: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", icon: "fas fa-shapes" },
    { id: "animals", name: "Animals", count: 1, color: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)", icon: "fas fa-paw" }
  ];

  // Enhanced image data with more details
  const imageData = [
    { 
      id: 1, 
      title: "Mountain Majesty", 
      category: "nature", 
      description: "A breathtaking view of snow-capped mountains at sunrise with misty valleys.",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ], 
      dimensions: "1920×1080", 
      material: "Premium Matte Paper", 
      price: "$49.99", 
      format: "JPEG/PNG",
      likes: 124,
      downloads: 89,
      featured: true
    },
    { 
      id: 2, 
      title: "Urban Geometry", 
      category: "architecture", 
      description: "Modern architectural marvel with clean lines and geometric patterns.",
      images: [
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ], 
      dimensions: "3840×2160", 
      material: "Canvas Wrap", 
      price: "$79.99", 
      format: "JPEG/TIFF",
      likes: 98,
      downloads: 67,
      featured: true
    },
    { 
      id: 3, 
      title: "Color Symphony", 
      category: "art", 
      description: "Abstract expressionism with vibrant colors and fluid textures.",
      images: [
        "https://images.unsplash.com/photo-1543857778-c4a1a569e388?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ], 
      dimensions: "2400×1600", 
      material: "Acrylic Print", 
      price: "$129.99", 
      format: "JPEG/RAW",
      likes: 156,
      downloads: 112,
      featured: true
    },
    { 
      id: 4, 
      title: "Digital Dreams", 
      category: "technology", 
      description: "Futuristic tech devices with neon lights and cyberpunk aesthetic.",
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ], 
      dimensions: "2560×1440", 
      material: "Glossy Print", 
      price: "$39.99", 
      format: "JPEG/PNG",
      likes: 87,
      downloads: 54,
      featured: false
    },
    { 
      id: 5, 
      title: "Island Paradise", 
      category: "travel", 
      description: "Crystal clear waters and white sand beaches of a tropical island.",
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ], 
      dimensions: "3000×2000", 
      material: "Metallic Print", 
      price: "$89.99", 
      format: "JPEG/RAW",
      likes: 201,
      downloads: 145,
      featured: true
    },
    { 
      id: 6, 
      title: "Culinary Art", 
      category: "food", 
      description: "Exquisitely plated gourmet cuisine with artistic presentation.",
      images: [
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ], 
      dimensions: "2200×1600", 
      material: "Fine Art Paper", 
      price: "$59.99", 
      format: "JPEG/TIFF",
      likes: 92,
      downloads: 61,
      featured: false
    }
  ];

  // State management
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState(imageData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isGridView, setIsGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort images
  useEffect(() => {
    setIsLoading(true);
    
    let result = imageData;
    
    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(image => image.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(image => 
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort images
    switch(sortBy) {
      case "featured":
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "popular":
        result = [...result].sort((a, b) => b.likes - a.likes);
        break;
      case "newest":
        result = [...result].sort((a, b) => b.id - a.id);
        break;
      case "price-low":
        result = [...result].sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
        break;
      case "price-high":
        result = [...result].sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
        break;
      default:
        break;
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setFilteredImages(result);
      setIsLoading(false);
    }, 300);
  }, [activeCategory, searchQuery, sortBy]);

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setIsGridView(true);
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

  // Navigate images
  const nextImage = () => {
    if (selectedImage) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedImage.images.length
      );
    }
  };

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

  // Handle like
  const handleLike = (id) => {
    // In a real app, this would update the backend
    console.log(`Liked image ${id}`);
  };

  // Handle download
  const handleDownload = (id) => {
    // In a real app, this would trigger a download
    console.log(`Downloaded image ${id}`);
  };

  return (
    <div className="page-container">
      <Navbar />
      
      <div className="premium-gallery">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Discover Premium Visuals</h1>
              <p className="hero-subtitle">
                Curated collection of high-quality images from world-class photographers and artists
              </p>
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search images, categories, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Section */}
        <section className="category-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Explore Categories</h2>
              <p className="section-subtitle">Browse through our curated collections</p>
            </div>
            
            <div className="category-grid">
              {categoryData.map(category => (
                <div 
                  key={category.id}
                  className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                  style={{ background: category.color }}
                >
                  <div className="category-icon">
                    <i className={category.icon}></i>
                  </div>
                  <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>
                    <span className="category-count">{category.count} images</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Controls */}
        <section className="gallery-controls">
          <div className="container">
            <div className="controls-container">
              <div className="view-toggle">
                <button 
                  className={`view-btn ${isGridView ? 'active' : ''}`}
                  onClick={() => setIsGridView(true)}
                >
                  <i className="fas fa-th-large"></i> Grid
                </button>
                <button 
                  className={`view-btn ${!isGridView ? 'active' : ''}`}
                  onClick={() => setIsGridView(false)}
                >
                  <i className="fas fa-list"></i> List
                </button>
              </div>
              
              <div className="sort-container">
                <span className="sort-label">Sort by:</span>
                <select 
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="gallery-section">
          <div className="container">
            {isLoading ? (
              <div className="loading-container">
                <div className="loader"></div>
                <p>Loading images...</p>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="no-results">
                <i className="fas fa-image"></i>
                <h3>No images found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <div className="gallery-header">
                  <h3 className="gallery-title">
                    {activeCategory === 'all' ? 'All Premium Images' : `${categoryData.find(cat => cat.id === activeCategory)?.name} Collection`}
                  </h3>
                  <div className="gallery-count">{filteredImages.length} images</div>
                </div>
                
                <div className={`gallery ${isGridView ? 'grid-view' : 'list-view'}`}>
                  {filteredImages.map(image => (
                    <div key={image.id} className={`image-card ${image.featured ? 'featured' : ''}`}>
                      <div className="image-container">
                        <img src={image.images[0]} alt={image.title} />
                        {image.featured && (
                          <div className="featured-badge">
                            <i className="fas fa-star"></i> Featured
                          </div>
                        )}
                        <div className="image-overlay">
                          <div className="image-actions">
                            <button className="action-btn" onClick={() => handleLike(image.id)}>
                              <i className="far fa-heart"></i> {image.likes}
                            </button>
                            <button className="action-btn" onClick={() => handleDownload(image.id)}>
                              <i className="fas fa-download"></i> {image.downloads}
                            </button>
                          </div>
                          <button className="view-details-btn" onClick={() => handleViewDetails(image)}>
                            <i className="fas fa-expand"></i> View Details
                          </button>
                        </div>
                      </div>
                      
                      <div className="card-content">
                        <div className="card-header">
                          <h4 className="card-title">{image.title}</h4>
                          <span className="card-price">{image.price}</span>
                        </div>
                        <p className="card-description">{image.description}</p>
                        <div className="card-footer">
                          <span className="card-category">
                            <i className="fas fa-tag"></i> {image.category}
                          </span>
                          <span className="card-dimensions">
                            <i className="fas fa-expand-alt"></i> {image.dimensions}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-card">
                <i className="fas fa-images"></i>
                <h3>1,200+</h3>
                <p>Premium Images</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-users"></i>
                <h3>50+</h3>
                <p>Professional Artists</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-download"></i>
                <h3>10,000+</h3>
                <p>Downloads</p>
              </div>
              <div className="stat-card">
                <i className="fas fa-heart"></i>
                <h3>5,000+</h3>
                <p>Likes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Image Preview Modal */}
        {modalOpen && selectedImage && (
          <div className="modal-overlay active" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              
              <div className="modal-body">
                <div className="modal-image-container">
                  <div className="modal-main-image">
                    <img src={selectedImage.images[currentImageIndex]} alt={selectedImage.title} />
                  </div>
                  
                  <div className="modal-thumbnails">
                    {selectedImage.images.map((img, index) => (
                      <div 
                        key={index}
                        className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img src={img} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                  
                  <button className="modal-nav prev" onClick={prevImage}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="modal-nav next" onClick={nextImage}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                
                <div className="modal-info">
                  <div className="modal-header">
                    <h2 className="modal-title">{selectedImage.title}</h2>
                    <div className="modal-actions">
                      <button className="modal-action-btn">
                        <i className="far fa-heart"></i> Like ({selectedImage.likes})
                      </button>
                      <button className="modal-action-btn primary">
                        <i className="fas fa-shopping-cart"></i> Purchase {selectedImage.price}
                      </button>
                    </div>
                  </div>
                  
                  <p className="modal-description">{selectedImage.description}</p>
                  
                  <div className="modal-details-grid">
                    <div className="detail-item">
                      <span className="detail-label">
                        <i className="fas fa-tag"></i> Category
                      </span>
                      <span className="detail-value">{selectedImage.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">
                        <i className="fas fa-expand-alt"></i> Dimensions
                      </span>
                      <span className="detail-value">{selectedImage.dimensions}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">
                        <i className="fas fa-file-image"></i> Format
                      </span>
                      <span className="detail-value">{selectedImage.format}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">
                        <i className="fas fa-palette"></i> Material
                      </span>
                      <span className="detail-value">{selectedImage.material}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">
                        <i className="fas fa-download"></i> Downloads
                      </span>
                      <span className="detail-value">{selectedImage.downloads}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">
                        <i className="fas fa-calendar"></i> Added
                      </span>
                      <span className="detail-value">2 weeks ago</span>
                    </div>
                  </div>
                  
                  <div className="modal-tags">
                    <span className="tag">#{selectedImage.category}</span>
                    <span className="tag">#premium</span>
                    <span className="tag">#photography</span>
                    <span className="tag">#art</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <a href="#" className="footer-logo">
                  <i className="fas fa-camera-retro"></i>
                  <span>VisualArchive</span>
                </a>
                <p className="footer-description">
                  Curating the world's finest visual content for creatives, designers, and businesses.
                </p>
                <div className="social-links">
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-pinterest"></i></a>
                  <a href="#"><i className="fab fa-behance"></i></a>
                </div>
              </div>
              
              <div className="footer-section">
                <h4>Categories</h4>
                <ul className="footer-links">
                  {categoryData.slice(1, 7).map(category => (
                    <li key={category.id}><a href="#">{category.name}</a></li>
                  ))}
                </ul>
              </div>
              
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Premium Collection</a></li>
                  <li><a href="#">For Artists</a></li>
                  <li><a href="#">Licensing</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h4>Newsletter</h4>
                <p>Subscribe to receive updates on new collections.</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your email address" />
                  <button type="submit">Subscribe</button>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p className="copyright">© 2023 VisualArchive. All images are licensed under Premium License.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Page;
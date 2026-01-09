"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, Star, ZoomIn, X, 
  ChevronRight, Grid, Check, ChevronDown
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import './ProductDetail.css';

// Categories Data (Your actual folder names)
const categories = [
  { id: 1, name: 'Wooden Doors', folder: '1_woodenDoor', icon: '🚪', color: '#8B4513' },
  { id: 2, name: 'Wooden Frames', folder: '2_WoodenFream', icon: '🖼️', color: '#D2691E' },
  { id: 3, name: 'Safety Doors', folder: '3_safetyDoors', icon: '🔒', color: '#2E8B57' },
  { id: 4, name: 'Wooden Beds', folder: '4_woodenBed', icon: '🛏️', color: '#5D4037' },
  { id: 5, name: 'Wooden Mandir', folder: '5_woodenMandir', icon: '🛕', color: '#FFD700' },
  { id: 6, name: 'Wooden Windows', folder: '6_woodenWindow', icon: '🪟', color: '#4682B4' },
  { id: 7, name: 'Wooden Art', folder: '8_woodenArt', icon: '🎨', color: '#FF6B6B' },
  { id: 8, name: 'Sofa Chair', folder: '9_sofaChair', icon: '🪑', color: '#8A2BE2' },
];

// Function to generate product info
const generateProductInfo = (categoryName, index) => {
  const prices = [12500, 18500, 22500, 28500, 32500];
  const ratings = [4.2, 4.5, 4.7, 4.8, 5.0];
  const badges = ['BEST', 'NEW', 'SALE', 'POPULAR'];
  
  return {
    id: index,
    name: `${categoryName} Design ${index}`,
    price: prices[index % prices.length],
    rating: ratings[index % ratings.length],
    reviews: Math.floor(Math.random() * 50) + 10,
    badge: badges[index % badges.length]
  };
};

// Optimized image loader function
const loadCategoryImages = async (folderName) => {
  console.log(`🔄 Starting to load images from: ${folderName}`);
  
  const images = [];
  const extensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
  const MAX_IMAGES = 80;
  
  let foundCount = 0;
  let consecutiveFailures = 0;
  const MAX_CONSECUTIVE_FAILURES = 3;
  
  // Load images sequentially
  for (let i = 1; i <= MAX_IMAGES; i++) {
    if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
      console.log(`🛑 Stopped at image ${i} (${consecutiveFailures} consecutive failures)`);
      break;
    }
    
    let imageFound = false;
    
    // Try all extensions for current image number
    for (const ext of extensions) {
      const imagePath = `/images/category/${folderName}/${i}${ext}`;
      
      try {
        // Create a promise that resolves when image loads or fails
        const img = new window.Image();
        const loadPromise = new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = imagePath;
        });
        
        // Add timeout
        const timeoutPromise = new Promise(resolve => 
          setTimeout(() => resolve(false), 300)
        );
        
        const exists = await Promise.race([loadPromise, timeoutPromise]);
        
        if (exists) {
          images.push({
            url: imagePath,
            info: generateProductInfo(
              folderName.replace(/^\d+_/, '').replace(/([A-Z])/g, ' $1').trim(),
              i
            ),
            index: i
          });
          imageFound = true;
          foundCount++;
          console.log(`✅ Found: ${imagePath}`);
          break;
        }
      } catch (error) {
        console.log(`⚠️ Error checking ${i}${ext}:`, error);
      }
    }
    
    if (imageFound) {
      consecutiveFailures = 0;
    } else {
      consecutiveFailures++;
      console.log(`❌ Image ${i} not found in ${folderName}`);
    }
    
    // Small delay to prevent overwhelming
    await new Promise(resolve => setTimeout(resolve, 20));
  }
  
  console.log(`📊 Total images found for ${folderName}: ${foundCount}`);
  
  // Sort by index
  images.sort((a, b) => a.index - b.index);
  
  return images;
};

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showMobileCategorySelector, setShowMobileCategorySelector] = useState(false);
  const sidebarRef = useRef(null);

  // Load images when category changes
  useEffect(() => {
    const loadImages = async () => {
      console.log(`📁 Switching to category: ${selectedCategory.name}`);
      
      setLoading(true);
      setError(null);
      setImages([]);
      
      try {
        const loadedImages = await loadCategoryImages(selectedCategory.folder);
        setImages(loadedImages);
        
        if (loadedImages.length === 0) {
          setError(`No images found in ${selectedCategory.folder} folder`);
        }
      } catch (err) {
        console.error('❌ Loading error:', err);
        setError('Failed to load images. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, [selectedCategory]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setShowMobileCategorySelector(false);
    
    // Scroll to images section
    setTimeout(() => {
      document.getElementById('images-section')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector('.category-modal-overlay');
      if (showMobileCategorySelector && modal && !modal.contains(event.target)) {
        setShowMobileCategorySelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileCategorySelector]);

  // Open image in modal
  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  // Close modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Navigate between images in modal
  const navigateImage = (direction) => {
    if (!selectedImage || images.length === 0) return;
    
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Filter and sort images
  const filteredImages = images.filter(image => 
    image.info.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedImages = [...filteredImages].sort((a, b) => {
    switch(sortBy) {
      case 'price-low-high':
        return a.info.price - b.info.price;
      case 'price-high-low':
        return b.info.price - a.info.price;
      case 'rating':
        return b.info.rating - a.info.rating;
      default:
        return a.index - b.index; // Default order (by image number)
    }
  });

  // Format price
  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <>
      <Navbar />
      
      <div className="categories-page">
        {/* ===== FLOATING CATEGORY BUTTON ===== */}
        <button 
          className="floating-category-btn"
          onClick={() => setShowMobileCategorySelector(!showMobileCategorySelector)}
        >
          <Grid size={20} />
          <span>{selectedCategory.name}</span>
          <ChevronDown size={16} />
        </button>

        {/* ===== CATEGORY SELECTOR MODAL ===== */}
        {showMobileCategorySelector && (
          <div className="category-modal-overlay" onClick={() => setShowMobileCategorySelector(false)}>
            <div className="category-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Select Category</h3>
                <button 
                  className="close-modal"
                  onClick={() => setShowMobileCategorySelector(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-categories">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-option ${selectedCategory.id === category.id ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(category)}
                    style={{ '--category-color': category.color }}
                  >
                    <div className="option-icon">{category.icon}</div>
                    <div className="option-info">
                      <h4>{category.name}</h4>
                      <small>{category.folder}</small>
                    </div>
                    {selectedCategory.id === category.id && (
                      <Check size={16} className="check-icon" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="page-main">
          <div className="container">
            <div className="layout-wrapper">
              {/* Categories Sidebar - Desktop Only */}
              <aside 
                ref={sidebarRef}
                className="categories-sidebar"
              >
                <div className="sidebar-header">
                  <h3 className="sidebar-title">
                    <Grid size={18} />
                    Categories
                    <span className="categories-count">{categories.length}</span>
                  </h3>
                </div>
                
                <div className="categories-list">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`category-item ${selectedCategory.id === category.id ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(category)}
                      style={{ '--category-color': category.color }}
                    >
                      <div className="category-icon">
                        <span className="emoji-icon">{category.icon}</span>
                      </div>
                      <div className="category-info">
                        <h4 className="category-name">{category.name}</h4>
                        <div className="category-status">
                          {selectedCategory.id === category.id && (
                            <Check size={14} className="active-check" />
                          )}
                          <span className="category-folder">{category.folder}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="main-content">
                {/* Current Category Info - Desktop */}
                <div className="current-category-info">
                  <div className="category-badge">
                    <div 
                      className="badge-icon"
                      style={{ background: selectedCategory.color }}
                    >
                      {selectedCategory.icon}
                    </div>
                    <div className="badge-content">
                      <h2 className="category-title">{selectedCategory.name}</h2>
                      <div className="category-meta">
                        <span className="image-count">
                          {images.length} Designs
                        </span>
                        <span className="folder-name">
                          {selectedCategory.folder}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Images Gallery Section */}
                <section id="images-section" className="images-gallery">
                  {loading ? (
                    <div className="loading-state">
                      <div className="spinner"></div>
                      <p>Loading images from {selectedCategory.folder}...</p>
                      <small>Checking for: 1.jpg, 2.jpg, 3.jpg, etc.</small>
                    </div>
                  ) : error ? (
                    <div className="error-state">
                      <div className="error-icon">⚠️</div>
                      <h3>No Images Found</h3>
                      <p>{error}</p>
                      <div className="folder-instructions">
                        <p><strong>Expected folder location:</strong></p>
                        <code>public/images/category/{selectedCategory.folder}/</code>
                        <p><strong>Expected file names:</strong></p>
                        <code>1.jpg, 2.jpg, 3.jpg, etc. (up to 80)</code>
                      </div>
                    </div>
                  ) : sortedImages.length > 0 ? (
                    <>
                      <div className="gallery-grid">
                        {sortedImages.map((image, index) => (
                          <div key={index} className="image-card">
                            <div 
                              className="card-image" 
                              onClick={() => openImageModal(image, index)}
                            >
                              <div className="image-wrapper">
                                <Image
                                  src={image.url}
                                  alt={image.info.name}
                                  width={280}
                                  height={200}
                                  className="product-image"
                                  loading="lazy"
                                  unoptimized={true}
                                  onError={(e) => {
                                    console.error(`Failed to load: ${image.url}`);
                                    e.target.style.display = 'none';
                                    const parent = e.target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `
                                        <div class="image-fallback">
                                          <span class="fallback-icon">${selectedCategory.icon}</span>
                                          <span class="fallback-text">${image.info.name}</span>
                                          <small>Image ${image.index}</small>
                                        </div>
                                      `;
                                    }
                                  }}
                                />
                                <button className="zoom-btn">
                                  <ZoomIn size={18} />
                                </button>
                              </div>
                              
                              {image.info.badge && (
                                <div className="image-badge">
                                  {image.info.badge}
                                </div>
                              )}
                            </div>
                            
                            <div className="card-info">
                              <h3 className="image-title">{image.info.name}</h3>
                              
                              <div className="image-meta">
                                <div className="price">{formatPrice(image.info.price)}</div>
                                
                                <div className="rating">
                                  <Star size={14} fill="#FFD700" />
                                  <span className="rating-value">{image.info.rating}</span>
                                  <span className="review-count">({image.info.reviews})</span>
                                </div>
                              </div>
                              
                              <div className="image-number">
                                Design #{image.index}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="gallery-info">
                        <p>
                          Showing <strong>{sortedImages.length}</strong> of <strong>{images.length}</strong> designs
                          {searchQuery && ` matching "${searchQuery}"`}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">🔍</div>
                      <h3>No matching designs found</h3>
                      <p>Try a different search term</p>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </main>

        {/* Image Modal */}
        {selectedImage && (
          <div className="image-modal-overlay" onClick={closeImageModal}>
            <div className="image-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-category">
                  <span className="modal-category-icon">{selectedCategory.icon}</span>
                  <span className="modal-category-name">{selectedCategory.name}</span>
                </div>
                <button className="modal-close" onClick={closeImageModal}>
                  <X size={24} />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-image-container">
                  <button 
                    className="modal-nav prev" 
                    onClick={() => navigateImage(-1)}
                  >
                    <ChevronLeft size={28} />
                  </button>
                  
                  <div className="main-image">
                    <Image
                      src={selectedImage.url}
                      alt={selectedImage.info.name}
                      width={600}
                      height={400}
                      className="modal-image"
                      unoptimized={true}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="modal-fallback">
                            <span class="fallback-emoji">${selectedCategory.icon}</span>
                            <span class="fallback-title">${selectedImage.info.name}</span>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  
                  <button 
                    className="modal-nav next" 
                    onClick={() => navigateImage(1)}
                  >
                    <ChevronRight size={28} />
                  </button>
                </div>
                
                <div className="modal-info">
                  <div className="modal-title-section">
                    <h3 className="modal-product-title">{selectedImage.info.name}</h3>
                    <div className="modal-price">{formatPrice(selectedImage.info.price)}</div>
                  </div>
                  
                  <div className="modal-details">
                    <div className="detail-row">
                      <span className="detail-label">Design Number:</span>
                      <span className="detail-value">#{selectedImage.index}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{selectedCategory.name}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Rating:</span>
                      <span className="detail-value">
                        <Star size={14} fill="#FFD700" />
                        {selectedImage.info.rating} ({selectedImage.info.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    <button className="btn btn-primary">
                      Get Quote
                    </button>
                    <button className="btn btn-secondary">
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <div className="image-counter">
                  Image {currentImageIndex + 1} of {images.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="page-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-stats">
                <div className="stat">
                  <div className="stat-number">{categories.length}</div>
                  <div className="stat-label">Categories</div>
                </div>
                <div className="stat">
                  <div className="stat-number">{images.length}</div>
                  <div className="stat-label">Current Designs</div>
                </div>
                <div className="stat">
                  <div className="stat-number">+91 8007747733</div>
                  <div className="stat-label">Call for Quote</div>
                </div>
              </div>
              
              <p className="footer-note">
                All images are loaded directly from your folder structure. 
                Ensure images are named sequentially (1.jpg, 2.jpg, etc.)
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import './page.css';
import Navbar from '@/components/Navbar';

const ProfessionalGallery = () => {
  // Update these counts based on your actual folder images
  const categories = [
    { 
      id: 'all', 
      name: 'All Products', 
      count: 0, // Will be calculated dynamically
      image: null
    },
    { 
      id: 'woodenDoor', 
      name: 'Wooden Doors', 
      folder: '1_woodenDoor', 
      count: 70, // You have 70+ images
      image: '/images/category/1_woodenDoor/1.jpg'
    },
    { 
      id: 'woodenFrame', 
      name: 'Wooden Frames', 
      folder: '2_WoodenFream', 
      count: 35, // Update based on your images
      image: '/images/category/2_WoodenFream/1.jpg'
    },
    { 
      id: 'safetyDoors', 
      name: 'Safety Doors', 
      folder: '3_safetyDoors', 
      count: 45, // Update based on your images
      image: '/images/category/3_safetyDoors/1.jpg'
    },
    { 
      id: 'woodenBed', 
      name: 'Wooden Beds', 
      folder: '4_woodenBed', 
      count: 30, // Update based on your images
      image: '/images/category/4_woodenBed/1.jpg'
    },
    { 
      id: 'woodenMandir', 
      name: 'Wooden Temples', 
      folder: '5_woodenMandir', 
      count: 25, // Update based on your images
      image: '/images/category/5_woodenMandir/1.jpg'
    },
    { 
      id: 'woodenWindow', 
      name: 'Wooden Windows', 
      folder: '6_woodenWindow', 
      count: 40, // Update based on your images
      image: '/images/category/6_woodenWindow/1.jpg'
    },
    { 
      id: 'woodenArt', 
      name: 'Wooden Art', 
      folder: '7_woodenArt', 
      count: 50, // Update based on your images
      image: '/images/category/7_woodenArt/1.jpg'
    },
    { 
      id: 'sofaChair', 
      name: 'Sofa & Chairs', 
      folder: '8_sofaChair', 
      count: 35, // Update based on your images
      image: '/images/category/8_sofaChair/1.jpg'
    }
  ];

  // Function to check all image extensions
  const getImagePath = (folder, imageNumber) => {
    // First try .jpg, then .jpeg, then .png
    return `/images/category/${folder}/${imageNumber}.jpg`;
  };

  // Generate products for ALL categories
  const generateProducts = () => {
    const products = [];
    let id = 1;

    // Product templates for each category
    const categoryTemplates = {
      woodenDoor: {
        baseTitle: 'Wooden Door',
        variations: [
          'Solid Teak Wood Main Door', 'Carved Panel Entrance Door', 'Modern Flush Interior Door',
          'Traditional Carved Door', 'French Style Door', 'Sliding Wooden Door',
          'Double Leaf Door', 'Folding Door', 'Glass Panel Door', 'Antique Wooden Door',
          'Royal Mahogany Door', 'Contemporary Design Door', 'Rustic Wooden Door',
          'Luxury Villa Door', 'Apartment Main Door', 'Heritage Style Door'
        ],
        desc: 'Premium wooden doors with exquisite craftsmanship and durability',
        priceRange: { min: 25000, max: 80000 }
      },
      woodenFrame: {
        baseTitle: 'Wooden Frame',
        variations: [
          'Photo Display Frame', 'Mirror Wood Frame', 'Art Canvas Frame', 'Multi Photo Frame',
          'Collage Frame Set', 'Floating Frame', 'Shadow Box Frame', 'Digital Photo Frame',
          'Wall Gallery Frame', 'Certificate Frame', 'Poster Frame', 'Custom Size Frame'
        ],
        desc: 'Elegant wooden frames for photos, mirrors and artwork',
        priceRange: { min: 2000, max: 15000 }
      },
      safetyDoors: {
        baseTitle: 'Safety Door',
        variations: [
          'Steel Security Main Door', 'Anti-theft Gate Door', 'Apartment Security Door',
          'Villa Entrance Door', 'Double Locking Door', 'Bulletproof Door',
          'Fire Resistant Door', 'Soundproof Door', 'Main Gate Security', 'Commercial Door'
        ],
        desc: 'High security doors with steel reinforcement and advanced locking',
        priceRange: { min: 35000, max: 120000 }
      },
      woodenBed: {
        baseTitle: 'Wooden Bed',
        variations: [
          'King Size Storage Bed', 'Queen Size Platform Bed', 'Canopy Bed with Curtains',
          'Hydraulic Storage Bed', 'Low Height Bed', 'Four Poster Bed',
          'Bunk Bed for Kids', 'Trundle Bed', 'Day Bed', 'Sleigh Bed'
        ],
        desc: 'Luxury wooden beds with storage options and elegant designs',
        priceRange: { min: 45000, max: 150000 }
      },
      woodenMandir: {
        baseTitle: 'Wooden Temple',
        variations: [
          'Wall Mount Temple', 'Floor Standing Temple', 'Corner Mandir',
          'Traditional Carved Temple', 'Modern Design Temple', 'Compact Home Temple',
          'LED Temple with Lighting', 'Carved Door Temple', 'Multi-level Temple'
        ],
        desc: 'Beautifully carved wooden temples for home worship',
        priceRange: { min: 15000, max: 60000 }
      },
      woodenWindow: {
        baseTitle: 'Wooden Window',
        variations: [
          'Bay Window', 'French Window', 'Sliding Window', 'Casement Window',
          'Awning Window', 'Picture Window', 'Skylight Window', 'Arch Window',
          'Jalousie Window', 'Double Hung Window', 'Custom Shape Window'
        ],
        desc: 'Weather-resistant wooden windows with various opening styles',
        priceRange: { min: 12000, max: 50000 }
      },
      woodenArt: {
        baseTitle: 'Wooden Art',
        variations: [
          'Wall Carving Art', '3D Wood Sculpture', 'Abstract Wood Art',
          'Traditional Carving', 'Modern Wall Art', 'Geometric Pattern',
          'Nature Inspired Art', 'Custom Name Art', 'Religious Carving',
          'Contemporary Sculpture'
        ],
        desc: 'Hand-carved wooden art pieces for home and office decor',
        priceRange: { min: 8000, max: 40000 }
      },
      sofaChair: {
        baseTitle: 'Sofa & Chair',
        variations: [
          'Luxury Sofa Set', 'Arm Chair', 'Recliner Chair', 'Lounge Chair',
          'Accent Chair', 'Rocking Chair', 'Dining Chair', 'Office Chair',
          'Bench Seat', 'Bar Stool', 'Chaise Lounge', 'Sectional Sofa'
        ],
        desc: 'Premium wooden furniture with comfortable upholstery',
        priceRange: { min: 25000, max: 200000 }
      }
    };

    // Generate products for each category
    categories.forEach(category => {
      if (category.id !== 'all') {
        const template = categoryTemplates[category.id];
        
        for (let i = 1; i <= category.count; i++) {
          // Select title variation or generate based on pattern
          const variationIndex = (i - 1) % template.variations.length;
          const title = template.variations[variationIndex] || `${template.baseTitle} Design ${i}`;
          
          // Generate price within range
          const priceIncrement = (template.priceRange.max - template.priceRange.min) / category.count;
          const price = Math.round(template.priceRange.min + (priceIncrement * i));
          
          // Generate rating (3.5 to 5.0)
          const rating = (3.5 + Math.random() * 1.5).toFixed(1);
          
          // Materials array
          const materials = ['Teak Wood', 'Sheesham Wood', 'Rose Wood', 'Sal Wood', 'Mahogany', 'Oak', 'Walnut', 'Pine'];
          const material = materials[(i - 1) % materials.length];
          
          // Dimensions array
          const dimensions = ['7x3 ft', '8x4 ft', '6x3 ft', '5x2.5 ft', 'Custom Size', 'Standard Size'];
          const dimension = dimensions[(i - 1) % dimensions.length];
          
          // Finish types
          const finishes = ['Matte Finish', 'Glossy Polish', 'Semi-Gloss', 'Natural Wood', 'Lacquered', 'Varnished'];
          const finish = finishes[(i - 1) % finishes.length];
          
          products.push({
            id: id++,
            title: title,
            category: category.id,
            folder: category.folder,
            image: getImagePath(category.folder, i),
            fallbackImage: `/images/category/${category.folder}/${i}.jpeg`,
            description: template.desc,
            price: `₹${price.toLocaleString()}`,
            dimensions: dimension,
            material: material,
            finish: finish,
            featured: i <= 10, // First 10 products in each category are featured
            rating: rating,
            delivery: '7-14 days',
            warranty: '5 years warranty',
            imageNumber: i
          });
        }
      }
    });

    // Calculate total for 'all' category
    const allCategory = categories.find(c => c.id === 'all');
    if (allCategory) {
      allCategory.count = products.length;
    }

    console.log(`Generated ${products.length} products total`);
    console.log('Category counts:', categories.map(c => `${c.name}: ${c.count}`));
    
    return products;
  };

  // Initialize
  const allProducts = generateProducts();
  const [products] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 12;

  // Filter products
  useEffect(() => {
    setIsLoading(true);
    
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query)
      );
    }

    switch(sortBy) {
      case 'price-low':
        result.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
          const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
          const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
          return priceB - priceA;
        });
        break;
      case 'rating':
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    setTimeout(() => {
      setFilteredProducts(result);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300);
  }, [activeCategory, searchQuery, sortBy]);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handlers
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const handleImageError = (e, fallbackImage) => {
    if (fallbackImage && e.target.src !== fallbackImage) {
      e.target.src = fallbackImage;
    } else {
      e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f5f5f5"/><text x="50%" y="50%" font-family="Arial" font-size="14" fill="%23666" text-anchor="middle" dy=".3em">Product Image</text></svg>';
      e.target.onerror = null;
    }
  };

  const handleCategoryImageError = (e) => {
    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23e2e8f0"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="%23718096" text-anchor="middle" dy=".3em">Image</text></svg>';
    e.target.onerror = null;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  // Get active category name
  const getActiveCategoryName = () => {
    if (activeCategory === 'all') return 'All Products';
    return categories.find(c => c.id === activeCategory)?.name || '';
  };

  return (
    <div className="gallery-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Premium Woodcraft Collection</h1>
            <p className="hero-subtitle">
              Explore {allProducts.length}+ handcrafted wooden products across {categories.length - 1} categories
            </p>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder={`Search ${allProducts.length}+ products...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-button">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-scroll">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                title={`${category.count} products`}
              >
                <div className="category-image-wrapper">
                  {category.id === 'all' ? (
                    <div className="category-all-icon">All</div>
                  ) : (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                      onError={handleCategoryImageError}
                    />
                  )}
                </div>
                <span className="category-name">{category.name}</span>
                <span className="category-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="controls-section">
        <div className="container">
          <div className="controls-wrapper">
            <div className="view-toggle">
              <button
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <svg className="view-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid
              </button>
              <button
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <svg className="view-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                List
              </button>
            </div>
            
            <div className="sort-wrapper">
              <span className="sort-label">Sort by:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Gallery */}
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <h3 className="gallery-title">
              {getActiveCategoryName()}
              <span className="product-count"> ({filteredProducts.length} products)</span>
            </h3>
            {totalPages > 1 && (
              <div className="pagination-info">
                Page {currentPage} of {totalPages} • Showing {currentProducts.length} of {filteredProducts.length}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📷</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <div className={`products-${viewMode}`}>
                {currentProducts.map(product => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="product-image-container">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                        onError={(e) => handleImageError(e, product.fallbackImage)}
                      />
                      {product.featured && (
                        <div className="featured-badge">Featured</div>
                      )}
                      <div className="product-overlay">
                        <button className="quick-view-btn">View Details</button>
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <div className="product-header">
                        <h4 className="product-title">{product.title}</h4>
                        <div className="product-price">{product.price}</div>
                      </div>
                      
                      <p className="product-description">{product.description}</p>
                      
                      <div className="product-details">
                        <div className="detail-item">
                          <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{product.material}</span>
                        </div>
                        <div className="detail-item">
                          <svg className="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{product.dimensions}</span>
                        </div>
                      </div>
                      
                      <div className="product-footer">
                        <div className="rating">
                          <span className="rating-stars">★★★★★</span>
                          <span className="rating-value">{product.rating}</span>
                        </div>
                        <span className="image-number">#{product.imageNumber}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn prev"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      if (pageNumber < 1 || pageNumber > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNumber}
                          className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button 
                    className="pagination-btn next"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{allProducts.length}+</div>
              <div className="stat-label">Total Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{categories.length - 1}</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5 Year</div>
              <div className="stat-label">Warranty</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Handcrafted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="modal-content">
              <div className="modal-image-section">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="modal-main-image"
                  onError={(e) => handleImageError(e, selectedProduct.fallbackImage)}
                />
                <div className="image-counter">
                  Image {selectedProduct.imageNumber} of {categories.find(c => c.id === selectedProduct.category)?.count}
                </div>
              </div>
              
              <div className="modal-info-section">
                <div className="modal-header">
                  <h2 className="modal-title">{selectedProduct.title}</h2>
                  <div className="modal-price">{selectedProduct.price}</div>
                </div>
                
                <div className="modal-category">
                  <strong>Category:</strong> {categories.find(c => c.id === selectedProduct.category)?.name}
                </div>
                
                <div className="modal-rating">
                  <span className="rating-stars">★★★★★</span>
                  <span className="rating-value">{selectedProduct.rating} (Customer Rating)</span>
                </div>
                
                <p className="modal-description">{selectedProduct.description}</p>
                
                <div className="modal-specs">
                  <div className="spec-item">
                    <span className="spec-label">Material:</span>
                    <span className="spec-value">{selectedProduct.material}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Dimensions:</span>
                    <span className="spec-value">{selectedProduct.dimensions}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Finish:</span>
                    <span className="spec-value">{selectedProduct.finish}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Delivery Time:</span>
                    <span className="spec-value">{selectedProduct.delivery}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Warranty:</span>
                    <span className="spec-value">{selectedProduct.warranty}</span>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button className="btn-primary">
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  <button className="btn-secondary">
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Wishlist
                  </button>
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
              <h3 className="footer-logo">WoodCraft</h3>
              <p className="footer-description">
                Premium handcrafted wooden furniture and decor pieces across {categories.length - 1} categories.
              </p>
              <div className="total-products">
                Total Products: {allProducts.length}+
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Top Categories</h4>
              <ul className="footer-links">
                {categories.slice(1, 6).map(category => (
                  <li key={category.id}>
                    <a href="#" onClick={(e) => { 
                      e.preventDefault(); 
                      handleCategoryClick(category.id);
                    }}>
                      {category.name} ({category.count})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact & Support</h4>
              <p>📞 +91 98765 43210</p>
              <p>📧 info@woodcraft.com</p>
              <p>⏰ Mon-Sat: 9AM-7PM</p>
              <p>📍 Furniture City, India</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2024 WoodCraft Gallery • {allProducts.length}+ Premium Products</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalGallery;
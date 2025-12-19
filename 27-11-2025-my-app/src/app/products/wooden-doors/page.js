"use client";
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronLeft,
  ChevronRight,
  Filter, 
  Grid, 
  List, 
  Search,
  X,
  Flame,
  Sparkles,
  Star
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './ProductDetail.css'

// Subcategories Data
const subcategories = [
  { 
    name: 'Main Entrance Doors', 
    count: '50 Designs', 
    href: '/products/wooden-doors/main-entrance',
    image: '/images/products/subcategories/entrance.jpg',
    icon: '🏠',
    popular: true
  },
  { 
    name: 'Bedroom Doors', 
    count: '45 Designs', 
    href: '/products/wooden-doors/bedroom',
    image: '/images/products/subcategories/bedroom.jpg',
    icon: '🛏️',
    popular: true
  },
  { 
    name: 'Bathroom Doors', 
    count: '30 Designs', 
    href: '/products/wooden-doors/bathroom',
    image: '/images/products/subcategories/bathroom.jpg',
    icon: '🚿'
  },
  { 
    name: 'Office Doors', 
    count: '25 Designs', 
    href: '/products/wooden-doors/office',
    image: '/images/products/subcategories/office.jpg',
    icon: '💼'
  },
  { 
    name: 'Balcony Doors', 
    count: '20 Designs', 
    href: '/products/wooden-doors/balcony',
    image: '/images/products/subcategories/balcony.jpg',
    icon: '🌅'
  },
  { 
    name: 'French Doors', 
    count: '30 Designs', 
    href: '/products/wooden-doors/french',
    image: '/images/products/subcategories/french.jpg',
    icon: '🇫🇷',
    popular: true
  }
];

// Generate 200+ products with subcategory mapping
const generateProducts = () => {
  const products = [];
  const woodTypes = ['Sagwan Wood', 'Sheesham Wood', 'Mahogany', 'Teak Wood', 'Oak Wood'];
  const badges = ['Bestseller', 'Popular', 'Premium'];
  const subcategoryNames = subcategories.map(sc => sc.name);

  for (let i = 1; i <= 200; i++) {
    const subcategory = subcategoryNames[Math.floor(Math.random() * subcategoryNames.length)];
    const woodType = woodTypes[Math.floor(Math.random() * woodTypes.length)];
    
    products.push({
      id: i,
      name: `Wooden Door ${i}`,
      image: `/images/products/wooden-doors/door${(i % 12) + 1}.jpg`,
      designCode: `WD-${String(i).padStart(3, '0')}`,
      badge: badges[Math.floor(Math.random() * badges.length)],
      rating: (Math.random() * 0.5 + 4.5).toFixed(1),
      price: `₹${(Math.floor(Math.random() * 50) + 15) * 1000}`,
      deliveryTime: `${Math.floor(Math.random() * 7) + 3} - ${Math.floor(Math.random() * 7) + 8} days`,
      features: ['10-Year Warranty', 'Hand Crafted', 'Premium Quality'],
      subcategory: subcategory,
      woodType: woodType,
      isNew: i > 180,
      isTrending: Math.random() > 0.7
    });
  }
  
  return products;
}

const woodenDoorsData = {
  category: {
    name: 'Wooden Doors',
    description: 'Premium handcrafted wooden doors crafted with precision and traditional techniques.'
  },
  products: generateProducts(),
  filters: ['All Categories', 'Most Popular', 'New Arrivals', 'Traditional', 'Modern'],
  woodTypes: ['All Woods', 'Sagwan Wood', 'Sheesham Wood', 'Mahogany', 'Teak Wood', 'Oak Wood']
}

export default function WoodenDoorsPage() {
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFilter, setSelectedFilter] = useState('All Categories')
  const [selectedWoodType, setSelectedWoodType] = useState('All Woods')
  const [selectedSubcategory, setSelectedSubcategory] = useState('All')
  const [sortBy, setSortBy] = useState('most-popular')
  const productsSectionRef = useRef(null)
  const itemsPerPage = 12

  // Filter products
  const filteredProducts = woodenDoorsData.products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.designCode.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSubcategory = selectedSubcategory === 'All' || 
      product.subcategory === selectedSubcategory
    
    const matchesWoodType = selectedWoodType === 'All Woods' || 
      product.woodType === selectedWoodType
    
    let matchesFilter = true
    if (selectedFilter === 'Most Popular') {
      matchesFilter = product.badge === 'Popular' || product.badge === 'Bestseller'
    } else if (selectedFilter === 'New Arrivals') {
      matchesFilter = product.isNew
    } else if (selectedFilter === 'Trending') {
      matchesFilter = product.isTrending
    } else if (selectedFilter !== 'All Categories') {
      matchesFilter = product.designType === selectedFilter
    }
    
    return matchesSearch && matchesSubcategory && matchesFilter && matchesWoodType
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low-high':
        return parseInt(a.price.replace('₹', '').replace(',', '')) - 
               parseInt(b.price.replace('₹', '').replace(',', ''))
      case 'price-high-low':
        return parseInt(b.price.replace('₹', '').replace(',', '')) - 
               parseInt(a.price.replace('₹', '').replace(',', ''))
      case 'newest':
        return b.id - a.id
      case 'most-popular':
      default:
        if (b.rating !== a.rating) return b.rating - a.rating
        return b.id - a.id
    }
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = sortedProducts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedFilter, selectedSubcategory, selectedWoodType, sortBy])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleSubcategoryClick = (subcategoryName) => {
    setSelectedSubcategory(subcategoryName)
    if (productsSectionRef.current) {
      setTimeout(() => {
        productsSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    }
  }

  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn prev"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="page-numbers">
          {pages.map((page, index) => (
            page === '...' ? (
              <span key={`dots-${index}`} className="page-dots">...</span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      
      <div className="product-detail-page">
        {/* Compact Hero Section */}
        <section className="product-hero">
          <div className="hero-content">
            <div className="hero-nav">
              <Link href="/products" className="back-button">
                <ChevronLeft size={16} />
                Back to Products
              </Link>
              <div className="hero-breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={12} />
                <Link href="/products">Products</Link>
                <ChevronRight size={12} />
                <span className="active-page">Wooden Doors</span>
              </div>
            </div>
            
            <div className="hero-main">
              <div className="hero-text">
                <h1 className="hero-title">
                  <span className="hero-title-main">Wooden Doors</span>
                  <span className="hero-title-sub">Premium Collection</span>
                </h1>
                <p className="hero-description">
                  Handcrafted wooden doors with precision craftsmanship and timeless elegance
                </p>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Designs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">6</div>
                  <div className="stat-label">Categories</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories Section */}
        <section className="subcategories-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Explore Categories</h2>
              <p className="section-subtitle">Browse our premium wooden door collection</p>
            </div>
            
            <div className="subcategories-grid">
              {subcategories.map((subcategory, index) => (
                <div 
                  key={index}
                  className={`subcategory-card ${selectedSubcategory === subcategory.name ? 'active' : ''}`}
                  onClick={() => handleSubcategoryClick(subcategory.name)}
                >
                  <div className="subcategory-image">
                    <div className="image-placeholder">
                      <span className="category-icon">{subcategory.icon}</span>
                    </div>
                    {subcategory.popular && (
                      <div className="popular-tag">
                        <Flame size={12} />
                        Popular
                      </div>
                    )}
                  </div>
                  
                  <div className="subcategory-content">
                    <h3 className="subcategory-name">{subcategory.name}</h3>
                    <div className="subcategory-count">{subcategory.count}</div>
                  </div>
                </div>
              ))}
              
              <div 
                className="subcategory-card view-all"
                onClick={() => handleSubcategoryClick('All')}
              >
                <div className="view-all-content">
                  <div className="view-all-icon">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="view-all-title">View All</h3>
                  <p className="view-all-count">200+ Designs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Filters Section */}
        <section className="filters-section">
          <div className="container">
            <div className="filters-header">
              <div className="results-info">
                <h2 className="section-heading">
                  {selectedSubcategory === 'All' ? 'All Designs' : selectedSubcategory}
                  <span className="results-count">{filteredProducts.length} designs</span>
                </h2>
                {selectedSubcategory !== 'All' && (
                  <button 
                    className="clear-filter-btn"
                    onClick={() => setSelectedSubcategory('All')}
                  >
                    <X size={12} />
                    Clear filter
                  </button>
                )}
              </div>
              
              <div className="main-controls">
                <div className="search-control">
                  <div className="search-box">
                    <Search size={18} />
                    <input
                      type="text"
                      placeholder="Search designs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                    {searchQuery && (
                      <button 
                        className="clear-search"
                        onClick={() => setSearchQuery('')}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  
                  <div className="view-controls">
                    <div className="view-toggle">
                      <button 
                        className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Grid View"
                      >
                        <Grid size={18} />
                      </button>
                      <button 
                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                        title="List View"
                      >
                        <List size={18} />
                      </button>
                    </div>
                    
                    <div className="sort-control">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                      >
                        <option value="most-popular">Sort by: Popular</option>
                        <option value="newest">Newest First</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="filter-controls">
                  <button 
                    className={`advanced-filter-btn ${showFilters ? 'active' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={16} />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                  
                  <div className="filter-chips">
                    {woodenDoorsData.filters.slice(0, 4).map((filter) => (
                      <button
                        key={filter}
                        className={`filter-chip ${selectedFilter === filter ? 'active' : ''}`}
                        onClick={() => setSelectedFilter(filter)}
                      >
                        {filter === 'Most Popular' && <Flame size={12} />}
                        {filter === 'New Arrivals' && <Sparkles size={12} />}
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Simple Wood Type Filter Only */}
              {showFilters && (
                <div className="simple-filters">
                  <div className="filter-group">
                    <h4 className="filter-title">Wood Type</h4>
                    <div className="wood-chips">
                      {woodenDoorsData.woodTypes.map((woodType) => (
                        <button
                          key={woodType}
                          className={`wood-chip ${selectedWoodType === woodType ? 'active' : ''}`}
                          onClick={() => setSelectedWoodType(woodType)}
                        >
                          {woodType}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Section with ref */}
        <section ref={productsSectionRef} className="products-section">
          <div className="container">
            {currentProducts.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="products-grid">
                    {currentProducts.map((product) => (
                      <div key={product.id} className="product-card">
                        <div className="product-image">
                          <div className="image-container">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={280}
                              height={200}
                              className="product-img"
                            />
                          </div>
                          <div className="product-badge">
                            {product.badge}
                          </div>
                          {product.isNew && (
                            <div className="new-badge">New</div>
                          )}
                        </div>
                        
                        <div className="product-content">
                          <div className="product-header">
                            <div className="product-code">{product.designCode}</div>
                            <div className="product-rating">
                              <Star size={12} fill="currentColor" />
                              {product.rating}
                            </div>
                          </div>
                          
                          <h3 className="product-name">{product.name}</h3>
                          
                          <div className="product-details">
                            <span className="wood-type">{product.woodType}</span>
                            <span className="product-price">{product.price}</span>
                          </div>
                          
                          <div className="product-features">
                            {product.features.slice(0, 2).map((feature, idx) => (
                              <span key={idx} className="feature-tag">{feature}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="products-list">
                    {currentProducts.map((product) => (
                      <div key={product.id} className="product-list-item">
                        <div className="list-image">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={150}
                            className="list-img"
                          />
                          {product.isNew && (
                            <div className="new-badge">New</div>
                          )}
                        </div>
                        
                        <div className="list-content">
                          <div className="list-header">
                            <div className="product-code">{product.designCode}</div>
                            <div className="product-badge">
                              {product.badge}
                            </div>
                          </div>
                          
                          <h3 className="product-name">{product.name}</h3>
                          
                          <div className="list-details">
                            <div className="wood-type">{product.woodType}</div>
                            <div className="product-rating">
                              <Star size={12} fill="currentColor" />
                              {product.rating}
                            </div>
                          </div>
                          
                          <div className="product-features">
                            {product.features.map((feature, idx) => (
                              <span key={idx} className="feature-tag">{feature}</span>
                            ))}
                          </div>
                          
                          <div className="list-actions">
                            <div className="product-price">{product.price}</div>
                            <Link 
                              href={`/products/wooden-doors/design/${product.id}`} 
                              className="view-details-btn"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination-container">
                    {renderPagination()}
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🚪</div>
                <h3>No Designs Found</h3>
                <p>Try changing your filters or search criteria</p>
                <button 
                  className="clear-filters-btn" 
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedFilter('All Categories')
                    setSelectedSubcategory('All')
                    setSelectedWoodType('All Woods')
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
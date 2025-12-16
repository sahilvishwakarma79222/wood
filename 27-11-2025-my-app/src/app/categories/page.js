"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiFilter,
  FiChevronRight,
  FiStar,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import "./page.css";
import { useRef } from "react";

// Product Modal Component
function ProductModal({ product, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleWhatsApp = () => {
    const phoneNumber = "+917028426042";
    const message = `Hello Maa Kripa Wood Art! I'm interested in ${product.name}. Please share more details.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+917028426042";
  };

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-section">
            <span className="modal-category">{product.sectionTitle}</span>
            <h2 className="modal-title">{product.name}</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Left Column - Images */}
          <div className="modal-images">
            <div className="main-image">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={400}
                className="modal-main-image"
              />
            </div>
            <div className="image-thumbnails">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="thumbnail">
                  <Image
                    src={product.image}
                    alt={`${product.name} ${i + 1}`}
                    width={100}
                    height={80}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="modal-details">
            {/* Quick Stats */}
            <div className="modal-stats">
              <div className="stat-item">
                <div className="stat-value">{product.rating}</div>
                <div className="stat-label">Rating</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">{product.reviews}</div>
                <div className="stat-label">Reviews</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">{product.stats}</div>
                <div className="stat-label">Designs</div>
              </div>
            </div>

            {/* Description */}
            <div className="modal-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Specifications */}
            <div className="modal-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Material</span>
                  <span className="spec-value">{product.material}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Category</span>
                  <span className="spec-value">{product.sectionTitle}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Designs Available</span>
                  <span className="spec-value">{product.stats}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Customer Rating</span>
                  <span className="spec-value">
                    {product.rating}/5 ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="modal-price-section">
              <div className="price-info">
                <span className="price-label">Starting from</span>
                <div className="price-main">{product.price}</div>
                <span className="price-note">
                  *Price may vary based on customization
                </span>
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button
                  className="action-btn whatsapp-btn"
                  onClick={handleWhatsApp}
                >
                  <FaWhatsapp /> Get Quote on WhatsApp
                </button>
                <button className="action-btn call-btn" onClick={handleCall}>
                  <FaPhone /> Call Now
                </button>
                <button
                  className="action-btn view-btn"
                  onClick={() => window.open(product.href, "_blank")}
                >
                  View All Designs
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="badge">
                <span className="badge-icon">🔒</span>
                <span>Secure Payment</span>
              </div>
              <div className="badge">
                <span className="badge-icon">🚚</span>
                <span>Free Installation</span>
              </div>
              <div className="badge">
                <span className="badge-icon">🏷️</span>
                <span>Best Price Guarantee</span>
              </div>
              <div className="badge">
                <span className="badge-icon">⭐</span>
                <span>28+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <p className="footer-note">
            <strong>Note:</strong> All prices include GST. Installation charges
            extra based on location. Custom designs available upon request.
          </p>
        </div>
      </div>
    </div>
  );
}

const allCategories = [
  // Wood Type Categories
  {
    id: "wood-type",
    title: "By Wood Type",
    icon: "🪵",
    categories: [
      {
        name: "Teak Wood Doors",
        href: "/products/teak-wood",
        image: "/images/categories/teak-wood/teak-wood.jpg",
        description: "Premium quality, durable & termite resistant",
        badge: "Popular",
        stats: "100+ Designs",
        rating: 4.9,
        reviews: 128,
        price: "₹45,000+",
        material: "Solid Wood",
      },
      {
        name: "Sagwan Wood Doors",
        href: "/products/sagwan-wood",
        image: "/images/categories/sagwan-wood/sagwan-wood.jpg",
        description: "Elegant grain patterns & natural beauty",
        badge: "Eco-Friendly",
        stats: "80+ Designs",
        rating: 4.7,
        reviews: 95,
        price: "₹35,000+",
        material: "Solid Wood",
      },
      {
        name: "Sheesham Wood Doors",
        href: "/products/sheesham-wood",
        image: "/images/categories/sheesham-wood/sheesham-wood.jpg",
        description: "Hardwood with rich texture & durability",
        badge: "Luxury",
        stats: "120+ Designs",
        rating: 4.8,
        reviews: 156,
        price: "₹50,000+",
        material: "Solid Wood",
      },
      {
        name: "Sal Wood Doors",
        href: "/products/sal-wood",
        image: "/images/categories/sal-wood/sal-wood.jpg",
        description: "Strong, heavy & weather resistant",
        badge: "Strong",
        stats: "60+ Designs",
        rating: 4.6,
        reviews: 72,
        price: "₹40,000+",
        material: "Solid Wood",
      },
      {
        name: "Oak Wood Doors",
        href: "/products/oak-wood",
        image: "/images/categories/oak-wood.jpg",
        description: "Classic European style & sturdy construction",
        badge: "Classic",
        stats: "90+ Designs",
        rating: 4.5,
        reviews: 88,
        price: "₹55,000+",
        material: "Solid Wood",
      },
      {
        name: "Mahogany Doors",
        href: "/products/mahogany",
        image: "/images/categories/mahogany.jpg",
        description: "Deep red tones & exceptional durability",
        badge: "Premium",
        stats: "70+ Designs",
        rating: 4.9,
        reviews: 64,
        price: "₹60,000+",
        material: "Solid Wood",
      },
      {
        name: "Pine Wood Doors",
        href: "/products/pine-wood",
        image: "/images/categories/pine-wood.jpg",
        description: "Lightweight & affordable wooden doors",
        badge: "Budget",
        stats: "150+ Designs",
        rating: 4.3,
        reviews: 210,
        price: "₹25,000+",
        material: "Engineered Wood",
      },
      {
        name: "Cedar Wood Doors",
        href: "/products/cedar-wood",
        image: "/images/categories/cedar-wood.jpg",
        description: "Natural insect repellent & aromatic wood",
        badge: "Aromatic",
        stats: "50+ Designs",
        rating: 4.4,
        reviews: 58,
        price: "₹38,000+",
        material: "Solid Wood",
      },
    ],
  },

  // Usage Categories
  {
    id: "usage",
    title: "By Usage",
    icon: "🚪",
    categories: [
      {
        name: "Main Entrance Doors",
        href: "/products/main-entrance",
        image: "/images/categories/main-entrance.jpg",
        description: "Grand entrance with maximum security focus",
        badge: "Secure",
        stats: "200+ Designs",
        rating: 4.9,
        reviews: 342,
        price: "₹45,000+",
        material: "Various",
      },
      {
        name: "Bedroom Doors",
        href: "/products/bedroom",
        image: "/images/categories/bedroom-doors.jpg",
        description: "Privacy with elegant & soundproof designs",
        badge: "Private",
        stats: "180+ Designs",
        rating: 4.8,
        reviews: 289,
        price: "₹35,000+",
        material: "Various",
      },
      {
        name: "Bathroom Doors",
        href: "/products/bathroom",
        image: "/images/categories/bathroom-doors.jpg",
        description: "Waterproof & moisture resistant materials",
        badge: "Waterproof",
        stats: "160+ Designs",
        rating: 4.7,
        reviews: 234,
        price: "₹28,000+",
        material: "Waterproof",
      },
      {
        name: "Kitchen Doors",
        href: "/products/kitchen",
        image: "/images/categories/kitchen-doors.jpg",
        description: "Heat & grease resistant durable finishes",
        badge: "Durable",
        stats: "140+ Designs",
        rating: 4.6,
        reviews: 198,
        price: "₹32,000+",
        material: "Heat Resistant",
      },
      {
        name: "Living Room Doors",
        href: "/products/living-room",
        image: "/images/categories/living-room.jpg",
        description: "Elegant designs to match your interior decor",
        badge: "Elegant",
        stats: "170+ Designs",
        rating: 4.8,
        reviews: 256,
        price: "₹40,000+",
        material: "Various",
      },
      {
        name: "Office Doors",
        href: "/products/office",
        image: "/images/categories/office-doors.jpg",
        description: "Professional & formal door designs",
        badge: "Professional",
        stats: "120+ Designs",
        rating: 4.5,
        reviews: 167,
        price: "₹50,000+",
        material: "Various",
      },
      {
        name: "Balcony Doors",
        href: "/products/balcony",
        image: "/images/categories/balcony-doors.jpg",
        description: "Weather resistant outdoor doors",
        badge: "Outdoor",
        stats: "110+ Designs",
        rating: 4.4,
        reviews: 145,
        price: "₹30,000+",
        material: "Weatherproof",
      },
      {
        name: "French Doors",
        href: "/products/french",
        image: "/images/categories/french-doors.jpg",
        description: "Classic glass panel design for elegance",
        badge: "Classic",
        stats: "90+ Designs",
        rating: 4.7,
        reviews: 132,
        price: "₹45,000+",
        material: "Wood & Glass",
      },
    ],
  },

  // Design Categories
  {
    id: "design",
    title: "By Design",
    icon: "🎨",
    categories: [
      {
        name: "Carved Wooden Doors",
        href: "/products/carved",
        image: "/images/categories/carved-doors.jpg",
        description: "Intricate traditional & modern carvings",
        badge: "Artistic",
        stats: "150+ Designs",
        rating: 4.9,
        reviews: 278,
        price: "₹55,000+",
        material: "Solid Wood",
      },
      {
        name: "Modern Minimal Doors",
        href: "/products/modern",
        image: "/images/categories/modern-doors.jpg",
        description: "Clean lines & contemporary sleek design",
        badge: "Modern",
        stats: "200+ Designs",
        rating: 4.8,
        reviews: 312,
        price: "₹40,000+",
        material: "Various",
      },
      {
        name: "Traditional Indian Doors",
        href: "/products/traditional",
        image: "/images/categories/traditional-doors.jpg",
        description: "Classic Indian designs & cultural motifs",
        badge: "Traditional",
        stats: "180+ Designs",
        rating: 4.7,
        reviews: 245,
        price: "₹48,000+",
        material: "Solid Wood",
      },
      {
        name: "Glass Panel Doors",
        href: "/products/glass-panel",
        image: "/images/categories/glass-panel-doors.jpg",
        description: "Elegant glass & wood combinations",
        badge: "Elegant",
        stats: "160+ Designs",
        rating: 4.6,
        reviews: 198,
        price: "₹38,000+",
        material: "Wood & Glass",
      },
      {
        name: "Sliding Doors",
        href: "/products/sliding",
        image: "/images/categories/sliding-doors.jpg",
        description: "Space saving modern sliding mechanism",
        badge: "Space Saver",
        stats: "140+ Designs",
        rating: 4.5,
        reviews: 176,
        price: "₹42,000+",
        material: "Various",
      },
      {
        name: "Panel Doors",
        href: "/products/panel",
        image: "/images/categories/panel-doors.jpg",
        description: "Classic raised or recessed panel designs",
        badge: "Classic",
        stats: "170+ Designs",
        rating: 4.4,
        reviews: 189,
        price: "₹35,000+",
        material: "Various",
      },
      {
        name: "Flush Doors",
        href: "/products/flush",
        image: "/images/categories/flush-doors.jpg",
        description: "Smooth surface & contemporary look",
        badge: "Contemporary",
        stats: "130+ Designs",
        rating: 4.3,
        reviews: 154,
        price: "₹28,000+",
        material: "Engineered Wood",
      },
      {
        name: "Louvred Doors",
        href: "/products/louvred",
        image: "/images/categories/louvred-doors.jpg",
        description: "Ventilation with stylish slatted design",
        badge: "Ventilated",
        stats: "90+ Designs",
        rating: 4.2,
        reviews: 98,
        price: "₹32,000+",
        material: "Wood",
      },
    ],
  },

  // Additional Categories
  {
    id: "additional",
    title: "Additional Categories",
    icon: "✨",
    categories: [
      {
        name: "Custom Design Doors",
        href: "/products/custom",
        image: "/images/categories/custom-doors.jpg",
        description: "Get doors designed as per your specifications",
        badge: "Custom",
        stats: "Unlimited Designs",
        rating: 4.9,
        reviews: 189,
        price: "₹60,000+",
        material: "Custom",
      },
      {
        name: "Industrial Style Doors",
        href: "/products/industrial",
        image: "/images/categories/industrial-doors.jpg",
        description: "Raw & rugged style with metal accents",
        badge: "Industrial",
        stats: "75+ Designs",
        rating: 4.6,
        reviews: 112,
        price: "₹52,000+",
        material: "Wood & Metal",
      },
      {
        name: "Rustic Farmhouse Doors",
        href: "/products/farmhouse",
        image: "/images/categories/farmhouse-doors.jpg",
        description: "Charming country-style rustic doors",
        badge: "Rustic",
        stats: "85+ Designs",
        rating: 4.7,
        reviews: 134,
        price: "₹46,000+",
        material: "Reclaimed Wood",
      },
      {
        name: "Soundproof Doors",
        href: "/products/soundproof",
        image: "/images/categories/soundproof-doors.jpg",
        description: "Maximum noise reduction technology",
        badge: "Silent",
        stats: "65+ Designs",
        rating: 4.8,
        reviews: 89,
        price: "₹58,000+",
        material: "Specialized",
      },
      {
        name: "Fire Resistant Doors",
        href: "/products/fire-resistant",
        image: "/images/categories/fire-doors.jpg",
        description: "Safety certified fire resistant doors",
        badge: "Fire Safe",
        stats: "45+ Designs",
        rating: 4.9,
        reviews: 67,
        price: "₹65,000+",
        material: "Fireproof",
      },
      {
        name: "Antique Style Doors",
        href: "/products/antique",
        image: "/images/categories/antique-doors.jpg",
        description: "Vintage look with modern functionality",
        badge: "Vintage",
        stats: "95+ Designs",
        rating: 4.5,
        reviews: 156,
        price: "₹55,000+",
        material: "Aged Wood",
      },
    ],
  },
];

const filterOptions = [
  { id: "all", label: "All Categories" },
  { id: "wood-type", label: "Wood Type" },
  { id: "wood-type", label: "Wood Type" },
  { id: "wood-type", label: "Wood Type" },
  { id: "usage", label: "Usage" },
  { id: "design", label: "Design" },
  { id: "additional", label: "Additional" },
  { id: "popular", label: "Most Popular" },
  { id: "new", label: "New Arrivals" },
  { id: "budget", label: "Budget Friendly" },
  { id: "luxury", label: "Luxury Collection" },
];

const sortOptions = [
  { id: "default", label: "Default" },
  { id: "popular", label: "Most Popular" },
  { id: "rating", label: "Highest Rated" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name", label: "Alphabetical" },
];

export default function AllCategoriesPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Flatten all categories
  const allFlattenedCategories = allCategories.flatMap((section) =>
    section.categories.map((cat) => ({
      ...cat,
      sectionId: section.id,
      sectionTitle: section.title,
    }))
  );

  // Filter and sort categories
  const filteredCategories = allFlattenedCategories.filter((category) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "popular") return category.rating >= 4.8;
    if (selectedFilter === "new") return category.reviews < 50;
    if (selectedFilter === "budget")
      return (
        category.price.includes("25,000") || category.price.includes("28,000")
      );
    if (selectedFilter === "luxury")
      return (
        category.price.includes("60,000") || category.price.includes("65,000")
      );
    return category.sectionId === selectedFilter;
  });

  // Apply search filter
  const searchedCategories = filteredCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.material.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply sorting
  const sortedCategories = [...searchedCategories].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.reviews - a.reviews;
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return (
          parseInt(a.price.replace(/[^0-9]/g, "")) -
          parseInt(b.price.replace(/[^0-9]/g, ""))
        );
      case "price-high":
        return (
          parseInt(b.price.replace(/[^0-9]/g, "")) -
          parseInt(a.price.replace(/[^0-9]/g, ""))
        );
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Handle View Designs Click
  const handleViewDesigns = (category) => {
    setSelectedProduct(category);
    setShowModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Statistics
  const totalCategories = allFlattenedCategories.length;
  const totalDesigns = allFlattenedCategories.reduce((sum, cat) => {
    const num = parseInt(cat.stats) || 0;
    return sum + num;
  }, 0);
  const [hideFilterImages, setHideFilterImages] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      setHideFilterImages(window.scrollY > 30);
    };
  
    window.addEventListener("scroll", handleScroll, { passive: true });
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  
  

  return (
    <div className="all-categories-page">
      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}

      {/* Hero Header */}
      {/* <section className="categories-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <FiChevronRight className="breadcrumb-icon" />
            <span className="breadcrumb-current">All Categories</span>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">
              Explore <span className="highlight">50+ Door Categories</span>
            </h1>
            <p className="hero-subtitle">
              Discover our extensive collection of premium wooden doors, crafted with precision and passion since 1996
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">{totalCategories}+</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">{totalDesigns}+</div>
                <div className="stat-label">Total Designs</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">28+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Controls Bar */}
      <section className="controls-section">
        <div className="container">
          <div className="controls-grid">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search categories, materials, or designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-search"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
              >
                <div className="grid-icon">
                  <div className="grid-dot"></div>
                  <div className="grid-dot"></div>
                  <div className="grid-dot"></div>
                  <div className="grid-dot"></div>
                </div>
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List View"
              >
                <div className="list-icon">
                  <div className="list-line"></div>
                  <div className="list-line"></div>
                  <div className="list-line"></div>
                </div>
              </button>
            </div>

            <div className="sort-container">
              <span className="sort-label">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              <span>Filter</span>
            </button>
          </div>
          </div>
          </section>
          {/* Filter Tags */}
          <section className="controls-section-for2">
          {/* <div  className="filter-sentinel"></div> */}
          <div className="container" ref={sectionRef}>
          <div className={`filter-tags ${showFilters ? "show" : ""}`}>
            {filterOptions.map((filter) => (
             <button
             className={`filter-tag-card ${
               hideFilterImages ? "hide-image" : ""
             } ${selectedFilter === filter.id ? "active" : ""}`}
           >
             {!hideFilterImages && (
               <div className="filter-image-wrapper">
                 <img
                   src="/images/hero-banner.jpg"
                   alt={filter.label}
                   className="filter-image"
                 />
               </div>
             )}
             <span className="filter-label">{filter.label}</span>
           </button>
           
            ))}
          </div>
          </div>
        
      </section>
      {/* Categories Grid/List */}
      <section className="all-categories-section">
        <div  className="container">
          {/* Results Info */}
          <div className="results-info">
            <h2 className="results-title">
              Showing <span className="count">{sortedCategories.length}</span>{" "}
              categories
              {searchQuery && (
                <span className="search-term"> for "{searchQuery}"</span>
              )}
            </h2>
            <div className="active-filter">
              {selectedFilter !== "all" && (
                <span className="active-filter-tag">
                  {filterOptions.find((f) => f.id === selectedFilter)?.label}
                  <button
                    onClick={() => setSelectedFilter("all")}
                    className="clear-filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Categories Display */}
          {viewMode === "grid" ? (
            // Grid View
            <div className="categories-grid-view">
              {sortedCategories.map((category, index) => (
                <div
                  key={`${category.sectionId}-${index}`}
                  className="category-card-grid"
                  onClick={() => handleViewDesigns(category)}
                >
                  {/* Card Badge */}
                  {category.badge && (
                    <div className="category-badge">
                      <span className="badge-text">{category.badge}</span>
                    </div>
                  )}

                  {/* Category Image */}
                  <div className="category-image">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={300}
                      className="card-image"
                    />
                    <div className="image-overlay"></div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <div className="card-meta">
                      <span className="category-type">
                        {category.sectionTitle}
                      </span>
                      <div className="rating">
                        <FiStar className="star-icon" />
                        <span className="rating-value">{category.rating}</span>
                        <span className="reviews">({category.reviews})</span>
                      </div>
                    </div>

                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-description">
                      {category.description}
                    </p>

                    <div className="card-details">
                      <div className="detail-item">
                        <MdOutlineCategory className="detail-icon" />
                        <span>{category.stats}</span>
                      </div>
                      <div className="detail-item">
                        <FiTrendingUp className="detail-icon" />
                        <span>{category.material}</span>
                      </div>
                    </div>

                    <div className="card-footer">
                      <div className="price-tag">
                        <span className="price-label">Starting from</span>
                        <span className="price-value">{category.price}</span>
                      </div>
                      <button
                        className="explore-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDesigns(category);
                        }}
                      >
                        View Designs
                        <FiChevronRight className="btn-arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="categories-list-view">
              {sortedCategories.map((category, index) => (
                <div
                  key={`${category.sectionId}-${index}`}
                  className="category-card-list"
                  onClick={() => handleViewDesigns(category)}
                >
                  <div className="list-content">
                    {/* Left Side - Image */}
                    <div className="list-image">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={200}
                        height={150}
                        className="list-card-image"
                      />
                    </div>

                    {/* Middle - Details */}
                    <div className="list-details">
                      <div className="list-header">
                        <div className="list-meta">
                          <span className="list-category-type">
                            {category.sectionTitle}
                          </span>
                          {category.badge && (
                            <span className="list-badge">{category.badge}</span>
                          )}
                        </div>
                        <h3 className="list-name">{category.name}</h3>
                        <p className="list-description">
                          {category.description}
                        </p>
                      </div>

                      <div className="list-footer">
                        <div className="list-stats">
                          <div className="list-stat">
                            <FiStar className="stat-icon" />
                            <span>
                              {category.rating} ({category.reviews} reviews)
                            </span>
                          </div>
                          <div className="list-stat">
                            <MdOutlineCategory className="stat-icon" />
                            <span>{category.stats}</span>
                          </div>
                          <div className="list-stat">
                            <FiTrendingUp className="stat-icon" />
                            <span>{category.material}</span>
                          </div>
                        </div>
                        <div className="list-price">
                          <span className="price-label">Starting from</span>
                          <span className="price-value">{category.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Action */}
                    <div className="list-action">
                      <button
                        className="list-explore-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDesigns(category);
                        }}
                      >
                        View Details
                        <FiChevronRight className="btn-arrow" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results Message */}
          {sortedCategories.length === 0 && (
            <div className="no-results">
              <div className="no-results-content">
                <div className="no-results-icon">🔍</div>
                <h3>No categories found</h3>
                <p>
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilter("all");
                  }}
                  className="reset-btn"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          {/* Section Navigation */}
          <div className="section-navigation">
            {allCategories.map((section) => (
              <div key={section.id} className="section-anchor">
                <a href={`#${section.id}`} className="section-link">
                  <span className="section-icon">{section.icon}</span>
                  {section.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Need Help Choosing?</h2>
            <p className="cta-text">
              Our experts can guide you to the perfect door for your space. Get
              free consultation and quotation.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-btn primary">
                Book Free Consultation
              </Link>
              <Link href="/whatsapp" className="cta-btn secondary">
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

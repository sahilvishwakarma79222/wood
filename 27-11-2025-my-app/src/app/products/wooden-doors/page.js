// "use client";
// import { useState, useEffect, useRef } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { 
//   ChevronLeft,
//   ChevronRight,
//   Filter, 
//   Grid, 
//   List, 
//   Search,
//   X,
//   Flame,
//   Sparkles,
//   Star
// } from 'lucide-react'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import './ProductDetail.css'

// // Subcategories Data
// const subcategories = [
//   { 
//     name: 'Main Entrance Doors', 
//     count: '50 Designs', 
//     href: '/products/wooden-doors/main-entrance',
//     image: '/images/products/subcategories/entrance.jpg',
//     icon: '🏠',
//     popular: true
//   },
//   { 
//     name: 'Bedroom Doors', 
//     count: '45 Designs', 
//     href: '/products/wooden-doors/bedroom',
//     image: '/images/products/subcategories/bedroom.jpg',
//     icon: '🛏️',
//     popular: true
//   },
//   { 
//     name: 'Bathroom Doors', 
//     count: '30 Designs', 
//     href: '/products/wooden-doors/bathroom',
//     image: '/images/products/subcategories/bathroom.jpg',
//     icon: '🚿'
//   },
//   { 
//     name: 'Office Doors', 
//     count: '25 Designs', 
//     href: '/products/wooden-doors/office',
//     image: '/images/products/subcategories/office.jpg',
//     icon: '💼'
//   },
//   { 
//     name: 'Balcony Doors', 
//     count: '20 Designs', 
//     href: '/products/wooden-doors/balcony',
//     image: '/images/products/subcategories/balcony.jpg',
//     icon: '🌅'
//   },
//   { 
//     name: 'French Doors', 
//     count: '30 Designs', 
//     href: '/products/wooden-doors/french',
//     image: '/images/products/subcategories/french.jpg',
//     icon: '🇫🇷',
//     popular: true
//   }
// ];

// // Generate 200+ products with subcategory mapping
// const generateProducts = () => {
//   const products = [];
//   const woodTypes = ['Sagwan Wood', 'Sheesham Wood', 'Mahogany', 'Teak Wood', 'Oak Wood'];
//   const badges = ['Bestseller', 'Popular', 'Premium'];
//   const subcategoryNames = subcategories.map(sc => sc.name);

//   for (let i = 1; i <= 200; i++) {
//     const subcategory = subcategoryNames[Math.floor(Math.random() * subcategoryNames.length)];
//     const woodType = woodTypes[Math.floor(Math.random() * woodTypes.length)];
    
//     products.push({
//       id: i,
//       name: `Wooden Door ${i}`,
//       image: `/images/products/wooden-doors/door${(i % 12) + 1}.jpg`,
//       designCode: `WD-${String(i).padStart(3, '0')}`,
//       badge: badges[Math.floor(Math.random() * badges.length)],
//       rating: (Math.random() * 0.5 + 4.5).toFixed(1),
//       price: `₹${(Math.floor(Math.random() * 50) + 15) * 1000}`,
//       deliveryTime: `${Math.floor(Math.random() * 7) + 3} - ${Math.floor(Math.random() * 7) + 8} days`,
//       features: ['10-Year Warranty', 'Hand Crafted', 'Premium Quality'],
//       subcategory: subcategory,
//       woodType: woodType,
//       isNew: i > 180,
//       isTrending: Math.random() > 0.7
//     });
//   }
  
//   return products;
// }

// const woodenDoorsData = {
//   category: {
//     name: 'Wooden Doors',
//     description: 'Premium handcrafted wooden doors crafted with precision and traditional techniques.'
//   },
//   products: generateProducts(),
//   filters: ['All Categories', 'Most Popular', 'New Arrivals', 'Traditional', 'Modern'],
//   woodTypes: ['All Woods', 'Sagwan Wood', 'Sheesham Wood', 'Mahogany', 'Teak Wood', 'Oak Wood']
// }

// export default function WoodenDoorsPage() {
//   const [viewMode, setViewMode] = useState('grid')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [showFilters, setShowFilters] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [selectedFilter, setSelectedFilter] = useState('All Categories')
//   const [selectedWoodType, setSelectedWoodType] = useState('All Woods')
//   const [selectedSubcategory, setSelectedSubcategory] = useState('All')
//   const [sortBy, setSortBy] = useState('most-popular')
//   const productsSectionRef = useRef(null)
//   const itemsPerPage = 12

//   // Filter products
//   const filteredProducts = woodenDoorsData.products.filter(product => {
//     const matchesSearch = searchQuery === '' || 
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.designCode.toLowerCase().includes(searchQuery.toLowerCase())
    
//     const matchesSubcategory = selectedSubcategory === 'All' || 
//       product.subcategory === selectedSubcategory
    
//     const matchesWoodType = selectedWoodType === 'All Woods' || 
//       product.woodType === selectedWoodType
    
//     let matchesFilter = true
//     if (selectedFilter === 'Most Popular') {
//       matchesFilter = product.badge === 'Popular' || product.badge === 'Bestseller'
//     } else if (selectedFilter === 'New Arrivals') {
//       matchesFilter = product.isNew
//     } else if (selectedFilter === 'Trending') {
//       matchesFilter = product.isTrending
//     } else if (selectedFilter !== 'All Categories') {
//       matchesFilter = product.designType === selectedFilter
//     }
    
//     return matchesSearch && matchesSubcategory && matchesFilter && matchesWoodType
//   })

//   // Sort products
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch(sortBy) {
//       case 'price-low-high':
//         return parseInt(a.price.replace('₹', '').replace(',', '')) - 
//                parseInt(b.price.replace('₹', '').replace(',', ''))
//       case 'price-high-low':
//         return parseInt(b.price.replace('₹', '').replace(',', '')) - 
//                parseInt(a.price.replace('₹', '').replace(',', ''))
//       case 'newest':
//         return b.id - a.id
//       case 'most-popular':
//       default:
//         if (b.rating !== a.rating) return b.rating - a.rating
//         return b.id - a.id
//     }
//   })

//   // Pagination logic
//   const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const endIndex = startIndex + itemsPerPage
//   const currentProducts = sortedProducts.slice(startIndex, endIndex)

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [searchQuery, selectedFilter, selectedSubcategory, selectedWoodType, sortBy])

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//     if (productsSectionRef.current) {
//       productsSectionRef.current.scrollIntoView({ 
//         behavior: 'smooth',
//         block: 'start'
//       })
//     }
//   }

//   const handleSubcategoryClick = (subcategoryName) => {
//     setSelectedSubcategory(subcategoryName)
//     if (productsSectionRef.current) {
//       setTimeout(() => {
//         productsSectionRef.current.scrollIntoView({ 
//           behavior: 'smooth',
//           block: 'start'
//         })
//       }, 100)
//     }
//   }

//   const renderPagination = () => {
//     const pages = []
//     const maxVisiblePages = 5
    
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i)
//       }
//     } else {
//       if (currentPage <= 3) {
//         pages.push(1, 2, 3, 4, '...', totalPages)
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
//       } else {
//         pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
//       }
//     }

//     return (
//       <div className="pagination">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="pagination-btn prev"
//         >
//           <ChevronLeft size={18} />
//         </button>
        
//         <div className="page-numbers">
//           {pages.map((page, index) => (
//             page === '...' ? (
//               <span key={`dots-${index}`} className="page-dots">...</span>
//             ) : (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className={`page-btn ${currentPage === page ? 'active' : ''}`}
//               >
//                 {page}
//               </button>
//             )
//           ))}
//         </div>
        
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="pagination-btn next"
//         >
//           <ChevronRight size={18} />
//         </button>
//       </div>
//     )
//   }

//   return (
//     <>
//       <Navbar />
      
//       <div className="product-detail-page">
//         {/* Compact Hero Section */}
//         <section className="product-hero">
//           <div className="hero-content">
//             <div className="hero-nav">
//               <Link href="/products" className="back-button">
//                 <ChevronLeft size={16} />
//                 Back to Products
//               </Link>
//               <div className="hero-breadcrumb">
//                 <Link href="/">Home</Link>
//                 <ChevronRight size={12} />
//                 <Link href="/products">Products</Link>
//                 <ChevronRight size={12} />
//                 <span className="active-page">Wooden Doors</span>
//               </div>
//             </div>
            
//             <div className="hero-main">
//               <div className="hero-text">
//                 <h1 className="hero-title">
//                   <span className="hero-title-main">Wooden Doors</span>
//                   <span className="hero-title-sub">Premium Collection</span>
//                 </h1>
//                 <p className="hero-description">
//                   Handcrafted wooden doors with precision craftsmanship and timeless elegance
//                 </p>
//               </div>
              
//               <div className="hero-stats">
//                 <div className="stat-item">
//                   <div className="stat-number">200+</div>
//                   <div className="stat-label">Designs</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-number">6</div>
//                   <div className="stat-label">Categories</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-number">1000+</div>
//                   <div className="stat-label">Happy Clients</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Subcategories Section */}
//         <section className="subcategories-section">
//           <div className="container">
//             <div className="section-header">
//               <h2 className="section-title">Explore Categories</h2>
//               <p className="section-subtitle">Browse our premium wooden door collection</p>
//             </div>
            
//             <div className="subcategories-grid">
//               {subcategories.map((subcategory, index) => (
//                 <div 
//                   key={index}
//                   className={`subcategory-card ${selectedSubcategory === subcategory.name ? 'active' : ''}`}
//                   onClick={() => handleSubcategoryClick(subcategory.name)}
//                 >
//                   <div className="subcategory-image">
//                     <div className="image-placeholder">
//                       <span className="category-icon">{subcategory.icon}</span>
//                     </div>
//                     {subcategory.popular && (
//                       <div className="popular-tag">
//                         <Flame size={12} />
//                         Popular
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="subcategory-content">
//                     <h3 className="subcategory-name">{subcategory.name}</h3>
//                     <div className="subcategory-count">{subcategory.count}</div>
//                   </div>
//                 </div>
//               ))}
              
//               <div 
//                 className="subcategory-card view-all"
//                 onClick={() => handleSubcategoryClick('All')}
//               >
//                 <div className="view-all-content">
//                   <div className="view-all-icon">
//                     <Sparkles size={24} />
//                   </div>
//                   <h3 className="view-all-title">View All</h3>
//                   <p className="view-all-count">200+ Designs</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Compact Filters Section */}
//         <section className="filters-section">
//           <div className="container">
//             <div className="filters-header">
//               <div className="results-info">
//                 <h2 className="section-heading">
//                   {selectedSubcategory === 'All' ? 'All Designs' : selectedSubcategory}
//                   <span className="results-count">{filteredProducts.length} designs</span>
//                 </h2>
//                 {selectedSubcategory !== 'All' && (
//                   <button 
//                     className="clear-filter-btn"
//                     onClick={() => setSelectedSubcategory('All')}
//                   >
//                     <X size={12} />
//                     Clear filter
//                   </button>
//                 )}
//               </div>
              
//               <div className="main-controls">
//                 <div className="search-control">
//                   <div className="search-box">
//                     <Search size={18} />
//                     <input
//                       type="text"
//                       placeholder="Search designs..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="search-input"
//                     />
//                     {searchQuery && (
//                       <button 
//                         className="clear-search"
//                         onClick={() => setSearchQuery('')}
//                       >
//                         <X size={14} />
//                       </button>
//                     )}
//                   </div>
                  
//                   <div className="view-controls">
//                     <div className="view-toggle">
//                       <button 
//                         className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                         onClick={() => setViewMode('grid')}
//                         title="Grid View"
//                       >
//                         <Grid size={18} />
//                       </button>
//                       <button 
//                         className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
//                         onClick={() => setViewMode('list')}
//                         title="List View"
//                       >
//                         <List size={18} />
//                       </button>
//                     </div>
                    
//                     <div className="sort-control">
//                       <select 
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="sort-select"
//                       >
//                         <option value="most-popular">Sort by: Popular</option>
//                         <option value="newest">Newest First</option>
//                         <option value="price-low-high">Price: Low to High</option>
//                         <option value="price-high-low">Price: High to Low</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="filter-controls">
//                   <button 
//                     className={`advanced-filter-btn ${showFilters ? 'active' : ''}`}
//                     onClick={() => setShowFilters(!showFilters)}
//                   >
//                     <Filter size={16} />
//                     {showFilters ? 'Hide Filters' : 'Show Filters'}
//                   </button>
                  
//                   <div className="filter-chips">
//                     {woodenDoorsData.filters.slice(0, 4).map((filter) => (
//                       <button
//                         key={filter}
//                         className={`filter-chip ${selectedFilter === filter ? 'active' : ''}`}
//                         onClick={() => setSelectedFilter(filter)}
//                       >
//                         {filter === 'Most Popular' && <Flame size={12} />}
//                         {filter === 'New Arrivals' && <Sparkles size={12} />}
//                         {filter}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Simple Wood Type Filter Only */}
//               {showFilters && (
//                 <div className="simple-filters">
//                   <div className="filter-group">
//                     <h4 className="filter-title">Wood Type</h4>
//                     <div className="wood-chips">
//                       {woodenDoorsData.woodTypes.map((woodType) => (
//                         <button
//                           key={woodType}
//                           className={`wood-chip ${selectedWoodType === woodType ? 'active' : ''}`}
//                           onClick={() => setSelectedWoodType(woodType)}
//                         >
//                           {woodType}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Products Section with ref */}
//         <section ref={productsSectionRef} className="products-section">
//           <div className="container">
//             {currentProducts.length > 0 ? (
//               <>
//                 {viewMode === 'grid' ? (
//                   <div className="products-grid">
//                     {currentProducts.map((product) => (
//                       <div key={product.id} className="product-card">
//                         <div className="product-image">
//                           <div className="image-container">
//                             <Image
//                               src={product.image}
//                               alt={product.name}
//                               width={280}
//                               height={200}
//                               className="product-img"
//                             />
//                           </div>
//                           <div className="product-badge">
//                             {product.badge}
//                           </div>
//                           {product.isNew && (
//                             <div className="new-badge">New</div>
//                           )}
//                         </div>
                        
//                         <div className="product-content">
//                           <div className="product-header">
//                             <div className="product-code">{product.designCode}</div>
//                             <div className="product-rating">
//                               <Star size={12} fill="currentColor" />
//                               {product.rating}
//                             </div>
//                           </div>
                          
//                           <h3 className="product-name">{product.name}</h3>
                          
//                           <div className="product-details">
//                             <span className="wood-type">{product.woodType}</span>
//                             <span className="product-price">{product.price}</span>
//                           </div>
                          
//                           <div className="product-features">
//                             {product.features.slice(0, 2).map((feature, idx) => (
//                               <span key={idx} className="feature-tag">{feature}</span>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="products-list">
//                     {currentProducts.map((product) => (
//                       <div key={product.id} className="product-list-item">
//                         <div className="list-image">
//                           <Image
//                             src={product.image}
//                             alt={product.name}
//                             width={200}
//                             height={150}
//                             className="list-img"
//                           />
//                           {product.isNew && (
//                             <div className="new-badge">New</div>
//                           )}
//                         </div>
                        
//                         <div className="list-content">
//                           <div className="list-header">
//                             <div className="product-code">{product.designCode}</div>
//                             <div className="product-badge">
//                               {product.badge}
//                             </div>
//                           </div>
                          
//                           <h3 className="product-name">{product.name}</h3>
                          
//                           <div className="list-details">
//                             <div className="wood-type">{product.woodType}</div>
//                             <div className="product-rating">
//                               <Star size={12} fill="currentColor" />
//                               {product.rating}
//                             </div>
//                           </div>
                          
//                           <div className="product-features">
//                             {product.features.map((feature, idx) => (
//                               <span key={idx} className="feature-tag">{feature}</span>
//                             ))}
//                           </div>
                          
//                           <div className="list-actions">
//                             <div className="product-price">{product.price}</div>
//                             <Link 
//                               href={`/products/wooden-doors/design/${product.id}`} 
//                               className="view-details-btn"
//                             >
//                               View Details
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
                
//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <div className="pagination-container">
//                     {renderPagination()}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="no-results">
//                 <div className="no-results-icon">🚪</div>
//                 <h3>No Designs Found</h3>
//                 <p>Try changing your filters or search criteria</p>
//                 <button 
//                   className="clear-filters-btn" 
//                   onClick={() => {
//                     setSearchQuery('')
//                     setSelectedFilter('All Categories')
//                     setSelectedSubcategory('All')
//                     setSelectedWoodType('All Woods')
//                   }}
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>

//         <Footer />
//       </div>
//     </>
//   )
// }

// "use client";

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { 
//   ChevronLeft, Grid, Loader, Home, Star,
//   ZoomIn, X, ChevronRight, ChevronLeft as LeftIcon,
//   Search, Filter
// } from 'lucide-react';
// import './ProductDetail.css';

// const categories = [
//   { id: 1, name: 'Wooden Doors', folder: '1_woodenDoor', icon: '🚪', color: '#8B4513' },
//   { id: 2, name: 'Wooden Frames', folder: '2_WoodenFream', icon: '🖼️', color: '#D2691E' },
//   { id: 3, name: 'Safety Doors', folder: '3_safetyDoors', icon: '🔒', color: '#2E8B57' },
//   { id: 4, name: 'Wooden Beds', folder: '4_woodenBed', icon: '🛏️', color: '#5D4037' },
//   { id: 5, name: 'Wooden Mandir', folder: '5_woodenMandir', icon: '🛕', color: '#FFD700' },
//   { id: 6, name: 'Wooden Windows', folder: '6_woodenWindow', icon: '🪟', color: '#4682B4' },
//   { id: 7, name: 'MDF 2D/3D', folder: '7_mdf2d3d', icon: '📐', color: '#708090' },
//   { id: 8, name: 'Wooden Art', folder: '8_woodenArt', icon: '🎨', color: '#FF6B6B' },
//   { id: 9, name: 'Sofa Chair', folder: '9_sofaChair', icon: '🪑', color: '#8A2BE2' },
//   { id: 10, name: 'Marble Cutting', folder: '10_marbelCutting', icon: '🗿', color: '#C0C0C0' },
//   { id: 11, name: 'Safety Door', folder: '11_safetyDoor', icon: '🚪', color: '#36454F' },
// ];

// // Function to generate product info
// const generateProductInfo = (categoryName, index) => {
//   const prices = [12500, 18500, 22500, 28500, 32500];
//   const ratings = [4.2, 4.5, 4.7, 4.8, 5.0];
  
//   return {
//     id: index,
//     name: `${categoryName} Design ${index}`,
//     price: `₹${prices[index % 5].toLocaleString('en-IN')}`,
//     rating: ratings[index % 5],
//     reviews: Math.floor(Math.random() * 50) + 10,
//     badge: index % 4 === 0 ? 'BEST' : index % 4 === 1 ? 'NEW' : index % 4 === 2 ? 'SALE' : null
//   };
// };

// // Function to load actual images
// const loadActualImages = async (folder) => {
//   const images = [];
//   const extensions = ['.jpg', '.jpeg', '.JPG', '.JPEG'];
  
//   // Try to load up to 20 images
//   for (let i = 1; i <= 20; i++) {
//     let imageFound = false;
    
//     for (const ext of extensions) {
//       const imagePath = `/images/category/${folder}/${i}${ext}`;
      
//       // Check if image exists
//       try {
//         const img = new window.Image();
//         const exists = await new Promise((resolve) => {
//           img.onload = () => resolve(true);
//           img.onerror = () => resolve(false);
//           img.src = imagePath;
//           setTimeout(() => resolve(false), 100);
//         });
        
//         if (exists) {
//           images.push({
//             url: imagePath,
//             info: generateProductInfo(folder.replace(/^\d+_/, '').replace(/([A-Z])/g, ' $1').trim(), i)
//           });
//           imageFound = true;
//           break;
//         }
//       } catch (err) {
//         console.log(`Error loading ${imagePath}:`, err);
//       }
//     }
    
//     // If no image found after checking all extensions, break
//     if (!imageFound && i > 5) {
//       break;
//     }
//   }
  
//   // If no actual images found, use mock data for demo
//   if (images.length === 0) {
//     console.log(`No images found in ${folder}, using mock data`);
//     for (let i = 1; i <= 12; i++) {
//       images.push({
//         url: `/images/category/${folder}/demo.jpg`,
//         info: generateProductInfo(folder.replace(/^\d+_/, '').replace(/([A-Z])/g, ' $1').trim(), i)
//       });
//     }
//   }
  
//   return images;
// };

// export default function CategoriesPage() {
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('popular');

//   // Load actual images
//   useEffect(() => {
//     const loadImages = async () => {
//       setLoading(true);
//       const loadedImages = await loadActualImages(selectedCategory.folder);
//       setImages(loadedImages);
//       setLoading(false);
//     };
    
//     if (typeof window !== 'undefined') {
//       loadImages();
//     }
//   }, [selectedCategory]);

//   // Handle category click
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSelectedImage(null);
//     setCurrentImageIndex(0);
    
//     // Scroll to gallery
//     setTimeout(() => {
//       document.getElementById('gallery-section')?.scrollIntoView({ 
//         behavior: 'smooth', 
//         block: 'start' 
//       });
//     }, 100);
//   };

//   // Image modal functions
//   const openImageModal = (image, index) => {
//     setSelectedImage(image);
//     setCurrentImageIndex(index);
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   const navigateImage = (direction) => {
//     if (!selectedImage) return;
    
//     let newIndex = currentImageIndex + direction;
//     if (newIndex < 0) newIndex = images.length - 1;
//     if (newIndex >= images.length) newIndex = 0;
    
//     setCurrentImageIndex(newIndex);
//     setSelectedImage(images[newIndex]);
//   };

//   // Filter and sort images
//   const filteredImages = images.filter(image => 
//     image.info.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sortedImages = [...filteredImages].sort((a, b) => {
//     switch(sortBy) {
//       case 'price-low':
//         return parseInt(a.info.price.replace('₹', '').replace(/,/g, '')) - 
//                parseInt(b.info.price.replace('₹', '').replace(/,/g, ''));
//       case 'price-high':
//         return parseInt(b.info.price.replace('₹', '').replace(/,/g, '')) - 
//                parseInt(a.info.price.replace('₹', '').replace(/,/g, ''));
//       case 'rating':
//         return b.info.rating - a.info.rating;
//       default:
//         return b.info.reviews - a.info.reviews;
//     }
//   });

//   return (
//     <div className="compact-categories-page">
//       {/* Compact Header */}
//       <header className="compact-header">
//         <div className="header-wrapper">
//           <div className="header-top">
//             <Link href="/" className="back-btn">
//               <ChevronLeft size={18} />
//               <Home size={16} />
//               <span>Home</span>
//             </Link>
            
//             <div className="header-search">
//               <Search size={18} />
//               <input
//                 type="text"
//                 placeholder="Search designs..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//               />
//               {searchQuery && (
//                 <button className="clear-search" onClick={() => setSearchQuery('')}>
//                   <X size={14} />
//                 </button>
//               )}
//             </div>
//           </div>
          
//           <div className="header-main">
//             <h1 className="page-title">Product Gallery</h1>
//             <p className="page-subtitle">Explore 11 premium categories of wooden products</p>
//           </div>
//         </div>
//       </header>

//       {/* Compact Categories Navigation - Single Row */}
//       <section className="compact-categories-nav">
//         <div className="nav-container">
//           <div className="nav-scroll">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 className={`category-btn ${selectedCategory.id === category.id ? 'active' : ''}`}
//                 onClick={() => handleCategoryClick(category)}
//                 style={{ '--category-color': category.color }}
//                 title={category.name}
//               >
//                 <div className="btn-icon">
//                   <span className="icon">{category.icon}</span>
//                 </div>
//                 <span className="btn-name">{category.name}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Selected Category Info */}
//       <div className="selected-category-info">
//         <div className="info-container">
//           <div className="info-left">
//             <h2 className="category-title">
//               <span className="category-emoji">{selectedCategory.icon}</span>
//               {selectedCategory.name}
//               <span className="image-count">{images.length} designs</span>
//             </h2>
//           </div>
          
//           <div className="info-right">
//             <div className="sort-control">
//               <Filter size={14} />
//               <select 
//                 value={sortBy} 
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="sort-select"
//               >
//                 <option value="popular">Most Popular</option>
//                 <option value="rating">Highest Rated</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Gallery */}
//       <section id="gallery-section" className="compact-gallery">
//         <div className="gallery-container">
//           {loading ? (
//             <div className="loading-indicator">
//               <Loader className="spinner" size={32} />
//               <p>Loading {selectedCategory.name} designs...</p>
//             </div>
//           ) : sortedImages.length > 0 ? (
//             <div className="image-grid">
//               {sortedImages.map((image, index) => (
//                 <div key={index} className="image-card">
//                   <div className="card-image" onClick={() => openImageModal(image, index)}>
//                     <div className="image-wrapper">
//                       {/* Actual Image Loader */}
//                       <Image
//                         src={image.url}
//                         alt={image.info.name}
//                         width={280}
//                         height={200}
//                         className="product-image"
//                         loading={index < 4 ? 'eager' : 'lazy'}
//                         onError={(e) => {
//                           // Fallback for missing images
//                           e.target.style.display = 'none';
//                           e.target.parentElement.innerHTML = `
//                             <div class="image-fallback">
//                               <span class="fallback-icon">${selectedCategory.icon}</span>
//                               <span class="fallback-text">Design ${index + 1}</span>
//                             </div>
//                           `;
//                         }}
//                       />
//                       <button className="quick-view">
//                         <ZoomIn size={18} />
//                       </button>
//                     </div>
                    
//                     {image.info.badge && (
//                       <div className={`price-badge ${image.info.badge.toLowerCase()}`}>
//                         {image.info.badge}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="card-info">
//                     <h3 className="product-title" title={image.info.name}>
//                       {image.info.name.length > 25 
//                         ? `${image.info.name.substring(0, 25)}...` 
//                         : image.info.name}
//                     </h3>
                    
//                     <div className="product-meta">
//                       <div className="price">₹{parseInt(image.info.price.replace('₹', '').replace(/,/g, '')).toLocaleString('en-IN')}</div>
                      
//                       <div className="rating">
//                         <Star size={12} fill="currentColor" />
//                         <span className="rating-value">{image.info.rating}</span>
//                         <span className="review-count">({image.info.reviews})</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="empty-state">
//               <div className="empty-icon">🔍</div>
//               <h3>No designs found</h3>
//               <p>Try changing your search or select another category</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div className="image-modal-overlay" onClick={closeImageModal}>
//           <div className="compact-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-header">
//               <div className="modal-title">
//                 <span className="modal-category">{selectedCategory.icon} {selectedCategory.name}</span>
//                 <span className="modal-design">Design {currentImageIndex + 1}</span>
//               </div>
//               <button className="modal-close" onClick={closeImageModal}>
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="modal-content">
//               <div className="modal-image-wrapper">
//                 <button className="modal-nav prev" onClick={() => navigateImage(-1)}>
//                   <ChevronLeft size={24} />
//                 </button>
                
//                 <div className="main-image-container">
//                   <Image
//                     src={selectedImage.url}
//                     alt={selectedImage.info.name}
//                     width={600}
//                     height={400}
//                     className="modal-main-image"
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                       e.target.parentElement.innerHTML = `
//                         <div class="modal-image-fallback">
//                           <span class="fallback-icon-large">${selectedCategory.icon}</span>
//                           <span class="fallback-text-large">${selectedImage.info.name}</span>
//                         </div>
//                       `;
//                     }}
//                   />
//                 </div>
                
//                 <button className="modal-nav next" onClick={() => navigateImage(1)}>
//                   <ChevronRight size={24} />
//                 </button>
//               </div>
              
//               <div className="modal-info">
//                 <div className="info-header">
//                   <h3 className="product-title-modal">{selectedImage.info.name}</h3>
//                   <div className="product-price-modal">{selectedImage.info.price}</div>
//                 </div>
                
//                 <div className="info-rating">
//                   <div className="rating-stars">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star 
//                         key={star} 
//                         size={16} 
//                         fill={star <= Math.floor(selectedImage.info.rating) ? "#FFD700" : "#E5E7EB"} 
//                       />
//                     ))}
//                   </div>
//                   <span className="rating-text">
//                     {selectedImage.info.rating} ({selectedImage.info.reviews} reviews)
//                   </span>
//                 </div>
                
//                 <div className="modal-actions">
//                   <button className="action-btn primary">Add to Cart</button>
//                   <button className="action-btn secondary">Enquire Now</button>
//                 </div>
//               </div>
//             </div>
            
//             <div className="modal-footer">
//               <div className="image-counter">
//                 {currentImageIndex + 1} / {images.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="compact-footer">
//         <div className="footer-container">
//           <div className="footer-content">
//             <div className="footer-stats">
//               <div className="stat">
//                 <div className="stat-number">{categories.length}</div>
//                 <div className="stat-label">Categories</div>
//               </div>
//               <div className="stat">
//                 <div className="stat-number">{images.length}</div>
//                 <div className="stat-label">Current Designs</div>
//               </div>
//               <div className="stat">
//                 <div className="stat-number">4.8</div>
//                 <div className="stat-label">Avg Rating</div>
//               </div>
//             </div>
            
//             <p className="footer-note">
//               All images are loaded from your actual folders. 
//               Ensure images are named sequentially (1.jpg, 2.jpg, etc.)
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { 
//   ChevronLeft, Home, Star, ZoomIn, X, 
//   ChevronRight, ChevronLeft as LeftIcon,
//   Search, Filter, Grid
// } from 'lucide-react';
// import './ProductDetail.css';
// import Navbar from '@/components/Navbar';

// const categories = [
//   { id: 1, name: 'Wooden Doors', folder: '1_woodenDoor', icon: '🚪', color: '#8B4513' },
//   { id: 2, name: 'Wooden Frames', folder: '2_WoodenFream', icon: '🖼️', color: '#D2691E' },
//   { id: 3, name: 'Safety Doors', folder: '3_safetyDoors', icon: '🔒', color: '#2E8B57' },
//   { id: 4, name: 'Wooden Beds', folder: '4_woodenBed', icon: '🛏️', color: '#5D4037' },
//   { id: 5, name: 'Wooden Mandir', folder: '5_woodenMandir', icon: '🛕', color: '#FFD700' },
//   { id: 6, name: 'Wooden Windows', folder: '6_woodenWindow', icon: '🪟', color: '#4682B4' },
//   { id: 7, name: 'MDF 2D/3D', folder: '7_mdf2d3d', icon: '📐', color: '#708090' },
//   { id: 8, name: 'Wooden Art', folder: '8_woodenArt', icon: '🎨', color: '#FF6B6B' },
//   { id: 9, name: 'Sofa Chair', folder: '9_sofaChair', icon: '🪑', color: '#8A2BE2' },
//   { id: 10, name: 'Marble Cutting', folder: '10_marbelCutting', icon: '🗿', color: '#C0C0C0' },
//   { id: 11, name: 'Safety Door', folder: '11_safetyDoor', icon: '🚪', color: '#36454F' },
// ];

// // Function to generate product info
// const generateProductInfo = (categoryName, index) => {
//   const prices = [12500, 18500, 22500, 28500, 32500];
//   const ratings = [4.2, 4.5, 4.7, 4.8, 5.0];
  
//   return {
//     id: index,
//     name: `${categoryName} Design ${index}`,
//     price: `₹${prices[index % 5].toLocaleString('en-IN')}`,
//     rating: ratings[index % 5],
//     reviews: Math.floor(Math.random() * 50) + 10,
//     badge: index % 4 === 0 ? 'BEST' : index % 4 === 1 ? 'NEW' : index % 4 === 2 ? 'SALE' : null
//   };
// };

// // Function to load actual images
// const loadActualImages = async (folder) => {
//   const images = [];
//   const extensions = ['.jpg', '.jpeg', '.JPG', '.JPEG'];
  
//   // Try to load up to 20 images
//   for (let i = 1; i <= 20; i++) {
//     let imageFound = false;
    
//     for (const ext of extensions) {
//       const imagePath = `/images/category/${folder}/${i}${ext}`;
      
//       // Check if image exists
//       try {
//         const img = new window.Image();
//         const exists = await new Promise((resolve) => {
//           img.onload = () => resolve(true);
//           img.onerror = () => resolve(false);
//           img.src = imagePath;
//           setTimeout(() => resolve(false), 100);
//         });
        
//         if (exists) {
//           images.push({
//             url: imagePath,
//             info: generateProductInfo(folder.replace(/^\d+_/, '').replace(/([A-Z])/g, ' $1').trim(), i)
//           });
//           imageFound = true;
//           break;
//         }
//       } catch (err) {
//         console.log(`Error loading ${imagePath}:`, err);
//       }
//     }
    
//     // If no image found after checking all extensions, break
//     if (!imageFound && i > 5) {
//       break;
//     }
//   }
  
//   // If no actual images found, use mock data for demo
//   if (images.length === 0) {
//     console.log(`No images found in ${folder}, using mock data`);
//     for (let i = 1; i <= 12; i++) {
//       images.push({
//         url: `/images/category/${folder}/demo.jpg`,
//         info: generateProductInfo(folder.replace(/^\d+_/, '').replace(/([A-Z])/g, ' $1').trim(), i)
//       });
//     }
//   }
  
//   return images;
// };

// export default function CategoriesPage() {
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('popular');

//   // Load actual images
//   useEffect(() => {
//     const loadImages = async () => {
//       setLoading(true);
//       const loadedImages = await loadActualImages(selectedCategory.folder);
//       setImages(loadedImages);
//       setLoading(false);
//     };
    
//     if (typeof window !== 'undefined') {
//       loadImages();
//     }
//   }, [selectedCategory]);

//   // Handle category click
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSelectedImage(null);
//     setCurrentImageIndex(0);
    
//     // Scroll to gallery
//     setTimeout(() => {
//       document.getElementById('gallery-section')?.scrollIntoView({ 
//         behavior: 'smooth', 
//         block: 'start' 
//       });
//     }, 100);
//   };

//   // Image modal functions
//   const openImageModal = (image, index) => {
//     setSelectedImage(image);
//     setCurrentImageIndex(index);
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   const navigateImage = (direction) => {
//     if (!selectedImage) return;
    
//     let newIndex = currentImageIndex + direction;
//     if (newIndex < 0) newIndex = images.length - 1;
//     if (newIndex >= images.length) newIndex = 0;
    
//     setCurrentImageIndex(newIndex);
//     setSelectedImage(images[newIndex]);
//   };

//   // Filter and sort images
//   const filteredImages = images.filter(image => 
//     image.info.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sortedImages = [...filteredImages].sort((a, b) => {
//     switch(sortBy) {
//       case 'price-low':
//         return parseInt(a.info.price.replace('₹', '').replace(/,/g, '')) - 
//                parseInt(b.info.price.replace('₹', '').replace(/,/g, ''));
//       case 'price-high':
//         return parseInt(b.info.price.replace('₹', '').replace(/,/g, '')) - 
//                parseInt(a.info.price.replace('₹', '').replace(/,/g, ''));
//       case 'rating':
//         return b.info.rating - a.info.rating;
//       default:
//         return b.info.reviews - a.info.reviews;
//     }
//   });

//   return (
//     <>
//     <Navbar />
//     <div className="square-categories-page">
//       {/* Header */}
//       <header className="square-header">
//         <div className="header-wrapper">
//           <div className="header-top">
//             <Link href="/" className="back-btn">
//               <ChevronLeft size={18} />
//               <Home size={16} />
//               <span>Home</span>
//             </Link>
            
//             <div className="header-search">
//               <Search size={18} />
//               <input
//                 type="text"
//                 placeholder="Search designs..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//               />
//               {searchQuery && (
//                 <button className="clear-search" onClick={() => setSearchQuery('')}>
//                   <X size={14} />
//                 </button>
//               )}
//             </div>
//           </div>
          
//           <div className="header-main">
//             <h1 className="page-title">Product Gallery</h1>
//             <p className="page-subtitle">Select a category to explore designs</p>
//           </div>
//         </div>
//       </header>

//       {/* Square Categories in Single Row */}
//       <section className="square-categories-section">
//         <div className="section-wrapper">
//           <div className="section-header">
//             <h2 className="section-title">
//               <Grid size={20} />
//               All Categories
//               <span className="category-count">{categories.length} Categories</span>
//             </h2>
//           </div>
          
//           <div className="categories-row">
//             {categories.map((category) => (
//               <div
//                 key={category.id}
//                 className={`square-category ${selectedCategory.id === category.id ? 'active' : ''}`}
//                 onClick={() => handleCategoryClick(category)}
//                 style={{ '--category-color': category.color }}
//               >
//                 <div className="square-inner">
//                   <div className="category-icon-box">
//                     <span className="category-icon">{category.icon}</span>
//                   </div>
                  
//                   <div className="category-content">
//                     <h3 className="category-name">{category.name}</h3>
//                     <div className="category-stats">
//                       <span className="stat-item">15+ Designs</span>
//                     </div>
//                   </div>
                  
//                   {selectedCategory.id === category.id && (
//                     <div className="active-indicator">
//                       <div className="indicator-dot"></div>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="hover-effect">
//                   <div className="hover-bg"></div>
//                   <div className="hover-content">
//                     <span className="hover-text">View Designs</span>
//                     <span className="hover-arrow">→</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Selected Category Info */}
//       <div className="selected-category-bar">
//         <div className="bar-wrapper">
//           <div className="bar-left">
//             <div className="selected-category-display">
//               <div className="selected-icon" style={{ backgroundColor: `${selectedCategory.color}20` }}>
//                 <span>{selectedCategory.icon}</span>
//               </div>
//               <div className="selected-info">
//                 <h3 className="selected-title">{selectedCategory.name}</h3>
//                 <p className="selected-subtitle">{images.length} designs available</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bar-right">
//             <div className="sort-control">
//               <Filter size={14} />
//               <select 
//                 value={sortBy} 
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="sort-select"
//               >
//                 <option value="popular">Most Popular</option>
//                 <option value="rating">Highest Rated</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Gallery */}
//       <section id="gallery-section" className="square-gallery">
//         <div className="gallery-wrapper">
//           {loading ? (
//             <div className="loading-state">
//               <div className="spinner-container">
//                 <div className="spinner"></div>
//               </div>
//               <p>Loading {selectedCategory.name} designs...</p>
//             </div>
//           ) : sortedImages.length > 0 ? (
//             <div className="products-grid">
//               {sortedImages.map((image, index) => (
//                 <div key={index} className="product-square">
//                   <div className="square-image" onClick={() => openImageModal(image, index)}>
//                     <div className="image-container">
//                       <Image
//                         src={image.url}
//                         alt={image.info.name}
//                         width={280}
//                         height={200}
//                         className="product-img"
//                         loading={index < 4 ? 'eager' : 'lazy'}
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                           e.target.parentElement.innerHTML = `
//                             <div class="img-fallback">
//                               <span class="fallback-icon">${selectedCategory.icon}</span>
//                               <span class="fallback-title">Design ${index + 1}</span>
//                             </div>
//                           `;
//                         }}
//                       />
//                       <button className="view-btn">
//                         <ZoomIn size={18} />
//                       </button>
//                     </div>
                    
//                     {image.info.badge && (
//                       <div className={`product-tag ${image.info.badge.toLowerCase()}`}>
//                         {image.info.badge}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="square-info">
//                     <h4 className="product-name" title={image.info.name}>
//                       {image.info.name}
//                     </h4>
                    
//                     <div className="product-footer">
//                       <div className="product-price">₹{parseInt(image.info.price.replace('₹', '').replace(/,/g, '')).toLocaleString('en-IN')}</div>
                      
//                       <div className="product-rating">
//                         <Star size={12} fill="#FFD700" />
//                         <span className="rating-value">{image.info.rating}</span>
//                         <span className="rating-count">({image.info.reviews})</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="empty-gallery">
//               <div className="empty-icon">🎨</div>
//               <h3>No designs found</h3>
//               <p>Try changing your search or select another category</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div className="image-modal-overlay" onClick={closeImageModal}>
//           <div className="square-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-top">
//               <div className="modal-header">
//                 <h3 className="modal-title">{selectedImage.info.name}</h3>
//                 <div className="modal-rating">
//                   <Star size={16} fill="#FFD700" />
//                   <span>{selectedImage.info.rating}</span>
//                   <span className="reviews">({selectedImage.info.reviews} reviews)</span>
//                 </div>
//               </div>
//               <button className="close-btn" onClick={closeImageModal}>
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="modal-body">
//               <div className="modal-image-area">
//                 <button className="nav-btn prev" onClick={() => navigateImage(-1)}>
//                   <ChevronLeft size={24} />
//                 </button>
                
//                 <div className="large-image">
//                   <Image
//                     src={selectedImage.url}
//                     alt={selectedImage.info.name}
//                     width={600}
//                     height={400}
//                     className="modal-img"
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                       e.target.parentElement.innerHTML = `
//                         <div class="modal-fallback">
//                           <span class="modal-fallback-icon">${selectedCategory.icon}</span>
//                           <span class="modal-fallback-text">${selectedImage.info.name}</span>
//                         </div>
//                       `;
//                     }}
//                   />
//                 </div>
                
//                 <button className="nav-btn next" onClick={() => navigateImage(1)}>
//                   <ChevronRight size={24} />
//                 </button>
//               </div>
              
//               <div className="modal-sidebar">
//                 <div className="sidebar-section">
//                   <h4 className="sidebar-title">Product Details</h4>
//                   <div className="details-grid">
//                     <div className="detail-item">
//                       <span className="detail-label">Price</span>
//                       <span className="detail-value">{selectedImage.info.price}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Category</span>
//                       <span className="detail-value">{selectedCategory.name}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Design No</span>
//                       <span className="detail-value">{currentImageIndex + 1}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="sidebar-actions">
//                   <button className="action-btn primary">Add to Cart</button>
//                   <button className="action-btn secondary">Enquire Now</button>
//                 </div>
//               </div>
//             </div>
            
//             <div className="modal-footer">
//               <div className="image-nav">
//                 <span className="nav-text">
//                   Image {currentImageIndex + 1} of {images.length}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="square-footer">
//         <div className="footer-wrapper">
//           <div className="footer-content">
//             <div className="footer-stats">
//               <div className="stat-box">
//                 <div className="stat-number">{categories.length}</div>
//                 <div className="stat-label">Categories</div>
//               </div>
//               <div className="stat-box">
//                 <div className="stat-number">200+</div>
//                 <div className="stat-label">Total Designs</div>
//               </div>
//               <div className="stat-box">
//                 <div className="stat-number">4.8</div>
//                 <div className="stat-label">Avg Rating</div>
//               </div>
//             </div>
            
//             <p className="footer-text">
//               Browse our complete collection of premium wooden products
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//     </>
//   );
// }






// "use client";

// import { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { 
//   ChevronLeft, Home, Star, ZoomIn, X, 
//   ChevronRight, ChevronLeft as LeftIcon,
//   Search, Filter, Grid,
//   ChevronFirst, ChevronLast
// } from 'lucide-react';
// import './ProductDetail.css';
// import Navbar from '@/components/Navbar';

// const categories = [
//   { id: 1, name: 'Wooden Doors', folder: '1_woodenDoor', icon: '🚪', color: '#8B4513' },
//   { id: 2, name: 'Wooden Frames', folder: '2_WoodenFream', icon: '🖼️', color: '#D2691E' },
//   { id: 3, name: 'Safety Doors', folder: '3_safetyDoors', icon: '🔒', color: '#2E8B57' },
//   { id: 4, name: 'Wooden Beds', folder: '4_woodenBed', icon: '🛏️', color: '#5D4037' },
//   { id: 5, name: 'Wooden Mandir', folder: '5_woodenMandir', icon: '🛕', color: '#FFD700' },
//   { id: 6, name: 'Wooden Windows', folder: '6_woodenWindow', icon: '🪟', color: '#4682B4' },
//   { id: 7, name: 'MDF 2D/3D', folder: '7_mdf2d3d', icon: '📐', color: '#708090' },
//   { id: 8, name: 'Wooden Art', folder: '8_woodenArt', icon: '🎨', color: '#FF6B6B' },
//   { id: 9, name: 'Sofa Chair', folder: '9_sofaChair', icon: '🪑', color: '#8A2BE2' },
//   { id: 10, name: 'Marble Cutting', folder: '10_marbelCutting', icon: '🗿', color: '#C0C0C0' },
//   { id: 11, name: 'Safety Door', folder: '11_safetyDoor', icon: '🚪', color: '#36454F' },
// ];

// // Function to generate product info
// const generateProductInfo = (categoryName, index) => {
//   const prices = [12500, 18500, 22500, 28500, 32500];
//   const ratings = [4.2, 4.5, 4.7, 4.8, 5.0];
  
//   return {
//     id: index,
//     name: `${categoryName} Design ${index}`,
//     price: `₹${prices[index % 5].toLocaleString('en-IN')}`,
//     rating: ratings[index % 5],
//     reviews: Math.floor(Math.random() * 50) + 10,
//     badge: index % 4 === 0 ? 'BEST' : index % 4 === 1 ? 'NEW' : index % 4 === 2 ? 'SALE' : null
//   };
// };

// // Function to check if image exists using fetch
// const checkImageExists = async (url) => {
//   try {
//     const response = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
//     return response.ok;
//   } catch {
//     return false;
//   }
// };

// // Function to load all images from folder
// const loadAllImages = async (folder) => {
//   const images = [];
//   const extensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG', '.webp', '.WEBP'];
  
//   console.log(`Loading images from ${folder}...`);
  
//   // Check for images 1 to 80
//   const imageNumbers = Array.from({ length: 80 }, (_, i) => i + 1);
  
//   // Process in batches for better performance
//   const batchSize = 10;
//   for (let i = 0; i < imageNumbers.length; i += batchSize) {
//     const batch = imageNumbers.slice(i, i + batchSize);
    
//     const batchPromises = batch.map(async (imageNumber) => {
//       for (const ext of extensions) {
//         const imagePath = `/images/category/${folder}/${imageNumber}${ext}`;
//         const exists = await checkImageExists(imagePath);
        
//         if (exists) {
//           return {
//             url: imagePath,
//             info: generateProductInfo(folder.replace(/^\d+_/, '').replace(/([A-Z])/g, ' $1').trim(), imageNumber)
//           };
//         }
//       }
//       return null;
//     });
    
//     const batchResults = await Promise.all(batchPromises);
//     batchResults.forEach(result => {
//       if (result) {
//         images.push(result);
//       }
//     });
    
//     // Optional: Update loading progress if you want
//     if (i % 20 === 0) {
//       console.log(`Checked ${Math.min(i + batchSize, 80)} images...`);
//     }
//   }
  
//   // Sort by image number
//   images.sort((a, b) => {
//     const numA = parseInt(a.url.match(/(\d+)/g)[0]);
//     const numB = parseInt(b.url.match(/(\d+)/g)[0]);
//     return numA - numB;
//   });
  
//   console.log(`✅ Loaded ${images.length} images from ${folder}`);
  
//   // If no images found, use demo images
//   if (images.length === 0) {
//     console.log(`⚠️ No images found in ${folder}, using demo data`);
//     for (let i = 1; i <= 12; i++) {
//       images.push({
//         url: `/images/category/${folder}/demo.jpg`,
//         info: generateProductInfo(folder.replace(/^\d+_/, '').replace(/([A-Z])/g, ' $1').trim(), i)
//       });
//     }
//   }
  
//   return images;
// };

// export default function CategoriesPage() {
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('popular');
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(20); // 20 images per page
  
//   // Load actual images
//   useEffect(() => {
//     const loadImages = async () => {
//       setLoading(true);
//       setCurrentPage(1); // Reset to first page when category changes
      
//       try {
//         const loadedImages = await loadAllImages(selectedCategory.folder);
//         setImages(loadedImages);
//       } catch (error) {
//         console.error('Error loading images:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (typeof window !== 'undefined') {
//       loadImages();
//     }
//   }, [selectedCategory]);

//   // Handle category click
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSelectedImage(null);
//     setCurrentImageIndex(0);
//     setCurrentPage(1);
    
//     // Scroll to gallery
//     setTimeout(() => {
//       document.getElementById('gallery-section')?.scrollIntoView({ 
//         behavior: 'smooth', 
//         block: 'start' 
//       });
//     }, 100);
//   };

//   // Image modal functions
//   const openImageModal = (image, index) => {
//     // Calculate actual index in all images
//     const actualIndex = (currentPage - 1) * itemsPerPage + index;
//     setSelectedImage(image);
//     setCurrentImageIndex(actualIndex);
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   const navigateImage = (direction) => {
//     if (!selectedImage) return;
    
//     let newIndex = currentImageIndex + direction;
//     if (newIndex < 0) newIndex = images.length - 1;
//     if (newIndex >= images.length) newIndex = 0;
    
//     setCurrentImageIndex(newIndex);
//     setSelectedImage(images[newIndex]);
//   };

//   // Filter and sort images
//   const filteredImages = images.filter(image => 
//     image.info.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sortedImages = [...filteredImages].sort((a, b) => {
//     switch(sortBy) {
//       case 'price-low':
//         return parseInt(a.info.price.replace('₹', '').replace(/,/g, '')) - 
//                parseInt(b.info.price.replace('₹', '').replace(/,/g, ''));
//       case 'price-high':
//         return parseInt(b.info.price.replace('₹', '').replace(/,/g, '')) - 
//                parseInt(a.info.price.replace('₹', '').replace(/,/g, ''));
//       case 'rating':
//         return b.info.rating - a.info.rating;
//       default:
//         return b.info.reviews - a.info.reviews;
//     }
//   });

//   // Pagination calculations
//   const totalPages = Math.ceil(sortedImages.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentImages = sortedImages.slice(startIndex, endIndex);

//   // Pagination handlers
//   const goToPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     // Scroll to top of gallery
//     document.getElementById('gallery-section')?.scrollIntoView({ 
//       behavior: 'smooth', 
//       block: 'start' 
//     });
//   };

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       goToPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       goToPage(currentPage - 1);
//     }
//   };

//   // Generate page numbers
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       // Show all pages
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Show first 2 pages, current page, and last 2 pages
//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);
      
//       pages.push(1);
      
//       if (start > 2) {
//         pages.push('...');
//       }
      
//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }
      
//       if (end < totalPages - 1) {
//         pages.push('...');
//       }
      
//       pages.push(totalPages);
//     }
    
//     return pages;
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="square-categories-page">
//       {/* Header */}
//       <header className="square-header">
//         <div className="header-wrapper">
//           <div className="header-top">
//             <Link href="/" className="back-btn">
//               <ChevronLeft size={18} />
//               <Home size={16} />
//               <span>Home</span>
//             </Link>
            
//             <div className="header-search">
//               <Search size={18} />
//               <input
//                 type="text"
//                 placeholder="Search designs..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//               />
//               {searchQuery && (
//                 <button className="clear-search" onClick={() => setSearchQuery('')}>
//                   <X size={14} />
//                 </button>
//               )}
//             </div>
//           </div>
          
//           <div className="header-main">
//             <h1 className="page-title">Product Gallery</h1>
//             <p className="page-subtitle">Select a category to explore designs</p>
//           </div>
//         </div>
//       </header>

//       {/* Square Categories in Single Row */}
//       <section className="square-categories-section">
//         <div className="section-wrapper">
//           <div className="section-header">
//             <h2 className="section-title">
//               <Grid size={20} />
//               All Categories
//               <span className="category-count">{categories.length} Categories</span>
//             </h2>
//           </div>
          
//           <div className="categories-row">
//             {categories.map((category) => (
//               <div
//                 key={category.id}
//                 className={`square-category ${selectedCategory.id === category.id ? 'active' : ''}`}
//                 onClick={() => handleCategoryClick(category)}
//                 style={{ '--category-color': category.color }}
//               >
//                 <div className="square-inner">
//                   <div className="category-icon-box">
//                     <span className="category-icon">{category.icon}</span>
//                   </div>
                  
//                   <div className="category-content">
//                     <h3 className="category-name">{category.name}</h3>
//                     <div className="category-stats">
//                       <span className="stat-item">80+ Designs</span>
//                     </div>
//                   </div>
                  
//                   {selectedCategory.id === category.id && (
//                     <div className="active-indicator">
//                       <div className="indicator-dot"></div>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="hover-effect">
//                   <div className="hover-bg"></div>
//                   <div className="hover-content">
//                     <span className="hover-text">View Designs</span>
//                     <span className="hover-arrow">→</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Selected Category Info */}
//       <div className="selected-category-bar">
//         <div className="bar-wrapper">
//           <div className="bar-left">
//             <div className="selected-category-display">
//               <div className="selected-icon" style={{ backgroundColor: `${selectedCategory.color}20` }}>
//                 <span>{selectedCategory.icon}</span>
//               </div>
//               <div className="selected-info">
//                 <h3 className="selected-title">{selectedCategory.name}</h3>
//                 <p className="selected-subtitle">{images.length} designs available • Page {currentPage} of {totalPages}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bar-right">
//             <div className="sort-control">
//               <Filter size={14} />
//               <select 
//                 value={sortBy} 
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="sort-select"
//               >
//                 <option value="popular">Most Popular</option>
//                 <option value="rating">Highest Rated</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//               </select>
//             </div>
            
//             {/* Items per page selector */}
//             <div className="items-per-page-control">
//               <select 
//                 value={itemsPerPage} 
//                 onChange={(e) => {
//                   setItemsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="items-select"
//               >
//                 <option value="12">12 per page</option>
//                 <option value="20">20 per page</option>
//                 <option value="40">40 per page</option>
//                 <option value="80">All designs</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Gallery */}
//       <section id="gallery-section" className="square-gallery">
//         <div className="gallery-wrapper">
//           {loading ? (
//             <div className="loading-state">
//               <div className="spinner-container">
//                 <div className="spinner"></div>
//               </div>
//               <p>Loading {selectedCategory.name} designs... ({images.length} found)</p>
//             </div>
//           ) : currentImages.length > 0 ? (
//             <>
//               <div className="products-grid">
//                 {currentImages.map((image, index) => (
//                   <div key={startIndex + index} className="product-square">
//                     <div className="square-image" onClick={() => openImageModal(image, index)}>
//                       <div className="image-container">
//                         <Image
//                           src={image.url}
//                           alt={image.info.name}
//                           width={280}
//                           height={200}
//                           className="product-img"
//                           loading={index < 4 ? 'eager' : 'lazy'}
//                           onError={(e) => {
//                             e.target.style.display = 'none';
//                             e.target.parentElement.innerHTML = `
//                               <div class="img-fallback">
//                                 <span class="fallback-icon">${selectedCategory.icon}</span>
//                                 <span class="fallback-title">Design ${startIndex + index + 1}</span>
//                               </div>
//                             `;
//                           }}
//                         />
//                         <button className="view-btn">
//                           <ZoomIn size={18} />
//                         </button>
//                       </div>
                      
//                       {image.info.badge && (
//                         <div className={`product-tag ${image.info.badge.toLowerCase()}`}>
//                           {image.info.badge}
//                         </div>
//                       )}
//                     </div>
                    
//                     <div className="square-info">
//                       <h4 className="product-name" title={image.info.name}>
//                         {image.info.name}
//                       </h4>
                      
//                       <div className="product-footer">
//                         <div className="product-price">₹{parseInt(image.info.price.replace('₹', '').replace(/,/g, '')).toLocaleString('en-IN')}</div>
                        
//                         <div className="product-rating">
//                           <Star size={12} fill="#FFD700" />
//                           <span className="rating-value">{image.info.rating}</span>
//                           <span className="rating-count">({image.info.reviews})</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div className="pagination-controls">
//                   <div className="pagination-info">
//                     Showing {startIndex + 1} to {Math.min(endIndex, sortedImages.length)} of {sortedImages.length} designs
//                   </div>
                  
//                   <div className="pagination-buttons">
//                     <button 
//                       className="pagination-btn first" 
//                       onClick={() => goToPage(1)}
//                       disabled={currentPage === 1}
//                     >
//                       <ChevronFirst size={16} />
//                     </button>
                    
//                     <button 
//                       className="pagination-btn prev" 
//                       onClick={prevPage}
//                       disabled={currentPage === 1}
//                     >
//                       <ChevronLeft size={16} />
//                       <span>Previous</span>
//                     </button>
                    
//                     <div className="page-numbers">
//                       {getPageNumbers().map((page, index) => (
//                         page === '...' ? (
//                           <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
//                         ) : (
//                           <button
//                             key={page}
//                             className={`page-number ${currentPage === page ? 'active' : ''}`}
//                             onClick={() => goToPage(page)}
//                           >
//                             {page}
//                           </button>
//                         )
//                       ))}
//                     </div>
                    
//                     <button 
//                       className="pagination-btn next" 
//                       onClick={nextPage}
//                       disabled={currentPage === totalPages}
//                     >
//                       <span>Next</span>
//                       <ChevronRight size={16} />
//                     </button>
                    
//                     <button 
//                       className="pagination-btn last" 
//                       onClick={() => goToPage(totalPages)}
//                       disabled={currentPage === totalPages}
//                     >
//                       <ChevronLast size={16} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="empty-gallery">
//               <div className="empty-icon">🎨</div>
//               <h3>No designs found</h3>
//               <p>Try changing your search or select another category</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div className="image-modal-overlay" onClick={closeImageModal}>
//           <div className="square-modal" onClick={e => e.stopPropagation()}>
//             <div className="modal-top">
//               <div className="modal-header">
//                 <h3 className="modal-title">{selectedImage.info.name}</h3>
//                 <div className="modal-rating">
//                   <Star size={16} fill="#FFD700" />
//                   <span>{selectedImage.info.rating}</span>
//                   <span className="reviews">({selectedImage.info.reviews} reviews)</span>
//                 </div>
//               </div>
//               <button className="close-btn" onClick={closeImageModal}>
//                 <X size={24} />
//               </button>
//             </div>
            
//             <div className="modal-body">
//               <div className="modal-image-area">
//                 <button className="nav-btn prev" onClick={() => navigateImage(-1)}>
//                   <ChevronLeft size={24} />
//                 </button>
                
//                 <div className="large-image">
//                   <Image
//                     src={selectedImage.url}
//                     alt={selectedImage.info.name}
//                     width={600}
//                     height={400}
//                     className="modal-img"
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                       e.target.parentElement.innerHTML = `
//                         <div class="modal-fallback">
//                           <span class="modal-fallback-icon">${selectedCategory.icon}</span>
//                           <span class="modal-fallback-text">${selectedImage.info.name}</span>
//                         </div>
//                       `;
//                     }}
//                   />
//                 </div>
                
//                 <button className="nav-btn next" onClick={() => navigateImage(1)}>
//                   <ChevronRight size={24} />
//                 </button>
//               </div>
              
//               <div className="modal-sidebar">
//                 <div className="sidebar-section">
//                   <h4 className="sidebar-title">Product Details</h4>
//                   <div className="details-grid">
//                     <div className="detail-item">
//                       <span className="detail-label">Price</span>
//                       <span className="detail-value">{selectedImage.info.price}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Category</span>
//                       <span className="detail-value">{selectedCategory.name}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span className="detail-label">Design No</span>
//                       <span className="detail-value">{currentImageIndex + 1} of {images.length}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="sidebar-actions">
//                   <button className="action-btn primary">Add to Cart</button>
//                   <button className="action-btn secondary">Enquire Now</button>
//                 </div>
//               </div>
//             </div>
            
//             <div className="modal-footer">
//               <div className="image-nav">
//                 <span className="nav-text">
//                   Image {currentImageIndex + 1} of {images.length}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="square-footer">
//         <div className="footer-wrapper">
//           <div className="footer-content">
//             <div className="footer-stats">
//               <div className="stat-box">
//                 <div className="stat-number">{categories.length}</div>
//                 <div className="stat-label">Categories</div>
//               </div>
//               <div className="stat-box">
//                 <div className="stat-number">{images.length}</div>
//                 <div className="stat-label">Current Designs</div>
//               </div>
//               <div className="stat-box">
//                 <div className="stat-number">{currentPage}/{totalPages}</div>
//                 <div className="stat-label">Current Page</div>
//               </div>
//             </div>
            
//             <p className="footer-text">
//               Browse our complete collection of premium wooden products
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, Home, Star, ZoomIn, X, 
  ChevronRight, Search, Filter, Grid,
  ChevronFirst, ChevronLast
} from 'lucide-react';
import './ProductDetail.css';
import Navbar from '@/components/Navbar';

const categories = [
  { id: 1, name: 'Wooden Doors', folder: '1_woodenDoor', icon: '🚪', color: '#8B4513' },
  { id: 2, name: 'Wooden Frames', folder: '2_WoodenFream', icon: '🖼️', color: '#D2691E' },
  { id: 3, name: 'Safety Doors', folder: '3_safetyDoors', icon: '🔒', color: '#2E8B57' },
  { id: 4, name: 'Wooden Beds', folder: '4_woodenBed', icon: '🛏️', color: '#5D4037' },
  { id: 5, name: 'Wooden Mandir', folder: '5_woodenMandir', icon: '🛕', color: '#FFD700' },
  { id: 6, name: 'Wooden Windows', folder: '6_woodenWindow', icon: '🪟', color: '#4682B4' },
  { id: 7, name: 'MDF 2D/3D', folder: '7_mdf2d3d', icon: '📐', color: '#708090' },
  { id: 8, name: 'Wooden Art', folder: '8_woodenArt', icon: '🎨', color: '#FF6B6B' },
  { id: 9, name: 'Sofa Chair', folder: '9_sofaChair', icon: '🪑', color: '#8A2BE2' },
  { id: 10, name: 'Marble Cutting', folder: '10_marbelCutting', icon: '🗿', color: '#C0C0C0' },
  { id: 11, name: 'Safety Door', folder: '11_safetyDoor', icon: '🚪', color: '#36454F' },
];

// Function to generate product info
const generateProductInfo = (categoryName, index) => {
  const prices = [12500, 18500, 22500, 28500, 32500];
  const ratings = [4.2, 4.5, 4.7, 4.8, 5.0];
  
  return {
    id: index,
    name: `${categoryName} Design ${index}`,
    price: `₹${prices[index % 5].toLocaleString('en-IN')}`,
    rating: ratings[index % 5],
    reviews: Math.floor(Math.random() * 50) + 10,
    badge: index % 4 === 0 ? 'BEST' : index % 4 === 1 ? 'NEW' : index % 4 === 2 ? 'SALE' : null
  };
};

// ✅ FASTEST SOLUTION: Predefined image patterns
const IMAGE_PATTERNS = [
  '/{folder}/{num}.jpg',
  '/{folder}/{num}.jpeg',
  '/{folder}/{num}.png',
  '/{folder}/{num}.JPG',
  '/{folder}/{num}.JPEG',
  '/{folder}/{num}.PNG',
  '/{folder}/{num}.webp',
  '/{folder}/{num}.WEBP',
];

// ✅ NEW: Optimized image loader - NO HEAD requests, just try loading
const loadAllImages = async (folder) => {
  const images = [];
  const maxImages = 80;
  
  console.time(`ImageLoad-${folder}`);
  
  // Create all image URLs at once (FAST)
  const imagePromises = [];
  
  for (let i = 1; i <= maxImages; i++) {
    // Create image URL with most common extension first (jpg)
    const imagePath = `/images/category/${folder}/${i}.jpg`;
    
    imagePromises.push({
      url: imagePath,
      info: generateProductInfo(folder.replace(/^\d+_/, '').replace(/([A-Z])/g, ' $1').trim(), i),
      index: i
    });
  }
  
  // ✅ CRITICAL: Don't check if images exist, just assume they do
  // This is the key to speed - browser will handle missing images
  images.push(...imagePromises);
  
  console.timeEnd(`ImageLoad-${folder}`);
  console.log(`⚡ Instantly loaded ${images.length} image paths for ${folder}`);
  
  return images;
};

// ✅ NEW: Smart fallback for missing images
const SmartImage = ({ src, alt, width, height, className, categoryIcon }) => {
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  
  // Try different extensions if main fails
  const tryAlternativeExtensions = (failedSrc) => {
    const pathParts = failedSrc.split('/');
    const filename = pathParts.pop();
    const baseName = filename.split('.')[0];
    const folder = pathParts.join('/');
    
    const extensions = ['.jpeg', '.png', '.JPG', '.JPEG', '.PNG', '.webp', '.WEBP'];
    
    // Try next extension
    const currentExtIndex = IMAGE_PATTERNS.findIndex(pattern => 
      pattern.includes(failedSrc.split('.').pop())
    );
    
    if (currentExtIndex < extensions.length - 1) {
      const nextExt = extensions[currentExtIndex + 1];
      return `${folder}/${baseName}${nextExt}`;
    }
    
    return null;
  };
  
  return (
    <>
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const newSrc = tryAlternativeExtensions(currentSrc);
          if (newSrc) {
            setCurrentSrc(newSrc);
          } else {
            setError(true);
            e.target.style.display = 'none';
            const parent = e.target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="img-fallback" style="width:${width}px;height:${height}px;background:#f5f5f5;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:8px;">
                  <span style="font-size:32px;margin-bottom:8px;">${categoryIcon}</span>
                  <span style="font-size:12px;color:#666;">Design ${alt.match(/\d+/)?.[0] || ''}</span>
                </div>
              `;
            }
          }
        }}
      />
    </>
  );
};

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Now false because we load instantly
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // ✅ NEW: Cache images by category
  const [imageCache, setImageCache] = useState({});

  // ✅ UPDATED: Fast image loading with cache
  useEffect(() => {
    const loadImages = async () => {
      // Check cache first
      if (imageCache[selectedCategory.folder]) {
        console.log(`📦 Using cached images for ${selectedCategory.folder}`);
        setImages(imageCache[selectedCategory.folder]);
        return;
      }
      
      setLoading(true);
      setCurrentPage(1);
      
      try {
        // This loads INSTANTLY now (no HTTP checks)
        const loadedImages = await loadAllImages(selectedCategory.folder);
        
        // Update cache
        setImageCache(prev => ({
          ...prev,
          [selectedCategory.folder]: loadedImages
        }));
        
        setImages(loadedImages);
        
        // Preload first few images in background
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            loadedImages.slice(0, 5).forEach(img => {
              const tempImg = new window.Image();
              tempImg.src = img.url;
            });
          }, 100);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadImages();
  }, [selectedCategory]);

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setCurrentPage(1);
    
    // Scroll to gallery
    setTimeout(() => {
      document.getElementById('gallery-section')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 50);
  };

  // ✅ UPDATED: Fast modal open
  const openImageModal = (image, index) => {
    const actualIndex = (currentPage - 1) * itemsPerPage + index;
    setSelectedImage(image);
    setCurrentImageIndex(actualIndex);
    
    // Preload adjacent images for modal navigation
    if (images.length > 0) {
      const prevIndex = actualIndex > 0 ? actualIndex - 1 : images.length - 1;
      const nextIndex = actualIndex < images.length - 1 ? actualIndex + 1 : 0;
      
      [prevIndex, nextIndex].forEach(idx => {
        const tempImg = new Image();
        tempImg.src = images[idx].url;
      });
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
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
      case 'price-low':
        return parseInt(a.info.price.replace('₹', '').replace(/,/g, '')) - 
               parseInt(b.info.price.replace('₹', '').replace(/,/g, ''));
      case 'price-high':
        return parseInt(b.info.price.replace('₹', '').replace(/,/g, '')) - 
               parseInt(a.info.price.replace('₹', '').replace(/,/g, ''));
      case 'rating':
        return b.info.rating - a.info.rating;
      default:
        return b.info.reviews - a.info.reviews;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = sortedImages.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Smooth scroll
    requestAnimationFrame(() => {
      document.getElementById('gallery-section')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      pages.push(1);
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <>
    <Navbar />
    <div className="square-categories-page">
      {/* Header */}
      <header className="square-header">
        <div className="header-wrapper">
          <div className="header-top">
            <Link href="/" className="back-btn">
              <ChevronLeft size={18} />
              <Home size={16} />
              <span>Home</span>
            </Link>
            
            <div className="header-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
          
          <div className="header-main">
            <h1 className="page-title">Product Gallery</h1>
            <p className="page-subtitle">Select a category to explore designs</p>
          </div>
        </div>
      </header>

      {/* Square Categories in Single Row */}
      <section className="square-categories-section">
        <div className="section-wrapper">
          <div className="section-header">
            <h2 className="section-title">
              <Grid size={20} />
              All Categories
              <span className="category-count">{categories.length} Categories</span>
            </h2>
          </div>
          
          <div className="categories-row">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`square-category ${selectedCategory.id === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
                style={{ '--category-color': category.color }}
              >
                <div className="square-inner">
                  <div className="category-icon-box">
                    <span className="category-icon">{category.icon}</span>
                  </div>
                  
                  <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>
                    <div className="category-stats">
                      <span className="stat-item">80+ Designs</span>
                    </div>
                  </div>
                  
                  {selectedCategory.id === category.id && (
                    <div className="active-indicator">
                      <div className="indicator-dot"></div>
                    </div>
                  )}
                </div>
                
                <div className="hover-effect">
                  <div className="hover-bg"></div>
                  <div className="hover-content">
                    <span className="hover-text">View Designs</span>
                    <span className="hover-arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Category Info */}
      <div className="selected-category-bar">
        <div className="bar-wrapper">
          <div className="bar-left">
            <div className="selected-category-display">
              <div className="selected-icon" style={{ backgroundColor: `${selectedCategory.color}20` }}>
                <span>{selectedCategory.icon}</span>
              </div>
              <div className="selected-info">
                <h3 className="selected-title">{selectedCategory.name}</h3>
                <p className="selected-subtitle">
                  {loading ? 'Loading...' : `${sortedImages.length} designs available`} • Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bar-right">
            <div className="sort-control">
              <Filter size={14} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            
            <div className="items-per-page-control">
              <select 
                value={itemsPerPage} 
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="items-select"
              >
                <option value="12">12 per page</option>
                <option value="20">20 per page</option>
                <option value="40">40 per page</option>
                <option value="80">All designs</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Gallery */}
      <section id="gallery-section" className="square-gallery">
        <div className="gallery-wrapper">
          {loading && images.length === 0 ? (
            <div className="loading-state">
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
              <p>Loading {selectedCategory.name} designs...</p>
            </div>
          ) : currentImages.length > 0 ? (
            <>
              <div className="products-grid">
                {currentImages.map((image, index) => (
                  <div key={startIndex + index} className="product-square">
                    <div className="square-image" onClick={() => openImageModal(image, index)}>
                      <div className="image-container">
                        {/* ✅ UPDATED: Using SmartImage component */}
                        <SmartImage
                          src={image.url}
                          alt={image.info.name}
                          width={280}
                          height={200}
                          className="product-img"
                          categoryIcon={selectedCategory.icon}
                        />
                        <button className="view-btn">
                          <ZoomIn size={18} />
                        </button>
                      </div>
                      
                      {image.info.badge && (
                        <div className={`product-tag ${image.info.badge.toLowerCase()}`}>
                          {image.info.badge}
                        </div>
                      )}
                    </div>
                    
                    <div className="square-info">
                      <h4 className="product-name" title={image.info.name}>
                        {image.info.name}
                      </h4>
                      
                      <div className="product-footer">
                        <div className="product-price">{image.info.price}</div>
                        
                        <div className="product-rating">
                          <Star size={12} fill="#FFD700" />
                          <span className="rating-value">{image.info.rating}</span>
                          <span className="rating-count">({image.info.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pagination-controls">
                  <div className="pagination-info">
                    Showing {startIndex + 1} to {Math.min(endIndex, sortedImages.length)} of {sortedImages.length} designs
                  </div>
                  
                  <div className="pagination-buttons">
                    <button 
                      className="pagination-btn first" 
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronFirst size={16} />
                    </button>
                    
                    <button 
                      className="pagination-btn prev" 
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>
                    
                    <div className="page-numbers">
                      {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                          <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
                        ) : (
                          <button
                            key={page}
                            className={`page-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => goToPage(page)}
                          >
                            {page}
                          </button>
                        )
                      ))}
                    </div>
                    
                    <button 
                      className="pagination-btn next" 
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                    
                    <button 
                      className="pagination-btn last" 
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronLast size={16} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="empty-gallery">
              <div className="empty-icon">🎨</div>
              <h3>No designs found</h3>
              <p>Try changing your search or select another category</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal - Optimized */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="square-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-top">
              <div className="modal-header">
                <h3 className="modal-title">{selectedImage.info.name}</h3>
                <div className="modal-rating">
                  <Star size={16} fill="#FFD700" />
                  <span>{selectedImage.info.rating}</span>
                  <span className="reviews">({selectedImage.info.reviews} reviews)</span>
                </div>
              </div>
              <button className="close-btn" onClick={closeImageModal}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-image-area">
                <button className="nav-btn prev" onClick={() => navigateImage(-1)}>
                  <ChevronLeft size={24} />
                </button>
                
                <div className="large-image">
                  <SmartImage
                    src={selectedImage.url}
                    alt={selectedImage.info.name}
                    width={600}
                    height={400}
                    className="modal-img"
                    categoryIcon={selectedCategory.icon}
                  />
                </div>
                
                <button className="nav-btn next" onClick={() => navigateImage(1)}>
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="modal-sidebar">
                <div className="sidebar-section">
                  <h4 className="sidebar-title">Product Details</h4>
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Price</span>
                      <span className="detail-value">{selectedImage.info.price}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Category</span>
                      <span className="detail-value">{selectedCategory.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Design No</span>
                      <span className="detail-value">{currentImageIndex + 1} of {images.length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="sidebar-actions">
                  <button className="action-btn primary">Add to Cart</button>
                  <button className="action-btn secondary">Enquire Now</button>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <div className="image-nav">
                <span className="nav-text">
                  Image {currentImageIndex + 1} of {images.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="square-footer">
        <div className="footer-wrapper">
          <div className="footer-content">
            <div className="footer-stats">
              <div className="stat-box">
                <div className="stat-number">{categories.length}</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{sortedImages.length}</div>
                <div className="stat-label">Current Designs</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{currentPage}/{totalPages}</div>
                <div className="stat-label">Current Page</div>
              </div>
            </div>
            
            <p className="footer-text">
              Browse our complete collection of premium wooden products
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
"use client";
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './Categories.css'

const categoriesData = {
  'wood-type': {
    title: 'By Wood Type',
    categories: [
      {
        name: 'Teak Wood Doors',
       href: '/explore-designs/teak-wood',
        image: '/images/categories/teak-wood/teak-wood.jpg',
        description: 'Premium quality, durable & termite resistant',
        badge: 'Popular',
        stats: '100+ Designs'
      },
      {
        name: 'Sagwan Wood Doors',
        href: '/categories/sagwan-wood',
        image: '/images/categories/sagwan-wood/sagwan-wood.jpg',
        description: 'Elegant grain patterns & natural beauty',
        badge: 'Eco-Friendly',
        stats: '80+ Designs'
      },
      {
        name: 'Sheesham Wood Doors',
        href: '/categories/sheesham-wood',
        image: '/images/categories/sheesham-wood/sheesham-wood.jpg',
        description: 'Hardwood with rich texture & durability',
        badge: 'Luxury',
        stats: '120+ Designs'
      },
      {
        name: 'Sal Wood Doors',
        href: '/categories/sal-wood',
        image: '/images/categories/sal-wood/sal-wood.jpg',
        description: 'Strong, heavy & weather resistant',
        badge: 'Strong',
        stats: '60+ Designs'
      },
      {
        name: 'Oak Wood Doors',
        href: '/categories/oak-wood',
        image: '/images/categories/teak-wood/teak-wood.jpg',
        description: 'Classic European style & sturdy construction',
        badge: 'Classic',
        stats: '90+ Designs'
      },
      {
        name: 'Mahogany Doors',
        href: '/categories/mahogany',
        image: '/images/categories/sagwan-wood/sagwan-wood.jpg',
        description: 'Deep red tones & exceptional durability',
        badge: 'Premium',
        stats: '70+ Designs'
      },
      {
        name: 'Pine Wood Doors',
        href: '/categories/pine-wood',
        image: '/images/categories/sheesham-wood/sheesham-wood.jpg',
        description: 'Lightweight & affordable wooden doors',
        badge: 'Budget',
        stats: '150+ Designs'
      },
      {
        name: 'Cedar Wood Doors',
        href: '/categories/cedar-wood',
        image: '/images/categories/sal-wood/sal-wood.jpg',
        description: 'Natural insect repellent & aromatic wood',
        badge: 'Aromatic',
        stats: '50+ Designs'
      }
    ]
  },
  'usage': {
    title: 'By Usage',
    categories: [
      {
        name: 'Main Entrance Doors',
        href: '/categories/main-entrance',
        image: '/images/categories/main-entrance.jpg',
        description: 'Grand entrance with maximum security focus',
        badge: 'Secure',
        stats: '200+ Designs'
      },
      {
        name: 'Bedroom Doors',
        href: '/categories/bedroom',
        image: '/images/categories/bedroom-doors.jpg',
        description: 'Privacy with elegant & soundproof designs',
        badge: 'Private',
        stats: '180+ Designs'
      },
      {
        name: 'Bathroom Doors',
        href: '/categories/bathroom',
        image: '/images/categories/bathroom-doors.jpg',
        description: 'Waterproof & moisture resistant materials',
        badge: 'Waterproof',
        stats: '160+ Designs'
      },
      {
        name: 'Kitchen Doors',
        href: '/categories/kitchen',
        image: '/images/categories/kitchen-doors.jpg',
        description: 'Heat & grease resistant durable finishes',
        badge: 'Durable',
        stats: '140+ Designs'
      },
      {
        name: 'Living Room Doors',
        href: '/categories/living-room',
        image: '/images/categories/main-entrance.jpg',
        description: 'Elegant designs to match your interior decor',
        badge: 'Elegant',
        stats: '170+ Designs'
      },
      {
        name: 'Office Doors',
        href: '/categories/office',
        image: '/images/categories/bedroom-doors.jpg',
        description: 'Professional & formal door designs',
        badge: 'Professional',
        stats: '120+ Designs'
      },
      {
        name: 'Balcony Doors',
        href: '/categories/balcony',
        image: '/images/categories/bathroom-doors.jpg',
        description: 'Weather resistant outdoor doors',
        badge: 'Outdoor',
        stats: '110+ Designs'
      },
      {
        name: 'French Doors',
        href: '/categories/french',
        image: '/images/categories/kitchen-doors.jpg',
        description: 'Classic glass panel design for elegance',
        badge: 'Classic',
        stats: '90+ Designs'
      }
    ]
  },
  'design': {
    title: 'By Design',
    categories: [
      {
        name: 'Carved Wooden Doors',
        href: '/categories/carved',
        image: '/images/categories/carved-doors.jpg',
        description: 'Intricate traditional & modern carvings',
        badge: 'Artistic',
        stats: '150+ Designs'
      },
      {
        name: 'Modern Minimal Doors',
        href: '/categories/modern',
        image: '/images/categories/modern-doors.jpg',
        description: 'Clean lines & contemporary sleek design',
        badge: 'Modern',
        stats: '200+ Designs'
      },
      {
        name: 'Traditional Indian Doors',
        href: '/categories/traditional',
        image: '/images/categories/traditional-doors.jpg',
        description: 'Classic Indian designs & cultural motifs',
        badge: 'Traditional',
        stats: '180+ Designs'
      },
      {
        name: 'Glass Panel Doors',
        href: '/categories/glass-panel',
        image: '/images/categories/glass-panel-doors.jpg',
        description: 'Elegant glass & wood combinations',
        badge: 'Elegant',
        stats: '160+ Designs'
      },
      {
        name: 'Sliding Doors',
        href: '/categories/sliding',
        image: '/images/categories/carved-doors.jpg',
        description: 'Space saving modern sliding mechanism',
        badge: 'Space Saver',
        stats: '140+ Designs'
      },
      {
        name: 'Panel Doors',
        href: '/categories/panel',
        image: '/images/categories/modern-doors.jpg',
        description: 'Classic raised or recessed panel designs',
        badge: 'Classic',
        stats: '170+ Designs'
      },
      {
        name: 'Flush Doors',
        href: '/categories/flush',
        image: '/images/categories/traditional-doors.jpg',
        description: 'Smooth surface & contemporary look',
        badge: 'Contemporary',
        stats: '130+ Designs'
      },
      {
        name: 'Louvred Doors',
        href: '/categories/louvred',
        image: '/images/categories/glass-panel-doors.jpg',
        description: 'Ventilation with stylish slatted design',
        badge: 'Ventilated',
        stats: '90+ Designs'
      }
    ]
  }
}

const tabButtons = [
  { id: 'wood-type', label: 'Wood Type', icon: '🪵' },
  { id: 'usage', label: 'Usage', icon: '🚪' },
  { id: 'design', label: 'Design', icon: '🎨' }
]

export default function Categories() {
  const [activeTab, setActiveTab] = useState('wood-type')
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <section id="categories" className="categories-section">
      {/* Background Elements */}
      <div className="bg-elements">
        <div className="bg-ornament left"></div>
        <div className="bg-ornament right"></div>
        <div className="floating-dots">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="floating-dot" style={{
              '--delay': `${i * 0.3}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            }} />
          ))}
        </div>
      </div>

      <div className="categories-container">
        {/* Header Section */}
        <div className="categories-header">
          <div className="title-wrapper">
            <span className="section-tag">EXPLORE COLLECTION</span>
            <h2 className="section-title">
              Discover <span className="highlight-text">50+ Door Categories</span>
            </h2>
            <div className="title-decoration">
              <div className="deco-line"></div>
              <div className="deco-dot"></div>
              <div className="deco-line"></div>
            </div>
          </div>
          
          <p className="section-description">
            Explore our extensive collection of premium wooden doors crafted for every need, style, and space
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="category-tabs">
          <div className="tabs-container">
            {tabButtons.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                <div className="tab-indicator"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content-container">
          {Object.entries(categoriesData).map(([tabId, tabData]) => (
            <div
              key={tabId}
              className={`tab-content ${activeTab === tabId ? 'active' : ''}`}
              id={tabId}
            >
              <div className="category-grid">
                {tabData.categories.map((category, index) => (
                  <Link 
                    key={`${tabId}-${index}`} 
                    href={category.href} 
                    className="category-card"
                    onMouseEnter={() => setHoveredCard(`${tabId}-${index}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card Glow Effect */}
                    <div className="card-glow"></div>
                    
                    {/* Card Badge */}
                    {category.badge && (
                      <div className="category-badge">
                        <span className="badge-text">{category.badge}</span>
                      </div>
                    )}

                    {/* Card Image */}
                    <div className="category-image">
                      <div className="image-wrapper">
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={400}
                          height={300}
                          className="card-image"
                        />
                        <div className="image-overlay"></div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="card-content">
                      <div className="card-header">
                        <div className="category-stats">
                          <span className="stats-icon">📊</span>
                          <span className="stats-text">{category.stats}</span>
                        </div>
                        <div className="card-index">
                          <span className="index-number">0{index + 1}</span>
                        </div>
                      </div>
                      
                      <h3 className="category-name">{category.name}</h3>
                      <p className="category-description">{category.description}</p>
                      
                      <div className="card-footer">
                        <button className="explore-btn">
                          Explore Designs
                          <span className="btn-arrow">→</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Hover Effect */}
                    <div className="card-hover-effect"></div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="view-all-section">
          <div className="view-all-wrapper">
            <div className="view-all-text">
              <h3>Want to see more?</h3>
              <p>Browse our complete collection of 50+ door categories</p>
            </div>
            <Link href="/categories" className="view-all-btn">
              View All Categories
              <span className="btn-icon">⟶</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'
import { useState } from 'react'
import Link from 'next/link'

const categoriesData = {
  'wood-type': {
    title: 'By Wood Type',
    categories: [
      {
        name: 'Teak Wood Doors',
        href: '/categories/teak-wood',
        image: '/images/categories/teak-wood/teak-wood.jpg',
        description: 'Premium quality, durable & termite resistant',
        badge: 'Popular'
      },
      {
        name: 'Sagwan Wood Doors',
        href: '/categories/sagwan-wood',
        image: '/images/categories/sagwan-wood/sagwan-wood.jpg',
        description: 'Elegant grain patterns & natural beauty',
        badge: 'Eco-Friendly'
      },
      {
        name: 'Sheesham Wood Doors',
        href: '/categories/sheesham-wood',
        image: '/images/categories/sheesham-wood/sheesham-wood.jpg',
        description: 'Hardwood with rich texture & durability',
        badge: 'Luxury'
      },
      {
        name: 'Sal Wood Doors',
        href: '/categories/sal-wood',
        image: '/images/categories/sal-wood/sal-wood.jpg',
        description: 'Strong, heavy & weather resistant',
        badge: 'Strong'
      },
      {
        name: 'Teak Wood Doors',
        href: '/categories/teak-wood',
        image: '/images/categories/teak-wood/teak-wood.jpg',
        description: 'Premium quality, durable & termite resistant',
        badge: 'Popular'
      },
      {
        name: 'Sagwan Wood Doors',
        href: '/categories/sagwan-wood',
        image: '/images/categories/sagwan-wood/sagwan-wood.jpg',
        description: 'Elegant grain patterns & natural beauty',
        badge: 'Eco-Friendly'
      },
      {
        name: 'Sheesham Wood Doors',
        href: '/categories/sheesham-wood',
        image: '/images/categories/sheesham-wood/sheesham-wood.jpg',
        description: 'Hardwood with rich texture & durability',
        badge: 'Luxury'
      },
      {
        name: 'Sal Wood Doors',
        href: '/categories/sal-wood',
        image: '/images/categories/sal-wood/sal-wood.jpg',
        description: 'Strong, heavy & weather resistant',
        badge: 'Strong'
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
        description: 'Grand entrance with security focus',
        badge: 'Secure'
      },
      {
        name: 'Bedroom Doors',
        href: '/categories/bedroom',
        image: '/images/categories/bedroom-doors.jpg',
        description: 'Privacy with elegant designs',
        badge: 'Private'
      },
      {
        name: 'Bathroom Doors',
        href: '/categories/bathroom',
        image: '/images/categories/bathroom-doors.jpg',
        description: 'Waterproof & moisture resistant',
        badge: 'Waterproof'
      },
      {
        name: 'Kitchen Doors',
        href: '/categories/kitchen',
        image: '/images/categories/kitchen-doors.jpg',
        description: 'Heat & grease resistant finishes',
        badge: 'Durable'
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
        badge: 'Artistic'
      },
      {
        name: 'Modern Minimal Doors',
        href: '/categories/modern',
        image: '/images/categories/modern-doors.jpg',
        description: 'Clean lines & contemporary design',
        badge: 'Modern'
      },
      {
        name: 'Traditional Indian Doors',
        href: '/categories/traditional',
        image: '/images/categories/traditional-doors.jpg',
        description: 'Classic Indian designs & motifs',
        badge: 'Traditional'
      },
      {
        name: 'Glass Panel Doors',
        href: '/categories/glass-panel',
        image: '/images/categories/glass-panel-doors.jpg',
        description: 'Elegant glass & wood combinations',
        badge: 'Elegant'
      }
    ]
  }
}

const tabButtons = [
  { id: 'wood-type', label: 'By Wood Type' },
  { id: 'usage', label: 'By Usage' },
  { id: 'design', label: 'By Design' }
]

export default function Categories() {
  const [activeTab, setActiveTab] = useState('wood-type')

  return (
    <section id="categories" className="categories-section">
      <div className="categories-pattern"></div>
      <div className="container">
        <h2>50+ Wooden Door Categories</h2>
        <p>Explore our extensive collection of premium wooden doors for every need and style</p>

        <div className="category-tabs">
          {tabButtons.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {Object.entries(categoriesData).map(([tabId, tabData]) => (
          <div
            key={tabId}
            className={`tab-content ${activeTab === tabId ? 'active' : ''}`}
            id={tabId}
          >
            <div className="category-grid">
              {tabData.categories.map(category => (
                <Link key={category.href} href={category.href} className="category-card">
                  <div className="category-image">
                    <img src={category.image} alt={category.name} />
                    {category.badge && (
                      <span className="category-badge">{category.badge}</span>
                    )}
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="view-all-container">
          <Link href="/categories" className="view-all-btn">
            View All 50+ Categories
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
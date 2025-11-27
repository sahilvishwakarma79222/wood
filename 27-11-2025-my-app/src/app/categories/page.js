'use client'
import { useState } from 'react'
import Link from 'next/link'

const categoriesStyles = `
  .categories-page {
    padding: 100px 0 50px;
    background: var(--light-gray);
    min-height: 100vh;
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .page-header h1 {
    color: var(--primary-black);
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .page-header p {
    color: var(--dark-gray);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .main-category-card {
    background: var(--white);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }

  .main-category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    border-color: var(--primary-gold);
  }

  .category-icon {
    font-size: 3rem;
    color: var(--primary-gold);
    margin-bottom: 1rem;
  }

  .main-category-card h2 {
    color: var(--primary-black);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .main-category-card p {
    color: var(--dark-gray);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .subcategories {
    margin-top: 1.5rem;
  }

  .subcategories h4 {
    color: var(--primary-gold);
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .subcategories-list {
    list-style: none;
    text-align: left;
  }

  .subcategories-list li {
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--medium-gray);
  }

  .subcategories-list a {
    color: var(--text-dark);
    text-decoration: none;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .subcategories-list a:hover {
    color: var(--primary-gold);
  }

  .subcategories-list i {
    color: var(--primary-gold);
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    .categories-grid {
      grid-template-columns: 1fr;
    }
    
    .main-category-card {
      padding: 1.5rem;
    }
  }
`

const mainCategories = [
  {
    id: 'wood-type',
    title: 'By Wood Type',
    description: 'Choose from premium wood varieties including Teak, Sagwan, Sheesham and more',
    icon: 'fas fa-tree',
    subcategories: [
      { name: 'Teak Wood Doors', href: '/categories/teak-wood' },
      { name: 'Sagwan Wood Doors', href: '/categories/sagwan-wood' },
      { name: 'Sheesham Wood Doors', href: '/categories/sheesham-wood' },
      { name: 'Sal Wood Doors', href: '/categories/sal-wood' },
      { name: 'Solid Wood Doors', href: '/categories/solid-wood' }
    ]
  },
  {
    id: 'usage',
    title: 'By Usage',
    description: 'Perfect doors for every room - Main Entrance, Bedroom, Bathroom, Kitchen',
    icon: 'fas fa-home',
    subcategories: [
      { name: 'Main Entrance Doors', href: '/categories/main-entrance' },
      { name: 'Bedroom Doors', href: '/categories/bedroom' },
      { name: 'Bathroom Doors', href: '/categories/bathroom' },
      { name: 'Kitchen Doors', href: '/categories/kitchen' },
      { name: 'Balcony Doors', href: '/categories/balcony' }
    ]
  },
  {
    id: 'design',
    title: 'By Design',
    description: 'From traditional carved to modern minimalist designs',
    icon: 'fas fa-palette',
    subcategories: [
      { name: 'Carved Wooden Doors', href: '/categories/carved' },
      { name: 'Modern Minimal Doors', href: '/categories/modern' },
      { name: 'Traditional Indian Doors', href: '/categories/traditional' },
      { name: 'Glass Panel Doors', href: '/categories/glass-panel' },
      { name: 'Designer Wooden Doors', href: '/categories/designer' }
    ]
  }
]

export default function CategoriesPage() {
  return (
    <>
      <style jsx>{categoriesStyles}</style>
      <div className="categories-page">
        <div className="container">
          <div className="page-header">
            <h1>Explore Our Door Categories</h1>
            <p>Discover 50+ specialized wooden door categories crafted with precision and quality</p>
          </div>

          <div className="categories-grid">
            {mainCategories.map(category => (
              <div key={category.id} className="main-category-card">
                <div className="category-icon">
                  <i className={category.icon}></i>
                </div>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
                
                <div className="subcategories">
                  <h4>Popular Categories</h4>
                  <ul className="subcategories-list">
                    {category.subcategories.map(sub => (
                      <li key={sub.href}>
                        <Link href={sub.href}>
                          <i className="fas fa-chevron-right"></i>
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
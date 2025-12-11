'use client'
import { useState } from 'react'
import Link from 'next/link'

const categoryStyles = `
  .category-page {
    padding: 100px 0 50px;
    min-height: 100vh;
  }

  .category-header {
    background: linear-gradient(135deg, var(--primary-black) 0%, #2d3748 100%);
    color: var(--white);
    padding: 3rem 0;
    text-align: center;
    margin-bottom: 3rem;
  }

  .category-header h1 {
    color: var(--primary-gold);
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .category-header p {
    font-size: 1.1rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
  }

  .product-card {
    background: var(--white);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    border: 1px solid var(--medium-gray);
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }

  .product-image {
    width: 100%;
    height: 200px;
    background: var(--light-gray);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dark-gray);
  }

  .product-info {
    padding: 1.5rem;
  }

  .product-info h3 {
    color: var(--primary-black);
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .product-price {
    color: var(--primary-gold);
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .product-features {
    list-style: none;
    margin: 1rem 0;
  }

  .product-features li {
    padding: 0.3rem 0;
    color: var(--dark-gray);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .product-features i {
    color: var(--primary-gold);
    font-size: 0.8rem;
  }

  .view-details {
    background: var(--primary-black);
    color: var(--white);
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .view-details:hover {
    background: var(--primary-gold);
    color: var(--primary-black);
  }

  .filter-section {
    background: var(--white);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }

  .filter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .filter-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--primary-black);
  }

  .filter-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--medium-gray);
    border-radius: 6px;
    background: var(--white);
  }

  .breadcrumb {
    margin-bottom: 2rem;
  }

  .breadcrumb a {
    color: var(--primary-gold);
    text-decoration: none;
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr;
    }
    
    .filter-grid {
      grid-template-columns: 1fr;
    }
  }
`

// Sample data for different categories
const categoryData = {
  'teak-wood': {
    title: 'Teak Wood Doors',
    description: 'Premium teak wood doors known for their durability, termite resistance and elegant grain patterns',
    products: [
      {
        id: 1,
        name: 'Royal Burma Teak Door',
        price: '₹45,000',
        image: '/images/categories/teak-wood/royal-burma.jpg',
        features: ['Premium Burma Teak', 'Hand Carved', '10 Years Warranty', 'Termite Proof']
      },
      {
        id: 2,
        name: 'Classic Teak Entrance',
        price: '₹38,000',
        image: '/images/categories/teak-wood/classic-entrance.jpg',
        features: ['Solid Teak Wood', 'Traditional Design', 'Weather Resistant', 'Multi-point Lock']
      }
    ]
  },
  'main-entrance': {
    title: 'Main Entrance Doors',
    description: 'Grand and secure main entrance doors that make a lasting impression',
    products: [
      {
        id: 1,
        name: 'Grand Teak Entrance',
        price: '₹52,000',
        image: '/images/categories/main-entrance/grand-teak.jpg',
        features: ['Double Door Design', 'Security Focused', 'Custom Carvings', 'Heavy Duty']
      }
    ]
  }
}

export default function CategoryPage({ params }) {
  const { category } = params
  const [priceFilter, setPriceFilter] = useState('')
  const [designFilter, setDesignFilter] = useState('')

  const categoryInfo = categoryData[category] || {
    title: 'Category Not Found',
    description: 'The requested category does not exist.',
    products: []
  }

  return (
    <>
      <style jsx>{categoryStyles}</style>
      <div className="category-page">
        <div className="category-header">
          <div className="container">
            <div className="breadcrumb">
              <Link href="/categories">Categories</Link> / <span>{categoryInfo.title}</span>
            </div>
            <h1>{categoryInfo.title}</h1>
            <p>{categoryInfo.description}</p>
          </div>
        </div>

        <div className="container">
          <div className="filter-section">
            <div className="filter-grid">
              <div className="filter-group">
                <label>Price Range</label>
                <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
                  <option value="">All Prices</option>
                  <option value="0-30000">Under ₹30,000</option>
                  <option value="30000-50000">₹30,000 - ₹50,000</option>
                  <option value="50000+">Above ₹50,000</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Design Style</label>
                <select value={designFilter} onChange={(e) => setDesignFilter(e.target.value)}>
                  <option value="">All Designs</option>
                  <option value="traditional">Traditional</option>
                  <option value="modern">Modern</option>
                  <option value="carved">Carved</option>
                </select>
              </div>
            </div>
          </div>

          <div className="products-grid">
            {categoryInfo.products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-price">{product.price}</div>
                  <ul className="product-features">
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/products/${product.id}`}>
                    <button className="view-details">View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
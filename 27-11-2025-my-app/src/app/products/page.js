'use client'
import { useState, useEffect } from 'react'

const productsData = [
  {
    id: 1,
    name: 'Royal Teak Entrance Door',
    image: '/images/main-doors/pratap-door-01.jpg',
    category: 'Teak Wood | Main Entrance',
    price: '₹45,000',
    description: 'Premium Burma Teak main entrance door with intricate hand carvings...',
    specs: ['Wood Type: Burma Teak', 'Usage: Main Entrance', 'Thickness: 45mm']
  },
  {
    id: 2,
    name: 'Sheesham Carved Door',
    image: '/images/main-doors/cunningham-door-2.jpg',
    category: 'Sheesham Wood | Carved',
    price: '₹38,500',
    description: 'Elegant Sheesham wood door with traditional Indian carvings...',
    specs: ['Wood Type: Solid Sheesham', 'Usage: Main Entrance/Bedroom', 'Thickness: 40mm']
  }
]

export default function Products() {
  const [currentPosition, setCurrentPosition] = useState(0)

  const nextSlide = () => {
    setCurrentPosition(prev => prev + 1)
  }

  const prevSlide = () => {
    setCurrentPosition(prev => Math.max(0, prev - 1))
  }

  return (
    <section id="products" className="best-selling">
      <div className="container">
        <h2>Best Selling Wooden Doors</h2>
        <div className="product-carousel">
          <div className="carousel-container">
            <div className="carousel-track">
              {productsData.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">{product.price}</p>
                  <button className="view-details">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button className="carousel-nav prev" onClick={prevSlide}>‹</button>
          <button className="carousel-nav next" onClick={nextSlide}>›</button>
        </div>
      </div>

      <style jsx>{`
        .best-selling {
          background-color: #f8f9fa;
          padding: 4rem 0;
        }

        .best-selling h2 {
          text-align: center;
          color: #0d0d0d;
          margin-bottom: 1rem;
          font-size: 2rem;
          font-weight: 700;
        }

        .product-carousel {
          position: relative;
          margin-top: 2.5rem;
        }

        .carousel-container {
          overflow: hidden;
          border-radius: 12px;
        }

        .carousel-track {
          display: flex;
          gap: 1.8rem;
          transition: transform 0.3s ease;
        }

        .product-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.2rem;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          min-width: 260px;
          border: 1px solid #e9ecef;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .product-image {
          width: 100%;
          height: 180px;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border-radius: 8px;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #495057;
          font-weight: 600;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .product-card h3 {
          margin-bottom: 0.5rem;
          color: #0d0d0d;
          font-size: 1.05rem;
          font-weight: 600;
        }

        .product-card .category {
          color: #495057;
          font-size: 0.82rem;
          margin-bottom: 0.5rem;
        }

        .price {
          color: #c8a97e;
          font-weight: bold;
          font-size: 1.15rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .view-details {
          background-color: #0d0d0d;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          width: 100%;
          font-size: 0.87rem;
        }

        .view-details:hover {
          background-color: #c8a97e;
          color: #0d0d0d;
        }

        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: #c8a97e;
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.3rem;
          color: #0d0d0d;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .carousel-nav:hover {
          background: #b8941f;
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-nav.prev { 
          left: -20px; 
        }

        .carousel-nav.next { 
          right: -20px; 
        }

        @media (max-width: 768px) {
          .carousel-nav { 
            display: none; 
          }
        }
      `}</style>
    </section>
  )
}
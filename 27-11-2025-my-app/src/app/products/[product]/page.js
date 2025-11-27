'use client'
import { useState } from 'react'
import Link from 'next/link'

const productStyles = `
  .product-detail-page {
    padding: 100px 0 50px;
    min-height: 100vh;
  }

  .product-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  .product-gallery {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .main-image {
    width: 100%;
    height: 400px;
    background: var(--light-gray);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thumbnails {
    display: flex;
    gap: 1rem;
  }

  .thumbnail {
    width: 80px;
    height: 80px;
    background: var(--light-gray);
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
  }

  .thumbnail.active {
    border-color: var(--primary-gold);
  }

  .product-info-detail h1 {
    color: var(--primary-black);
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  .product-category-detail {
    color: var(--primary-gold);
    font-weight: 600;
    margin-bottom: 1rem;
    display: block;
  }

  .product-price-detail {
    color: var(--primary-gold);
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  .product-description {
    color: var(--dark-gray);
    line-height: 1.7;
    margin: 1.5rem 0;
  }

  .specifications {
    margin: 2rem 0;
  }

  .specs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }

  .spec-item {
    padding: 1rem;
    background: var(--light-gray);
    border-radius: 8px;
  }

  .spec-label {
    font-weight: 600;
    color: var(--primary-black);
    display: block;
  }

  .spec-value {
    color: var(--dark-gray);
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn-whatsapp {
    background: #25D366;
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    justify-content: center;
  }

  .btn-call {
    background: var(--primary-gold);
    color: var(--primary-black);
    border: none;
    padding: 15px 25px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    justify-content: center;
  }

  .related-products {
    margin-top: 4rem;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    .product-detail {
      grid-template-columns: 1fr;
    }
    
    .specs-grid {
      grid-template-columns: 1fr;
    }
    
    .action-buttons {
      flex-direction: column;
    }
  }
`

const productData = {
  1: {
    name: 'Royal Teak Entrance Door',
    category: 'Teak Wood | Main Entrance',
    price: '₹45,000',
    description: 'Premium Burma Teak main entrance door with intricate hand carvings and superior finish. Perfect for luxury homes seeking traditional elegance with modern security features.',
    images: [
      '/images/main-doors/pratap-door-01.jpg',
      '/images/main-doors/pratap-door-02.jpg'
    ],
    specifications: {
      'Wood Type': 'Burma Teak',
      'Usage': 'Main Entrance',
      'Thickness': '45mm',
      'Size Options': '3\'x7\', 3.5\'x7\', 4\'x7\'',
      'Finish': 'Matte, Gloss, Natural Polish',
      'Warranty': '10 Years',
      'Security': 'Multi-point locking system',
      'Delivery': '4-6 Weeks'
    },
    features: [
      'Termite Resistant',
      'Weather Proof',
      'Custom Carvings Available',
      'Quick Installation',
      'Eco-friendly Finish'
    ]
  },
  2: {
    name: 'Sheesham Carved Door',
    category: 'Sheesham Wood | Carved',
    price: '₹38,500',
    description: 'Elegant Sheesham wood door with traditional Indian carvings. Known for its durability and rich grain patterns that add warmth to any entrance.',
    images: [
      '/images/main-doors/cunningham-door-2.jpg'
    ],
    specifications: {
      'Wood Type': 'Solid Sheesham',
      'Usage': 'Main Entrance/Bedroom',
      'Thickness': '40mm',
      'Size Options': '2.5\'x7\', 3\'x7\', 3.5\'x7\'',
      'Finish': 'Natural, Dark Walnut, Honey',
      'Warranty': '7 Years',
      'Security': 'Standard locking system',
      'Delivery': '3-5 Weeks'
    },
    features: [
      'Natural Grain Patterns',
      'High Durability',
      'Eco-friendly',
      'Easy Maintenance'
    ]
  }
}

export default function ProductDetailPage({ params }) {
  const { product } = params
  const [selectedImage, setSelectedImage] = useState(0)

  const productInfo = productData[product] || {
    name: 'Product Not Found',
    description: 'The requested product does not exist.',
    images: [],
    specifications: {},
    features: []
  }

  const handleWhatsApp = () => {
    const message = `Hello Shree Doors! I'm interested in ${productInfo.name}. Please share more details.`
    const phoneNumber = '+919876543210'
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  const handleCall = () => {
    window.location.href = 'tel:+919876543210'
  }

  return (
    <>
      <style jsx>{productStyles}</style>
      <div className="product-detail-page">
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: '2rem' }}>
            <Link href="/products">Products</Link> / <span>{productInfo.name}</span>
          </div>

          <div className="product-detail">
            <div className="product-gallery">
              <div className="main-image">
                <img src={productInfo.images[selectedImage]} alt={productInfo.name} />
              </div>
              <div className="thumbnails">
                {productInfo.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${productInfo.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="product-info-detail">
              <span className="product-category-detail">{productInfo.category}</span>
              <h1>{productInfo.name}</h1>
              <div className="product-price-detail">{productInfo.price}</div>
              <p className="product-description">{productInfo.description}</p>

              <div className="specifications">
                <h3>Specifications</h3>
                <div className="specs-grid">
                  {Object.entries(productInfo.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn-whatsapp" onClick={handleWhatsApp}>
                  <i className="fab fa-whatsapp"></i>
                  Contact on WhatsApp
                </button>
                <button className="btn-call" onClick={handleCall}>
                  <i className="fas fa-phone"></i>
                  Call Now
                </button>
              </div>
            </div>
          </div>

          <div className="related-products">
            <h2>Related Products</h2>
            <div className="related-grid">
              {/* Add related products here */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
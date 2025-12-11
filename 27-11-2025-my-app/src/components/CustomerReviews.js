'use client'

import { useState, useRef, useEffect } from 'react'
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaRegHeart } from 'react-icons/fa'
import { MdVerified, MdLocationOn, MdAccessTime } from 'react-icons/md'

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)
  
  const reviews = [
    {
      id: 1,
      name: "Rajesh Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "10 saal se customer hun. Quality exceptional hai! Solid wood jo 1996 se banate aa rahe hain.",
      date: "15 Jan 2024",
      product: "Teak Wood Bed",
      verified: true,
      purchase: "2 months ago"
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Thane",
      rating: 5,
      comment: "Custom dining table perfect mila. Wood quality premium aur finishing flawless.",
      date: "20 Feb 2024",
      product: "Custom Dining Table",
      verified: true,
      purchase: "1 month ago"
    },
    {
      id: 3,
      name: "Amit Verma",
      location: "Navi Mumbai",
      rating: 5,
      comment: "Sheesham cabinet bahut solid. Carving aur finishing world-class. 1996 se trust justified.",
      date: "10 Mar 2024",
      product: "Sheesham Cabinet",
      verified: true,
      purchase: "3 weeks ago"
    },
    {
      id: 4,
      name: "Sunita Desai",
      location: "Kalyan",
      rating: 5,
      comment: "Complete home furniture banwaya. Budget friendly aur quality exceptional.",
      date: "5 Apr 2024",
      product: "Home Set",
      verified: true,
      purchase: "2 weeks ago"
    },
    {
      id: 5,
      name: "Vikram Singh",
      location: "Badlapur",
      rating: 5,
      comment: "Office main door unique design. Authentic wood. Har visitor puchta hai.",
      date: "28 Mar 2024",
      product: "Office Door",
      verified: true,
      purchase: "1 month ago"
    }
  ]

  const stats = [
    { number: "4.9/5", label: "Rating", icon: "⭐" },
    { number: "5000+", label: "Families", icon: "🏡" },
    { number: "28+", label: "Years", icon: "🎯" },
    { number: "98%", label: "Repeat", icon: "🔄" }
  ]

  // Create duplicated reviews for smooth infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId;
    let startTime;
    let lastScrollLeft = 0;

    const scroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (scrollContainer) {
        // Smooth scroll with easing
        const scrollSpeed = 0.5; // Adjust speed here (lower = slower)
        const newScrollLeft = lastScrollLeft + scrollSpeed;
        
        scrollContainer.scrollLeft = newScrollLeft;
        lastScrollLeft = newScrollLeft;

        // Reset to beginning when reaching 1/3 of total width
        if (newScrollLeft >= scrollContainer.scrollWidth / 3) {
          scrollContainer.scrollLeft = 0;
          lastScrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Manual navigation handlers
  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? "star filled" : "star"} 
        style={{ 
          color: i < rating ? "#FFD700" : "#E5E7EB",
          fontSize: '14px'
        }}
      />
    ))
  }

  return (
    <>
      <section className="reviews-section">
        <div className="container">
          {/* Section Header */}
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-subtitle" style={{
              color: '#D4AF37',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '10px'
            }}>
              ❤️ Customer Love
            </span>
            
            <h2 className="section-title" style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '10px',
              lineHeight: '1.2'
            }}>
              What Our <span style={{ color: '#8B4513' }}>Customers Say</span>
            </h2>
            
            <p style={{
              fontSize: '16px',
              color: '#6B7280',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              Building trust since 1996 through exceptional craftsmanship
            </p>
          </div>

          {/* Stats Row */}
          <div className="stats-row" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '15px 20px',
                minWidth: '120px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#8B4513',
                  marginBottom: '5px',
                  lineHeight: '1'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#6B7280',
                  fontWeight: '500'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Auto-scrolling Reviews Grid */}
          <div className="auto-scroll-container" style={{
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '50px'
          }}>
            <div 
              ref={scrollContainerRef}
              style={{
                display: 'flex',
                gap: '20px',
                padding: '10px 0',
                cursor: 'grab',
                overflowX: 'hidden'
              }}
              onMouseDown={(e) => {
                const container = scrollContainerRef.current;
                if (!container) return;
                
                const startX = e.pageX - container.offsetLeft;
                const scrollLeft = container.scrollLeft;
                
                const onMouseMove = (e) => {
                  const x = e.pageX - container.offsetLeft;
                  const walk = (x - startX) * 2;
                  container.scrollLeft = scrollLeft - walk;
                };
                
                const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                };
                
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
              }}
            >
              {duplicatedReviews.map((review, index) => (
                <div 
                  key={`${review.id}-${index}`}
                  className="review-card"
                  style={{
                    minWidth: '320px',
                    background: 'white',
                    borderRadius: '16px',
                    padding: '25px',
                    boxShadow: '0 8px 30px rgba(139, 69, 19, 0.08)',
                    border: '1px solid rgba(139, 69, 19, 0.08)',
                    position: 'relative',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Quote Icon */}
                  <FaQuoteLeft style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    fontSize: '30px',
                    color: 'rgba(139, 69, 19, 0.05)',
                  }} />

                  {/* Reviewer Info */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8B4513 0%, #D4AF37 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginRight: '12px',
                      flexShrink: 0
                    }}>
                      {review.name.charAt(0)}
                    </div>
                    
                    <div style={{ flex: '1', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px', flexWrap: 'wrap' }}>
                        <h3 style={{ 
                          fontSize: '15px', 
                          fontWeight: '600', 
                          color: '#1F2937',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {review.name}
                        </h3>
                        {review.verified && (
                          <span style={{
                            background: '#10B981',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '10px',
                            fontSize: '10px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            flexShrink: 0
                          }}>
                            <MdVerified style={{ fontSize: '11px' }} /> Verified
                          </span>
                        )}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', color: '#6B7280' }}>
                          <MdLocationOn style={{ fontSize: '13px' }} />
                          <span>{review.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', color: '#6B7280' }}>
                          <MdAccessTime style={{ fontSize: '13px' }} />
                          <span>{review.purchase}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ display: 'flex', gap: '2px', marginBottom: '4px', justifyContent: 'flex-end' }}>
                        {renderStars(review.rating)}
                      </div>
                      <span style={{ color: '#9CA3AF', fontSize: '11px' }}>{review.date}</span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.5',
                      color: '#374151',
                      fontStyle: 'italic',
                      marginBottom: '12px'
                    }}>
                      "{review.comment}"
                    </p>
                    
                    <div style={{
                      background: 'rgba(139, 69, 19, 0.03)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      display: 'inline-block',
                      border: '1px solid rgba(139, 69, 19, 0.1)'
                    }}>
                      <span style={{ color: '#8B4513', fontWeight: '500', fontSize: '12px', marginRight: '4px' }}>Product:</span>
                      <span style={{ color: '#1F2937', fontSize: '12px' }}>{review.product}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => window.open('https://wa.me/917028426042?text=I%20want%20to%20share%20my%20review%20for%20Maa%20Kripa%20Wood%20Art', '_blank')}
              style={{
                background: 'linear-gradient(135deg, #8B4513 0%, #D4AF37 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '25px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 69, 19, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FaRegHeart style={{ fontSize: '14px' }} /> Share Review
            </button>
            
            <button
              onClick={() => window.open('https://g.page/r/CYxYZu6GQs5iEBM/review', '_blank')}
              style={{
                background: 'white',
                color: '#8B4513',
                border: '1px solid #8B4513',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '25px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#8B4513';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#8B4513';
              }}
            >
              ⭐ Google Review
            </button>
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style jsx>{`
        .reviews-section {
          padding: 60px 20px;
          background: linear-gradient(135deg, #FDF8F3 0%, #FFFFFF 100%);
          position: relative;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }
        
        @media (max-width: 1024px) {
          .section-title {
            font-size: 28px !important;
          }
          
          .review-card {
            min-width: 300px !important;
          }
        }
        
        @media (max-width: 768px) {
          .reviews-section {
            padding: 40px 15px;
          }
          
          .section-title {
            font-size: 24px !important;
          }
          
          .stats-row {
            gap: 15px !important;
          }
          
          .stat-card {
            min-width: calc(50% - 10px) !important;
            padding: 12px 15px !important;
          }
          
          .stat-card div:first-child {
            font-size: 16px !important;
            margin-bottom: 5px !important;
          }
          
          .stat-card div:nth-child(2) {
            font-size: 20px !important;
          }
          
          .review-card {
            min-width: 280px !important;
            padding: 20px !important;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 10px !important;
          }
          
          .cta-buttons button {
            width: 100%;
            max-width: 250px;
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .section-title {
            font-size: 22px !important;
          }
          
          .review-card {
            min-width: 260px !important;
            padding: 18px !important;
          }
          
          .stat-card {
            min-width: calc(50% - 8px) !important;
          }
        }
      `}</style>
    </>
  )
}

export default CustomerReviews
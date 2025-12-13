// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import './CustomerReviews.css'

// const CustomerReviews = () => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isPlaying, setIsPlaying] = useState(true)
//   const [hoveredReview, setHoveredReview] = useState(null)
//   const scrollContainerRef = useRef(null)
//   const animationRef = useRef(null)

//   const reviews = [
//     {
//       id: 1,
//       name: "Rajesh Sharma",
//       location: "Mumbai",
//       rating: 5,
//       comment: "10 saal se customer hun. Quality exceptional hai! Solid wood jo 1996 se banate aa rahe hain. Har baar same perfection.",
//       date: "15 Jan 2024",
//       product: "Teak Wood Bed",
//       verified: true,
//       purchase: "2 months ago",
//       avatarColor: "avatar-gradient-1"
//     },
//     {
//       id: 2,
//       name: "Priya Patel",
//       location: "Thane",
//       rating: 5,
//       comment: "Custom dining table perfect mila. Wood quality premium aur finishing flawless. Family ne bhi appreciate kiya.",
//       date: "20 Feb 2024",
//       product: "Custom Dining Table",
//       verified: true,
//       purchase: "1 month ago",
//       avatarColor: "avatar-gradient-2"
//     },
//     {
//       id: 3,
//       name: "Amit Verma",
//       location: "Navi Mumbai",
//       rating: 5,
//       comment: "Sheesham cabinet bahut solid. Carving aur finishing world-class. 1996 se trust justified. Highly recommended!",
//       date: "10 Mar 2024",
//       product: "Sheesham Cabinet",
//       verified: true,
//       purchase: "3 weeks ago",
//       avatarColor: "avatar-gradient-3"
//     },
//     {
//       id: 4,
//       name: "Sunita Desai",
//       location: "Kalyan",
//       rating: 5,
//       comment: "Complete home furniture banwaya. Budget friendly aur quality exceptional. Service timing bhi perfect thi.",
//       date: "5 Apr 2024",
//       product: "Home Set",
//       verified: true,
//       purchase: "2 weeks ago",
//       avatarColor: "avatar-gradient-4"
//     },
//     {
//       id: 5,
//       name: "Vikram Singh",
//       location: "Badlapur",
//       rating: 5,
//       comment: "Office main door unique design. Authentic wood. Har visitor puchta hai. Business image improve hua.",
//       date: "28 Mar 2024",
//       product: "Office Door",
//       verified: true,
//       purchase: "1 month ago",
//       avatarColor: "avatar-gradient-5"
//     },
//     {
//       id: 6,
//       name: "Neha Kapoor",
//       location: "Dombivli",
//       rating: 5,
//       comment: "Kids bedroom set bahut safe aur durable. No sharp edges, child-friendly finishing. Very happy!",
//       date: "12 Apr 2024",
//       product: "Kids Bedroom Set",
//       verified: true,
//       purchase: "1 week ago",
//       avatarColor: "avatar-gradient-6"
//     }
//   ]

//   const stats = [
//     { 
//       number: "4.9/5", 
//       label: "Average Rating", 
//       icon: "⭐", 
//       subtext: "500+ Reviews" 
//     },
//     { 
//       number: "5000+", 
//       label: "Happy Families", 
//       icon: "🏡", 
//       subtext: "Since 1996" 
//     },
//     { 
//       number: "28+", 
//       label: "Years Experience", 
//       icon: "🎯", 
//       subtext: "Trusted Legacy" 
//     },
//     { 
//       number: "98%", 
//       label: "Repeat Customers", 
//       icon: "🔄", 
//       subtext: "Loyalty Score" 
//     }
//   ]

//   const awards = [
//     { 
//       title: "Best Wood Craftsmanship", 
//       year: "2023",
//       icon: "🏆"
//     },
//     { 
//       title: "Customer Choice Award", 
//       year: "2022",
//       icon: "👑"
//     },
//     { 
//       title: "Premium Quality Certified", 
//       year: "2021",
//       icon: "⭐"
//     }
//   ]

//   // Create duplicated reviews for smooth infinite scroll
//   const duplicatedReviews = [...reviews, ...reviews, ...reviews]

//   useEffect(() => {
//     const scrollContainer = scrollContainerRef.current
//     if (!scrollContainer || !isPlaying) return

//     let startTime
//     let lastScrollLeft = 0
//     const scrollSpeed = 0.3

//     const scroll = (timestamp) => {
//       if (!startTime) startTime = timestamp
      
//       if (scrollContainer) {
//         const newScrollLeft = lastScrollLeft + scrollSpeed
//         scrollContainer.scrollLeft = newScrollLeft
//         lastScrollLeft = newScrollLeft

//         if (newScrollLeft >= scrollContainer.scrollWidth / 3) {
//           scrollContainer.scrollLeft = 0
//           lastScrollLeft = 0
//         }
//       }

//       animationRef.current = requestAnimationFrame(scroll)
//     }

//     animationRef.current = requestAnimationFrame(scroll)

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current)
//       }
//     }
//   }, [isPlaying])

//   const toggleAutoScroll = () => {
//     setIsPlaying(!isPlaying)
//   }

//   const nextReview = () => {
//     setCurrentIndex((prev) => (prev + 1) % reviews.length)
//   }

//   const prevReview = () => {
//     setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
//   }

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <i 
//         key={i} 
//         className={`star-icon ${i < rating ? 'star-filled' : 'star-empty'}`}
//       >
//         ★
//       </i>
//     ))
//   }

//   const shareReview = (review) => {
//     const text = `Check out this amazing review from ${review.name} for Maa Kripa Wood Art:\n"${review.comment}"\nRating: ${review.rating}/5\n\nVisit: maakripawoodart.com`
    
//     if (navigator.share) {
//       navigator.share({
//         title: 'Customer Review - Maa Kripa Wood Art',
//         text: text,
//         url: window.location.href
//       }).catch(console.error)
//     } else if (navigator.clipboard) {
//       navigator.clipboard.writeText(text)
//         .then(() => alert('Review copied to clipboard! Share it with your friends!'))
//         .catch(() => {
//           // Fallback for older browsers
//           const textArea = document.createElement('textarea')
//           textArea.value = text
//           document.body.appendChild(textArea)
//           textArea.select()
//           document.execCommand('copy')
//           document.body.removeChild(textArea)
//           alert('Review copied to clipboard!')
//         })
//     }
//   }

//   const openWhatsApp = () => {
//     window.open('https://wa.me/917028426042?text=Hi%20Maa%20Kripa%20Wood%20Art!%20I%20want%20to%20share%20my%20review%20and%20experience%20with%20your%20products.', '_blank')
//   }

//   const openGoogleReview = () => {
//     window.open('https://g.page/r/CYxYZu6GQs5iEBM/review', '_blank')
//   }

//   const openFacebookReview = () => {
//     window.open('https://www.facebook.com/maakripawoodart/reviews/', '_blank')
//   }

//   return (
//     <section className="customer-reviews-section">
//       <div className="reviews-container">
        
//         {/* Header Section */}
//         <div className="reviews-header">
//           <div className="reviews-badge">
//             <i>❤️</i>
//             <span>CUSTOMER LOVE & TRUST</span>
//           </div>
          
//           <h1 className="reviews-title">
//             Stories of <span className="highlight">Trust & Excellence</span>
//           </h1>
          
//           <p className="reviews-subtitle">
//             For over 28 years, we've crafted not just furniture, but lifelong relationships with thousands of satisfied families
//           </p>

//           {/* Awards Section */}
//           <div className="reviews-awards">
//             {awards.map((award, index) => (
//               <div key={index} className="award-card">
//                 <div className="award-icon">{award.icon}</div>
//                 <div className="award-content">
//                   <h4>{award.title}</h4>
//                   <p>{award.year}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="reviews-stats">
//           {stats.map((stat, index) => (
//             <div key={index} className="stat-card">
//               <div className="stat-icon">{stat.icon}</div>
//               <div className="stat-number">{stat.number}</div>
//               <div className="stat-label">{stat.label}</div>
//               <div className="stat-subtext">{stat.subtext}</div>
//             </div>
//           ))}
//         </div>

//         {/* Featured Review */}
//         <div className="featured-review">
//           <div className="featured-review-header">
//             <div className="reviewer-main-info">
//               <div className={`reviewer-avatar ${reviews[currentIndex].avatarColor}`}>
//                 {reviews[currentIndex].name.charAt(0)}
//               </div>
//               <div>
//                 <div className="reviewer-details">
//                   <h3>{reviews[currentIndex].name}</h3>
//                   <div className="reviewer-badges">
//                     {reviews[currentIndex].verified && (
//                       <div className="verified-badge">
//                         <i>✓</i>
//                         <span>Verified Customer</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="reviewer-meta">
//                   <div className="meta-item">
//                     <i>📍</i>
//                     <span>{reviews[currentIndex].location}</span>
//                   </div>
//                   <div className="meta-item">
//                     <i>🕒</i>
//                     <span>{reviews[currentIndex].purchase}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="review-rating-date">
//               <div className="rating-stars">
//                 {renderStars(reviews[currentIndex].rating)}
//               </div>
//               <div className="review-date">{reviews[currentIndex].date}</div>
//             </div>
//           </div>

//           <div className="review-content">
//             <div className="quote-icon">"</div>
//             <p className="review-text">{reviews[currentIndex].comment}</p>
//           </div>

//           <div className="review-footer">
//             <div className="product-tag">
//               <span>Product:</span>
//               <strong>{reviews[currentIndex].product}</strong>
//             </div>
            
//             <div className="review-actions">
//               <button 
//                 className="action-button"
//                 onClick={() => shareReview(reviews[currentIndex])}
//                 title="Share this review"
//               >
//                 <i>📤</i>
//               </button>
//               <button 
//                 className="action-button"
//                 onClick={openWhatsApp}
//                 title="Share on WhatsApp"
//               >
//                 <i>💬</i>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Review Navigation */}
//         <div className="review-navigation">
//           <button className="nav-button" onClick={prevReview}>
//             ←
//           </button>
          
//           <div className="review-dots">
//             {reviews.map((_, idx) => (
//               <div
//                 key={idx}
//                 className={`dot ${idx === currentIndex ? 'active' : ''}`}
//                 onClick={() => setCurrentIndex(idx)}
//               />
//             ))}
//           </div>
          
//           <button className="nav-button" onClick={nextReview}>
//             →
//           </button>
//         </div>

      

//         {/* CTA Section */}
//         <div className="reviews-cta">
//           <div className="cta-top-line"></div>
          
//           <h2 className="cta-title">Share Your Experience</h2>
//           <p className="cta-subtitle">
//             Your feedback helps us improve and inspires others to experience our craftsmanship
//           </p>
          
//           <div className="cta-buttons">
//             <button 
//               className="cta-button cta-button-primary"
//               onClick={openWhatsApp}
//             >
//               <i>💬</i>
//               <span>Share on WhatsApp</span>
//             </button>
            
//             <button 
//               className="cta-button cta-button-secondary"
//               onClick={openGoogleReview}
//             >
//               <i>⭐</i>
//               <span>Write Google Review</span>
//             </button>
            
//             <button 
//               className="cta-button cta-button-tertiary"
//               onClick={openFacebookReview}
//             >
//               <i>👍</i>
//               <span>Facebook Review</span>
//             </button>
//           </div>
          
//           <p className="cta-privacy">
//             🔒 Your privacy is important. We only display first names and protect your personal information.
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default CustomerReviews




'use client'

import { useState, useRef, useEffect } from 'react'
import './CustomerReviews.css'

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef(null)

  const reviews = [
    {
      id: 1,
      name: "Rajesh Sharma",
      location: "Mumbai",
      rating: 5,
      comment: "10 saal se customer hun. Quality exceptional hai! Solid wood jo 1996 se banate aa rahe hain. Har baar same perfection.",
      date: "15 Jan 2024",
      product: "Teak Wood Bed",
      verified: true,
      purchase: "2 months ago",
      avatarColor: "avatar-gradient-1"
    },
    {
      id: 2,
      name: "Priya Patel",
      location: "Thane",
      rating: 5,
      comment: "Custom dining table perfect mila. Wood quality premium aur finishing flawless. Family ne bhi appreciate kiya.",
      date: "20 Feb 2024",
      product: "Custom Dining Table",
      verified: true,
      purchase: "1 month ago",
      avatarColor: "avatar-gradient-2"
    },
    {
      id: 3,
      name: "Amit Verma",
      location: "Navi Mumbai",
      rating: 5,
      comment: "Sheesham cabinet bahut solid. Carving aur finishing world-class. 1996 se trust justified. Highly recommended!",
      date: "10 Mar 2024",
      product: "Sheesham Cabinet",
      verified: true,
      purchase: "3 weeks ago",
      avatarColor: "avatar-gradient-3"
    },
    {
      id: 4,
      name: "Sunita Desai",
      location: "Kalyan",
      rating: 5,
      comment: "Complete home furniture banwaya. Budget friendly aur quality exceptional. Service timing bhi perfect thi.",
      date: "5 Apr 2024",
      product: "Home Set",
      verified: true,
      purchase: "2 weeks ago",
      avatarColor: "avatar-gradient-4"
    },
    {
      id: 5,
      name: "Vikram Singh",
      location: "Badlapur",
      rating: 5,
      comment: "Office main door unique design. Authentic wood. Har visitor puchta hai. Business image improve hua.",
      date: "28 Mar 2024",
      product: "Office Door",
      verified: true,
      purchase: "1 month ago",
      avatarColor: "avatar-gradient-5"
    },
    {
      id: 6,
      name: "Neha Kapoor",
      location: "Dombivli",
      rating: 5,
      comment: "Kids bedroom set bahut safe aur durable. No sharp edges, child-friendly finishing. Very happy!",
      date: "12 Apr 2024",
      product: "Kids Bedroom Set",
      verified: true,
      purchase: "1 week ago",
      avatarColor: "avatar-gradient-6"
    }
  ]

  const stats = [
    { 
      number: "4.9/5", 
      label: "Average Rating", 
      icon: "⭐", 
      subtext: "500+ Reviews" 
    },
    { 
      number: "5000+", 
      label: "Happy Families", 
      icon: "🏡", 
      subtext: "Since 1996" 
    },
    { 
      number: "28+", 
      label: "Years Experience", 
      icon: "🎯", 
      subtext: "Trusted Legacy" 
    },
    { 
      number: "98%", 
      label: "Repeat Customers", 
      icon: "🔄", 
      subtext: "Loyalty Score" 
    }
  ]

  const awards = [
    { 
      title: "Best Wood Craftsmanship", 
      year: "2023",
      icon: "🏆"
    },
    { 
      title: "Customer Choice Award", 
      year: "2022",
      icon: "👑"
    },
    { 
      title: "Premium Quality Certified", 
      year: "2021",
      icon: "⭐"
    }
  ]

  // Duplicate for infinite scroll like MaterialsSection
  const duplicatedReviews = [...reviews, ...reviews, ...reviews]

  // Auto-scroll effect - Same as MaterialsSection
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
          scrollContainer.scrollLeft = 0
        }
      }
      requestAnimationFrame(scroll)
    }

    const animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i 
        key={i} 
        className={`star-icon ${i < rating ? 'star-filled' : 'star-empty'}`}
      >
        ★
      </i>
    ))
  }

  const shareReview = (review) => {
    const text = `Check out this amazing review from ${review.name} for Maa Kripa Wood Art:\n"${review.comment}"\nRating: ${review.rating}/5\n\nVisit: maakripawoodart.com`
    
    if (navigator.share) {
      navigator.share({
        title: 'Customer Review - Maa Kripa Wood Art',
        text: text,
        url: window.location.href
      }).catch(console.error)
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => alert('Review copied to clipboard! Share it with your friends!'))
        .catch(() => {
          const textArea = document.createElement('textarea')
          textArea.value = text
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand('copy')
          document.body.removeChild(textArea)
          alert('Review copied to clipboard!')
        })
    }
  }

  const openWhatsApp = () => {
    window.open('https://wa.me/917028426042?text=Hi%20Maa%20Kripa%20Wood%20Art!%20I%20want%20to%20share%20my%20review%20and%20experience%20with%20your%20products.', '_blank')
  }

  const openGoogleReview = () => {
    window.open('https://g.page/r/CYxYZu6GQs5iEBM/review', '_blank')
  }

  const openFacebookReview = () => {
    window.open('https://www.facebook.com/maakripawoodart/reviews/', '_blank')
  }

  return (
    <section className="customer-reviews-section">
      <div className="reviews-container">
        
        {/* Header Section */}
        <div className="reviews-header">
          <div className="reviews-badge">
            <i>❤️</i>
            <span>CUSTOMER LOVE & TRUST</span>
          </div>
          
          <h1 className="reviews-title">
            Stories of <span className="highlight">Trust & Excellence</span>
          </h1>
          
          <p className="reviews-subtitle">
            For over 28 years, we've crafted not just furniture, but lifelong relationships with thousands of satisfied families
          </p>

          {/* Awards Section */}
          <div className="reviews-awards">
            {awards.map((award, index) => (
              <div key={index} className="award-card">
                <div className="award-icon">{award.icon}</div>
                <div className="award-content">
                  <h4>{award.title}</h4>
                  <p>{award.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="reviews-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-subtext">{stat.subtext}</div>
            </div>
          ))}
        </div>

        {/* Featured Review */}
        <div className="featured-review">
          <div className="featured-review-header">
            <div className="reviewer-main-info">
              <div className={`reviewer-avatar ${reviews[currentIndex].avatarColor}`}>
                {reviews[currentIndex].name.charAt(0)}
              </div>
              <div>
                <div className="reviewer-details">
                  <h3>{reviews[currentIndex].name}</h3>
                  <div className="reviewer-badges">
                    {reviews[currentIndex].verified && (
                      <div className="verified-badge">
                        <i>✓</i>
                        <span>Verified Customer</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="reviewer-meta">
                  <div className="meta-item">
                    <i>📍</i>
                    <span>{reviews[currentIndex].location}</span>
                  </div>
                  <div className="meta-item">
                    <i>🕒</i>
                    <span>{reviews[currentIndex].purchase}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="review-rating-date">
              <div className="rating-stars">
                {renderStars(reviews[currentIndex].rating)}
              </div>
              <div className="review-date">{reviews[currentIndex].date}</div>
            </div>
          </div>

          <div className="review-content">
            <div className="quote-icon">"</div>
            <p className="review-text">{reviews[currentIndex].comment}</p>
          </div>

          <div className="review-footer">
            <div className="product-tag">
              <span>Product:</span>
              <strong>{reviews[currentIndex].product}</strong>
            </div>
            
            <div className="review-actions">
              <button 
                className="action-button"
                onClick={() => shareReview(reviews[currentIndex])}
                title="Share this review"
              >
                <i>📤</i>
              </button>
              <button 
                className="action-button"
                onClick={openWhatsApp}
                title="Share on WhatsApp"
              >
                <i>💬</i>
              </button>
            </div>
          </div>
        </div>

        {/* Review Navigation */}
        <div className="review-navigation">
          <button className="nav-button" onClick={prevReview}>
            ←
          </button>
          
          <div className="review-dots">
            {reviews.map((_, idx) => (
              <div
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
          
          <button className="nav-button" onClick={nextReview}>
            →
          </button>
        </div>

        {/* Auto-scrolling Reviews Grid - Simple like MaterialsSection */}
        <div className="scrollable-reviews-section">
          <div className="scroll-container-wrapper">
            <div 
              className="scroll-container"
              ref={scrollContainerRef}
            >
              {duplicatedReviews.map((review, index) => (
                <div 
                  key={`${review.id}-${index}`}
                  className="scroll-review-card"
                >
                  <div className="scroll-card-header">
                    <div className="scroll-reviewer-info">
                      <div className={`scroll-avatar ${review.avatarColor}`}>
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4>{review.name}</h4>
                        <div className="scroll-reviewer-location">
                          <i>📍</i>
                          <span>{review.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="scroll-rating">
                        {renderStars(review.rating)}
                      </div>
                      <div className="scroll-date">{review.date}</div>
                    </div>
                  </div>
                  
                  <p className="scroll-review-text">
                    "{review.comment.substring(0, 120)}..."
                  </p>
                  
                  <div className="scroll-card-footer">
                    <div className="scroll-product-tag">
                      {review.product}
                    </div>
                    <button
                      className="scroll-action-button"
                      onClick={() => shareReview(review)}
                      title="Share this review"
                    >
                      <i>↗️</i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="reviews-cta">
          <div className="cta-top-line"></div>
          
          <h2 className="cta-title">Share Your Experience</h2>
          <p className="cta-subtitle">
            Your feedback helps us improve and inspires others to experience our craftsmanship
          </p>
          
          <div className="cta-buttons">
            <button 
              className="cta-button cta-button-primary"
              onClick={openWhatsApp}
            >
              <i>💬</i>
              <span>Share on WhatsApp</span>
            </button>
            
            <button 
              className="cta-button cta-button-secondary"
              onClick={openGoogleReview}
            >
              <i>⭐</i>
              <span>Write Google Review</span>
            </button>
            
            <button 
              className="cta-button cta-button-tertiary"
              onClick={openFacebookReview}
            >
              <i>👍</i>
              <span>Facebook Review</span>
            </button>
          </div>
          
          <p className="cta-privacy">
            🔒 Your privacy is important. We only display first names and protect your personal information.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews
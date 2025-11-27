'use client'
import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [currentStat, setCurrentStat] = useState({ categories: 0, customers: 0, experience: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef(null)
  const fullText = "Premium Wooden Doors & Windows"
  const typeSpeed = 100
  const eraseSpeed = 50
  const pauseTime = 2000

  useEffect(() => {
    // Start animations
    setIsVisible(true)
    startTypewriter()
    setupIntersectionObserver()
  }, [])

  const startTypewriter = () => {
    let currentIndex = 0
    let isDeleting = false
    let currentText = ''

    const type = () => {
      if (isDeleting) {
        currentText = fullText.substring(0, currentIndex - 1)
        currentIndex--
      } else {
        currentText = fullText.substring(0, currentIndex + 1)
        currentIndex++
      }

      setDisplayText(currentText)

      let typeDelay = isDeleting ? eraseSpeed : typeSpeed

      if (!isDeleting && currentText === fullText) {
        typeDelay = pauseTime
        isDeleting = true
      } else if (isDeleting && currentText === '') {
        isDeleting = false
        currentIndex = 0
      }

      setTimeout(type, typeDelay)
    }

    type()
  }

  const setupIntersectionObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounterAnimation()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }
  }

  const startCounterAnimation = () => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let categoriesCount = 0
    const categoriesStep = 50 / steps

    let customersCount = 0
    const customersStep = 1000 / steps

    let experienceCount = 0
    const experienceStep = 15 / steps

    const counterInterval = setInterval(() => {
      categoriesCount += categoriesStep
      customersCount += customersStep
      experienceCount += experienceStep

      if (categoriesCount >= 50) categoriesCount = 50
      if (customersCount >= 1000) customersCount = 1000
      if (experienceCount >= 15) experienceCount = 15

      setCurrentStat({
        categories: Math.floor(categoriesCount),
        customers: Math.floor(customersCount),
        experience: Math.floor(experienceCount)
      })

      if (categoriesCount >= 50 && customersCount >= 1000 && experienceCount >= 15) {
        clearInterval(counterInterval)
      }
    }, stepDuration)
  }

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories')
    if (categoriesSection) {
      categoriesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Door images data
  const doorImages = [
    { id: 1, src: '/images/doors/1.png', alt: 'Luxury Wooden Door 1' },
    { id: 2, src: '/images/doors/Cunningham-Door-2.jpg', alt: 'Luxury Wooden Door 2' },
    { id: 3, src: '/images/doors/3.png', alt: 'Luxury Wooden Door 3' },
    { id: 4, src: '/images/doors/4.png', alt: 'Luxury Wooden Door 4' },
    { id: 5, src: '/images/doors/5.png', alt: 'Luxury Wooden Door 5' },
    { id: 6, src: '/images/doors/door3.jpg', alt: 'Luxury Wooden Door 6' }
  ]

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Side - Content (40%) - Thoda bada kiya */}
        <div className="hero-content">
          <h1 className="typewriter-text">
            {displayText}
            <span className="cursor">|</span>
          </h1>
          <p className="fade-in-text">
            India's trusted manufacturer of luxury wooden doors with 50+ specialized categories
          </p>
          <button
            className="cta-button pulse-animation"
            onClick={scrollToCategories}
          >
            Explore 50+ Categories
            <i className="fas fa-arrow-right"></i>
          </button>

          {/* Stats */}
          <div className="hero-stats" ref={statsRef}>
            <div className="hero-stat">
              <span className="hero-stat-number count-animation">
                {currentStat.categories}+
              </span>
              <div className="hero-stat-label">Door Categories</div>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number count-animation">
                {currentStat.customers}+
              </span>
              <div className="hero-stat-label">Happy Customers</div>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number count-animation">
                {currentStat.experience}+
              </span>
              <div className="hero-stat-label">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Right Side - Compact Swiper Slider (60%) - Chhota kiya */}
        <div className="hero-slider">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            effect="fade"
            speed={1000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            loop={true}
            className="door-swiper"
          >
            {doorImages.map((door) => (
              <SwiperSlide key={door.id}>
                <div className="slide-image">
                  <img
                    src={door.src}
                    alt={door.alt}
                    loading="eager"
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation Buttons */}
            <div className="swiper-button-prev">
              <i className="fas fa-chevron-left"></i>
            </div>
            <div className="swiper-button-next">
              <i className="fas fa-chevron-right"></i>
            </div>
          </Swiper>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator"></div>
    </section>
  )
}
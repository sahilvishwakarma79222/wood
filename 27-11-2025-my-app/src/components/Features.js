'use client'
import { useEffect, useState, useRef } from 'react'

const featuresData = [
  {
    icon: 'fas fa-tree',
    title: '50+ Wood Types',
    description: 'Teak, Sagwan, Sheesham, Burma Teak & more'
  },
  {
    icon: 'fas fa-palette',
    title: 'Custom Designs',
    description: 'Personalized carvings & finishes'
  },
  {
    icon: 'fas fa-shield-alt',
    title: '10 Years Warranty',
    description: 'Quality assurance guarantee'
  },
  {
    icon: 'fas fa-truck',
    title: 'All India Delivery',
    description: 'Free shipping & installation'
  }
]

const statsData = [
  { number: 50, label: 'Door Categories' },
  { number: 1000, label: 'Happy Customers' },
  { number: 15, label: 'Years Experience' },
  { number: 28, label: 'States Covered' }
]

export default function Features() {
  const [currentStats, setCurrentStats] = useState({
    categories: 0,
    customers: 0,
    experience: 0,
    states: 0
  })
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounterAnimation()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const startCounterAnimation = () => {
    const duration = 1500
    const steps = 50
    const stepDuration = duration / steps

    const counters = {
      categories: 0,
      customers: 0,
      experience: 0,
      states: 0
    }

    const stepsValue = {
      categories: 50 / steps,
      customers: 1000 / steps,
      experience: 15 / steps,
      states: 28 / steps
    }

    const counterInterval = setInterval(() => {
      counters.categories += stepsValue.categories
      counters.customers += stepsValue.customers
      counters.experience += stepsValue.experience
      counters.states += stepsValue.states

      if (counters.categories >= 50) counters.categories = 50
      if (counters.customers >= 1000) counters.customers = 1000
      if (counters.experience >= 15) counters.experience = 15
      if (counters.states >= 28) counters.states = 28

      setCurrentStats({
        categories: Math.floor(counters.categories),
        customers: Math.floor(counters.customers),
        experience: Math.floor(counters.experience),
        states: Math.floor(counters.states)
      })

      if (
        counters.categories >= 50 &&
        counters.customers >= 1000 &&
        counters.experience >= 15 &&
        counters.states >= 28
      ) {
        clearInterval(counterInterval)
      }
    }, stepDuration)
  }

  return (
    <section className="features-section" ref={sectionRef}>
      <div className="container">
        <h2>Why Choose Our Wooden Doors?</h2>
        
        {/* Compact Features Row */}
        <div className="features-compact">
          {featuresData.map((feature, index) => (
            <div key={index} className="feature-compact">
              <i className={feature.icon}></i>
              <div className="feature-text">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Stats Row */}
        <div className="stats-compact">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-compact">
              <span className="stat-number">
                {stat.number === 28 ? currentStats.states : 
                 stat.number === 50 ? currentStats.categories :
                 stat.number === 1000 ? currentStats.customers :
                 currentStats.experience}+
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
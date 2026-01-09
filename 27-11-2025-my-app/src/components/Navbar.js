'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import './navbar.css'

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef(null)
  const mobileToggleRef = useRef(null)

  const menuData = {
    products: [
      { name: 'Main Door', href: '/main-door' },
      { name: 'Room Door', href: '/room-door' },
      { name: 'Bathroom Door', href: '/bathroom-door' },
      { name: 'Office Door', href: '/office-door' }
    ],
    materials: [
      { name: 'Teak Wood', href: '/categories/teak-wood' },
      { name: 'Sagwan Wood', href: '/categories/sagwan-wood' },
      { name: 'Sheesham Wood', href: '/categories/sheesham-wood' },
      { name: 'Engineered Wood', href: '/categories/engineered-wood' }
    ],
    categories: [
      {
        name: 'By Wood Type',
        href: '/explore-categories?type=wood-type',
        submenu: [
          { name: 'Teak Wood', href: '/explore-designs/teak-wood' },
          { name: 'Sagwan Wood', href: '/explore-designs/sagwan-wood' },
          { name: 'Sheesham Wood', href: '/explore-designs/sheesham-wood' },
          { name: 'Sal Wood', href: '/explore-designs/sal-wood' },
          { name: 'Oak Wood', href: '/explore-designs/oak-wood' },
          { name: 'Mahogany', href: '/explore-designs/mahogany' }
        ]
      },
      {
        name: 'By Usage',
        href: '/explore-categories?type=usage',
        submenu: [
          { name: 'Main Entrance', href: '/explore-designs/main-entrance' },
          { name: 'Bedroom Doors', href: '/explore-designs/bedroom' },
          { name: 'Bathroom Doors', href: '/explore-designs/bathroom' },
          { name: 'Kitchen Doors', href: '/explore-designs/kitchen' },
          { name: 'Office Doors', href: '/explore-designs/office' },
          { name: 'Balcony Doors', href: '/explore-designs/balcony' }
        ]
      }
    ]
  }

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu clicked, current state:', isMobileOpen)
    const newState = !isMobileOpen
    setIsMobileOpen(newState)
    
    if (!newState) {
      // Closing menu
      document.body.classList.remove('no-scroll')
      setActiveDropdown(null)
    } else {
      // Opening menu
      document.body.classList.add('no-scroll')
    }
  }

  const toggleDropdown = (dropdownName) => {
    console.log('Toggle dropdown:', dropdownName)
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdownName)
    }
  }

  const closeMobileMenu = () => {
    console.log('Closing mobile menu')
    setIsMobileOpen(false)
    setActiveDropdown(null)
    document.body.classList.remove('no-scroll')
  }

  const handleLinkClick = () => {
    closeMobileMenu()
  }

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  // Click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileOpen &&
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        mobileToggleRef.current &&
        !mobileToggleRef.current.contains(event.target)
      ) {
        closeMobileMenu()
      }
    }

    // Escape key to close menu
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMobileOpen) {
        closeMobileMenu()
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)
    
    // Close mobile menu on resize to desktop
    const handleResize = () => {
      if (window.innerWidth > 1023 && isMobileOpen) {
        closeMobileMenu()
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
      window.removeEventListener('resize', handleResize)
      document.body.classList.remove('no-scroll')
    }
  }, [isMobileOpen])

  // Debug log
  useEffect(() => {
    console.log('Mobile menu state:', isMobileOpen)
  }, [isMobileOpen])

  return (
    <>
      <nav className={`navbar ${isMobileOpen ? 'nav-mobile-active' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
         
          <div className="nav-logo">
            <Link href="/" className="logo" onClick={handleLinkClick}>
              <div className="logo-horizontal">
                <img
                  src="/images/logo/3.png"
                  alt="Woods Arts Logo"
                  className="logo-img logo-img-1"
                  width="70"
                  height="70"
                />

                <div className="logo-text-wrapper">
                  <img
                    src="/images/logo/2.png"
                    alt="Woods Arts Logo Symbol"
                    className="logo-img logo-img-2"
                    width="65"
                    height="58"
                  />
                  <span className="logo-text">
                    Woods Arts
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Menu - Hidden on Mobile */}
          <div className="nav-menu">
            <ul>
              <li><Link href="/">Home</Link></li>

              <li className="dropdown">
                <a className="dropdown-toggle">Products <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu">
                  {menuData.products.map(item => (
                    <Link key={item.href} href={item.href}>{item.name}</Link>
                  ))}
                </div>
              </li>

              <li className="dropdown">
                <a className="dropdown-toggle">Materials <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu">
                  {menuData.materials.map(item => (
                    <Link key={item.href} href={item.href}>{item.name}</Link>
                  ))}
                </div>
              </li>

              <li className="dropdown mega-dropdown">
                <a className="dropdown-toggle">Categories <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu mega-menu">
                  <div className="mega-menu-content">
                    <div className="mega-menu-header">
                      <h3>Browse All Categories</h3>
                      <p>Explore our extensive collection of wooden doors</p>
                    </div>

                    <div className="mega-menu-grid">
                      <div className="mega-menu-column">
                        <h4>By Wood Type</h4>
                        {menuData.categories[0].submenu.map(item => (
                          <Link key={item.href} href={item.href} className="mega-menu-item">
                            <span className="item-icon">🪵</span>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>

                      <div className="mega-menu-column">
                        <h4>By Usage</h4>
                        {menuData.categories[1].submenu.map(item => (
                          <Link key={item.href} href={item.href} className="mega-menu-item">
                            <span className="item-icon">🚪</span>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mega-menu-footer">
                      <Link href="/sahilcategory" className="view-all-btn">
                        <span>sahil Categories</span>
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          {/* Contact Section - Hidden on Mobile */}
          <div className="nav-contact">
            <a href="tel:+918007747733" className="nav-phone">
              <i className="fas fa-phone"></i>
              <span>+91 8007747733</span>
            </a>
            <Link href="/contact" className="nav-cta">
              Get Quote
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            ref={mobileToggleRef}
            className="mobile-toggle" 
            onClick={toggleMobileMenu}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`mobile-menu ${isMobileOpen ? 'active' : ''}`}
        style={{ 
          right: isMobileOpen ? '0' : '-100%',
          display: isMobileOpen ? 'flex' : 'none'
        }}
      >
        <div className="mobile-header">
          <div className="mobile-logo">
            <div className="logo-icon">🚪</div>
            <span>Woods Arts</span>
          </div>
          <button 
            className="mobile-close" 
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="mobile-phone-section">
          <a href="tel:+918007747733" className="mobile-phone">
            <i className="fas fa-phone"></i>
            <div>
              <div>Call Now</div>
              <div>+91 8007747733</div>
            </div>
          </a>
        </div>

        <nav className="mobile-nav">
          <Link href="/" onClick={handleLinkClick}>Home</Link>

          <div className="mobile-dropdown">
            <button 
              onClick={() => toggleDropdown('products')} 
              aria-expanded={activeDropdown === 'products'}
            >
              Products <i className={`fas fa-chevron-${activeDropdown === 'products' ? 'up' : 'down'}`}></i>
            </button>
            {activeDropdown === 'products' && (
              <div className="mobile-dropdown-menu">
                {menuData.products.map(item => (
                  <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mobile-dropdown">
            <button 
              onClick={() => toggleDropdown('materials')} 
              aria-expanded={activeDropdown === 'materials'}
            >
              Materials <i className={`fas fa-chevron-${activeDropdown === 'materials' ? 'up' : 'down'}`}></i>
            </button>
            {activeDropdown === 'materials' && (
              <div className="mobile-dropdown-menu">
                {menuData.materials.map(item => (
                  <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mobile-dropdown">
            <button 
              onClick={() => toggleDropdown('categories')} 
              aria-expanded={activeDropdown === 'categories'}
            >
              Categories <i className={`fas fa-chevron-${activeDropdown === 'categories' ? 'up' : 'down'}`}></i>
            </button>
            {activeDropdown === 'categories' && (
              <div className="mobile-dropdown-menu">
                <div className="mobile-subcategory">
                  <div className="subcategory-title">By Wood Type</div>
                  {menuData.categories[0].submenu.map(item => (
                    <Link key={item.href} href={item.href} onClick={handleLinkClick} className="mobile-subcategory-item">
                      <span className="item-icon">🪵</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="mobile-subcategory">
                  <div className="subcategory-title">By Usage</div>
                  {menuData.categories[1].submenu.map(item => (
                    <Link key={item.href} href={item.href} onClick={handleLinkClick} className="mobile-subcategory-item">
                      <span className="item-icon">🚪</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                <Link href="/explore-categories" onClick={handleLinkClick} className="mobile-view-all">
                  <span>View All Categories</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            )}
          </div>

          <Link href="/gallery" onClick={handleLinkClick}>Gallery</Link>
          <Link href="/about" onClick={handleLinkClick}>About</Link>
          <Link href="/contact" className="mobile-cta" onClick={handleLinkClick}>
            Get Free Quote
          </Link>
        </nav>
      </div>

      {/* Backdrop - Always render but control with CSS */}
      <div 
        className={`mobile-backdrop ${isMobileOpen ? 'active' : ''}`}
        style={{ display: isMobileOpen ? 'block' : 'none' }}
        onClick={closeMobileMenu}
      ></div>
    </>
  )
}
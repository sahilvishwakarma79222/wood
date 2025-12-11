'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const menuData = {
    products: [
      { name: 'Main Door', href: '/main-door' },
      { name: 'Room Door', href: '/room-door' },
      { name: 'Bathroom Door', href: '/bathroom-door' },
      { name: 'Office Door', href: '/office-door' }
    ],
    materials: [
      { name: 'Teak Wood', href: '/teak-wood' },
      { name: 'Sagwan Wood', href: '/sagwan-wood' },
      { name: 'Sheesham Wood', href: '/sheesham-wood' },
      { name: 'Engineered Wood', href: '/engineered-wood' }
    ],
    designs: [
      { name: 'Modern', href: '/modern' },
      { name: 'Traditional', href: '/traditional' },
      { name: 'Carved', href: '/carved' },
      { name: 'Minimalist', href: '/minimalist' }
    ]
  }

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen)
    if (!isMobileOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
      setActiveDropdown(null)
    }
  }

  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdownName)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileOpen(false)
    setActiveDropdown(null)
    document.body.classList.remove('no-scroll')
  }

  const handleLinkClick = () => {
    closeMobileMenu()
  }

  useEffect(() => {
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <>
      <nav className={`navbar ${isMobileOpen ? 'nav-mobile-active' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <Link href="/" className="logo">
              <div className="logo-text">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "40px",       // ⭐ Image jitna chahte ho, utna height yahan set karo
                  }}
                >
                  <img
                    src="/images/logo/1.png"
                    alt="Logo"
                    style={{
                      height: "100px",
                      width: "auto",
                    }}
                  />
                </span>

                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#6b4f2d",
                    letterSpacing: "1px",
                  }}
                >
                  Woods Arts
                </span>              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="nav-menu">
            <ul>
              <li><Link href="/">Home</Link></li>

              <li className="dropdown">
                <a>Products <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu">
                  {menuData.products.map(item => (
                    <Link key={item.href} href={item.href}>{item.name}</Link>
                  ))}
                </div>
              </li>

              <li className="dropdown">
                <a>Materials <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu">
                  {menuData.materials.map(item => (
                    <Link key={item.href} href={item.href}>{item.name}</Link>
                  ))}
                </div>
              </li>

              <li className="dropdown">
                <a>Designs <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu">
                  {menuData.designs.map(item => (
                    <Link key={item.href} href={item.href}>{item.name}</Link>
                  ))}
                </div>
              </li>

              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="nav-contact">
            <a href="tel:+919876543210" className="nav-phone">
              <i className="fas fa-phone"></i>
              <span>+91 8007747733</span>
            </a>
            <Link href="/contact" className="nav-cta">
              Get Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="mobile-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="mobile-menu">
          <div className="mobile-header">
            <div className="mobile-logo">
              <div className="logo-icon">🚪</div>
              <span>Shree Doors</span>
            </div>
            <button className="mobile-close" onClick={closeMobileMenu}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="mobile-phone-section">
            <a href="tel:+919876543210" className="mobile-phone">
              <i className="fas fa-phone"></i>
              <div>
                <div>Call Now</div>
                <div>+91 98765 43210</div>
              </div>
            </a>
          </div>

          <nav className="mobile-nav">
            <Link href="/" onClick={handleLinkClick}>Home</Link>

            <div className="mobile-dropdown">
              <button onClick={() => toggleDropdown('products')}>
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
              <button onClick={() => toggleDropdown('materials')}>
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
              <button onClick={() => toggleDropdown('designs')}>
                Designs <i className={`fas fa-chevron-${activeDropdown === 'designs' ? 'up' : 'down'}`}></i>
              </button>
              {activeDropdown === 'designs' && (
                <div className="mobile-dropdown-menu">
                  {menuData.designs.map(item => (
                    <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                      {item.name}
                    </Link>
                  ))}
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
      )}

      {/* Backdrop */}
      {isMobileOpen && (
        <div className="mobile-backdrop" onClick={closeMobileMenu}></div>
      )}
    </>
  )
}
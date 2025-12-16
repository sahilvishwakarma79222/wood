'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import './navbar.css' // CSS file import

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
      { name: 'Teak Wood', href: '/categories/teak-wood' },
      { name: 'Sagwan Wood', href: '/categories/sagwan-wood' },
      { name: 'Sheesham Wood', href: '/categories/sheesham-wood' },
      { name: 'Engineered Wood', href: '/categories/engineered-wood' }
    ],
    // Designs section removed
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
      },
      {
        name: 'View All Categories',
        href: '/explore-categories',
        highlight: true
      }
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
         
          <div className="nav-logo">
            <Link href="/" className="logo">
              <div className="logo-horizontal">
                {/* पहली image */}
                <img
                  src="/images/logo/3.png"
                  alt="Logo 1"
                  className="logo-img logo-img-1"
                />

                {/* दूसरी image और text */}
                <div className="logo-text-wrapper">
                  <img
                    src="/images/logo/2.png"
                    alt="Logo 2"
                    className="logo-img logo-img-2"
                  />
                  <span className="logo-text">
                    Woods Arts
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="nav-menu">
            <ul>
              <li><Link href="/">Home</Link></li>

              {/* Products Dropdown */}
              <li className="dropdown">
                <a>Products <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu">
                  {menuData.products.map(item => (
                    <Link key={item.href} href={item.href}>{item.name}</Link>
                  ))}
                </div>
              </li>

              {/* Materials Dropdown */}
              <li className="dropdown">
                <a>Materials <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu">
                  {menuData.materials.map(item => (
                    <Link key={item.href} href={item.href}>{item.name}</Link>
                  ))}
                </div>
              </li>

              {/* NEW: Categories Dropdown with Mega Menu */}
              <li className="dropdown mega-dropdown">
                <a>Categories <i className="fas fa-chevron-down"></i></a>
                <div className="dropdown-menu mega-menu">
                  <div className="mega-menu-content">
                    <div className="mega-menu-header">
                      <h3>Browse All Categories</h3>
                      <p>Explore our extensive collection of wooden doors</p>
                    </div>

                    <div className="mega-menu-grid">
                      {/* Wood Type Categories */}
                      <div className="mega-menu-column">
                        <h4>By Wood Type</h4>
                        {menuData.categories[0].submenu.map(item => (
                          <Link key={item.href} href={item.href} className="mega-menu-item">
                            <span className="item-icon">🪵</span>
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Usage Categories */}
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

          {/* Contact Section */}
          <div className="nav-contact">
            <a href="tel:+918007747733" className="nav-phone">
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
              <span>Woods Arts</span>
            </div>
            <button className="mobile-close" onClick={closeMobileMenu}>
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

            {/* Products Dropdown - Mobile */}
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

            {/* Materials Dropdown - Mobile */}
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

            {/* NEW: Categories Dropdown - Mobile */}
            <div className="mobile-dropdown">
              <button onClick={() => toggleDropdown('categories')}>
                Categories <i className={`fas fa-chevron-${activeDropdown === 'categories' ? 'up' : 'down'}`}></i>
              </button>
              {activeDropdown === 'categories' && (
                <div className="mobile-dropdown-menu">
                  {/* Wood Type */}
                  <div className="mobile-subcategory">
                    <div className="subcategory-title">By Wood Type</div>
                    {menuData.categories[0].submenu.map(item => (
                      <Link key={item.href} href={item.href} onClick={handleLinkClick} className="mobile-subcategory-item">
                        <span className="item-icon">🪵</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Usage */}
                  <div className="mobile-subcategory">
                    <div className="subcategory-title">By Usage</div>
                    {menuData.categories[1].submenu.map(item => (
                      <Link key={item.href} href={item.href} onClick={handleLinkClick} className="mobile-subcategory-item">
                        <span className="item-icon">🚪</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* View All Link */}
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
      )}

      {/* Backdrop */}
      {isMobileOpen && (
        <div className="mobile-backdrop" onClick={closeMobileMenu}></div>
      )}
    </>
  )
}
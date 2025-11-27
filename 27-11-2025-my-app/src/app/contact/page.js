'use client'
import { useState } from 'react'

const contactStyles = `
  .contact-page {
    padding: 80px 0 30px;
    background: var(--light-gray);
    min-height: 100vh;
  }

  .contact-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .contact-header h1 {
    color: var(--primary-black);
    font-size: var(--text-3xl);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .contact-header p {
    color: var(--dark-gray);
    font-size: var(--text-base);
    max-width: 500px;
    margin: 0 auto;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .contact-info {
    background: var(--white);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 3px 15px rgba(0,0,0,0.08);
    border: 1px solid rgba(200, 169, 126, 0.1);
  }

  .contact-info h2 {
    color: var(--primary-black);
    font-size: var(--text-xl);
    margin-bottom: 1.5rem;
    font-weight: 700;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .contact-info h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-gold), var(--secondary-gold));
    border-radius: 1px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.2rem;
    padding: 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }

  .contact-item:hover {
    background: var(--light-gray);
    border-color: rgba(200, 169, 126, 0.2);
    transform: translateY(-1px);
  }

  .contact-icon {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, var(--primary-gold), var(--secondary-gold));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-black);
    font-size: 1.1rem;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  .contact-item:hover .contact-icon {
    transform: scale(1.05);
  }

  .contact-item h3 {
    color: var(--primary-black);
    font-size: var(--text-base);
    margin-bottom: 0.3rem;
    font-weight: 600;
  }

  .contact-item p {
    color: var(--dark-gray);
    font-size: var(--text-sm);
    margin: 0;
    line-height: 1.4;
  }

  .contact-form {
    background: var(--white);
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 3px 15px rgba(0,0,0,0.08);
    border: 1px solid rgba(200, 169, 126, 0.1);
  }

  .contact-form h2 {
    color: var(--primary-black);
    font-size: var(--text-xl);
    margin-bottom: 1.5rem;
    font-weight: 700;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .contact-form h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, var(--primary-gold), var(--secondary-gold));
    border-radius: 1px;
  }

  .form-group {
    margin-bottom: 1.2rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--primary-black);
    font-size: var(--text-sm);
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--medium-gray);
    border-radius: 6px;
    font-size: var(--text-sm);
    transition: all 0.3s ease;
    background: var(--white);
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary-gold);
    box-shadow: 0 0 0 2px rgba(200, 169, 126, 0.1);
  }

  .form-group textarea {
    height: 100px;
    resize: vertical;
    line-height: 1.4;
  }

  .submit-btn {
    background: linear-gradient(135deg, var(--primary-gold), var(--secondary-gold));
    color: var(--primary-black);
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    width: 100%;
    font-size: var(--text-base);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .submit-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(200, 169, 126, 0.3);
  }

  .submit-btn:active {
    transform: translateY(0);
  }

  .map-container {
    margin-top: 2rem;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 3px 15px rgba(0,0,0,0.08);
    border: 1px solid rgba(200, 169, 126, 0.1);
  }

  .map-placeholder {
    height: 300px;
    background: linear-gradient(135deg, var(--light-gray), var(--medium-gray));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--dark-gray);
    font-size: var(--text-base);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .contact-page {
      padding: 70px 0 20px;
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .contact-info,
    .contact-form {
      padding: 1.2rem;
    }

    .contact-item {
      padding: 0.8rem;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .contact-icon {
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }

    .contact-header h1 {
      font-size: var(--text-2xl);
    }

    .contact-header p {
      font-size: var(--text-sm);
    }
  }

  @media (max-width: 480px) {
    .contact-info,
    .contact-form {
      padding: 1rem;
    }

    .contact-item {
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
      padding: 0.8rem 0.5rem;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 8px 10px;
    }

    .map-placeholder {
      height: 250px;
      font-size: var(--text-sm);
    }

    .submit-btn {
      padding: 10px 20px;
    }
  }
`

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      console.log('Form submitted:', formData)
      alert('Thank you for your inquiry! We will contact you soon.')
      setFormData({ name: '', email: '', phone: '', category: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <style jsx>{contactStyles}</style>
      <div className="contact-page">
        <div className="container">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Get in touch with our door experts for personalized consultation</p>
          </div>

          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Get In Touch</h2>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h3>Visit Our Showroom</h3>
                  <p>123 Wood Street, Furniture District, Mumbai</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h3>Call Us</h3>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3>Email Us</h3>
                  <p>info@shreedoors.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h3>Working Hours</h3>
                  <p>Mon-Sat: 9AM-7PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2>Send Inquiry</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Door Category</label>
                  <select 
                    id="category"
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="teak">Teak Wood Doors</option>
                    <option value="sagwan">Sagwan Wood Doors</option>
                    <option value="main-entrance">Main Entrance Doors</option>
                    <option value="room">Room Doors</option>
                    <option value="custom">Custom Doors</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-container">
            <div className="map-placeholder">
              <div style={{ textAlign: 'center' }}>
                <i className="fas fa-map" style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary-gold)' }}></i>
                <p>Google Maps<br /><small>Our Showroom Location</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
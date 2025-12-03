"use client";

import { useState } from "react";
import Image from "next/image";
import './FindTheRightFit.css'


function FindTheRightFit() {
  const [selectedDoor, setSelectedDoor] = useState(null);

  const doors = [
    { 
      title: "Single Doors", 
      img: "/images/RightFit/5.png",
      description: "Perfect for standard doorways with elegant single panel design",
      features: ["Standard size", "Single panel", "Easy installation"]
    },
    { 
      title: "Single Doors with One Sidelite", 
      img: "/images/RightFit/6.png",
      description: "Enhanced entrance with natural light from side window",
      features: ["Side window", "More light", "Enhanced view"]
    },
    { 
      title: "Single Door with Two Sidelites", 
      img: "/images/RightFit/7.png",
      description: "Maximum light and grand entrance with dual sidelites",
      features: ["Dual windows", "Maximum light", "Grand entrance"]
    },
    { 
      title: "Double Doors", 
      img: "/images/RightFit/8.png",
      description: "Wide entrance perfect for main entries and spacious areas",
      features: ["Double width", "Grand entrance", "Wide opening"]
    },
  ];

  return (
    <section className="rightfit-section">
      <div className="rightfit-background">
        <div className="bg-grid">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="grid-cell" />
          ))}
        </div>
      </div>

      <div className="rightfit-container">
        {/* Header Section - Compact */}
        <div className="rightfit-header">
          <div className="title-wrapper">
            <span className="pre-title">DOOR TYPES</span>
            <h2 className="rightfit-heading">
              Find Your <span className="gradient-text">Perfect Fit</span>
            </h2>
            <div className="heading-underline">
              <div className="underline-dot"></div>
            </div>
          </div>

          <p className="rightfit-subheading">
            Select the door configuration that matches your requirements
          </p>
        </div>

        {/* Door Selection Grid - Compact */}
        <div className="rightfit-grid">
          {doors.map((door, index) => (
            <div 
              key={index}
              className={`rightfit-card ${selectedDoor === index ? 'selected' : ''}`}
              onClick={() => setSelectedDoor(index)}
              style={{ '--card-index': index }}
            >
              {/* Card Glow Effect */}
              <div className="card-glow"></div>
              
              {/* Door Image Container */}
              <div className="rightfit-imageWrapper">
                <div className="image-frame">
                  <div className="image-container">
                    <Image
                      src={door.img}
                      alt={door.title}
                      width={280}
                      height={320}
                      className="rightfit-image"
                    />
                    <div className="image-overlay"></div>
                  </div>
                </div>
              </div>

              {/* Door Info */}
              <div className="door-info">
                <div className="door-type">
                  <span className="type-label">TYPE</span>
                  <span className="type-number">0{index + 1}</span>
                </div>
                
                <button className="rightfit-button">
                  <span className="button-text">{door.title}</span>
                  <span className="button-arrow">→</span>
                </button>

                <div className="door-features">
                  {door.features.map((feature, i) => (
                    <div key={i} className="feature-tag">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Compact */}
        <div className="rightfit-cta">
          <div className="cta-content">
            <p className="cta-text">Need a custom design?</p>
            <button className="cta-button">
              Get Custom Quote
              <span className="cta-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FindTheRightFit;
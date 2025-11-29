"use client";
import { useRef, useEffect, useState } from "react";

const Carousel = ({ images = [] }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children);
    const containerCenter = container.offsetWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2 - containerRect.left;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollInterval = setInterval(() => {
      container.scrollBy({
        left: container.offsetWidth / 5,
        behavior: "smooth",
      });
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  const styles = {
    carouselWrapper: {
      position: "relative",
      width: "100%",
      paddingTop: "50px", // top padding to avoid cutting images
      paddingBottom: "120px", // bottom space for platform shadow
      overflow: "visible",
      marginTop: "2rem",
    },
    container: {
      display: "flex",
      overflowX: "auto",
      overflowY: "visible",
      scrollBehavior: "smooth",
      scrollSnapType: "x mandatory",
      gap: "0.5rem",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      padding: "0 1rem",
    },
    item: {
      flexShrink: 0,
      width: "calc(20% - 0.4rem)", // 5 items visible
      scrollSnapAlign: "center",
      transition: "transform 0.3s, opacity 0.3s",
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "auto", // responsive height
      maxHeight: "500px", // optional max height
      objectFit: "cover",
      borderRadius: "1rem",
    },
    platform: {
      position: "absolute",
      bottom: "-1%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "85%",
      height: "30px",
      background: "#828181",
      borderRadius: "50%",
      filter: "blur(7px)",
      boxShadow: "0px 15px 40px rgba(0,0,0,0.6)",
     
    },
    arrowButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "#FEF3C7",
      border: "none",
      borderRadius: "50%",
      padding: "0.75rem",
      cursor: "pointer",
      fontSize: "1.25rem",
      zIndex: 10,
    },
    leftArrow: { left: "0.5rem" },
    rightArrow: { right: "0.5rem" },
    label: {
      position: "absolute",
      top: "15px",
      left: "20px",
      backgroundColor: "rgba(0,0,0,0.6)",
      color: "#fff",
      padding: "5px 15px",
      borderRadius: "15px",
      fontSize: "14px",
      fontWeight: "500",
      whiteSpace: "nowrap",
    },
  };

  return (
    <div style={styles.carouselWrapper}>
      <div ref={containerRef} style={styles.container}>
        {images.map((img, index) => {
          let scale = 0.85;
          if (index === activeIndex) scale = 1;
          else if (index === activeIndex - 1 || index === activeIndex + 1) scale = 0.75;
          else if (index === activeIndex - 2 || index === activeIndex + 2) scale = 0.6;

          return (
            <div key={index} style={{ ...styles.item, transform: `scale(${scale})` }}>
              <img src={img.src} alt={`carousel-${index}`} style={styles.image} />

              {img.title && <div style={styles.label}>{img.title}</div>}

              <div style={styles.platform}></div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() =>
          containerRef.current.scrollBy({
            left: -containerRef.current.offsetWidth / 5,
            behavior: "smooth",
          })
        }
        style={{ ...styles.arrowButton, ...styles.leftArrow }}
      >
        ❮
      </button>
      <button
        onClick={() =>
          containerRef.current.scrollBy({
            left: containerRef.current.offsetWidth / 5,
            behavior: "smooth",
          })
        }
        style={{ ...styles.arrowButton, ...styles.rightArrow }}
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;

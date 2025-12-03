// "use client";
// import { useRef, useEffect, useState } from "react";

// const Carousel = ({ images = [] }) => {
//   const containerRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleScroll = () => {
//     const container = containerRef.current;
//     if (!container) return;

//     const children = Array.from(container.children);
//     const containerCenter = container.offsetWidth / 2;
//     let closestIndex = 0;
//     let closestDistance = Infinity;

//     children.forEach((child, index) => {
//       const rect = child.getBoundingClientRect();
//       const containerRect = container.getBoundingClientRect();
//       const childCenter = rect.left + rect.width / 2 - containerRect.left;
//       const distance = Math.abs(containerCenter - childCenter);
//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = index;
//       }
//     });

//     setActiveIndex(closestIndex);
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const scrollInterval = setInterval(() => {
//       container.scrollBy({
//         left: container.offsetWidth / 5,
//         behavior: "smooth",
//       });
//       if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
//         container.scrollTo({ left: 0, behavior: "smooth" });
//       }
//     }, 3000);

//     return () => clearInterval(scrollInterval);
//   }, []);

//   const styles = {
//     carouselWrapper: {
//       position: "relative",
//       width: "100%",
//       paddingTop: "50px", // top padding to avoid cutting images
//       paddingBottom: "120px", // bottom space for platform shadow
//       overflow: "visible",
//       marginTop: "2rem",
//     },
//     container: {
//       display: "flex",
//       overflowX: "auto",
//       overflowY: "visible",
//       scrollBehavior: "smooth",
//       scrollSnapType: "x mandatory",
//       gap: "0.5rem",
//       msOverflowStyle: "none",
//       scrollbarWidth: "none",
//       padding: "0 1rem",
//     },
//     item: {
//       flexShrink: 0,
//       width: "calc(20% - 0.4rem)", // 5 items visible
//       scrollSnapAlign: "center",
//       transition: "transform 0.3s, opacity 0.3s",
//       position: "relative",
//       display: "flex",
//       justifyContent: "center",
//     },
//     image: {
//       width: "100%",
//       height: "auto", // responsive height
//       maxHeight: "500px", // optional max height
//       objectFit: "cover",
//       borderRadius: "1rem",
//     },
//     platform: {
//       position: "absolute",
//       bottom: "-1%",
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "85%",
//       height: "30px",
//       background: "#828181",
//       borderRadius: "50%",
//       filter: "blur(7px)",
//       boxShadow: "0px 15px 40px rgba(0,0,0,0.6)",

//     },
//     arrowButton: {
//       position: "absolute",
//       top: "50%",
//       transform: "translateY(-50%)",
//       backgroundColor: "#FEF3C7",
//       border: "none",
//       borderRadius: "50%",
//       padding: "0.75rem",
//       cursor: "pointer",
//       fontSize: "1.25rem",
//       zIndex: 10,
//     },
//     leftArrow: { left: "0.5rem" },
//     rightArrow: { right: "0.5rem" },
//     label: {
//       position: "absolute",
//       top: "15px",
//       left: "20px",
//       backgroundColor: "rgba(0,0,0,0.6)",
//       color: "#fff",
//       padding: "5px 15px",
//       borderRadius: "15px",
//       fontSize: "14px",
//       fontWeight: "500",
//       whiteSpace: "nowrap",
//     },
//   };

//   return (
//     <div style={styles.carouselWrapper}>
//       <div ref={containerRef} style={styles.container}>
//         {images.map((img, index) => {
//           let scale = 0.85;
//           if (index === activeIndex) scale = 1;
//           else if (index === activeIndex - 1 || index === activeIndex + 1) scale = 0.75;
//           else if (index === activeIndex - 2 || index === activeIndex + 2) scale = 0.6;

//           return (
//             <div key={index} style={{ ...styles.item, transform: `scale(${scale})` }}>
//               <img src={img.src} alt={`carousel-${index}`} style={styles.image} />

//               {img.title && <div style={styles.label}>{img.title}</div>}

//               <div style={styles.platform}></div>
//             </div>
//           );
//         })}
//       </div>

//       <button
//         onClick={() =>
//           containerRef.current.scrollBy({
//             left: -containerRef.current.offsetWidth / 5,
//             behavior: "smooth",
//           })
//         }
//         style={{ ...styles.arrowButton, ...styles.leftArrow }}
//       >
//         ❮
//       </button>
//       <button
//         onClick={() =>
//           containerRef.current.scrollBy({
//             left: containerRef.current.offsetWidth / 5,
//             behavior: "smooth",
//           })
//         }
//         style={{ ...styles.arrowButton, ...styles.rightArrow }}
//       >
//         ❯
//       </button>
//     </div>
//   );
// };

// export default Carousel;









// "use client";
// import { useRef, useEffect, useState, useCallback } from "react";

// const Carousel = ({ images = [] }) => {
//   const containerRef = useRef(null);
//   const animationFrameRef = useRef(null);
//   const [currentSet, setCurrentSet] = useState([0, 1, 2, 3, 4]); // 5 visible images ke indexes
//   const [isAnimating, setIsAnimating] = useState(false);
//   const totalImages = images.length;

//   // Har 2 second baad next set mein move karna
//   useEffect(() => {
//     if (totalImages < 5) return; // At least 5 images honi chahiye

//     const interval = setInterval(() => {
//       moveToNextSet();
//     }, 2000); // 2 seconds

//     return () => clearInterval(interval);
//   }, [totalImages]);

//   // Next set mein move karne ka function
//   const moveToNextSet = useCallback(() => {
//     if (isAnimating || totalImages < 5) return;

//     setIsAnimating(true);

//     // Smooth transition ke liye animation
//     const startTime = Date.now();
//     const duration = 500; // Transition time in ms

//     const animate = () => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min(elapsed / duration, 1);

//       // Easing function for smooth animation
//       const easeOutCubic = 1 - Math.pow(1 - progress, 3);

//       if (progress < 1) {
//         animationFrameRef.current = requestAnimationFrame(animate);
//       } else {
//         // Animation complete
//         setCurrentSet(prev => {
//           // Next 5 images ke indexes calculate karo
//           const nextSet = prev.map(index => (index + 1) % totalImages);
//           return nextSet;
//         });
//         setIsAnimating(false);
//       }
//     };

//     animationFrameRef.current = requestAnimationFrame(animate);
//   }, [isAnimating, totalImages]);

//   // Previous set ke liye
//   const moveToPrevSet = useCallback(() => {
//     if (isAnimating || totalImages < 5) return;

//     setIsAnimating(true);

//     const startTime = Date.now();
//     const duration = 500;

//     const animate = () => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const easeOutCubic = 1 - Math.pow(1 - progress, 3);

//       if (progress < 1) {
//         animationFrameRef.current = requestAnimationFrame(animate);
//       } else {
//         setCurrentSet(prev => {
//           // Previous 5 images ke indexes
//           const prevSet = prev.map(index => (index - 1 + totalImages) % totalImages);
//           return prevSet;
//         });
//         setIsAnimating(false);
//       }
//     };

//     animationFrameRef.current = requestAnimationFrame(animate);
//   }, [isAnimating, totalImages]);

//   // Cleanup animation frame
//   useEffect(() => {
//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, []);

//   // Scale calculation based on position
//   const getScaleForPosition = (position) => {
//     switch (position) {
//       case 0: // Leftmost (smallest)
//         return 0.6;
//       case 1: // Second from left
//         return 0.75;
//       case 2: // Center (largest)
//         return 1;
//       case 3: // Second from right
//         return 0.75;
//       case 4: // Rightmost
//         return 0.6;
//       default:
//         return 0.6;
//     }
//   };

//   const styles = {
//     carouselWrapper: {
//       position: "relative",
//       width: "100%",
//       paddingTop: "50px",
//       paddingBottom: "120px",
//       overflow: "visible",
//       marginTop: "2rem",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     container: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       gap: "0.5rem",
//       width: "100%",
//       maxWidth: "1200px",
//       position: "relative",
//       height: "500px",
//     },
//     itemWrapper: {
//       position: "absolute",
//       transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "flex-end",
//       width: "20%", // 5 items equal width
//     },
//     item: {
//       width: "90%",
//       transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//       position: "relative",
//     },
//     image: {
//       width: "100%",
//       height: "auto",
//       maxHeight: "500px",
//       objectFit: "cover",
//       borderRadius: "1rem",
//       boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//       transition: "all 0.5s ease",
//     },
//     platform: {
//       position: "absolute",
//       bottom: "-15px",
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "85%",
//       height: "30px",
//       background: "#828181",
//       borderRadius: "50%",
//       filter: "blur(7px)",
//       boxShadow: "0px 15px 40px rgba(0,0,0,0.6)",
//       opacity: 0.8,
//       transition: "all 0.5s ease",
//     },
//     arrowButton: {
//       position: "absolute",
//       top: "50%",
//       transform: "translateY(-50%)",
//       backgroundColor: "#FEF3C7",
//       border: "none",
//       borderRadius: "50%",
//       width: "50px",
//       height: "50px",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       cursor: "pointer",
//       fontSize: "1.5rem",
//       zIndex: 10,
//       boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//       transition: "all 0.2s ease",
//     },
//     leftArrow: {
//       left: "1rem",
//       "&:hover": {
//         backgroundColor: "#FDE68A",
//         transform: "translateY(-50%) scale(1.1)",
//       }
//     },
//     rightArrow: {
//       right: "1rem",
//       "&:hover": {
//         backgroundColor: "#FDE68A",
//         transform: "translateY(-50%) scale(1.1)",
//       }
//     },
//     label: {
//       position: "absolute",
//       top: "15px",
//       left: "20px",
//       backgroundColor: "rgba(0,0,0,0.7)",
//       color: "#fff",
//       padding: "5px 15px",
//       borderRadius: "15px",
//       fontSize: "14px",
//       fontWeight: "500",
//       whiteSpace: "nowrap",
//       zIndex: 2,
//     },
//     progressBar: {
//       position: "absolute",
//       bottom: "80px",
//       left: "50%",
//       transform: "translateX(-50%)",
//       width: "200px",
//       height: "4px",
//       backgroundColor: "rgba(255,255,255,0.2)",
//       borderRadius: "2px",
//       overflow: "hidden",
//       zIndex: 10,
//     },
//     progressFill: {
//       height: "100%",
//       backgroundColor: "#FEF3C7",
//       width: "0%",
//       animation: "progress 2s linear infinite",
//     },

//   };

//   // Add keyframes for progress bar
//   const progressBarStyle = `
//     @keyframes progress {
//       0% { width: 0%; }
//       100% { width: 100%; }
//     }
//   `;

//   if (totalImages < 5) {
//     return (
//       <div style={{ textAlign: "center", padding: "2rem" }}>
//         At least 5 images required for this carousel
//       </div>
//     );
//   }

//   // Positions for 5 visible items
//   const positions = [
//     { left: "0%", zIndex: 1 },      // Leftmost
//     { left: "20%", zIndex: 2 },     // Second from left
//     { left: "40%", zIndex: 3 },     // Center
//     { left: "60%", zIndex: 2 },     // Second from right
//     { left: "80%", zIndex: 1 },     // Rightmost
//   ];

//   return (
//     <>
//       <style>{progressBarStyle}</style>
//       <div style={styles.carouselWrapper}>
//         <div ref={containerRef} style={styles.container}>
//           {currentSet.map((imageIndex, positionIndex) => {
//             const scale = getScaleForPosition(positionIndex);
//             const position = positions[positionIndex];

//             return (
//               <div
//                 key={`${imageIndex}-${positionIndex}`}
//                 style={{
//                   ...styles.itemWrapper,
//                   ...position,
//                   transform: `translateX(-50%) scale(${scale})`,
//                   opacity: isAnimating ? 0.9 : 1,
//                 }}
//               >
//                 <div style={styles.item}>
//                   <img
//                     src={images[imageIndex]?.src || ""}
//                     alt={`carousel-${imageIndex}`}
//                     style={{
//                       ...styles.image,
//                       transform: `scale(${scale})`,
//                     }}
//                   />
//                   {images[imageIndex]?.title && (
//                     <div style={styles.label}>{images[imageIndex].title}</div>
//                   )}
//                   <div
//                     style={{
//                       ...styles.platform,
//                       transform: `translateX(-50%) scale(${scale * 0.9})`,
//                     }}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <button
//           onClick={moveToPrevSet}
//           style={{ ...styles.arrowButton, ...styles.leftArrow }}
//           disabled={isAnimating}
//         >
//           ❮
//         </button>
//         <button
//           onClick={moveToNextSet}
//           style={{ ...styles.arrowButton, ...styles.rightArrow }}
//           disabled={isAnimating}
//         >
//           ❯
//         </button>

//         {/* Progress bar for auto-transition */}
//         <div style={styles.progressBar}>
//           <div style={styles.progressFill} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Carousel;
import React, { useEffect, useRef } from "react";

const GrowthSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const textRef = useRef(null);
  const highlightRef = useRef(null);
  const animatedRef = useRef(false);
  
  useEffect(() => {
    const playAnimations = () => {
      const heading = headingRef.current;
      const subheading = subheadingRef.current;
      const text = textRef.current;
      const highlight = highlightRef.current;
      
      // Enhanced 3D flip animation for heading
      if (heading.children.length === 0) {
        const words = heading.textContent.trim().split(/\s+/);
        heading.innerHTML = "";
        
        words.forEach((word, wordIndex) => {
          const wordEl = document.createElement("span");
          wordEl.className = "word-wrapper mx-1";
          
          const letters = word.split("");
          letters.forEach((letter, i) => {
            const span = document.createElement("span");
            span.innerText = letter;
            span.className = "letter";
            span.style.opacity = "0";
            span.style.display = "inline-block";
            span.style.transform = "rotateX(90deg) translateY(-20px)";
            span.style.transformOrigin = "bottom center";
            span.style.transition = `transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                                    opacity 0.4s ease, 
                                    text-shadow 0.3s ease`;
            span.style.transitionDelay = `${(wordIndex * 0.1) + (i * 0.04)}s`;
            wordEl.appendChild(span);
          });
          
          heading.appendChild(wordEl);
        });
      }
      
      // Animate each letter with 3D effect
      Array.from(heading.querySelectorAll('.letter')).forEach((span, i) => {
        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "rotateX(0) translateY(0)";
          span.style.textShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
        }, 50 + i * 40);
      });
      
      // Animate other elements
      subheading.style.opacity = "1";
      subheading.style.transform = "translateX(0)";
      text.style.opacity = "1";
      text.style.transform = "translateY(0)";
      highlight.classList.add("text-shimmer");
      
      animatedRef.current = true;
    };
    
    const resetAnimations = () => {
      const heading = headingRef.current;
      const subheading = subheadingRef.current;
      const text = textRef.current;
      const highlight = highlightRef.current;
      
      // Reset heading letters
      Array.from(heading.querySelectorAll('.letter')).forEach(span => {
        span.style.opacity = "0";
        span.style.transform = "rotateX(90deg) translateY(-20px)";
        span.style.textShadow = "none";
      });
      
      // Reset other elements
      subheading.style.opacity = "0";
      subheading.style.transform = "translateX(8px)";
      text.style.opacity = "0";
      text.style.transform = "translateY(8px)";
      highlight.classList.remove("text-shimmer");
      
      animatedRef.current = false;
    };
    
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting ? playAnimations() : resetAnimations(),
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={sectionRef} className="container mx-auto px-4 py-16 md:py-24 overflow-hidden relative">
      {/* Animated decoration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float absolute top-10 left-10 w-16 h-16 rounded-full opacity-20" 
             style={{animationDelay: "0s"}}></div>
        <div className="animate-float absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-10"
             style={{animationDelay: "0.5s"}}></div>
        <div className="animate-float absolute top-40 right-40 w-12 h-12 rounded-full opacity-20"
             style={{animationDelay: "1s"}}></div>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left column - Heading with enhanced 3D animation */}
        <div className="text-left">
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold leading-tight mb-1 text-gray-900 perspective-500">
            KSC New Town
          </h2>
          <h3 ref={subheadingRef} className="text-xl md:text-2xl font-medium text-gray-700 mb-4 opacity-0 transform translate-x-8"
              style={{transition: "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s"}}>
            A Visionary Development in Maha Mumbai
          </h3>
        </div>

        {/* Right column - Description with scroll reveal */}
        <div className="relative">
          <p ref={textRef} className="text-base md:text-xl text-gray-800 leading-relaxed md:text-left opacity-0 transform translate-y-8"
             style={{transition: "all 1s ease 0.7s"}}>
            The Third New Town by Athiya Group is strategically positioned
            within this NAINA growth zone, making it one of the most
            <span ref={highlightRef} className="font-medium relative inline-block lg:pl-2 lg:ml-1">
              promising investment destinations
            </span>. A key part of Maha Mumbai's
            expansion is KSC New Town, a mega project managed by MMRDA
            under NTDA, spanning 124 villages across 323.44 sq km in
            Raigad.
          </p>
        </div>
      </div>
      
      {/* Style for custom animations */}
      <style jsx>{`
        .perspective-500 {
          perspective: 500px;
        }
        
        .word-wrapper {
          display: inline-block;
          perspective: 500px;
        }
        
        .letter {
          display: inline-block;
          backface-visibility: hidden;
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite alternate;
        }
        
        .text-shimmer {
          background: linear-gradient(to right, #FFC107 20%, #FFD700 40%, #F59E0B 60%, #B45309 80%);
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
          100% { transform: translateY(0) scale(1); }
        }
        
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};

export default GrowthSection;
import React, { useEffect, useState } from "react";
import rect1 from "../assets/Rectangle-1.png";
import rect2 from "../assets/Rectangle-2.png";
import rect3 from "../assets/Rectangle-3.png";

// Simplified component with no framer-motion
function NaturalBeauty() {
  const [isIPhone12, setIsIPhone12] = useState(false);
  
  useEffect(() => {
    // Check if device is iPhone and has screen width close to iPhone 12 (390px)
    const checkIPhone = () => {
      const isIPhone = /iPhone/i.test(navigator.userAgent);
      const screenWidth = window.screen.width;
      // iPhone 12/13/mini all have around 390px width
      const isIPhone12Size = screenWidth >= 385 && screenWidth <= 395;
      
      setIsIPhone12(isIPhone && isIPhone12Size);
      
      // Force layout recalculation on iPhone 12
      if (isIPhone && isIPhone12Size) {
        document.body.style.opacity = '0.99';
        setTimeout(() => {
          document.body.style.opacity = '1';
        }, 100);
      }
    };
    
    checkIPhone();
    window.addEventListener('resize', checkIPhone);
    return () => window.removeEventListener('resize', checkIPhone);
  }, []);
  
  // If iPhone 12 detected, use extremely simple layout
  if (isIPhone12) {
    return (
      <div style={{ width: '100%', maxWidth: '390px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
          Natural Beauty Meets Urban Comfort
        </h2>
        
        <p style={{ fontSize: '16px', marginBottom: '20px', textAlign: 'center' }}>
          Third New Town offers a unique blend of natural beauty and urban convenience
        </p>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <img 
              src={rect1} 
              alt="Beachside villa" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} 
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <img 
              src={rect2} 
              alt="Green landscape" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} 
            />
            <p style={{ fontSize: '14px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
              Lush green surroundings and scenic coastline.
            </p>
          </div>
          
          <div>
            <img 
              src={rect3} 
              alt="Beach sunset view" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} 
            />
            <p style={{ fontSize: '14px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
              Proximity to hill stations, beaches and cultural landmarks
            </p>
          </div>
        </div>
        
        <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '14px', textAlign: 'center' }}>
          iPhone 12 optimized view
        </div>
      </div>
    );
  }
  
  // Regular layout for other devices
  return (
    <div className="p-4 mx-auto w-full max-w-screen-xl">
      {/* Title section */}
      <div className="mb-8 md:absolute md:top-20 md:left-10 lg:left-40 text-center md:text-left z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Natural Beauty Meets <br className="hidden sm:block" /> Urban Comfort
        </h1>
        <p className="text-gray-700 mt-2">
          Third New Town offers a unique blend of natural <br className="hidden sm:block" /> beauty and urban convenience
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center">
        <div className="hidden md:block md:w-1/2"></div>
        
        <div className="w-full md:w-1/2 md:pr-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mt-4 md:mt-64">
              <div className="w-full text-center">
                <img 
                  src={rect2} 
                  alt="Green landscape" 
                  className="w-full max-w-xs mx-auto rounded shadow-sm" 
                />
                <p className="text-sm mt-2 text-gray-600">Lush green surroundings and scenic coastline.</p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="mb-5 w-full text-center">
                <img 
                  src={rect1} 
                  alt="Beachside villa" 
                  className="w-full max-w-xs mx-auto rounded shadow-sm" 
                />
              </div>
              <div className="w-full text-center">
                <img 
                  src={rect3} 
                  alt="Beach sunset view" 
                  className="w-full max-w-xs mx-auto rounded shadow-sm" 
                />
                <p className="text-sm mt-2 text-gray-600">
                  Proximity to hill stations, beaches and cultural landmarks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NaturalBeauty;

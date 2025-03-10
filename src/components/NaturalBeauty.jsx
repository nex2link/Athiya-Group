import React, { useEffect, useState } from "react";
import rect1 from "../assets/Rectangle-1.png";
import rect2 from "../assets/Rectangle-2.png";
import rect3 from "../assets/Rectangle-3.png";

// Add this to your main index.html or App component
// <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

const NaturalBeauty = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  useEffect(() => {
    // Simple mobile detection
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile layout with strict containment
  if (isMobileDevice) {
    return (
      <div style={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        padding: '16px',
        marginBottom: '30px',
        boxSizing: 'border-box',
        backgroundColor: 'white'
      }}>
        {/* Title container with strict bounds */}
        <div style={{
          margin: '0 0 24px 0',
          padding: '0',
          width: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          <h2 style={{
            margin: '0 0 8px 0',
            padding: '0',
            fontSize: '24px',
            lineHeight: '1.2',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            width: '100%'
          }}>
            Natural Beauty Meets Urban Comfort
          </h2>
          
          <p style={{
            margin: '0',
            padding: '0',
            fontSize: '16px',
            lineHeight: '1.4',
            color: '#666',
            textAlign: 'center',
            width: '100%'
          }}>
            Third New Town offers a unique blend of natural beauty and urban convenience
          </p>
        </div>
        
        {/* Strictly contained image gallery */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          {/* Image 1 */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <img 
              src={rect1} 
              alt="Beachside villa" 
              style={{ 
                width: '100%', 
                maxWidth: '100%',
                height: 'auto', 
                display: 'block',
                borderRadius: '4px'
              }} 
            />
          </div>
          
          {/* Image 2 with caption */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <img 
              src={rect2} 
              alt="Green landscape" 
              style={{ 
                width: '100%', 
                maxWidth: '100%',
                height: 'auto', 
                display: 'block',
                borderRadius: '4px'
              }} 
            />
            <p style={{ 
              fontSize: '14px', 
              margin: '8px 0 0 0',
              padding: '0',
              color: '#666', 
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Lush green surroundings and scenic coastline.
            </p>
          </div>
          
          {/* Image 3 with caption */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <img 
              src={rect3} 
              alt="Beach sunset view" 
              style={{ 
                width: '100%', 
                maxWidth: '100%',
                height: 'auto', 
                display: 'block',
                borderRadius: '4px'
              }} 
            />
            <p style={{ 
              fontSize: '14px', 
              margin: '8px 0 0 0',
              padding: '0',
              color: '#666', 
              textAlign: 'center',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Proximity to hill stations, beaches and cultural landmarks
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Desktop layout (simplified)
  return (
    <div className="relative w-full max-w-screen-xl mx-auto p-6 overflow-hidden ">
      {/* Title section */}
      <div className="relative mb-16 md:absolute md:top-20 md:left-10 lg:left-40 z-10 text-center md:text-left overflow-hidden">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
          Natural Beauty Meets <br className="hidden md:block" /> Urban Comfort
        </h1>
        <p className="text-gray-700">
          Third New Town offers a unique blend of natural <br className="hidden md:block" /> beauty and urban convenience
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start pt-4 md:pt-0">
        <div className="hidden md:block md:w-1/2"></div>
        
        <div className="w-full md:w-1/2 flex flex-col md:flex-row md:pl-8 gap-6">
          <div className="w-full md:w-1/2 md:mt-64 overflow-hidden">
            <div className="text-center overflow-hidden">
              <img 
                src={rect2} 
                alt="Green landscape" 
                className="w-full max-w-full md:max-w-xs mx-auto rounded shadow-sm" 
              />
              <p className="text-sm mt-2 text-gray-600 px-2 overflow-hidden">
                Lush green surroundings and scenic coastline.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col gap-6 overflow-hidden">
            <div className="text-center overflow-hidden">
              <img 
                src={rect1} 
                alt="Beachside villa" 
                className="w-full max-w-full md:max-w-xs mx-auto rounded shadow-sm" 
              />
            </div>
            <div className="text-center overflow-hidden">
              <img 
                src={rect3} 
                alt="Beach sunset view" 
                className="w-full max-w-full md:max-w-xs mx-auto rounded shadow-sm" 
              />
              <p className="text-sm mt-2 text-gray-600 px-2 overflow-hidden">
                Proximity to hill stations, beaches and cultural landmarks
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaturalBeauty;
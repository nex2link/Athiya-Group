import React, { useState, useEffect, useRef, useCallback } from 'react';
import { photos, categories } from './PhotoData';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [animationPhase, setAnimationPhase] = useState('initial');
  const [activeThumbnail, setActiveThumbnail] = useState(null);
  const [animationCounter, setAnimationCounter] = useState(0);
  const galleryRef = useRef(null);
  const photoRefs = useRef({});
  const timeoutRef = useRef(null);
  const initialRender = useRef(true);
  
  useEffect(() => {
    setFilteredPhotos(photos);
    setTimeout(() => {
      setAnimationPhase('idle');
      initialRender.current = false;
    }, 300);
  }, []);
  
  const handleFilterChange = useCallback((newFilter) => {
    if (filter === newFilter) return;
    setAnimationPhase('exiting');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      const newFiltered = newFilter === 'all' ? photos : photos.filter(photo => photo.category === newFilter);
      setFilteredPhotos(newFiltered);
      setFilter(newFilter);
      setAnimationCounter(prev => prev + 1);
      
      requestAnimationFrame(() => {
        setAnimationPhase('entering');
        timeoutRef.current = setTimeout(() => setAnimationPhase('idle'), 800);
      });
    }, 600);
  }, [filter]);
  
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);
  
  const expandImage = (photoId) => {
    if (animationPhase !== 'idle') return;
    setActiveThumbnail(photoId);
  };
  
  const closeExpandedImage = () => setActiveThumbnail(null);
  
  const getPhotoStyles = (photo, index) => {
    if (activeThumbnail === photo.id) return { zIndex: 50, transition: 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)' };
    
    if (activeThumbnail !== null) {
      return {
        opacity: 0.3, filter: 'blur(3px)', transform: 'scale(0.95)',
        transition: 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)'
      };
    }
    
    const delay = initialRender.current ? index * 100 : 
                 animationPhase === 'entering' ? index * 50 + (index % 3) * 30 : 0;
    const baseTransition = 'all 0.6s cubic-bezier(0.2, 1, 0.3, 1)';
    
    switch (animationPhase) {
      case 'initial':
        return {
          opacity: 0, transform: 'translateY(50px) scale(0.8)',
          transition: baseTransition, transitionDelay: `${delay}ms`
        };
      case 'exiting':
        const exitDirections = [
          'translateY(-100px) rotate(-5deg)', 'translateX(100px) rotate(5deg)', 
          'translateY(100px) rotate(5deg)', 'translateX(-100px) rotate(-5deg)'
        ];
        return {
          opacity: 0, transform: `${exitDirections[index % 4]} scale(0.8)`,
          transition: 'all 0.5s cubic-bezier(0.3, 0, 0.2, 1)',
          transitionDelay: `${index % 5 * 50}ms`
        };
      case 'entering':
        return {
          opacity: 1, transform: `translateY(0) scale(1) rotate(0)`,
          transition: baseTransition, transitionDelay: `${delay}ms`,
          animation: `photo-entrance 0.7s ${delay}ms cubic-bezier(0.2, 1, 0.3, 1) backwards`
        };
      default:
        return {
          opacity: 1, transform: 'translateY(0) scale(1)', transition: baseTransition
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-20" ref={galleryRef}>
      {activeThumbnail && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeExpandedImage}>
          <div className="relative max-w-5xl max-h-screen transform animate-scale-in">
            <div className="absolute top-4 right-4 z-10 flex space-x-4">
              <button className="text-white hover:text-rose-400 transition-colors"
                  onClick={(e) => { e.stopPropagation(); closeExpandedImage(); }}>
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <img src={photos.find(p => p.id === activeThumbnail)?.src} 
                alt={photos.find(p => p.id === activeThumbnail)?.alt} 
                className="max-w-full max-h-[90vh] object-contain shadow-2xl" />
          </div>
        </div>
      )}

      {/* Redesigned Filter Buttons */}
      <div className="flex justify-center mb-10 my-4">
        <div className="inline-flex space-x-2 flex-wrap justify-center">
          {categories.map((category, idx) => (
            <button 
              key={category.id}
              onClick={() => handleFilterChange(category.id)} 
              className={`relative px-4 py-2 my-2 mx-1 rounded-full transition-all duration-300 transform
                ${filter === category.id 
                  ? 'bg-black text-white font-medium shadow-lg scale-105' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              style={{transitionDelay: `${idx * 20}ms`}}
            >
              {category.label}

            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{perspective: '1000px', perspectiveOrigin: 'center'}}>
        {filteredPhotos.map((photo, index) => (
          <div key={photo.id} 
              ref={el => photoRefs.current[photo.id] = el}
              className={`overflow-hidden rounded-lg shadow-lg relative transform-gpu
                ${activeThumbnail === photo.id ? 'z-30' : 'hover:z-10'}
                ${activeThumbnail !== null && activeThumbnail !== photo.id ? 'pointer-events-none' : 'cursor-pointer'}`}
              style={{
                ...getPhotoStyles(photo, index),
                '--rotate': `${(index % 2 === 0 ? 2 : -2)}deg`,
                '--animation-key': animationCounter
              }}
              onClick={() => expandImage(photo.id)}>
            <div className="relative overflow-hidden group">
              <img src={photo.src} 
                  alt={photo.alt} 
                  className="w-full h-64 object-cover transform-gpu transition-transform duration-1000 ease-out"
                  style={{transform: `scale(${activeThumbnail === photo.id ? 1.1 : 1})`}} />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              
              <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-medium text-lg">{photo.alt}</h3>
              </div>
              
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-top-right">
                {categories.find(c => c.id === photo.category)?.label || ''}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPhotos.length === 0 && animationPhase !== 'exiting' && (
        <div className="text-center py-24 opacity-0 animate-fade-in">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-gray-500 mt-4 text-lg">No photos found in this category</p>
          <button onClick={() => handleFilterChange('all')} 
              className="mt-4 px-4 py-2 bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors">
            Show all photos
          </button>
        </div>
      )}
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes scale-in {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  .animate-scale-in {
    animation: scale-in 0.3s cubic-bezier(0.2, 1, 0.3, 1) forwards;
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 0.3; }
    100% { transform: scale(1); opacity: 0.5; }
  }
  
  @keyframes dot-pulse {
    0% { transform: translate(-50%, 0) scale(1); }
    50% { transform: translate(-50%, 0) scale(1.5); }
    100% { transform: translate(-50%, 0) scale(1); }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes ping {
    0% { transform: scale(1); opacity: 0.3; }
    75%, 100% { transform: scale(1.1); opacity: 0; }
  }
  
  .animate-ping {
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  @keyframes photo-entrance {
    from { 
      opacity: 0; 
      transform: translateY(40px) scale(0.9) rotate(var(--rotate, 2deg));
    }
    50% {
      opacity: 1;
      transform: translateY(-10px) scale(1.02) rotate(calc(var(--rotate, 2deg) * -0.5));
    }
    to { 
      opacity: 1; 
      transform: translateY(0) scale(1) rotate(0);
    }
  }
`;
document.head.appendChild(style);

export default Gallery;
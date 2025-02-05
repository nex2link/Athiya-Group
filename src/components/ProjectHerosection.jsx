import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import projectPosterimg from '../assets/project-poster.jpg'
import projectVidwebm from '../assets/project-vid.webm'
import projectvid from '../assets/project-vid.mp4'

const ProjectPageHero = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.preload = 'metadata';
      videoRef.current.playsInline = true;
      videoRef.current.muted = true;
      videoRef.current.loop = true;

      const playVideo = () => {
        videoRef.current.play().catch(console.error);
      };

      if (videoRef.current.readyState >= 3) {
        setIsVideoLoaded(true);
        playVideo();
      } else {
        videoRef.current.addEventListener('loadeddata', () => {
          setIsVideoLoaded(true);
          playVideo();
        });
      }
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="relative min-h-screen">
      <div className="w-full max-w-[2000px] mx-auto">
        <div className="relative h-[100vh] mt-3 overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0">
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-gray-900 animate-pulse" />
            )}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={projectPosterimg}
              playsInline
              muted
              loop
            >
              <source 
                src={projectvid}
                type="video/mp4" 
              />
              <source 
                src={projectVidwebm}
                type="video/webm" 
              />
            </video>
          </div>

          {/* Enhanced overlay with multiple layers for natural fade */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Multi-layer gradient for smoother transition */}
          <div className="absolute top-0 left-0 right-0">
            {/* Primary gradient */}
            {/* <div className="h-40 bg-gradient-to-b from-white via-white/10 to-transparent"></div> */}
            
            {/* Subtle secondary gradient for smoother blend */}
            {/* <div className="h-20 -mt-4 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-40"></div>  */}
          </div>

          {/* Optional: Add a very subtle noise texture for better blending */}
          <div className="absolute top-0 left-0 right-0 h-40 opacity-5 mix-blend-overlay"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                 backgroundSize: '100px 100px'
               }}>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectPageHero;
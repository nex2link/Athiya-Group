// utils/scrollOptimizer.js
export const applyScrollOptimizations = () => {
    // Add these styles to your main CSS file
    const styles = `
      .scroll-content {
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
  
      @media (prefers-reduced-motion: reduce) {
        .scroll-content {
          transform: none !important;
          transition: none !important;
        }
      }
    `;
  
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  
    // Prevent body level scroll-chaining
    document.body.style.overscrollBehavior = 'none';
    
    // Optimize touch handling
    document.addEventListener('touchstart', () => {}, { passive: true });
  };
import React, { useState, useEffect, useRef } from 'react';

function LazyImage({ src, alt, className, placeholder }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Deja de observar una vez que la imagen es visible
        }
      },
      { threshold: 0.1 } // La imagen debe ser visible al menos en un 10%
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true); // Marca la imagen como cargada
  };

  return (
    <div
      ref={imgRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt="Placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </div>
  );
}

export default LazyImage;

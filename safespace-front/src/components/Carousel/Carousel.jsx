import { useState, useEffect, useRef } from "react";

export default function Carousel({ images, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const slides = [...images, ...images];

  useEffect(() => {
    const timer = setInterval(() => {
      if (images.length > 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  useEffect(() => {
    if (currentIndex >= images.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = `translateX(0%)`;
          containerRef.current.offsetHeight;
          containerRef.current.style.transition = "transform 1s ease-in-out";
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, images.length]);

  return (
    <div className="overflow-hidden w-full h-64 relative">
      <div
        ref={containerRef}
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((src, index) => (
          <div key={index} className="shrink-0 w-full h-64">
            <img
              src={src}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

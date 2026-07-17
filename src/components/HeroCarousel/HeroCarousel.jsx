import "./HeroCarousel.css";
import { useState, useEffect, useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const SLIDES = [
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80",
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80",
  },
  {
    id: 3,
    bg: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1400&q=80",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() =>
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  const next = useCallback(() =>
    setCurrent((c) => (c + 1) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <div className="hero-carousel">
      {/* Slide strip */}
      <div
        className="hero-carousel__bg"
        style={{ backgroundImage: `url(${slide.bg})` }}
      />
      {/* Dark overlay */}
      <div className="hero-carousel__overlay" />

      {/* Arrows */}
      <button className="hero-carousel__arrow hero-carousel__arrow--left" onClick={prev} aria-label="Previous">
        <HiChevronLeft />
      </button>
      <button className="hero-carousel__arrow hero-carousel__arrow--right" onClick={next} aria-label="Next">
        <HiChevronRight />
      </button>

      {/* Dots */}
      <div className="hero-carousel__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-carousel__dot ${i === current ? "hero-carousel__dot--active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

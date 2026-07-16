import "./HeroCarousel.css";
import { useState, useEffect, useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const SLIDES = [
  {
    id: 1,
    title: "Build Today.\nBetter Tomorrow.",
    subtitle: "Streamline your construction projects from start to finish.",
    cta: "Explore Projects",
    bg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  },
  {
    id: 2,
    title: "Track Every\nRupee Spent.",
    subtitle: "Full financial visibility across all your active sites.",
    cta: "View Transactions",
    bg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
  },
  {
    id: 3,
    title: "Your Team,\nAlways On Time.",
    subtitle: "Mark attendance, assign tasks and keep workers accountable.",
    cta: "Manage Attendance",
    bg: "https://images.unsplash.com/photo-1590418606746-018840f9eff6?w=1200&q=80",
  },
];

const HeroCarousel = ({ onExplore }) => {
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

      {/* Content */}
      <div className="hero-carousel__content">
        <h1 className="hero-carousel__title">
          {slide.title.split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
        <p className="hero-carousel__subtitle">{slide.subtitle}</p>
        <button className="hero-carousel__cta" onClick={onExplore}>
          {slide.cta} &rsaquo;
        </button>
      </div>

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

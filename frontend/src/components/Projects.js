"use client"
import { useState, useRef } from 'react';

export default function Projects() {
  const projects = [
    {
      name: "St. John the Divine",
      url: "https://stjohngochurch.org/",
      image: "/st_john.svg",
      description: "A welcoming, content-rich site for a vibrant Orthodox parish, featuring a custom event calendar, FAQs, community resources, and a password-protected admin dashboard for managing content and inquiries.",
      color: "var(--primary)"
    },
    {
      name: "Cindy O Foundation",
      url: "https://cindyofoundation.org/",
      image: "/cof.png",
      description: "A nonprofit website dedicated to family, community, and helping those in need, featuring event registrations and seamless online donation tools for fundraising.",
      color: "var(--secondary)"
    },
    {
      name: "Humble Band",
      url: "https://humble.band/",
      image: "/humble.png",
      description: "A modern landing page for a local band, showcasing their latest releases, upcoming gigs, and story.",
      color: "var(--accent)"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <>
      <section id="projects" className="relative py-24 professional-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 relative" style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: 'var(--glow-primary)'
            }}>
              Featured Work
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full" style={{
                background: 'var(--gradient-primary)',
                boxShadow: '0 0 20px var(--primary)'
              }}></div>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              See how we&apos;ve helped businesses transform their online presence with modern, high-performance websites.
            </p>
          </div>
          
          {/* Desktop Grid - Hidden on Mobile */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <a 
                key={index} 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-card group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full"
              >
                <div className="project-image" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)` }}>
                  <img 
                    src={project.image} 
                    alt={`${project.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: project.color }}>{project.name}</h3>
                <p className="text-white/90 mb-4 leading-relaxed flex-grow">{project.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-primary mt-auto" style={{ color: project.color }}>
                  View Project →
                </div>
              </a>
            ))}
          </div>

          {/* Mobile Carousel - Hidden on Desktop */}
          <div className="md:hidden relative">
            {/* Navigation Arrows */}
                   <button
                     onClick={prevSlide}
                     className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                     aria-label="Previous project"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                     </svg>
                   </button>

                   <button
                     onClick={nextSlide}
                     className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                     aria-label="Next project"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </button>

            {/* Carousel */}
            <div 
              ref={carouselRef}
              className="overflow-hidden py-5"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-card group mx-auto max-w-md cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl block flex flex-col h-full"
                    >
                      <div className="project-image" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)` }}>
                        <img 
                          src={project.image} 
                          alt={`${project.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: project.color }}>{project.name}</h3>
                      <p className="text-white/90 mb-4 leading-relaxed flex-grow">{project.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-primary mt-auto" style={{ color: project.color }}>
                        View Project →
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    idx === currentSlide ? 'bg-primary' : 'bg-gray-400'
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 
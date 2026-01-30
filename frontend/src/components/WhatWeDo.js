import React, { useState, useRef, useEffect } from "react";

const services = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We learn your business, goals, and audience to craft a winning web strategy.",
    details: "We start with comprehensive business analysis, competitor research, and audience profiling. Through collaborative workshops, we identify your unique value proposition, target market, and business objectives. This foundation informs every decision from design direction to technical architecture, ensuring your website drives real business results from day one.",
    link: "#contact",
    linkText: "Learn More"
  },
  {
    number: "02",
    title: "Branding & Design",
    description: "Pixel-perfect, on-brand visuals and UI that set you apart from the competition.",
    details: "We create distinctive visual identities that resonate with your audience and differentiate you from competitors. Our design process includes logo creation, color palette development, typography selection, and comprehensive brand guidelines. Every visual element is crafted to build trust, convey professionalism, and create memorable experiences that convert visitors into customers.",
    link: "#projects",
    linkText: "See Work"
  },
  {
    number: "03",
    title: "Web Development",
    description: "Modern, high-performance websites built for speed, security, and scalability.",
    details: "We build lightning-fast, secure websites using the same technologies top tech companies use, optimized for all devices. Our development includes responsive design, mobile optimization, SSL security, and cloud hosting. Every site is built for scalability, with clean code architecture that supports future growth and easy maintenance.",
    link: "#subscriptions",
    linkText: "Plans"
  },
  {
    number: "04",
    title: "Optimization & Growth",
    description: "SEO, analytics, and continuous improvements to help your business grow.",
    details: "We continuously monitor and optimize your website for maximum performance and growth. Our optimization includes technical SEO improvements, conversion rate optimization, analytics setup and analysis, and performance monitoring. We track key metrics, identify opportunities, and implement data-driven improvements that help your business grow month after month.",
    link: "#contact",
    linkText: "Start Growing"
  },
  {
    number: "05",
    title: "Ongoing Support",
    description: "Unlimited edits and proactive maintenance—no extra cost.",
    details: "We handle all updates, edits, and support requests so you can focus on your business. Our ongoing support includes unlimited edits with priority queues based on your plan, proactive security monitoring, regular backups, and performance maintenance. We're your dedicated web team, ensuring your site stays current, secure, and optimized at all times.",
    link: "#contact",
    linkText: "Get Support"
  },
  // {
  //   number: "06",
  //   title: "Digital Marketing",
  //   description: "Complete digital marketing strategies including social media and online advertising to grow your audience.",
  //   details: "We develop comprehensive digital marketing campaigns that drive traffic, engagement, and conversions across all platforms.",
  //   link: "#contact",
  //   linkText: "Get Started"
  // },
];

export default function WhatWeDo() {
  const [openIdx, setOpenIdx] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const modalRef = useRef(null);
  const carouselRef = useRef(null);

  // Close modal on ESC
  useEffect(() => {
    if (openIdx === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIdx]);

  // Focus trap
  useEffect(() => {
    if (openIdx === null || !modalRef.current) return;
    modalRef.current.focus();
  }, [openIdx]);

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
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
      <section id="what-we-do" className="relative py-24 professional-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 relative" style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: 'var(--glow-primary)'
            }}>
              What We Do
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full" style={{
                background: 'var(--gradient-primary)',
                boxShadow: '0 0 20px var(--primary)'
              }}></div>
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              We deliver end-to-end web solutions that drive real results. Every site is crafted with custom code—not built with drag-and-drop tools—giving you a polished, high-performance website that outshines WordPress and Squarespace templates.
            </p>
          </div>
          
          {/* Desktop Layout - Hidden on Mobile */}
          <div className="hidden md:block max-w-6xl mx-auto">
            {/* First row: 3 services */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="service-card group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background mx-2 my-4 flex flex-col h-full"
                   onClick={() => setOpenIdx(0)}
                   tabIndex={0}
                   aria-haspopup="dialog"
                   aria-expanded={openIdx === 0}>
                <div className="service-number">{services[0].number}</div>
                <h3 className="service-title">{services[0].title}</h3>
                <p className="service-description flex-grow">{services[0].description}</p>
                <div className="service-link mt-auto" style={{ color: 'var(--secondary)' }}>
                  Learn More →
                </div>
              </div>
              
              <div className="service-card group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background mx-2 my-4 flex flex-col h-full"
                   onClick={() => setOpenIdx(1)}
                   tabIndex={0}
                   aria-haspopup="dialog"
                   aria-expanded={openIdx === 1}>
                <div className="service-number">{services[1].number}</div>
                <h3 className="service-title">{services[1].title}</h3>
                <p className="service-description flex-grow">{services[1].description}</p>
                <div className="service-link mt-auto" style={{ color: 'var(--secondary)' }}>
                  Learn More →
                </div>
              </div>
              
              <div className="service-card group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background mx-2 my-4 flex flex-col h-full"
                   onClick={() => setOpenIdx(2)}
                   tabIndex={0}
                   aria-haspopup="dialog"
                   aria-expanded={openIdx === 2}>
                <div className="service-number">{services[2].number}</div>
                <h3 className="service-title">{services[2].title}</h3>
                <p className="service-description flex-grow">{services[2].description}</p>
                <div className="service-link mt-auto" style={{ color: 'var(--secondary)' }}>
                  Learn More →
                </div>
              </div>
            </div>
            
            {/* Second row: 2 services centered */}
            <div className="flex justify-center gap-8">
              <div className="service-card group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background mx-2 my-4 flex flex-col h-full"
                   onClick={() => setOpenIdx(3)}
                   tabIndex={0}
                   aria-haspopup="dialog"
                   aria-expanded={openIdx === 3}>
                <div className="service-number">{services[3].number}</div>
                <h3 className="service-title">{services[3].title}</h3>
                <p className="service-description flex-grow">{services[3].description}</p>
                <div className="service-link mt-auto" style={{ color: 'var(--secondary)' }}>
                  Learn More →
                </div>
              </div>
              
              <div className="service-card group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background mx-2 my-4 flex flex-col h-full"
                   onClick={() => setOpenIdx(4)}
                   tabIndex={0}
                   aria-haspopup="dialog"
                   aria-expanded={openIdx === 4}>
                <div className="service-number">{services[4].number}</div>
                <h3 className="service-title">{services[4].title}</h3>
                <p className="service-description flex-grow">{services[4].description}</p>
                <div className="service-link mt-auto" style={{ color: 'var(--secondary)' }}>
                  Learn More →
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Carousel - Hidden on Desktop */}
          <div className="md:hidden relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Previous service"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
              aria-label="Next service"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {services.map((service, idx) => (
                  <div key={service.title} className="w-full flex-shrink-0 px-4">
                     <div
                       className="service-card group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background mx-auto max-w-md flex flex-col h-full"
                       onClick={() => setOpenIdx(idx)}
                       tabIndex={0}
                       aria-haspopup="dialog"
                       aria-expanded={openIdx === idx}
                     >
                       <div className="service-number">{service.number}</div>
                       <h3 className="service-title">{service.title}</h3>
                       <p className="service-description flex-grow">{service.description}</p>
                       <div className="service-link mt-auto" style={{ color: 'var(--secondary)' }}>
                         Learn More →
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    idx === currentSlide ? 'bg-primary' : 'bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {openIdx !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setOpenIdx(null)}
        >
          <div
            ref={modalRef}
            className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-[var(--secondary)] rounded-3xl p-4 sm:p-8 max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--secondary), 0 0 20px rgba(255, 0, 96, 0.3)'
            }}
          >
            {/* Close button with glow effect */}
            <button
              onClick={() => setOpenIdx(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-all duration-200 hover:scale-110 z-10"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="pr-4 sm:pr-8 pt-2 sm:pt-4">
              {/* Service number and title */}
              <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-2xl sm:text-4xl font-bold" style={{ color: 'var(--secondary)' }}>
                  {services[openIdx].number}
                </div>
                <h2 className="text-xl sm:text-3xl font-bold text-white">
                  {services[openIdx].title}
                </h2>
              </div>
              
              {/* Content with better typography */}
              <div className="space-y-4 sm:space-y-6">
                <div className="relative">
                  <p className="text-sm sm:text-lg text-white/80 leading-relaxed font-light">
                    {services[openIdx].details}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enhanced animated background elements */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              {/* Floating orbs */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[var(--secondary)]/8 blur-2xl animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-[var(--accent)]/6 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 right-8 w-12 h-12 rounded-full bg-[var(--accent)]/5 blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 0, 96, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 0, 96, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
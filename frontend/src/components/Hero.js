"use client"
import { useState, useEffect, useRef } from "react";

function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];
    const PARTICLE_COUNT = 60;
    const LINK_DISTANCE = 120;
    const PARTICLE_COLOR = "rgba(255,255,255,";

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.4 + 0.1,
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.15;
            ctx.strokeStyle = PARTICLE_COLOR + alpha + ")";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.fillStyle = PARTICLE_COLOR + p.opacity + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function update() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
    }

    function loop() {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    }

    init();
    loop();

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef]);
}

export default function Hero() {
  //const [videoError, setVideoError] = useState(false);
  const [videoError, setVideoError] = useState(true);
  const videoRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  useParticles(particlesCanvasRef);
  
  // Initialize random positions directly (no need for useEffect)
  const [randomPositions] = useState(() => {
    return [
      { top: Math.random() * 60 + 10, left: Math.random() * 60 + 10 }, // KRITZBITZ
      { top: Math.random() * 60 + 10, right: Math.random() * 60 + 10 }, // Gorilla message
      { bottom: Math.random() * 60 + 10, left: Math.random() * 60 + 10 }, // RIP Harambe
      { bottom: Math.random() * 60 + 10, right: Math.random() * 60 + 10 }, // Christ is King
      { top: Math.random() * 40 + 20, left: Math.random() * 60 + 20 } // Prayer
    ];
  });

  // Ensure video plays on mount (fixes client-side navigation issue)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Just play - don't reload
      video.play().catch((err) => {
        console.log('Video autoplay prevented:', err);
      });
    }
  }, []);

  const handleVideoError = () => {
    console.log('Video failed to load');
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully - 13.4MB binary.mov');
    //setVideoError(false)
    setVideoError(true)
  };


  return (
    <>
      {/* Hero Section */}
      <section id="top" className="parallax-hero relative overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          preload="auto"
        >
          <source src="/binary.mov" type="video/quicktime" />
          <source src="/binary.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Binary Messages Background - Only show when video fails */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0">
            <div className="absolute inset-0 bg-black/20"></div>
            {/* ASCII Binary Messages */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Binary text: "KRITZBITZ" */}
              <div className="absolute text-xs font-mono opacity-20 animate-pulse" style={{
                color: '#00ff9f',
                top: `${randomPositions[0]?.top || 10}%`,
                left: `${randomPositions[0]?.left || 10}%`
              }}>
                01001011 01010010 01001001 01010100 01011010 00100000 01000010 01001001 01010100 01011010
              </div>
              {/* Binary text: "RIP Harambe" */}
              <div className="absolute text-xs font-mono opacity-20 animate-pulse" style={{
                color: '#b708fe',
                animationDelay: '2s',
                bottom: `${randomPositions[2]?.bottom || 20}%`,
                left: `${randomPositions[2]?.left || 20}%`
              }}>
                01010010 01001001 01010000 00100000 01001000 01100001 01110010 01100001 01101101 01100010 01100101
              </div>
              {/* Binary text: "Christ is King" */}
              <div className="absolute text-xs font-mono opacity-20 animate-pulse" style={{
                color: '#00e0ff',
                animationDelay: '0.5s',
                bottom: `${randomPositions[3]?.bottom || 10}%`,
                right: `${randomPositions[3]?.right || 20}%`
              }}>
                01000011 01101000 01110010 01101001 01110011 01110100 00100000 01101001 01110011 00100000 01001011 01101001 01101110 01100111
              </div>
              {/* Binary text: "Lord Jesus Christ, Son of God, have mercy on me, a sinner." */}
              <div className="absolute text-xs font-mono opacity-15 animate-pulse" style={{
                color: '#00ff9f',
                animationDelay: '3s',
                top: `${randomPositions[4]?.top || 25}%`,
                left: `${randomPositions[4]?.left || 33}%`,
                transform: 'translate(-50%, -50%)'
              }}>
                01001100 01101111 01110010 01100100 00100000 01001010 01100101 01110011 01110101 01110011 00100000 01000011 01101000 01110010 01101001 01110011 01110100 00101100 00100000 01010011 01101111 01101110 00100000 01101111 01100110 00100000 01000111 01101111 01100100 00101100 00100000 01101000 01100001 01110110 01100101 00100000 01101101 01100101 01110010 01100011 01111001 00100000 01101111 01101110 00100000 01101101 01100101 00101100 00100000 01100001 00100000 01110011 01101001 01101110 01101110 01100101 01110010 00101110
              </div>
            </div>
          </div>
        )}
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Particles background */}
        <canvas
          ref={particlesCanvasRef}
          className="absolute inset-0 w-full h-full z-[15] pointer-events-none"
        />

        {/* Hero Content */}
        <div className="parallax-content relative z-20">
          {/* Logo */}
          <div className="logo-container flex justify-center">
            <img 
              src="/dankey.svg" 
              alt="KritzBitz Logo" 
              className="hero-logo w-full h-auto drop-shadow-2xl object-contain"
            />
          </div>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-12 max-w-5xl mx-auto leading-relaxed font-light text-center">
            Flawless Websites, Zero Hassle - So You Can Stay Focused on What Matters
          </p>
        </div>
      </section>
    </>
  );
} 

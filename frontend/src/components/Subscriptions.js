"use client"
import { Parallax } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function Subscriptions() {

  const subscription = {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "The essentials for small businesses, startups, and solo professionals.",
    color: "var(--primary)",
    features: [
      { title: "Web Design & Development", description: "Fast, secure, and mobile-friendly" },
      { title: "Logo & Branding", description: "Logo design, color palette, fonts" },
      { title: "Basic SEO", description: "Code optimized for crawler and indexed" },
      { title: "SSL Security", description: "Trusted and secure HTTPS site" },
      { title: "Hosting", description: "We handle uptime, security, and performance" },
      { title: "Unlimited Edits", description: "Lower priority queue but no cap on changes" }
    ]
  };

  return (
    <ParallaxProvider>
    <section id="subscriptions" className="relative py-16 md:py-24 overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <Parallax speed={-40} className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/code.jpg)',
              height: '120%',
              width: '120%',
              top: '-10%',
              left: '-10%'
            }}
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent leading-tight pb-2">
            Pricing
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
            Comprehensive web solutions for your business. Includes unlimited edits with no upfront costs.
          </p>
        </div>
        
        {/* Simplified Subscription Card */}
        <div className="max-w-5xl mx-auto w-full backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 transition-all duration-500 bg-gradient-to-br from-white/10 via-white/8 to-white/5 border-2 border-[var(--primary)]/50 shadow-lg shadow-[var(--primary)]/20">
          {/* Plan Header */}
          <div className="text-center mb-4 md:mb-8">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-white">
              Starting at
            </h3>
            <div className="flex items-baseline justify-center gap-2 mb-3 md:mb-4">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: subscription.color }}>
                {subscription.price}
              </div>
              <div className="text-white/60 text-lg md:text-xl lg:text-2xl">
                {subscription.period}
              </div>
            </div>
            <p className="text-sm md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              {subscription.description}
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-8">
            {subscription.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--primary)]/30 transition-all duration-300">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: subscription.color }}>
                    <span className="text-white text-xs md:text-sm">✓</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-base text-white/80">
                    <span className="font-semibold block mb-0.5 md:mb-1" style={{ color: subscription.color }}>
                      {typeof feature === 'string' ? feature : feature.title}
                    </span>
                    {typeof feature === 'object' && (
                      <span className="text-white/70 leading-relaxed text-xs md:text-sm">
                        {feature.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA Button - Back in Card */}
          <div className="flex justify-center">
            <a 
              href="#contact" 
              className="w-full md:w-auto px-6 md:px-10 py-3 md:py-4 rounded-xl font-semibold text-center block transition-all duration-300 hover:scale-105 hover:shadow-lg text-base md:text-lg"
              style={{ 
                backgroundColor: subscription.color,
                color: 'white'
              }}
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Custom Features Section - Moved Below Card */}
        <div className="flex items-center justify-center mt-4 md:mt-8">
          <p className="text-base text-center italic" style={{ color: 'var(--teal)' }}>
            Need more than the essentials? We can build exactly what you need.
          </p>
        </div>
      </div>
    </section>
    </ParallaxProvider>
  );
} 

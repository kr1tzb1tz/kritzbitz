"use client"
import { useEffect } from 'react';
import Hero from '../components/Hero';
import Subscriptions from '../components/Subscriptions';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatWeDo from '../components/WhatWeDo';

export default function Home() {
  // Analytics tracking is handled automatically by the analytics library
  useEffect(() => {
    // Backup manual trigger with delay
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        import('../lib/analytics').then(({ default: analytics }) => {
          console.log('🔄 Backup analytics trigger');
          analytics.trackPageView('/', 'KritzBitz');
        });
      }
    }, 2000); // 2 second delay
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <WhatWeDo />
      <Subscriptions />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

"use client"
import Hero from '../components/Hero';
import Subscriptions from '../components/Subscriptions';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatWeDo from '../components/WhatWeDo';

export default function Home() {
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

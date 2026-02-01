"use client"
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Close menu when overlay is clicked
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  // Navigate to section (works on home page) or navigate to home page with section
  const scrollToSection = (sectionId) => {
    if (pathname === '/') {
      // On home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // On other pages, navigate to home page with section
      router.push(`/#${sectionId}`);
    }
    setOpen(false); // Close mobile menu
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        {/* Logo */}
        <button onClick={() => {
          if (pathname === '/') {
            scrollToSection('top');
          } else {
            router.push('/');
          }
        }} className="flex items-center">
          <img 
            src="/kritzbitz.svg" 
            alt="KritzBitz Logo" 
            style={{ 
              height: '40px', 
              width: 'auto' 
            }} 
          />
        </button>
        {/* Desktop Links - Hidden on Mobile */}
        <div className="hidden md:flex gap-10 items-center">
          <button onClick={() => scrollToSection('what-we-do')} className="nav-link">WHAT WE DO</button>
          <button onClick={() => scrollToSection('subscriptions')} className="nav-link">PRICING</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">FEATURED WORK</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">CONTACT</button>
        </div>
        {/* Hamburger/X Toggle Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-[60]"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ease-in-out ${open ? 'rotate-45 translate-y-2' : ''}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ease-in-out ${open ? 'opacity-0' : ''}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${open ? '-rotate-45 -translate-y-2' : ''}`}
          ></span>
        </button>
      </div>
      {/* Mobile Menu & Overlay */}
      <div
        className={`fixed inset-0 z-[70] transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Dark Background Overlay */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={handleOverlayClick}
        ></div>
      
        {/* Mobile Menu Panel */}
        <div 
          className={`fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] flex flex-col z-[80] transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Black Full Opacity */}
          <div className="bg-black p-6 pt-6 border-b border-gray-700">
            <div className="flex items-center justify-center">
              <button onClick={() => {
                if (pathname === '/') {
                  scrollToSection('top');
                } else {
                  router.push('/');
                }
              }}>
                <img 
                  src="/dankey-kb.svg" 
                  alt="KritzBitz Logo" 
                  style={{ height: '100px', width: 'auto' }} 
                />
              </button>
            </div>
          </div>
          
          {/* Navigation Links - Black 75% Opacity */}
          <div className="bg-black/75 p-6 flex-1 min-h-0">
            <button 
              onClick={() => scrollToSection('what-we-do')}
              className="block w-full text-lg font-bold text-white active:text-white active:bg-blue-500 px-4 py-4 rounded-lg mb-3 transition-all duration-200" 
            >
              What We Do
            </button>
            <button 
              onClick={() => scrollToSection('subscriptions')}
              className="block w-full text-lg font-bold text-white active:text-white active:bg-green-500 px-4 py-4 rounded-lg mb-3 transition-all duration-200" 
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="block w-full text-lg font-bold text-white active:text-white active:bg-pink-500 px-4 py-4 rounded-lg mb-3 transition-all duration-200" 
            >
              Featured Work
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-lg font-bold text-white active:text-white active:bg-purple-500 px-4 py-4 rounded-lg mb-3 transition-all duration-200" 
            >
              Contact
            </button>
          </div>
          
          {/* Footer - Black 75% Opacity */}
          <div className="bg-black/75 p-6 text-center">
            <div className="text-white text-sm font-medium">
              Est. 2025
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 
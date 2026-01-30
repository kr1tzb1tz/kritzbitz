"use client"
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
  // Initialize with current year directly (no need for useEffect)
  const [currentYear] = useState(() => new Date().getFullYear());
  const router = useRouter();
  const pathname = usePathname();

  const scrollToTop = () => {
    if (pathname === '/') {
      // On home page, scroll to top section
      const element = document.getElementById('top');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Fallback to window scroll
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    } else {
      // On other pages, navigate to home page
      router.push('/#top');
    }
  };

  return (
    <footer className="bg-black py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <img 
              src="/dankey-kb.svg" 
              alt="KritzBitz Logo" 
              onClick={scrollToTop}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              style={{ 
                height: '200px', 
                width: 'auto' 
              }} 
            />
          </div>
          <p className="text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
            Flawless Websites, Zero Hassle - So You Can Stay Focused on What Matters
          </p>
          <div className="flex flex-col items-center space-y-3">
            <a href="mailto:hello@kritzbitz.com" className="text-gray-400 hover:text-primary transition-colors flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>hello@kritzbitz.com</span>
            </a>
            <a href="tel:+17403595207" className="text-gray-400 hover:text-primary transition-colors flex items-center space-x-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(740) 359-5207</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} KritzBitz. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
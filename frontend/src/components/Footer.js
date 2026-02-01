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
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Kritz Bitz. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 

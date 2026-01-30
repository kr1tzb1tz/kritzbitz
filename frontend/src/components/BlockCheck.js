"use client"
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Component that checks if the current user's IP is blocked.
 * If blocked, redirects to /blocked page.
 * This should be included in the root layout to check on every page.
 */
export default function BlockCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't check if we're already on the blocked page
    if (pathname === '/blocked') {
      return;
    }

    const checkBlocked = async () => {
      try {
        // Build API URL
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiPort = process.env.NEXT_PUBLIC_API_PORT || '1111';
        const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX || '/api/v1';
        
        let apiBaseUrl;
        if (apiUrl) {
          const prefix = apiPrefix.startsWith('/') ? apiPrefix : `/${apiPrefix}`;
          apiBaseUrl = `${apiUrl.replace(/\/$/, '')}${prefix}`;
        } else {
          const protocol = window.location.protocol;
          const hostname = window.location.hostname;
          const prefix = apiPrefix.startsWith('/') ? apiPrefix : `/${apiPrefix}`;
          apiBaseUrl = `${protocol}//${hostname}:${apiPort}${prefix}`;
        }
        
        const response = await fetch(`${apiBaseUrl}/analytics/block/check`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) {
          // If the check fails, assume not blocked to avoid false positives
          return;
        }
        
        const data = await response.json();
        
        // If blocked, redirect to blocked page immediately
        if (data.is_blocked) {
          router.replace('/blocked');
        }
      } catch (error) {
        // On error, assume not blocked to avoid false positives
        // Only log if it's not an abort error
        if (error.name !== 'AbortError') {
          console.error('Error checking block status:', error);
        }
      }
    };
    
    // Check immediately and also set up periodic checks
    checkBlocked();
    
    // Set up interval to check periodically (every 2 seconds)
    const intervalId = setInterval(checkBlocked, 2000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [router, pathname]);

  // This component doesn't render anything - it runs silently in the background
  return null;
}


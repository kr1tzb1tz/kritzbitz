"use client"
import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function BlockedPage() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkBlockedStatus = useCallback(async () => {
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
        signal: AbortSignal.timeout(5000)
      });
      
      if (!response.ok) {
        // If the check fails, assume not blocked to avoid false positives
        setTimeout(() => {
          setIsChecking(false);
        }, 0);
        if (pathname !== '/blocked') {
          setTimeout(() => {
            router.replace('/');
          }, 0);
        }
        return false;
      }
      
      const data = await response.json();
      const blocked = data.is_blocked || false;
      
      // Defer setState calls to avoid synchronous setState in effect
      setTimeout(() => {
        setIsBlocked(blocked);
        setIsChecking(false);
      }, 0);
      
      // If not blocked, redirect to home
      if (!blocked) {
        setTimeout(() => {
          router.replace('/');
        }, 0);
        return false;
      }
      
      return blocked;
    } catch (error) {
      console.error('Error checking block status:', error);
      setTimeout(() => {
        setIsChecking(false);
      }, 0);
      // On error, assume not blocked and redirect
      if (pathname !== '/blocked') {
        setTimeout(() => {
          router.replace('/');
        }, 0);
      }
      return false;
    }
  }, [pathname, router]);

  useEffect(() => {
    // Initial check - if not blocked, redirect immediately
    checkBlockedStatus().then(blocked => {
      if (!blocked && pathname === '/blocked') {
        // User is not blocked but on blocked page, redirect to home
        setTimeout(() => {
          router.replace('/');
        }, 0);
      }
    });
  }, [checkBlockedStatus, pathname, router]);

  useEffect(() => {
    // Monitor pathname changes - if user tries to navigate away, redirect back
    if (pathname !== '/blocked') {
      if (isBlocked) {
        // User tried to navigate away while blocked, redirect back immediately
        setTimeout(() => {
          router.replace('/blocked');
        }, 0);
      } else {
        // User is on a different page, check if they're blocked
        checkBlockedStatus().then(blocked => {
          if (blocked) {
            setTimeout(() => {
              router.replace('/blocked');
            }, 0);
          }
        });
      }
    } else if (pathname === '/blocked' && !isBlocked && !isChecking) {
      // User is on blocked page but not blocked, redirect to home
      setTimeout(() => {
        router.replace('/');
      }, 0);
    }
  }, [pathname, isBlocked, isChecking, router, checkBlockedStatus]);

  // Also intercept browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      if (isBlocked && pathname !== '/blocked') {
        // Use setTimeout to avoid synchronous setState in effect
        setTimeout(() => {
          router.replace('/blocked');
        }, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isBlocked, pathname, router]);

  if (isChecking) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#000000', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#ffffff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '2px solid #00ff9f',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ color: '#888888' }}>Checking access...</p>
        </div>
      </div>
    );
  }

  if (!isBlocked) {
    return null; // Will redirect
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '1rem',
      color: '#ffffff'
    }}>
      <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          {/* Blocked Icon - Red Crossed Out Circle */}
          <div style={{ 
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: '#ff4444' }}
            >
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="#ff4444" 
                strokeWidth="2" 
                fill="none"
              />
              <line 
                x1="8" 
                y1="8" 
                x2="16" 
                y2="16" 
                stroke="#ff4444" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
              <line 
                x1="16" 
                y1="8" 
                x2="8" 
                y2="16" 
                stroke="#ff4444" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 700, 
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Access Denied
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '1.5rem',
            color: '#cccccc'
          }}>
            Your IP address has been blocked.
          </p>
          <p style={{ 
            fontSize: '1.125rem', 
            marginBottom: '2rem',
            color: '#cccccc'
          }}>
            We&apos;re sorry, but your access to this website has been restricted.
          </p>
          <p style={{ 
            marginBottom: '0',
            color: '#888888'
          }}>
            If you believe this is an error, please contact the administrator of the website.
          </p>
        </div>
      </div>
    </div>
  );
}


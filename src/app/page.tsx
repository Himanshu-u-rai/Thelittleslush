'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

type GifItem = {
  id: string;
  tags: string[];
  thumbnail?: string;
};

// Native Banner Ad Component - Desktop Only
function NativeBannerAd({ adIndex }: { adIndex: number }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const containerId = `container-9be5fa9afc647dba020ba8bfd086706c-${adIndex}`;

  useEffect(() => {
    // Check if desktop (window width > 768px)
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="native-ad-container">
      <Script
        async
        data-cfasync="false"
        src="https://schemecontinuingwinning.com/9be5fa9afc647dba020ba8bfd086706c/invoke.js"
        strategy="lazyOnload"
      />
      <div id={containerId}></div>
    </div>
  );
}

// 728x90 Leaderboard Banner Ad Component
function LeaderboardBannerAd({ adIndex }: { adIndex: number }) {
  const [isWideEnough, setIsWideEnough] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on screens >= 768px (banner is 728px wide)
    const checkWidth = () => {
      setIsWideEnough(window.innerWidth >= 768);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useEffect(() => {
    if (isWideEnough && containerRef.current) {
      // Set up atOptions for this specific ad
      (window as any).atOptions = {
        'key': '3caad54b5cbc1f32886c0755b8ddec3c',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };

      // Create and append script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/3caad54b5cbc1f32886c0755b8ddec3c/invoke.js';
      script.async = true;
      containerRef.current.appendChild(script);
    }
  }, [isWideEnough, adIndex]);

  if (!isWideEnough) return null;

  return (
    <div className="leaderboard-ad-container">
      <div ref={containerRef} id={`leaderboard-ad-${adIndex}`}></div>
    </div>
  );
}

// 300x250 Medium Rectangle Ad Component - Fits in masonry columns
function MediumRectangleAd({ adIndex }: { adIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (containerRef.current && !hasLoaded) {
      // Set up atOptions for this specific ad
      (window as any).atOptions = {
        'key': 'caad3414eba66bc32ad8167e0f3e70cd',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };

      // Create and append script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://schemecontinuingwinning.com/caad3414eba66bc32ad8167e0f3e70cd/invoke.js';
      script.async = true;
      containerRef.current.appendChild(script);
      setHasLoaded(true);
    }
  }, [adIndex, hasLoaded]);

  return (
    <div className="masonry-item medium-rect-ad">
      <div ref={containerRef} id={`medium-rect-ad-${adIndex}`}></div>
    </div>
  );
}

// Back to Top Button Component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      // Get scroll position from body (the actual scroll container)
      const scrollTop = document.body.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    // Attach listener directly to body
    const body = document.body;
    body.addEventListener('scroll', checkScroll, { passive: true });

    // Also poll every 500ms as fallback
    const interval = setInterval(checkScroll, 500);

    // Check initial state
    checkScroll();

    return () => {
      body.removeEventListener('scroll', checkScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

function VideoCard({ gif }: { gif: GifItem }) {
  const [isLoaded, setIsLoaded] = useState(false); // Should the iframe exist in DOM?
  const [isPlaying, setIsPlaying] = useState(false); // Should the iframe be visible and playing?
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    if (isTouch && cardRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Step 1: Pre-load (mount iframe) when video enters viewport (10% visible)
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
              setIsLoaded(true);
            } else if (!entry.isIntersecting) {
              // Unmount completely when scrolled away to save memory
              setIsLoaded(false);
              setIsPlaying(false);
            }

            // Step 2: Play/Reveal when focused (80% visible)
            if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
              setIsPlaying(true);
            } else if (entry.intersectionRatio < 0.6) {
              setIsPlaying(false);
            }
          });
        },
        {
          threshold: [0.1, 0.6, 0.8],
          rootMargin: '100px 0px' // Start loading slightly before it hits the viewport
        }
      );

      observer.observe(cardRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTouchDevice) {
      e.preventDefault();
      if (!isLoaded) setIsLoaded(true);
      setIsPlaying(prev => !prev);
    }
  };

  return (
    <div
      ref={cardRef}
      className="masonry-item"
      onMouseEnter={() => !isTouchDevice && (setIsLoaded(true), setIsPlaying(true))}
      onMouseLeave={() => !isTouchDevice && setIsPlaying(false)}
      onTouchStart={handleTouchStart}
    >
      <div className="iframe-container" style={{ position: 'relative' }}>
        {isLoaded && (
          <iframe
            src={`https://www.redgifs.com/ifr/${gif.id}?controls=0&autoplay=1`}
            title={`RedGIFs ${gif.id}`}
            loading="eager"
            allowFullScreen
            scrolling="no"
            style={{
              pointerEvents: 'none',
              width: '100%',
              height: '100%',
              border: 'none',
              opacity: isPlaying ? 1 : 0, // Keep iframe hidden until focused
              transition: 'opacity 0.3s ease',
              zIndex: isPlaying ? 2 : 1
            }}
          />
        )}

        {/* Always keep thumbnail in background or visible until playing */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isPlaying ? 0 : 1, // Fade out thumbnail when playing
          transition: 'opacity 0.3s ease',
          zIndex: 1
        }}>
          <img
            src={`/api/image-proxy?url=${encodeURIComponent(gif.thumbnail || `https://media.redgifs.com/${gif.id}-mobile.jpg`)}`}
            alt={gif.id}
            style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#1a1a1a' }}
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = 'none';
              const placeholder = document.createElement('div');
              placeholder.className = 'thumbnail-error';
              placeholder.innerHTML = '▶';
              img.parentElement?.appendChild(placeholder);
            }}
          />
          {/* Play button overlay for mobile */}
          {isTouchDevice && !isPlaying && (
            <div className="play-overlay">
              <div className="play-icon">▶</div>
            </div>
          )}
        </div>
        {/* Only show link overlay when not playing on touch device - allows tap to stop */}
        {(!isTouchDevice || !isPlaying) && (
          <Link
            href={`/watch/${gif.id}`}
            onClick={(e) => {
              if (isTouchDevice && !isPlaying) {
                // First tap plays preview, don't navigate
                e.preventDefault();
              }
              // If already playing on touch device, allow navigation
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
              cursor: 'pointer'
            }}
          />
        )}
        {/* Show "Watch Full" button when playing on mobile */}
        {isTouchDevice && isPlaying && (
          <Link
            href={`/watch/${gif.id}`}
            className="watch-full-btn"
          >
            Watch Full ▶
          </Link>
        )}
      </div>
    </div>
  );
}

// ... in Home component ...

type GifResponse = {
  gifs: GifItem[];
  next: string | null;
  total?: number;
};

export default function Home() {
  const [gifs, setGifs] = useState<GifItem[]>([]);
  const [page, setPage] = useState<string | null>('1'); // RedGIFs uses pages or cursors
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(''); // Current search query
  const [searchInput, setSearchInput] = useState(''); // Input field value
  const [hasMore, setHasMore] = useState(true);
  const [availableTags, setAvailableTags] = useState<string[]>([
    'Amateur', 'Asian', 'Redhead', 'Blonde', 'Brunette', 'Teen', 'Milf', 'Latina', 'Ebony', 'Hentai', 'Cosplay', '3D', 'Homemade', 'Creampie', 'Anal'
  ]);

  // Age verification state
  const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);
  const [showAgeModal, setShowAgeModal] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);
  const initialLoadDone = useRef(false);

  // Check age verification on mount
  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsAgeVerified(true);
      setShowAgeModal(false);
    } else {
      setIsAgeVerified(false);
      setShowAgeModal(true);
    }
  }, []);

  const handleAgeConfirm = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem('ageVerified', 'true');
      setIsAgeVerified(true);
      setShowAgeModal(false);
    } else {
      // Redirect underage users away
      window.location.href = 'https://www.google.com';
    }
  };

  // Fetch GIFs
  const fetchGifs = useCallback(async (pageNum: string, searchQuery: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/gifs?page=${pageNum}&search=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data: GifResponse = await res.json();

      setGifs(prev => {
        const newItems = data.gifs || [];
        const combined = pageNum === '1' ? newItems : [...prev, ...newItems];
        return combined.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i);
      });

      // Extract and merge tags
      setAvailableTags(prev => {
        const uniqueTags = new Set(prev);
        (data.gifs || []).forEach(item => {
          item.tags.forEach(tag => {
            uniqueTags.add(tag);
          });
        });
        return Array.from(uniqueTags);
      });

      setPage(data.next); // API returns next cursor/page
      setHasMore(!!data.next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial Fetch & Search Change
  useEffect(() => {
    // Reset and fetch
    setGifs([]);
    setPage('1');
    setHasMore(true);
    fetchGifs('1', query);
  }, [query, fetchGifs]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && page && page !== '1') {
          // We prefer not to trigger on page 1 if initial load isn't done, 
          // but page !== '1' allows next pages logic
          fetchGifs(page, query);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page, query, fetchGifs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() === query) return;
    setQuery(searchInput.trim());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Age Verification Modal */}
      {showAgeModal && (
        <div className="age-modal-overlay">
          <div className="age-modal">
            <div className="age-modal-icon">🔞</div>
            <h2>Age Verification Required</h2>
            <p>This website contains adult content intended for viewers 18 years of age or older.</p>
            <p className="age-modal-question">Are you 18 years or older?</p>
            <div className="age-modal-buttons">
              <button
                className="age-btn age-btn-enter"
                onClick={() => handleAgeConfirm(true)}
              >
                Yes, I am 18+
              </button>
              <button
                className="age-btn age-btn-leave"
                onClick={() => handleAgeConfirm(false)}
              >
                No, Leave
              </button>
            </div>
            <p className="age-modal-disclaimer">
              By entering, you agree that you are of legal age to view adult content in your jurisdiction.
            </p>
          </div>
        </div>
      )}

      {/* Only show content if age verified */}
      {isAgeVerified && (
        <main>
          <header className="header">
            <div className="logo" onClick={() => { setQuery(''); setSearchInput(''); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Image src="/logo.png" alt="thelittleslush.fun" width={220} height={50} style={{ objectFit: 'contain', height: '40px', width: 'auto' }} priority />
            </div>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </header>

          <div className="filter-bar">
            {/* Clear filter button - shows when search is active */}
            {query && (
              <div
                className="filter-chip clear-chip"
                onClick={() => {
                  setQuery('');
                  setSearchInput('');
                  document.body.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Clear ✕
              </div>
            )}
            {/* Premium Smartlink */}
            <a
              href="https://schemecontinuingwinning.com/vxt94pck0?key=f2328f74f27cb2b4efcb5bcf6b5a5493"
              target="_blank"
              rel="noopener noreferrer"
              className="filter-chip premium-chip"
            >
              Premium 🔥
            </a>
            {availableTags.map((cat) => (
              <div
                key={cat}
                className={`filter-chip ${query.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                onClick={() => {
                  setQuery(cat);
                  setSearchInput(cat);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {cat}
              </div>
            ))}
          </div>

          <div className="main-content">
            {/* Top Leaderboard Banner */}
            <LeaderboardBannerAd adIndex={0} />

            <div className="masonry-grid">
              {gifs.filter(g => !query || g.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))).flatMap((gif, index) => {
                const items = [<VideoCard key={`${gif.id}-${index}`} gif={gif} />];
                // Insert ads at regular intervals
                // Insert 300x250 ad every 5 items (fits in masonry column)
                if ((index + 1) % 5 === 0 && (index + 1) % 10 !== 0) {
                  items.push(<MediumRectangleAd key={`medium-rect-${index}`} adIndex={Math.floor(index / 5)} />);
                }
                // Insert banner ads every 10 items
                if ((index + 1) % 10 === 0) {
                  // Alternate between native and leaderboard ads
                  if (((index + 1) / 10) % 2 === 0) {
                    items.push(<LeaderboardBannerAd key={`leaderboard-${index}`} adIndex={Math.floor(index / 10) + 1} />);
                  } else {
                    items.push(<NativeBannerAd key={`native-${index}`} adIndex={Math.floor(index / 10)} />);
                  }
                }
                return items;
              })}
            </div>

            {gifs.length === 0 && !loading && (
              <div className="error-message">
                <h2>No results found</h2>
                <p>Try searching for something else.</p>
              </div>
            )}

            <div ref={observerTarget} className="load-more-trigger">
              {loading && (
                <div className="loader">
                  <span>Loading more content...</span>
                </div>
              )}
              {!hasMore && gifs.length > 0 && (
                <div className="end-content">
                  <div className="loader">You have reached the end.</div>
                  <a
                    href="https://schemecontinuingwinning.com/vxt94pck0?key=f2328f74f27cb2b4efcb5bcf6b5a5493"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-cta"
                  >
                    🔥 Explore More Premium Content
                  </a>
                  {/* Bottom Leaderboard Banner */}
                  <LeaderboardBannerAd adIndex={99} />
                </div>
              )}
            </div>
          </div>
          <BackToTopButton />
        </main>
      )}
    </>
  );
}

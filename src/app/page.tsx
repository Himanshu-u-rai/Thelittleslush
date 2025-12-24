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

// Skeleton Loading Card Component
function SkeletonCard() {
  return (
    <div className="masonry-item skeleton-card">
      <div className="skeleton-container">
        <div className="skeleton-shimmer"></div>
        <div className="skeleton-play-icon">
          <div className="skeleton-circle"></div>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>TheLittleSlush</h2>
          <p>
            The premium destination for trending adult content. Millions of GIFs and videos updated daily for your entertainment.
          </p>
        </div>
        <div className="footer-links">
          <h3>Categories</h3>
          <ul>
            <li><Link href="/?search=Amateur">Amateur</Link></li>
            <li><Link href="/?search=Asian">Asian</Link></li>
            <li><Link href="/?search=Teen">Teen</Link></li>
            <li><Link href="/?search=Hentai">Hentai</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Support</h3>
          <ul>
            <li><Link href="/policies">DMCA Policy</Link></li>
            <li><Link href="/policies">Terms of Service</Link></li>
            <li><Link href="/policies">2257 Compliance</Link></li>
            <li><Link href="/policies">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} thelittleslush.fun. All rights reserved.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span className="rta-logo">RTA</span>
          <span>18+ Adult Content</span>
        </div>
      </div>
    </footer>
  );
}

// Back to Top Button Component
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 600);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    // Also check body scroll as some layouts use that
    document.body.addEventListener('scroll', checkScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScroll);
      document.body.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      aria-label="Back to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

// Filter Bar with drag-to-scroll functionality
function FilterBar({
  query,
  setQuery,
  setSearchInput,
  availableTags,
}: {
  query: string;
  setQuery: (q: string) => void;
  setSearchInput: (s: string) => void;
  availableTags: string[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateArrows = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
    updateArrows();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(updateArrows, 300);
    }
  };

  return (
    <div className="filter-bar-container">
      {/* Left scroll arrow */}
      {showLeftArrow && (
        <button
          className="filter-scroll-arrow left"
          onClick={() => scrollByAmount('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}

      <div
        ref={scrollRef}
        className="filter-bar"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onScroll={updateArrows}
        style={{ cursor: 'grab' }}
      >
        {/* Clear filter button */}
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
              if (!isDragging) {
                setQuery(cat);
                setSearchInput(cat);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Right scroll arrow */}
      {showRightArrow && (
        <button
          className="filter-scroll-arrow right"
          onClick={() => scrollByAmount('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      )}
    </div>
  );
}

function VideoCard({ gif }: { gif: GifItem }) {
  const [isLoaded, setIsLoaded] = useState(false); // Should the iframe exist in DOM?
  const [isPlaying, setIsPlaying] = useState(false); // Should the iframe be visible and playing?
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile based on screen width (matches CSS breakpoint)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // For mobile: use intersection observer to auto-play when in view
    if (cardRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setIsLoaded(true);
              setIsPlaying(true);
            } else if (!entry.isIntersecting) {
              // Unload when scrolled away to save memory
              setIsLoaded(false);
              setIsPlaying(false);
            }
          });
        },
        {
          threshold: [0.5],
          rootMargin: '50px 0px'
        }
      );

      observer.observe(cardRef.current);
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // MOBILE VIEW: Simple layout with iframe and tap-to-navigate
  if (isMobile) {
    return (
      <div ref={cardRef} className="masonry-item">
        <div className="iframe-container" style={{ position: 'relative' }}>
          {/* Iframe loads when in viewport */}
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
                opacity: 1,
                zIndex: 1
              }}
            />
          )}

          {/* Loading placeholder when iframe not yet loaded */}
          {!isLoaded && (
            <div className="mobile-loading-placeholder">
              <div className="loading-spinner"></div>
            </div>
          )}

          {/* Simple tap overlay - always navigates to watch page */}
          <Link
            href={`/watch/${gif.id}`}
            className="mobile-tap-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '20px',
              background: 'linear-gradient(transparent 70%, rgba(0,0,0,0.6) 100%)',
            }}
          >
            <span className="mobile-watch-btn">
              Tap to Watch Full ▶
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // DESKTOP VIEW: Thumbnail with hover-to-preview
  return (
    <div
      ref={cardRef}
      className="masonry-item"
      onMouseEnter={() => { setIsLoaded(true); setIsPlaying(true); }}
      onMouseLeave={() => setIsPlaying(false)}
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
              opacity: isPlaying ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: isPlaying ? 2 : 1
            }}
          />
        )}

        {/* Thumbnail - only shown on desktop */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isPlaying ? 0 : 1,
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
          {/* Play icon overlay on thumbnail */}
          <div className="play-overlay">
            <div className="play-icon">▶</div>
          </div>
        </div>

        {/* Click to watch overlay - desktop */}
        <Link
          href={`/watch/${gif.id}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            cursor: 'pointer',
            background: isPlaying ? 'transparent' : 'rgba(0,0,0,0.2)',
            transition: 'background 0.3s ease'
          }}
        >
          {!isPlaying && (
            <div className="play-overlay">
              <div className="play-icon" style={{ opacity: 0.8 }}>▶</div>
            </div>
          )}
        </Link>
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
            <div
              className="logo"
              onClick={() => { setQuery(''); setSearchInput(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Image
                src="/logo.png"
                alt="thelittleslush.fun"
                width={120}
                height={28}
                style={{ objectFit: 'contain', height: '22px', width: 'auto' }}
                priority
              />
            </div>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search trending GIFs & videos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => {
                    setSearchInput('');
                    setQuery('');
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </form>
            <Link href="/policies" className="policies-btn">
              <span className="policies-btn-icon">📋</span>
              <span>Policies</span>
            </Link>
          </header>

          <FilterBar
            query={query}
            setQuery={setQuery}
            setSearchInput={setSearchInput}
            availableTags={availableTags}
          />

          <div className="main-content">
            {/* Top Leaderboard Banner */}
            <LeaderboardBannerAd adIndex={0} />

            <div className="masonry-grid">
              {/* Show skeleton cards during initial load */}
              {gifs.length === 0 && loading && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <SkeletonCard key={`skeleton-${i}`} />
                  ))}
                </>
              )}

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
          <Footer />
          <BackToTopButton />
        </main>
      )}
    </>
  );
}

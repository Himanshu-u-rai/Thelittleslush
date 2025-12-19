'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type GifItem = {
  id: string;
  tags: string[];
  thumbnail?: string;
};

function VideoCard({ gif }: { gif: GifItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Toggle play state on touch
    if (isTouchDevice) {
      e.preventDefault();
      setIsPlaying(prev => !prev);
    }
  };

  return (
    <div
      className="masonry-item"
      onMouseEnter={() => !isTouchDevice && setIsPlaying(true)}
      onMouseLeave={() => !isTouchDevice && setIsPlaying(false)}
      onTouchStart={handleTouchStart}
    >
      <div className="iframe-container" style={{ position: 'relative' }}>
        {isPlaying ? (
          <iframe
            src={`https://www.redgifs.com/ifr/${gif.id}?controls=0&autoplay=1`}
            title={`RedGIFs ${gif.id}`}
            loading="eager"
            allowFullScreen
            scrolling="no"
            style={{ pointerEvents: 'none', width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <>
            <img
              src={`/api/image-proxy?url=${encodeURIComponent(gif.thumbnail || `https://media.redgifs.com/${gif.id}-mobile.jpg`)}`}
              alt={gif.id}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              loading="lazy"
            />
            {/* Play button overlay for mobile */}
            {isTouchDevice && (
              <div className="play-overlay">
                <div className="play-icon">▶</div>
              </div>
            )}
          </>
        )}
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
            <div className="masonry-grid">
              {gifs.filter(g => !query || g.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))).map((gif, index) => (
                <VideoCard key={`${gif.id}-${index}`} gif={gif} />
              ))}
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
                <div className="loader">You have reached the end.</div>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

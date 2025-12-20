'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type GifItem = {
    id: string;
    tags: string[];
    thumbnail?: string;
};

type GifResponse = {
    gifs: GifItem[];
    next: string | null;
    total?: number;
};

// Video Card Component - Simplified for category pages
function VideoCard({ gif, category }: { gif: GifItem; category: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 500);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        if (cardRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                            setIsLoaded(true);
                            setIsPlaying(true);
                        } else if (!entry.isIntersecting) {
                            setIsLoaded(false);
                            setIsPlaying(false);
                        }
                    });
                },
                { threshold: [0.5], rootMargin: '50px 0px' }
            );
            observer.observe(cardRef.current);
            return () => {
                observer.disconnect();
                window.removeEventListener('resize', checkMobile);
            };
        }
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mobile: Show thumbnail with play button, tap to navigate
    if (isMobile) {
        return (
            <Link href={`/watch/${gif.id}`} className="category-video-card">
                <img
                    src={`/api/image-proxy?url=${encodeURIComponent(gif.thumbnail || `https://thumbs44.redgifs.com/${gif.id}-mobile.jpg`)}`}
                    alt={`${category} video`}
                    loading="lazy"
                />
                <div className="category-video-overlay">
                    <span className="play-btn">▶</span>
                </div>
            </Link>
        );
    }

    // Desktop: Hover to preview
    return (
        <div
            ref={cardRef}
            className="category-video-card"
            onMouseEnter={() => { setIsLoaded(true); setIsPlaying(true); }}
            onMouseLeave={() => setIsPlaying(false)}
        >
            {isLoaded && isPlaying && (
                <iframe
                    src={`https://www.redgifs.com/ifr/${gif.id}?controls=0&autoplay=1`}
                    title={`${category} video - ${gif.id}`}
                    loading="eager"
                    allowFullScreen
                    scrolling="no"
                    style={{
                        position: 'absolute', top: 0, left: 0,
                        pointerEvents: 'none', width: '100%', height: '100%', border: 'none',
                        zIndex: 2
                    }}
                />
            )}
            <img
                src={`/api/image-proxy?url=${encodeURIComponent(gif.thumbnail || `https://thumbs44.redgifs.com/${gif.id}-mobile.jpg`)}`}
                alt={`${category} video thumbnail`}
                loading="lazy"
                style={{ opacity: isPlaying ? 0 : 1, transition: 'opacity 0.3s' }}
            />
            <div className="category-video-overlay" style={{ opacity: isPlaying ? 0 : 1 }}>
                <span className="play-btn">▶</span>
            </div>
            <Link
                href={`/watch/${gif.id}`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
            />
        </div>
    );
}

// Related Categories Component (Horizontal scrollable)
function RelatedCategories({ currentCategory }: { currentCategory: string }) {
    const allCategories = [
        'amateur', 'asian', 'blonde', 'brunette', 'redhead', 'teen', 'milf',
        'latina', 'ebony', 'hentai', 'cosplay', 'homemade', 'creampie', 'anal',
        'pov', 'lesbian', 'threesome', 'blowjob', 'cumshot', 'hardcore'
    ];

    const related = allCategories
        .filter(cat => cat.toLowerCase() !== currentCategory.toLowerCase())
        .slice(0, 12);

    return (
        <div className="category-filter-bar">
            <Link href="/" className="category-filter-chip home-chip">
                ← Home
            </Link>
            {related.map((cat) => (
                <Link key={cat} href={`/category/${cat}`} className="category-filter-chip">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Link>
            ))}
        </div>
    );
}

export default function CategoryClient() {
    const params = useParams();
    const tag = decodeURIComponent(params.tag as string);
    const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

    const [gifs, setGifs] = useState<GifItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);
    const [showAgeModal, setShowAgeModal] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement>(null);

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
            window.location.href = 'https://www.google.com';
        }
    };

    const fetchGifs = useCallback(async (page: string = '1') => {
        try {
            setLoading(true);
            const res = await fetch(`/api/gifs?page=${page}&search=${encodeURIComponent(tag)}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data: GifResponse = await res.json();

            if (page === '1') {
                setGifs(data.gifs);
            } else {
                setGifs(prev => [...prev, ...data.gifs]);
            }
            setNextPage(data.next);
        } catch (err) {
            setError('Failed to load videos');
        } finally {
            setLoading(false);
        }
    }, [tag]);

    useEffect(() => {
        if (isAgeVerified) {
            setGifs([]);
            fetchGifs('1');
        }
    }, [isAgeVerified, fetchGifs, tag]);

    // Infinite scroll
    useEffect(() => {
        if (!loadMoreRef.current || !nextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextPage && !loading) {
                    fetchGifs(nextPage);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [nextPage, loading, fetchGifs]);

    return (
        <>
            {/* Age Verification Modal */}
            {showAgeModal && (
                <div className="age-modal-overlay">
                    <div className="age-modal">
                        <div className="age-modal-icon">🔞</div>
                        <h2>Age Verification Required</h2>
                        <p>This website contains adult content for viewers 18 years or older.</p>
                        <p className="age-modal-question">Are you 18 years or older?</p>
                        <div className="age-modal-buttons">
                            <button className="age-btn age-btn-enter" onClick={() => handleAgeConfirm(true)}>Yes, I am 18+</button>
                            <button className="age-btn age-btn-leave" onClick={() => handleAgeConfirm(false)}>No, Leave</button>
                        </div>
                    </div>
                </div>
            )}

            {isAgeVerified && (
                <div className="category-page-v2">
                    {/* Fixed Header */}
                    <header className="category-header-v2">
                        <Link href="/" className="category-logo">
                            <Image src="/logo.png" alt="TheLittleSlush" width={140} height={32} style={{ objectFit: 'contain', height: '28px', width: 'auto' }} priority />
                        </Link>
                        <h1 className="category-title-v2">{formattedTag}</h1>
                    </header>

                    {/* Fixed Filter Bar */}
                    <RelatedCategories currentCategory={tag} />

                    {/* Content Area */}
                    <main className="category-main">
                        {/* SEO Description (visible but compact) */}
                        <p className="category-seo-text">
                            Free {formattedTag.toLowerCase()} videos • Updated daily • HD quality
                        </p>

                        {loading && gifs.length === 0 ? (
                            <div className="category-loader">
                                <div className="loading-spinner"></div>
                                <p>Loading {formattedTag.toLowerCase()} videos...</p>
                            </div>
                        ) : error ? (
                            <div className="category-error">{error}</div>
                        ) : gifs.length === 0 ? (
                            <div className="category-empty">No {formattedTag.toLowerCase()} videos found</div>
                        ) : (
                            <>
                                <div className="category-grid">
                                    {gifs.map((gif) => (
                                        <VideoCard key={gif.id} gif={gif} category={tag} />
                                    ))}
                                </div>

                                {/* Load more trigger */}
                                <div ref={loadMoreRef} className="load-more-trigger">
                                    {loading && <div className="loading-spinner"></div>}
                                </div>
                            </>
                        )}
                    </main>
                </div>
            )}
        </>
    );
}

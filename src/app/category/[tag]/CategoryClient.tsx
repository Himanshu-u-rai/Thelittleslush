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

// Breadcrumb Component
function Breadcrumbs({ category }: { category: string }) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/" itemProp="item">
                        <span itemProp="name">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                    <span className="breadcrumb-separator">›</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <span itemProp="name" className="breadcrumb-current">{formattedCategory}</span>
                    <meta itemProp="position" content="2" />
                </li>
            </ol>
        </nav>
    );
}

// Video Card Component
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

    if (isMobile) {
        return (
            <div ref={cardRef} className="masonry-item">
                <div className="iframe-container" style={{ position: 'relative' }}>
                    {isLoaded && (
                        <iframe
                            src={`https://www.redgifs.com/ifr/${gif.id}?controls=0&autoplay=1`}
                            title={`${category} video - ${gif.id}`}
                            loading="eager"
                            allowFullScreen
                            scrolling="no"
                            style={{ pointerEvents: 'none', width: '100%', height: '100%', border: 'none', opacity: 1, zIndex: 1 }}
                        />
                    )}
                    {!isLoaded && (
                        <div className="mobile-loading-placeholder">
                            <div className="loading-spinner"></div>
                        </div>
                    )}
                    <Link
                        href={`/watch/${gif.id}`}
                        className="mobile-tap-overlay"
                        style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            zIndex: 10, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                            paddingBottom: '20px', background: 'linear-gradient(transparent 70%, rgba(0,0,0,0.6) 100%)',
                        }}
                    >
                        <span className="mobile-watch-btn">Tap to Watch Full ▶</span>
                    </Link>
                </div>
            </div>
        );
    }

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
                        title={`${category} video - ${gif.id}`}
                        loading="eager"
                        allowFullScreen
                        scrolling="no"
                        style={{
                            pointerEvents: 'none', width: '100%', height: '100%', border: 'none',
                            opacity: isPlaying ? 1 : 0, transition: 'opacity 0.3s ease', zIndex: isPlaying ? 2 : 1
                        }}
                    />
                )}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    opacity: isPlaying ? 0 : 1, transition: 'opacity 0.3s ease', zIndex: 1
                }}>
                    <img
                        src={`/api/image-proxy?url=${encodeURIComponent(gif.thumbnail || `https://media.redgifs.com/${gif.id}-mobile.jpg`)}`}
                        alt={`${category} video thumbnail`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: '#1a1a1a' }}
                        loading="lazy"
                    />
                    <div className="play-overlay">
                        <div className="play-icon">▶</div>
                    </div>
                </div>
                <Link
                    href={`/watch/${gif.id}`}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, cursor: 'pointer' }}
                />
            </div>
        </div>
    );
}

// Related Categories Component
function RelatedCategories({ currentCategory }: { currentCategory: string }) {
    const allCategories = [
        'amateur', 'asian', 'blonde', 'brunette', 'redhead', 'teen', 'milf',
        'latina', 'ebony', 'hentai', 'cosplay', 'homemade', 'creampie', 'anal',
        'pov', 'lesbian', 'threesome', 'blowjob', 'cumshot', 'hardcore'
    ];

    const related = allCategories
        .filter(cat => cat.toLowerCase() !== currentCategory.toLowerCase())
        .slice(0, 10);

    return (
        <div className="related-categories">
            <h3>Related Categories</h3>
            <div className="related-tags">
                {related.map((cat) => (
                    <Link key={cat} href={`/category/${cat}`} className="related-tag">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Link>
                ))}
            </div>
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
            fetchGifs();
        }
    }, [isAgeVerified, fetchGifs]);

    const loadMore = () => {
        if (nextPage) {
            fetchGifs(nextPage);
        }
    };

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
                <div className="category-page">
                    {/* Header */}
                    <header className="category-header">
                        <Link href="/" className="logo-link">
                            <Image src="/logo.png" alt="TheLittleSlush" width={180} height={40} style={{ objectFit: 'contain', height: '32px', width: 'auto' }} priority />
                        </Link>
                    </header>

                    {/* Breadcrumbs */}
                    <Breadcrumbs category={tag} />

                    {/* Category Hero */}
                    <div className="category-hero">
                        <h1>{formattedTag} Videos</h1>
                        <p className="category-description">
                            Browse the best {formattedTag.toLowerCase()} adult videos and GIFs.
                            Stream free {formattedTag.toLowerCase()} content in HD quality, updated daily.
                        </p>
                    </div>

                    {/* Related Categories */}
                    <RelatedCategories currentCategory={tag} />

                    {/* Video Grid */}
                    <div className="category-content">
                        {loading && gifs.length === 0 ? (
                            <div className="loader">Loading {formattedTag.toLowerCase()} videos...</div>
                        ) : error ? (
                            <div className="error-message">{error}</div>
                        ) : gifs.length === 0 ? (
                            <div className="no-results">No {formattedTag.toLowerCase()} videos found</div>
                        ) : (
                            <>
                                <div className="masonry-grid">
                                    {gifs.map((gif) => (
                                        <VideoCard key={gif.id} gif={gif} category={tag} />
                                    ))}
                                </div>

                                {nextPage && (
                                    <button className="load-more-btn" onClick={loadMore} disabled={loading}>
                                        {loading ? 'Loading...' : 'Load More'}
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Back to Home */}
                    <div className="category-footer">
                        <Link href="/" className="back-home-link">← Back to Home</Link>
                    </div>
                </div>
            )}
        </>
    );
}

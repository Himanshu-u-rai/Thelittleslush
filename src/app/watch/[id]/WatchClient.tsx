'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type GifItem = {
    id: string;
    thumbnail?: string;
};

// Video Schema Component
function VideoSchema({ id }: { id: string }) {
    const formattedId = id
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        'name': formattedId,
        'description': `Watch ${formattedId} - Free adult video on TheLittleSlush`,
        'thumbnailUrl': `https://thumbs44.redgifs.com/${id}-mobile.jpg`,
        'uploadDate': new Date().toISOString(),
        'contentUrl': `https://www.redgifs.com/watch/${id}`,
        'embedUrl': `https://www.redgifs.com/ifr/${id}`,
        'publisher': {
            '@type': 'Organization',
            'name': 'TheLittleSlush',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://www.thelittleslush.fun/logo.png'
            }
        },
        'isFamilyFriendly': false,
        'inLanguage': 'en'
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Breadcrumb Component
function Breadcrumbs({ videoId }: { videoId: string }) {
    return (
        <nav className="breadcrumbs watch-breadcrumbs" aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/" itemProp="item">
                        <span itemProp="name">Home</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                    <span className="breadcrumb-separator">›</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <span itemProp="name" className="breadcrumb-current">Watch Video</span>
                    <meta itemProp="position" content="2" />
                </li>
            </ol>
        </nav>
    );
}

// Related Videos Component
function RelatedVideos({ currentId }: { currentId: string }) {
    const [relatedGifs, setRelatedGifs] = useState<GifItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const res = await fetch('/api/gifs?page=1&search=');
                if (res.ok) {
                    const data = await res.json();
                    // Filter out current video and get 6 related
                    const filtered = data.gifs
                        .filter((g: GifItem) => g.id !== currentId)
                        .slice(0, 6);
                    setRelatedGifs(filtered);
                }
            } catch (err) {
                console.error('Failed to fetch related videos');
            } finally {
                setLoading(false);
            }
        };
        fetchRelated();
    }, [currentId]);

    if (loading || relatedGifs.length === 0) return null;

    return (
        <div className="related-videos-section">
            <h3>Related Videos</h3>
            <div className="related-videos-grid">
                {relatedGifs.map((gif) => (
                    <Link key={gif.id} href={`/watch/${gif.id}`} className="related-video-card">
                        <img
                            src={`/api/image-proxy?url=${encodeURIComponent(gif.thumbnail || `https://thumbs44.redgifs.com/${gif.id}-mobile.jpg`)}`}
                            alt="Related video"
                            loading="lazy"
                        />
                        <div className="related-video-overlay">
                            <span>▶</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// 728x90 Leaderboard Banner Ad Component
function LeaderboardAd() {
    const [isWideEnough, setIsWideEnough] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkWidth = () => setIsWideEnough(window.innerWidth >= 768);
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    useEffect(() => {
        if (isWideEnough && containerRef.current && containerRef.current.children.length === 0) {
            (window as any).atOptions = {
                'key': '3caad54b5cbc1f32886c0755b8ddec3c',
                'format': 'iframe',
                'height': 90,
                'width': 728,
                'params': {}
            };
            const script = document.createElement('script');
            script.src = '//www.highperformanceformat.com/3caad54b5cbc1f32886c0755b8ddec3c/invoke.js';
            script.async = true;
            containerRef.current.appendChild(script);
        }
    }, [isWideEnough]);

    if (!isWideEnough) return null;

    return (
        <div className="watch-ad-leaderboard">
            <div ref={containerRef}></div>
        </div>
    );
}

// 300x250 Medium Rectangle Ad Component
function MediumRectAd() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current && containerRef.current.children.length === 0) {
            (window as any).atOptions = {
                'key': 'caad3414eba66bc32ad8167e0f3e70cd',
                'format': 'iframe',
                'height': 250,
                'width': 300,
                'params': {}
            };
            const script = document.createElement('script');
            script.src = 'https://schemecontinuingwinning.com/caad3414eba66bc32ad8167e0f3e70cd/invoke.js';
            script.async = true;
            containerRef.current.appendChild(script);
        }
    }, []);

    return (
        <div className="watch-ad-medium-rect">
            <div ref={containerRef}></div>
        </div>
    );
}

export default function WatchClient() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // Age verification state
    const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);
    const [showAgeModal, setShowAgeModal] = useState(false);

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
            window.location.href = 'https://www.google.com';
        }
    };

    return (
        <>
            {/* Video Schema JSON-LD */}
            <VideoSchema id={id} />

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
                <div className="watch-container">
                    <nav className="watch-nav">
                        <button onClick={() => router.back()} className="back-button">
                            ← Back
                        </button>
                        <Link href="/" className="home-link" style={{ display: 'flex', alignItems: 'center' }}>
                            <Image src="/logo.png" alt="TheLittleSlush" width={180} height={40} style={{ objectFit: 'contain', height: '32px', width: 'auto' }} />
                        </Link>
                    </nav>

                    {/* Breadcrumbs */}
                    <Breadcrumbs videoId={id} />

                    {/* Top Leaderboard Ad */}
                    <LeaderboardAd />

                    <div className="video-wrapper">
                        <iframe
                            src={`https://www.redgifs.com/ifr/${id}?controls=1&autoplay=1`}
                            title={`Watch Adult Video on TheLittleSlush`}
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen
                            className="video-player"
                        />
                    </div>

                    {/* Related Videos Section */}
                    <RelatedVideos currentId={id} />

                    {/* Below Video Ads and CTA */}
                    <div className="watch-below-video">
                        <MediumRectAd />
                        <a
                            href="https://schemecontinuingwinning.com/vxt94pck0?key=f2328f74f27cb2b4efcb5bcf6b5a5493"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="premium-cta"
                        >
                            🔥 Explore More Premium Content
                        </a>
                        <LeaderboardAd />
                    </div>
                </div>
            )}
        </>
    );
}

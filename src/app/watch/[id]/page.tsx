'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function WatchPage() {
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
                            <Image src="/logo.png" alt="thelittleslush.fun" width={180} height={40} style={{ objectFit: 'contain', height: '32px', width: 'auto' }} />
                        </Link>
                    </nav>

                    <div className="video-wrapper">
                        <iframe
                            src={`https://www.redgifs.com/ifr/${id}?controls=1&autoplay=1`}
                            title={`RedGIFs ${id}`}
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen
                            className="video-player"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

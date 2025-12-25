'use client';

import { useState, useEffect, useRef } from 'react';

// Fixed Bottom Banner Ad Component - Desktop Only with Two Horizontal Ads
export default function FixedBottomBanner() {
    const [isDesktop, setIsDesktop] = useState(false);
    const containerRef1 = useRef<HTMLDivElement>(null);
    const containerRef2 = useRef<HTMLDivElement>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        // Only show on desktop (>= 768px)
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    useEffect(() => {
        if (isDesktop && !hasLoaded) {
            // Load first ad
            if (containerRef1.current && containerRef1.current.children.length === 0) {
                (window as any).atOptions = {
                    'key': '3caad54b5cbc1f32886c0755b8ddec3c',
                    'format': 'iframe',
                    'height': 90,
                    'width': 728,
                    'params': {}
                };

                const script1 = document.createElement('script');
                script1.type = 'text/javascript';
                script1.src = 'https://schemecontinuingwinning.com/3caad54b5cbc1f32886c0755b8ddec3c/invoke.js';
                script1.async = true;
                containerRef1.current.appendChild(script1);
            }

            // Load second ad with a slight delay
            setTimeout(() => {
                if (containerRef2.current && containerRef2.current.children.length === 0) {
                    (window as any).atOptions = {
                        'key': '3caad54b5cbc1f32886c0755b8ddec3c',
                        'format': 'iframe',
                        'height': 90,
                        'width': 728,
                        'params': {}
                    };

                    const script2 = document.createElement('script');
                    script2.type = 'text/javascript';
                    script2.src = 'https://schemecontinuingwinning.com/3caad54b5cbc1f32886c0755b8ddec3c/invoke.js';
                    script2.async = true;
                    containerRef2.current.appendChild(script2);
                }
            }, 100);

            setHasLoaded(true);
        }
    }, [isDesktop, hasLoaded]);

    if (!isDesktop) return null;

    return (
        <div className="fixed-bottom-banner">
            <div className="bottom-banner-container">
                <div ref={containerRef1} className="bottom-ad-slot"></div>
                <div ref={containerRef2} className="bottom-ad-slot"></div>
            </div>
        </div>
    );
}

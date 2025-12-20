import { NextResponse } from 'next/server';

const REDGIFS_API_BASE = 'https://api.redgifs.com/v2';

// Token cache
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

// Response cache - stores API responses to reduce rate limiting
const responseCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Helper to get a temporary token (cached for 1 hour)
async function getAuthToken(forceRefresh: boolean = false) {
    if (!forceRefresh && cachedToken && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    try {
        console.log('Fetching new auth token from RedGIFs...');
        const res = await fetch(`${REDGIFS_API_BASE}/auth/temporary`, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Origin': 'https://www.redgifs.com',
                'Referer': 'https://www.redgifs.com/',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Failed to get auth token:", res.status, errorText);
            cachedToken = null;
            tokenExpiry = 0;
            return null;
        }

        const data = await res.json();
        cachedToken = data.token;
        tokenExpiry = Date.now() + (50 * 60 * 1000);
        console.log('Successfully obtained new auth token');
        return cachedToken;
    } catch (error) {
        console.error('Error fetching auth token:', error);
        cachedToken = null;
        tokenExpiry = 0;
        return null;
    }
}

// Check if we have a valid cached response
function getCachedResponse(cacheKey: string) {
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`Returning cached response for: ${cacheKey}`);
        return cached.data;
    }
    return null;
}

// Store response in cache
function setCachedResponse(cacheKey: string, data: any) {
    responseCache.set(cacheKey, { data, timestamp: Date.now() });

    // Clean up old cache entries (keep max 100)
    if (responseCache.size > 100) {
        const oldestKey = responseCache.keys().next().value;
        if (oldestKey) responseCache.delete(oldestKey);
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const query = searchParams.get('search') || '';
    const count = 20;

    // Create cache key from request parameters
    const cacheKey = `${query}-${page}`;

    // Check cache first
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) {
        return NextResponse.json(cachedData, {
            headers: {
                'X-Cache': 'HIT',
                'Cache-Control': 'public, max-age=300', // 5 min browser cache
            }
        });
    }

    let token = await getAuthToken();

    if (!token) {
        token = await getAuthToken(true);
        if (!token) {
            return NextResponse.json({ error: 'Failed to authenticate with RedGIFs' }, { status: 500 });
        }
    }

    // Determine endpoint - use tags for category search
    let endpoint = `${REDGIFS_API_BASE}/gifs/search?count=${count}&page=${page}`;

    if (query) {
        // For category tags, use the tags parameter which gives better results
        endpoint += `&tags=${encodeURIComponent(query.toLowerCase())}&order=trending`;
    } else {
        // Trending/popular content
        endpoint += `&order=trending&type=g`;
    }

    console.log(`Fetching from RedGIFs: ${endpoint}`);

    try {
        const res = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Origin': 'https://www.redgifs.com',
                'Referer': 'https://www.redgifs.com/',
            },
            cache: 'no-store',
        });

        // Handle 429 Rate Limit - return cached data if available, or wait
        if (res.status === 429) {
            console.log('Rate limited (429). Checking for any cached data...');
            // Try to find any cached response for this query
            for (const [key, value] of responseCache.entries()) {
                if (key.startsWith(query + '-')) {
                    console.log('Returning fallback cached data');
                    return NextResponse.json(value.data, {
                        headers: { 'X-Cache': 'FALLBACK' }
                    });
                }
            }
            return NextResponse.json({
                error: 'Rate limited by RedGIFs. Please wait a moment and try again.',
                gifs: [],
                next: null
            }, { status: 429 });
        }

        // Handle 401 - refresh token
        if (res.status === 401) {
            console.log('Got 401, refreshing token and retrying...');
            const newToken = await getAuthToken(true);
            if (newToken) {
                const retryRes = await fetch(endpoint, {
                    headers: {
                        'Authorization': `Bearer ${newToken}`,
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'application/json',
                        'Origin': 'https://www.redgifs.com',
                        'Referer': 'https://www.redgifs.com/',
                    },
                    cache: 'no-store',
                });

                if (retryRes.ok) {
                    const retryData = await retryRes.json();
                    const processedData = processGifs(retryData, page);
                    setCachedResponse(cacheKey, processedData);
                    return NextResponse.json(processedData, {
                        headers: {
                            'X-Cache': 'MISS',
                            'Cache-Control': 'public, max-age=300',
                        }
                    });
                }
            }
        }

        if (!res.ok) {
            const errorText = await res.text();
            console.error('RedGIFs API error:', res.status, errorText);
            return NextResponse.json({
                error: 'Failed to fetch data from RedGIFs',
                details: errorText,
                gifs: [],
                next: null
            }, { status: res.status });
        }

        const data = await res.json();
        const processedData = processGifs(data, page);

        // Cache the successful response
        setCachedResponse(cacheKey, processedData);

        return NextResponse.json(processedData, {
            headers: {
                'X-Cache': 'MISS',
                'Cache-Control': 'public, max-age=300',
            }
        });

    } catch (error) {
        console.error('Internal error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: String(error),
            gifs: [],
            next: null
        }, { status: 500 });
    }
}

function processGifs(data: any, page: string) {
    const validGifs = (data.gifs || []).map((g: any) => ({
        id: g.id,
        tags: g.tags || [],
        thumbnail: g.urls?.thumbnail || g.urls?.poster || g.urls?.vthumbnail || g.urls?.sd || `https://thumbs44.redgifs.com/${g.id}-mobile.jpg`
    }));

    const totalPages = data.pages || 1;
    const items = data.total || 0;
    const currentPage = parseInt(page, 10);
    const hasNext = currentPage < totalPages;
    const nextCursor = hasNext ? String(currentPage + 1) : null;

    console.log(`Returning ${validGifs.length} gifs, page ${currentPage}/${totalPages}`);

    return {
        gifs: validGifs,
        next: nextCursor,
        total: items
    };
}

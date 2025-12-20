import { NextResponse } from 'next/server';

const REDGIFS_API_BASE = 'https://api.redgifs.com/v2';

// Token cache
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

// Helper to get a temporary token (cached for 1 hour)
async function getAuthToken(forceRefresh: boolean = false) {
    // Return cached token if still valid and not forcing refresh
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
            // Clear cached token on failure
            cachedToken = null;
            tokenExpiry = 0;
            return null;
        }

        const data = await res.json();
        cachedToken = data.token;
        // Cache for 50 minutes (tokens last about 1 hour, but refresh early)
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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const query = searchParams.get('search') || '';
    const count = 20;

    let token = await getAuthToken();

    if (!token) {
        // Try once more with a fresh token
        token = await getAuthToken(true);
        if (!token) {
            return NextResponse.json({ error: 'Failed to authenticate with RedGIFs' }, { status: 500 });
        }
    }

    // Determine endpoint: Search or Trending
    let endpoint = `${REDGIFS_API_BASE}/gifs/search?count=${count}&page=${page}`;

    if (query) {
        endpoint += `&search_text=${encodeURIComponent(query)}&order=trending`;
    } else {
        // Trending/popular content
        endpoint += `&search_text=&order=trending&type=g`;
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

        // If we get 401, force refresh the token and retry once
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

                if (!retryRes.ok) {
                    const errorText = await retryRes.text();
                    console.error('Retry failed:', retryRes.status, errorText);
                    return NextResponse.json({
                        error: 'Failed to fetch data from RedGIFs after token refresh',
                        details: errorText
                    }, { status: retryRes.status });
                }

                const retryData = await retryRes.json();
                return processAndReturnGifs(retryData, page);
            }
        }

        if (!res.ok) {
            const errorText = await res.text();
            console.error('RedGIFs API error:', res.status, errorText);
            return NextResponse.json({
                error: 'Failed to fetch data from RedGIFs',
                details: errorText
            }, { status: res.status });
        }

        const data = await res.json();
        return processAndReturnGifs(data, page);

    } catch (error) {
        console.error('Internal error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}

function processAndReturnGifs(data: any, page: string) {
    // Extract IDs and Pagination info
    // RedGIFs response structure: { gifs: [...], page: ..., pages: ..., total: ... }

    const validGifs = (data.gifs || []).map((g: any) => ({
        id: g.id,
        tags: g.tags || [],
        thumbnail: g.urls?.thumbnail || g.urls?.poster || g.urls?.vthumbnail || g.urls?.sd || `https://thumbs44.redgifs.com/${g.id}-mobile.jpg`
    }));

    // Determine if there is a next page
    const totalPages = data.pages || 1;
    const items = data.total || 0;
    const currentPage = parseInt(page, 10);
    const hasNext = currentPage < totalPages;

    const nextCursor = hasNext ? String(currentPage + 1) : null;

    console.log(`Returning ${validGifs.length} gifs, page ${currentPage}/${totalPages}`);

    return NextResponse.json({
        gifs: validGifs,
        next: nextCursor,
        total: items
    });
}

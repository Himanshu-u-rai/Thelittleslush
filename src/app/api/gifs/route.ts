import { NextResponse } from 'next/server';

const REDGIFS_API_BASE = 'https://api.redgifs.com/v2';

// Token cache
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

// Helper to get a temporary token (cached for 1 hour)
async function getAuthToken() {
    // Return cached token if still valid
    if (cachedToken && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    try {
        const res = await fetch(`${REDGIFS_API_BASE}/auth/temporary`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            console.error("Failed to get auth token", res.status, await res.text());
            return null;
        }

        const data = await res.json();
        cachedToken = data.token;
        // Cache for 1 hour (tokens typically last longer but this is safe)
        tokenExpiry = Date.now() + (60 * 60 * 1000);
        return cachedToken;
    } catch (error) {
        console.error('Error fetching auth token:', error);
        return null;
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const query = searchParams.get('search') || '';
    const count = 20;

    const token = await getAuthToken();

    if (!token) {
        return NextResponse.json({ error: 'Failed to authenticate with RedGIFs' }, { status: 500 });
    }

    // Determine endpoint: Search or Trending
    // If query is present, use search. If not, use trending (search with order=trending and empty text, or specific trending endpoint)
    // RedGIFs 'trending' can often be accessed via search with order=trending

    let endpoint = `${REDGIFS_API_BASE}/gifs/search?count=${count}&page=${page}`;

    if (query) {
        endpoint += `&tags=${encodeURIComponent(query)}`;
    } else {
        // Trending
        endpoint += `&search_text=&order=trending`;
    }

    console.log(`Fetching from RedGIFs: ${endpoint}`);

    try {
        const res = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch data from RedGIFs', details: await res.text() }, { status: res.status });
        }

        const data = await res.json();

        // Extract IDs and Pagination info
        // RedGIFs response structure usually: { gifs: [...], page: ..., pages: ..., total: ... }

        const validGifs = (data.gifs || []).map((g: any) => ({
            id: g.id,
            tags: g.tags || [],
            thumbnail: g.urls?.thumbnail || g.urls?.poster || g.urls?.vthumbnail || g.urls?.sd || `https://thumbs44.redgifs.com/${g.id}-mobile.jpg`
        }));

        // Determine if there is a next page
        const totalPages = data.pages;
        const items = data.total;
        const currentPage = parseInt(page, 10);
        const hasNext = currentPage < totalPages;

        const nextCursor = hasNext ? String(currentPage + 1) : null;

        return NextResponse.json({
            gifs: validGifs,
            next: nextCursor,
            total: items
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
    }
}

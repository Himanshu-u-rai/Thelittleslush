import { Metadata } from 'next';

type Props = {
    params: Promise<{ id: string }>;
};

// Generate dynamic metadata for each video page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // Format the ID for better readability in title
    const formattedId = id
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();

    return {
        title: `Watch ${formattedId} - Free Adult Video`,
        description: `Watch ${formattedId} on TheLittleSlush. Stream this free adult video in HD quality. Browse more trending adult GIFs and videos. 18+ only.`,
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: `Watch ${formattedId} - TheLittleSlush`,
            description: `Stream this free adult video in HD. 18+ only.`,
            type: 'video.other',
            url: `https://thelittleslush.fun/watch/${id}`,
        },
        twitter: {
            card: 'summary',
            title: `Watch ${formattedId}`,
            description: 'Stream free adult content on TheLittleSlush. 18+ only.',
        },
        alternates: {
            canonical: `https://thelittleslush.fun/watch/${id}`,
        },
        other: {
            'rating': 'adult',
        },
    };
}

export { default } from './WatchClient';

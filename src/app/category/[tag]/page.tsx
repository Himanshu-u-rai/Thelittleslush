import { Metadata } from 'next';

type Props = {
    params: Promise<{ tag: string }>;
};

// Generate dynamic metadata for each category page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const tag = decodeURIComponent(resolvedParams.tag);
    const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

    return {
        title: `${formattedTag} Videos - Free ${formattedTag} Adult Content`,
        description: `Watch free ${formattedTag.toLowerCase()} adult videos and GIFs on TheLittleSlush. Browse the best ${formattedTag.toLowerCase()} content updated daily. Stream HD quality ${formattedTag.toLowerCase()} videos. 18+ only.`,
        keywords: [
            `${tag} videos`, `${tag} gifs`, `free ${tag} porn`, `${tag} adult content`,
            `${tag} xxx`, `best ${tag} videos`, `${tag} streaming`
        ],
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: `${formattedTag} Videos - TheLittleSlush`,
            description: `Stream free ${formattedTag.toLowerCase()} adult content in HD. 18+ only.`,
            type: 'website',
            url: `https://www.thelittleslush.fun/category/${tag}`,
        },
        twitter: {
            card: 'summary',
            title: `${formattedTag} Videos`,
            description: `Watch free ${formattedTag.toLowerCase()} adult content. 18+ only.`,
        },
        alternates: {
            canonical: `https://www.thelittleslush.fun/category/${tag}`,
        },
        other: {
            'rating': 'adult',
        },
    };
}

// Generate static params for popular categories
export async function generateStaticParams() {
    const popularCategories = [
        'amateur', 'asian', 'blonde', 'brunette', 'redhead',
        'teen', 'milf', 'latina', 'ebony', 'hentai',
        'cosplay', 'homemade', 'creampie', 'anal', 'pov',
        'lesbian', 'threesome', 'blowjob', 'cumshot', 'hardcore',
        'big-tits', 'petite', 'curvy', 'pawg', 'bbc'
    ];

    return popularCategories.map((tag) => ({
        tag: tag,
    }));
}

export { default } from './CategoryClient';

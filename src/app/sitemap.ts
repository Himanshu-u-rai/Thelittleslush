import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.thelittleslush.fun';
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'hourly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/policies`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];

    // Category landing pages (SEO optimized)
    const popularCategories = [
        'amateur', 'asian', 'blonde', 'brunette', 'redhead',
        'teen', 'milf', 'latina', 'ebony', 'hentai',
        'cosplay', 'homemade', 'creampie', 'anal', 'pov',
        'lesbian', 'threesome', 'blowjob', 'cumshot', 'hardcore',
        'big-tits', 'petite', 'curvy', 'pawg', 'bbc'
    ];

    const categoryPages: MetadataRoute.Sitemap = popularCategories.map((category) => ({
        url: `${baseUrl}/category/${category}`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.9,
    }));

    return [...staticPages, ...categoryPages];
}

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'User Policies - Terms, Privacy & Safety',
    description: 'Read TheLittleSlush user policies including Terms of Service, DMCA Policy, Trust & Safety guidelines, Privacy Policy, and content recommendation guidelines. We are committed to providing a safe adult entertainment experience.',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'User Policies - TheLittleSlush',
        description: 'Terms of Service, DMCA, Privacy Policy, Trust & Safety guidelines for TheLittleSlush.',
        type: 'website',
        url: 'https://thelittleslush.fun/policies',
    },
    alternates: {
        canonical: 'https://thelittleslush.fun/policies',
    },
};

export default function PoliciesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Báo cáo",
    description: 'Báo cáo',
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
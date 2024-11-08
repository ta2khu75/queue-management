import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Danh sách cấp số",
    description: 'Danh sách cấp số',
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
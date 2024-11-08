import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Tạo cấp số",
    description: 'Tạo cấp số',
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
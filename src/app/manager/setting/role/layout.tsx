import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Danh sách vai trò",
    description: 'Danh sách vai trò',
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
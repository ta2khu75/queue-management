import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Tạo vai trò",
    description: 'Tạo vai trò',
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
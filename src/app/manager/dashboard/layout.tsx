import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Thống kê",
    description: 'Thống kê',
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
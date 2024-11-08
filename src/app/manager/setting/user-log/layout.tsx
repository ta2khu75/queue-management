import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Nhật ký người dùng",
    description: 'Nhật ký người dùng',
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
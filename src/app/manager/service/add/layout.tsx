import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Tạo dịch vụ",
    description: 'Tạo dịch vụ',
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
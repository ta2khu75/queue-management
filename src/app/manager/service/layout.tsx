import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Danh sách dịch vụ",
    description: 'Danh sách dịch vụ',
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
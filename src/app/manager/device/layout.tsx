import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Danh sách thiết bị",
    description: 'Danh sách thiết bị',
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
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Tạo thiết bị",
    description: 'Tạo thiết bị',
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
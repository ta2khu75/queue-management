import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Danh sách tài khoản",
    description: 'Danh sách tài khoản',
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
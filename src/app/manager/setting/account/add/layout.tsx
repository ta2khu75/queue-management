import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Tạo tài khoản",
    description: 'Tạo tài khoản',
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
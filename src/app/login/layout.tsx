import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Log in queue management",
    description: "Log in queue management",
};

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
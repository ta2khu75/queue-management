import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Forgot password queue management",
    description: "Forgot password queue management",
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
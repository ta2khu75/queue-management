import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Reset password queue management",
    description: "Reset password queue management",
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
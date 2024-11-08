import { AsideFragment } from "@/components/AsideFagment";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Tạo cấp số",
    description: "Tạo cấp số"
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex mx-auto" style={{ width: "1440px", height: "810px" }}>
            <AsideFragment />
            <div className="bg-[#F6F6F6] grow pl-6">
                {children}
            </div>
        </div>
    );
}

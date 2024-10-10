import { AsideAdmin } from "@/components/AsideAdmin";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex mx-auto" style={{ width: "1440px", height: "810px" }}>
            <AsideAdmin />
            <div className="bg-[#F6F6F6] grow pl-5">
                {children}
            </div>
        </div>
    );
}
import { AsideAdmin } from "@/components/AsideAdmin";
import PrivateElement from "@/components/element/PrivateElement";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mx-auto" style={{ width: "1440px", height: "810px" }}>
            <PrivateElement>
                <div className="flex">
                    <AsideAdmin />
                    <div className="bg-[#F6F6F6] grow pl-6">
                        {children}
                    </div>
                </div>
                <div className="text-center text-4xl text-super_primary">
                    Create by Alta Software
                </div>
            </PrivateElement>
        </div>
    );
}

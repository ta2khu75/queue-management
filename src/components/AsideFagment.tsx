'use client'
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { BlockOutlined } from "@ant-design/icons";
import { LogoElement } from "./element/LogoElement";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import AsideItem from "./AsideItem";
export const AsideFragment = () => {
    type MenuItem = Required<MenuProps>['items'][number];
    const pathname = usePathname();
    const [selectedKey, setSelectedKey] = useState<string>("");
    const router = useRouter();
    return (
        <div style={{ width: "200px", height: "810px" }} className="flex flex-col">
            <Link href={"/manager"}>
                <LogoElement className="mx-auto pt-8 pb-10" height={64} width={80} />
            </Link>
            <div className="flex flex-col justify-between grow custom-menu">
                <div className="grid grid-cols-1 gap-[6px]">
                    <AsideItem label="Cấp số"
                        selected={pathname.includes("number-level")}
                        onClick={() => router.push("/number-level")}
                        imageDefault="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fdefault%2Fnumber-level.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageHover="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fhover%2Fnumber-level.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageSelected="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fselected%2Fnumber-level.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                    />
                </div>
            </div>
        </div>
    )
}
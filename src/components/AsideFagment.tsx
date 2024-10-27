'use client'
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { BlockOutlined } from "@ant-design/icons";
import { LogoElement } from "./element/LogoElement";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
export const AsideFragment = () => {
    type MenuItem = Required<MenuProps>['items'][number];
    const pathname = usePathname();
    const [selectedKey, setSelectedKey] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        // Set the selected key based on the current route
        if (pathname.includes('/dashboard')) {
            setSelectedKey('sub1');
        } else if (pathname.includes('/device')) {
            setSelectedKey('sub2');
        } else if (pathname.includes('/service')) {
            setSelectedKey('sub3');
        } else if (pathname.includes('/number-level')) {
            setSelectedKey('sub4');
        } else if (pathname.includes('/report')) {
            setSelectedKey('sub5');
        } else if (pathname.includes('/setting')) {
            setSelectedKey('sub6');
        }
    }, [pathname]);
    const items: MenuItem[] = [
        {
            key: 'sub4',
            label: 'Cấp số',
            icon: <BlockOutlined />,
            onClick: () => router.push('/number-level')
        },

    ];
    const handleSelect: MenuProps['onSelect'] = ({ key }) => {
        setSelectedKey(key);
    };
    return (
        <div style={{ width: "200px", height: "810px" }} className="flex flex-col">
            <Link href={""}>
                <LogoElement className="mx-auto pt-8 pb-10" height={64} width={80} />
            </Link>
            <div className="flex flex-col justify-between grow custom-menu">
                <Menu
                    mode="vertical"
                    selectedKeys={[selectedKey]}
                    onSelect={handleSelect}
                    className="grow"
                    items={items}
                />
            </div>
        </div>
    )
}
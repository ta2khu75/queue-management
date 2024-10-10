'use client'
import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { AppstoreOutlined, BlockOutlined, DesktopOutlined, CommentOutlined, SettingOutlined, BarChartOutlined, MoreOutlined, LogoutOutlined } from "@ant-design/icons";
import { LogoElement } from "./element/LogoElement";
import { usePathname, useRouter } from "next/navigation";
export const AsideAdmin = () => {
    type MenuItem = Required<MenuProps>['items'][number];
    const pathname = usePathname();
    const [selectedKey, setSelectedKey] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        // Set the selected key based on the current route
        if (pathname.endsWith('/dashboard')) {
            setSelectedKey('sub1');
        } else if (pathname.endsWith('/device/list')) {
            setSelectedKey('sub2');
        } else if (pathname.endsWith('/service')) {
            setSelectedKey('sub3');
        } else if (pathname.endsWith('/number')) {
            setSelectedKey('sub4');
        } else if (pathname.endsWith('/report')) {
            setSelectedKey('sub5');
        } else if (pathname.endsWith('/setting')) {
            setSelectedKey('sub6');
        }
    }, [pathname]);
    const items: MenuItem[] = [
        {
            key: 'sub1',
            label: 'Dashboard',
            icon: <AppstoreOutlined />,
            onClick: () => router.push('/manager/dashboard')
        },
        {
            key: 'sub2',
            label: 'Thiết bị',
            icon: <DesktopOutlined />,
            onClick: () => router.push('/manager/device/list')
        },
        {
            key: "sub3",
            label: 'Dịch vụ',
            icon: <CommentOutlined />,
            onClick: () => router.push('/manager/service')
        },
        {
            key: 'sub4',
            label: 'Cấp số',
            icon: <BlockOutlined />,
            onClick: () => router.push('/manager/number')
        },
        {
            key: 'sub5',
            label: 'Báo cáo',
            icon: <BarChartOutlined />,
            onClick: () => router.push('/manager/report')
        },
        {
            key: 'sub6',
            label: <span className="text-[#7E7D88]">Cài đặt hệ thống<MoreOutlined /></span>,
            icon: <SettingOutlined className="text-[#7E7D88]" />,
            children: [
                { key: '9', label: <span className="text-[#7E7D88]">Quản lý vai trò</span> },
                { key: '10', label: <span className="text-[#7E7D88]">Quản lý tài khoản</span> },
                { key: '11', label: <span className="text-[#7E7D88]">Nhật ký người dùng</span> },
            ],
        },
    ];
    const handleSelect: MenuProps['onSelect'] = ({ key }) => {
        setSelectedKey(key); // Update the selected key state
    };
    return (
        <div style={{ width: "200px", height: "810px" }} className="flex flex-col">
            <LogoElement className="mx-auto pt-8 pb-10" height={64} width={80} />
            <div className="flex flex-col justify-between grow custom-menu">
                <Menu
                    mode="vertical"
                    selectedKeys={[selectedKey]}
                    onSelect={handleSelect}
                    className="grow"
                    items={items}
                />
                <button className="rounded-lg mx-auto mb-5" style={{ width: "176px", height: "48px", backgroundColor: '#FFF2E7', color: "#FF7506" }}><LogoutOutlined className="mr-2" /><span>Đăng xuất</span></button>
            </div>
        </div>
    )
}
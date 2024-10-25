'use client'
import { Button, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { AppstoreOutlined, BlockOutlined, DesktopOutlined, CommentOutlined, SettingOutlined, BarChartOutlined, MoreOutlined, LogoutOutlined } from "@ant-design/icons";
import { LogoElement } from "./element/LogoElement";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { authAction } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/hook";
export const AsideAdmin = () => {
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
            key: 'sub1',
            label: 'Dashboard',
            icon: <AppstoreOutlined />,
            onClick: () => router.push('/manager/dashboard')
        },
        {
            key: 'sub2',
            label: 'Thiết bị',
            icon: <DesktopOutlined />,
            onClick: () => router.push('/manager/device')
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
            onClick: () => router.push('/manager/number-level')
        },
        {
            key: 'sub5',
            label: 'Báo cáo',
            icon: <BarChartOutlined />,
            onClick: () => router.push('/manager/report')
        },
        {
            key: 'sub6',
            label: <>Cài đặt hệ thống<MoreOutlined /></>,
            icon: <SettingOutlined />,
            children: [
                { key: '9', label: <span className="text-[#7E7D88]">Quản lý vai trò</span>, onClick: () => router.push("/manager/setting/role") },
                { key: '10', label: <span className="text-[#7E7D88]">Quản lý tài khoản</span>, onClick: () => router.push("/manager/setting/account") },
                { key: '11', label: <span className="text-[#7E7D88]">Nhật ký người dùng</span>, onClick: () => router.push("/manager/setting/user-log") },
            ],
        },
    ];
    const dispatch = useAppDispatch();
    const handleSelect: MenuProps['onSelect'] = ({ key }) => {
        setSelectedKey(key);
    };
    const handleLogout = () => {
        dispatch(authAction.reset())
        router.push('/login')
    }
    return (
        <div style={{ width: "200px", height: "810px" }} className="flex flex-col">
            <Link href={"/manager"}>
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
                <Button className="flex justify-start h-12 w-44 font-bold" onClick={() => handleLogout()} type="text"><LogoutOutlined className="mr-2" /><span>Đăng xuất</span></Button>
            </div>
        </div>
    )
}
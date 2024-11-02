"use client"
import React from 'react'
import m from "./style.module.css"
import AsideSubItem from '../AsideSubItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
type Props = {
    imageHover: string;
    imageDefault: string;
    imageSelected: string;
    selected: boolean;
    label: string
}
const DropdownMenu = ({ imageDefault, imageHover, imageSelected, selected, label }: Props) => {
    const pathname = usePathname()
    return (
        <div className={m["dropdown-wrapper"]}>
            <AsideSubItem imageDefault={imageDefault} imageHover={imageHover} imageSelected={imageSelected} selected={selected} label={label} />
            <div className={m["dropdown-content"]}>
                <Link href="/manager/setting/role" className={pathname.includes("role") ? "bg-super_primary text-white" : "text-[#7E7D88]"}>Quản lý vai trò</Link>
                <Link href="/manager/setting/account" className={pathname.includes("account") ? "bg-super_primary text-white" : "text-[#7E7D88]"}>Quản lý tài khoản</Link>
                <Link href="/manager/setting/user-log" className={pathname.includes("user-log") ? "bg-super_primary text-white" : "text-[#7E7D88]"}>Nhật ký người dùng</Link>
            </div>
        </div>

    )
}

export default DropdownMenu
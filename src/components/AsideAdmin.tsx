'use client'
import { Button } from "antd";
import { useEffect, useState } from "react";
import { LogoElement } from "./element/LogoElement";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { authAction } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/hook";
import AsideItem from "./AsideItem";
import DropdownMenu from "./dropdown-menu/DropdownMenu";
import Image from "next/image";
export const AsideAdmin = () => {
    const pathname = usePathname();
    const [selectedKey, setSelectedKey] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        if (pathname.includes('/dashboard')) {
            setSelectedKey('dashboard');
        } else if (pathname.includes('/device')) {
            setSelectedKey('device');
        } else if (pathname.includes('/service')) {
            setSelectedKey('service');
        } else if (pathname.includes('/number-level')) {
            setSelectedKey('number-level');
        } else if (pathname.includes('/report')) {
            setSelectedKey('report');
        } else if (pathname.includes('/setting')) {
            setSelectedKey('setting');
        } else {
            setSelectedKey("")
        }
    }, [pathname]);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(authAction.reset())
        localStorage.removeItem("auth")
        router.push('/login')
    }
    return (
        <div style={{ width: "200px", height: "810px" }} className="flex flex-col">
            <Link href={"/manager"}>
                <LogoElement className="mx-auto pt-8 pb-10" height={64} width={80} />
            </Link>
            <div className="flex flex-col justify-between grow custom-menu">
                <div className="grid grid-cols-1 gap-[6px]">
                    <AsideItem label="Dashboard"
                        selected={selectedKey === "dashboard"}
                        onClick={() => router.push("/manager/dashboard")}
                        imageDefault="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fdefault%2Fdashboard.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageHover="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fhover%2Fdashboard.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageSelected="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fselected%2Fdashboard.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                    />
                    <AsideItem label="Thiết bị"
                        selected={selectedKey === "device"}
                        onClick={() => router.push("/manager/device")}
                        imageDefault="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fdefault%2Fdevice.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageHover="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fhover%2Fdevice.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageSelected="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fselected%2Fdevice.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                    />
                    <AsideItem label="Dịch vụ"
                        selected={selectedKey === "service"}
                        onClick={() => router.push("/manager/service")}
                        imageDefault="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fdefault%2Fservice.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageHover="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fhover%2Fservice.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageSelected="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fselected%2Fservice.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                    />
                    <AsideItem label="Cấp số"
                        selected={selectedKey === "number-level"}
                        onClick={() => router.push("/manager/number-level")}
                        imageDefault="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fdefault%2Fnumber-level.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageHover="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fhover%2Fnumber-level.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageSelected="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fselected%2Fnumber-level.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                    />
                    <AsideItem label="Báo cáo"
                        selected={selectedKey === "report"}
                        onClick={() => router.push("/manager/report")}
                        imageDefault="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fdefault%2Freport.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageHover="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fhover%2Freport.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        imageSelected="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fselected%2Freport.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                    />
                    <DropdownMenu imageDefault="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fdefault%2Fsetting.svg?alt=media&token=c5f3f1d5-925f-4edd-a221-74d6acc715b8"
                        imageHover="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fhover%2Fsetting.svg?alt=media&token=c5f3f1d5-925f-4edd-a221-74d6acc715b8"
                        imageSelected="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fselected%2Fsetting.svg?alt=media&token=dc9027e8-ec33-496e-a853-95dfd13878ab"
                        label="Cài đặt hệ thống"
                        selected={selectedKey === "setting"}
                    />
                </div>

                <Button className="flex justify-start h-12 w-44 font-bold" onClick={() => handleLogout()} type="text">
                    <Image className="mr-1" src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Flogout.svg?alt=media&token=eda76e67-e7aa-4d61-9edc-2ae0c4f31e1f"} width={20} height={20} alt="logout" />
                    <span>Đăng xuất</span></Button>
            </div>
        </div>
    )
}
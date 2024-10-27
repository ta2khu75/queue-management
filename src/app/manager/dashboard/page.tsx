"use client"
import { AvatarInfoElement } from "@/components/element/AvatarInfoElement"
import CalendarElement from "@/components/element/CalendarElement";
import DashboardCardElement from "@/components/element/DashboardCardElement"
import DashboardProgressElement from "@/components/element/DashboardProgressElement copy";
import NumberLevelProgressElement from "@/components/element/NumberLevelProgressElement";
import { db } from "@/config/FirebaseConfig";
import { NumberLevelStatus } from "@/type/NumberLevelStatus";
import { Status } from "@/type/Status";
import { BlockOutlined, DesktopOutlined, CommentOutlined } from "@ant-design/icons";
import { CalendarOutlined, BookOutlined, UserOutlined, CheckSquareOutlined } from "@ant-design/icons"
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from "dayjs"
import { CaretDownOutlined } from "@ant-design/icons"
import { Form, Select } from "antd";
const Page = () => {

    const numberLevelCollectionRef = collection(db, "number-levels")
    const deviceCollectionRef = collection(db, "devices")
    const serviceCollectionRef = collection(db, "services")
    //number-level
    const [numberLevelCount, setNumberLevelCount] = useState(0)
    const [numberLevelCountWait, setNumberLevelCountWait] = useState(0)
    const [numberLevelCountUsed, setNumberLevelCountUsed] = useState(0)
    const [numberLevelCountSkip, setNumberLevelCountSkip] = useState(0)
    //device
    const [deviceCount, setDeviceCount] = useState(0)
    const [deviceCountActive, setDeviceCountActive] = useState(0)
    const [deviceCountInActive, setDeviceCountInActive] = useState(0)
    //service
    const [serviceCount, setServiceCount] = useState(0)
    const [serviceCountActive, setServiceCountActive] = useState(0)
    const [serviceCountInActive, setServiceCountInActive] = useState(0)
    useEffect(() => {
        //number-level
        getCountFromServer(numberLevelCollectionRef).then(response => {
            setNumberLevelCount(response.data().count)
        })
        getCountFromServer(query(numberLevelCollectionRef, where("status", "==", NumberLevelStatus.WAITING))).then(response => {
            setNumberLevelCountWait(response.data().count)
        })
        getCountFromServer(query(numberLevelCollectionRef, where("status", "==", NumberLevelStatus.USED))).then(response => {
            setNumberLevelCountUsed(response.data().count)
        })
        getCountFromServer(query(numberLevelCollectionRef, where("status", "==", NumberLevelStatus.SKIP))).then(response => {
            setNumberLevelCountSkip(response.data().count)
        })
        //devices
        getCountFromServer(deviceCollectionRef).then(response => {
            setDeviceCount(response.data().count)
        })
        getCountFromServer(query(deviceCollectionRef, where("status", "==", Status.ACTIVE))).then(response => {
            setDeviceCountActive(response.data().count)
        })
        getCountFromServer(query(deviceCollectionRef, where("status", "==", Status.INACTIVE))).then(response => {
            setDeviceCountInActive(response.data().count)
        })
        // getCountFromServer(query(deviceCollectionRef,where())).then(response => {
        //     setDeviceCount(response.data().count)
        // })
        //services
        getCountFromServer(serviceCollectionRef).then(response => {
            setServiceCount(response.data().count)
        })
        getCountFromServer(query(serviceCollectionRef, where("status", "==", Status.ACTIVE))).then(response => {
            setServiceCountActive(response.data().count)
        })
        getCountFromServer(query(serviceCollectionRef, where("status", "==", Status.INACTIVE))).then(response => {
            setServiceCountInActive(response.data().count)
        })

    }, [])

    return (
        <div className="flex justify-between">
            <div className="w-[790px]">
                <h5 className="text-super_primary text-xl font-bold h-[80px] leading-[80px]">Dashboard</h5>
                <h6 className="my-4">Biểu đồ cấp số</h6>
                <div className="flex justify-around w-[790px] mb-3">
                    <DashboardCardElement title="Số thứ tự" titleBr="đã cấp" className_icon="bg-[#E8EFFE]" dataPercent="32,41" data={numberLevelCount}>
                        <CalendarOutlined className="text-2xl text-[#6493F9]" />
                    </DashboardCardElement>
                    <DashboardCardElement title="Số thứ tự" titleBr="đã sử dụng" className_icon="bg-[#E1F7E6]" dataPercent="32,41" data={numberLevelCountUsed}>
                        <CheckSquareOutlined className="text-2xl text-[#35C75A]" />
                    </DashboardCardElement>
                    <DashboardCardElement title="Số thứ tự" titleBr="đang chờ" className_icon="bg-[#FFF3E9]" dataPercent="56,41" data={numberLevelCountWait}>
                        <UserOutlined className="text-2xl text-[#FFAC6A]" />
                    </DashboardCardElement>
                    <DashboardCardElement title="Số thứ tự" titleBr="đã bỏ qua" className_icon="bg-[#FEE9E9]" dataPercent="22,41" data={numberLevelCountSkip}>
                        <BookOutlined className="text-2xl text-[#F86D6D]" />
                    </DashboardCardElement>
                </div>
                <div className='flex justify-between bg-white rounded-xl h-[484px] p-6'>
                    <div className="flex justify-between">
                        <div className="grid-cols-1">
                            <div className="font-bold text-xl leading-[30px] mb-1">Bảng thống kê theo tuần</div>
                            <div className="text-[#A9A9B0] text-sm leading-[21px]">Tháng {dayjs().format("MM/YYYY")}</div>
                        </div>
                        <div className="flex items-center">
                            <div className="font-semibold mr-2">Xem theo</div>
                            <Select style={{ width: "106px", height: "42px" }} size="large" suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} defaultValue={"Tất cả"} options={[{ label: "Tuần", value: "week" }, { label: "Tháng", value: "month" }, { label: "Năm", value: "year" }]}></Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white w-[401px] h-[810px] rounded-tl-lg rounded-bl-lg p-6 pt-0">
                <div className="relative h-[88px] flex items-center">
                    <div className="absolute right-16">
                        <AvatarInfoElement />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <h6>Tổng quan</h6>
                    <div className="grid grid-cols-1 gap-3">
                        <DashboardProgressElement progressColor="#FF7506" title="Thiết bị" data={deviceCount} inActiveData={deviceCountInActive} activeData={deviceCountActive} >
                            <DesktopOutlined />
                        </DashboardProgressElement>
                        <DashboardProgressElement progressColor="#4277FF" title="Dịch vụ" data={serviceCount} inActiveData={serviceCountInActive} activeData={serviceCountActive} >
                            <CommentOutlined />
                        </DashboardProgressElement>
                        <NumberLevelProgressElement progressColor="#35C75A" title="Cấp số" skipData={numberLevelCountSkip} usedData={numberLevelCountUsed} waitData={numberLevelCountWait} data={numberLevelCount}>
                            <BlockOutlined />
                        </NumberLevelProgressElement>
                    </div>
                    <CalendarElement />
                </div>
            </div>
        </div >
    )
}

export default Page
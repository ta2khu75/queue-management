"use client"
import { AvatarInfoElement } from "@/components/element/AvatarInfoElement"
import CalendarElement from "@/components/element/CalendarElement";
import DashboardCardElement from "@/components/element/DashboardCardElement"
import DashboardProgressElement from "@/components/element/DashboardProgressElement copy";
import NumberLevelProgressElement from "@/components/element/NumberLevelProgressElement";
import { db } from "@/config/FirebaseConfig";
import { NumberLevelStatus } from "@/type/NumberLevelStatus";
import { Status } from "@/type/Status";
import { collection, getCountFromServer, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from "dayjs"
import { CaretDownOutlined } from "@ant-design/icons"
import { Select } from "antd";
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, Tooltip } from "recharts"
import { NumberLevel } from "@/type/NumberLevel";
import BaseService from "@/service/BaseService";
import isoWeek from 'dayjs/plugin/isoWeek';
import DashboardElement from "@/components/element/DashboardElement";
dayjs.extend(isoWeek);
const Page = () => {
    const [numberLevels, setNumberLevels] = useState<NumberLevel[]>([])
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
        fetchReadAll()
    }, [])

    const fetchReadAll = () => {
        BaseService.query<NumberLevel>(query(collection(db, "number-levels"), orderBy("grant_time", "desc"))).then(data => {
            setNumberLevels(data)
            setNumberLevelCount(data.length)
            setNumberLevelCountSkip(data.filter(item => item.status ? item.status === NumberLevelStatus.SKIP : false).length)
            setNumberLevelCountWait(data.filter(item => item.status ? item.status === NumberLevelStatus.WAITING : false).length)
            setNumberLevelCountSkip(data.filter(item => item.status ? item.status === NumberLevelStatus.SKIP : false).length)
        })
    }
    return (
        <div className="flex justify-between">
            <div className="w-[790px]">
                <h5 className="text-super_primary text-xl font-bold h-[80px] leading-[80px]">Dashboard</h5>
                <h6 className="my-4">Biểu đồ cấp số</h6>
                <div className="flex justify-around w-[790px] mb-3">
                    <DashboardCardElement image="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fcard%2Ftotal.svg?alt=media&token=3f58a799-adb3-4cdb-ae9c-b3d98623efd3" title="Số thứ tự" titleBr="đã cấp" dataPercent="32,41" data={numberLevelCount} />
                    <DashboardCardElement image="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fcard%2Fused.svg?alt=media&token=2f2f259c-4579-4f97-83fb-da9f1f3565a7" title="Số thứ tự" titleBr="đã sử dụng" dataPercent="32,41" data={numberLevelCountUsed} />
                    <DashboardCardElement image="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fcard%2Fwait.svg?alt=media&token=be58ea36-e3aa-408f-a515-36865634c521" title="Số thứ tự" titleBr="đang chờ" dataPercent="56,41" data={numberLevelCountWait} />
                    <DashboardCardElement image="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fcard%2Fskip.svg?alt=media&token=2d62c815-bafc-4c29-93f1-e64b0ca1c466" title="Số thứ tự" titleBr="đã bỏ qua" dataPercent="22,41" data={numberLevelCountSkip} />
                </div>
                <DashboardElement numberLevels={numberLevels} />
            </div>
            <div className="bg-white w-[401px] h-[810px] rounded-tl-lg rounded-bl-lg p-6 pt-0">
                <div className="relative h-[88px] flex items-center">
                    <div className="absolute right-4">
                        <AvatarInfoElement />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <h6>Tổng quan</h6>
                    <div className="grid grid-cols-1 gap-3">
                        <DashboardProgressElement image="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fprogress%2Fdevice.svg?alt=media&token=1876e627-e065-4488-b376-fc741de3b44e" progressColor="#FF7506" title="Thiết bị" data={deviceCount} inActiveData={deviceCountInActive} activeData={deviceCountActive} />
                        <DashboardProgressElement image="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fprogress%2Fservice.svg?alt=media&token=216ac92d-cd1f-438b-a104-7e03cb3c7215" progressColor="#4277FF" title="Dịch vụ" data={serviceCount} inActiveData={serviceCountInActive} activeData={serviceCountActive} />
                        <NumberLevelProgressElement image="https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fprogress%2Fnumber-level.svg?alt=media&token=c8966fe3-65bc-4cf4-9443-804a276172eb" progressColor="#35C75A" title="Cấp số" skipData={numberLevelCountSkip} usedData={numberLevelCountUsed} waitData={numberLevelCountWait} data={numberLevelCount} />
                    </div>
                    <CalendarElement />
                </div>
            </div>
        </div >
    )
}

export default Page
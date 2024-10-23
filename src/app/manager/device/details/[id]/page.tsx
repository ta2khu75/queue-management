"use client"
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { EditFilled } from "@ant-design/icons"
import BaseService from '@/service/BaseService'
import { collection } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import HeaderAdmin from '@/components/HeaderAdmin'
import { useAppSelector } from '@/redux/hook'
const Page = ({ params }: { params: { id: string } }) => {
    const deviceCollectionRef = collection(db, "devices")
    const deviceState = useAppSelector(state => state.device)
    const [device, setDevice] = useState<Device>()
    const pathname = usePathname()
    useEffect(() => {
        if (deviceState.devices.length === 0) {
            fetchDeviceById()
        } else {
            setDevice(deviceState.devices.find((d) => d.id === params.id))
        }
    }, [params.id])
    const fetchDeviceById = () => {
        BaseService.readById<Device>(deviceCollectionRef, params.id).then((device) => { setDevice(device) }).then((error) => console.log(error))
    }
    const router = useRouter()
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ path: "", title: "Thiết bị" }, { path: "/manager/device", title: "Danh sách thiết bị" }, { path: pathname, title: "Chi tiết thiết bị" }]} />
            <h6 className='my-4'>Quản lý thiết bị</h6>
            <main className="flex flex-col flex-none">
                <div className='flex justify-between'>
                    <div className="bg-white rounded-2xl py-4 px-6" style={{ height: "604px", width: "1112px" }}>
                        <p className="text-xl text-primary mb-4 font-bold ">Thông tin thiết bị</p>
                        <div className='grid grid-cols-2'>
                            <div className='grid grid-cols-4 mb-4'>
                                <span className='text-base font-semibold'>Mã thiết bị:</span>
                                <span className='text-base col-span-3 font-normal text-[#535261]'>{device?.device_id}</span>
                            </div>
                            <div className='grid grid-cols-4 mb-4'>
                                <span className='text-base font-semibold'>Loại thiết bị:</span>
                                <span className='text-base col-span-3 font-normal text-[#535261]'>{device?.device_category}</span>
                            </div>
                            <div className='grid grid-cols-4 mb-4'>
                                <span className='text-base font-semibold'>Tên thiết bị:</span>
                                <span className='text-base col-span-3 font-normal text-[#535261]'>{device?.device_name}</span>
                            </div>
                            <div className='grid grid-cols-4 mb-4'>
                                <span className='text-base font-semibold'>Tên đăng nhập:</span>
                                <span className='text-base col-span-3 font-normal text-[#535261]'>{device?.username}</span>
                            </div>
                            <div className='grid grid-cols-4 mb-4'>
                                <span className='text-base font-semibold'>Địa chỉ IP:</span>
                                <span className='text-base  col-span-3 font-normal text-[#535261]'>{device?.address_ip}</span>
                            </div>
                            <div className='grid grid-cols-4'>
                                <span className='text-base font-semibold'>Mật khẩu:</span>
                                <span className='text-base col-span-3 font-normal text-[#535261]'>{device?.password}</span>
                            </div>
                            <div className='col-span-2'>
                                <div className='font-bold mb-3'>Dịch vụ sử dụng:</div>
                                <div className='text-[#535261]'>{device?.service_ids}</div>
                            </div>
                        </div>
                    </div>
                    <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push(`/manager/device/edit/${params.id}`)}>
                        <div className="text-white text-sm bg-primary p-1 rounded-md flex items-center"><EditFilled /></div>
                        <div className='text-primary'>Cập nhập <br /> thiết bị</div>
                    </Button>
                </div>
            </main>
        </div>
    )
}
export default Page

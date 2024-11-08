"use client"
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import BaseService from '@/service/BaseService'
import { collection } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import HeaderAdmin from '@/components/HeaderAdmin'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { serviceAction } from '@/redux/slice/serviceClice'
import { Device } from '@/type/Device'
import Image from 'next/image'
import { FunctionUtil } from '@/app/util/FunctionUtil'
const Page = ({ params }: { params: { id: string } }) => {
    const deviceId = FunctionUtil.getIdFromPath(params.id)
    const deviceCollectionRef = collection(db, "devices")
    const deviceState = useAppSelector(state => state.device)
    const [device, setDevice] = useState<Device>()
    const serviceState = useAppSelector(state => state.service)
    const dispatch = useAppDispatch()
    const [serviceMap, setServiceMap] = useState<Map<string, Service>>()
    const pathname = usePathname()
    useEffect(() => {
        if (serviceState.services.length === 0) {
            dispatch(serviceAction.fetchReadAll())
        }
        if (deviceState.devices.length === 0) {
            fetchDeviceById()
        } else {
            setDevice(deviceState.devices.find((d) => d.id === deviceId))
        }
    }, [params.id])
    useEffect(() => {
        if (serviceMap === undefined && serviceState.services.length > 0) {
            setServiceMap(serviceState.services.reduce((service, item) => {
                service.set(item.id, item);
                return service;
            }, new Map()))
        }
    }, [device, serviceState.services.length])
    const fetchDeviceById = () => {
        BaseService.readById<Device>(deviceCollectionRef, deviceId).then((device) => { setDevice(device) }).then((error) => console.log(error))
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
                                <div className='text-[#535261]'>{device?.service_ids?.map(service_id => `${serviceMap?.get(service_id)?.service_name}, `)}</div>
                            </div>
                        </div>
                    </div>
                    <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push(`/manager/device/edit/${params.id}`)}>
                        <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fedit.svg?alt=media&token=e1a360d6-aa5d-425c-9763-a2d2eaa22f60"} width={24} height={24} alt='edit' />
                        <div className='text-primary'>Cập nhập <br /> thiết bị</div>
                    </Button>
                </div>
            </main>
        </div>
    )
}
export default Page

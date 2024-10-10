"use client"
import { AvatarInfoElement } from '@/components/element/AvatarInfoElement'
import { Breadcrumb } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { EditFilled } from "@ant-design/icons"
import BaseService from '@/service/BaseService'
import { collection } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { useRouter } from 'next/navigation'
const page = ({ params }: { params: { id: string } }) => {
    const deviceCollectionRef = collection(db, "devices")
    const [device, setDevice] = useState<Device>()
    useEffect(() => { fetchDeviceById() }, [params.id])
    const fetchDeviceById = () => {
        BaseService.getById<Device>(deviceCollectionRef, params.id).then((device) => { setDevice(device) }).then((error) => console.log(error))
    }
    const router = useRouter()
    return (
        <div className="flex flex-col">
            <header className="flex justify-between items-center" style={{ height: "88px" }} >
                <Breadcrumb
                    separator=">"
                    className="text-xl font-bold"
                    items={[
                        {
                            title: 'Thiết bị',
                        },
                        {
                            title: <a href="">Danh sách thiết bị</a>,
                        },
                        {
                            title: <Link href={`/manager/device/details/${params.id}`}> <span className="text-primary">Chi tiết thiết bị</span></Link>,
                        }
                    ]}
                />
                <AvatarInfoElement />
            </header>
            <main className="flex flex-col flex-none">
                <p className="text-2xl font-bold text-primary mb-4">Quản lý thiết bị</p>
                <div className='flex justify-between'>
                    <div className="bg-white rounded-2xl py-4 px-6" style={{ height: "604px" }}>
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
                                <div className='text-[#535261]'>{device?.service}</div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => router.push(`/manager/device/edit/${params.id}`)} style={{ width: "80px", height: "94px" }} className='bg-[#FFF2E7] text-sm rounded-tl-lg rounded-br-lg py-3 px-1'>
                        <div className='flex justify-center'><div className=' h-6 w-6 text-white text-sm bg-primary rounded-md'><EditFilled /></div></div>
                        <div className='text-primary'>Cập nhật thiết bị</div>
                    </button>
                </div>

            </main>
        </div>
    )
}
export default page

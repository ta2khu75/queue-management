"use client"
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { EditFilled } from "@ant-design/icons"
import BaseService from '@/service/BaseService'
import { collection, Timestamp } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import HeaderAdmin from '@/components/HeaderAdmin'
import { NumberLevel } from '@/type/NumberLevel'
import dayjs from "dayjs"
const Page = ({ params }: { params: { id: string } }) => {
    const deviceCollectionRef = collection(db, "number-levels")
    const [numberLevel, setNumberLevel] = useState<NumberLevel>()
    const [account, setAccount] = useState<Account>()
    const [service, setService] = useState<Service>()
    const pathname = usePathname()
    useEffect(() => { fetchNumberLevelById() }, [params.id])
    const fetchNumberLevelById = () => {
        BaseService.readById<NumberLevel>(deviceCollectionRef, params.id).then((data) => {
            setNumberLevel(data)
            if (data?.service_id) {
                BaseService.readById<Service>(collection(db, "services"), data.service_id).then((service) => {
                    setService(service)
                }).catch((error) => console.log(error))
            }
            if (data?.account_id) {
                BaseService.readById<Account>(collection(db, "accounts"), data.account_id).then((account) => {
                    setAccount(account)
                }).catch((error) => console.log(error))
            }
        }).then((error) => console.log(error))
    }
    const router = useRouter()
    return (
        <div>
            <HeaderAdmin paths={[{ path: "", title: "Thiết bị" }, { path: "/manager/number-level", title: "Danh sách cấp số" }, { path: pathname, title: "Chi tiết" }]} />
            <h6 className='mt-4 pb-6'>Quản lý cấp số</h6>
            <main className='flex justify-between'>
                <div className="bg-white rounded-2xl py-4 px-6" style={{ height: "604px", width: "1112px" }}>
                    <p className="text-xl text-primary mb-5 font-bold ">Thông tin cấp số</p>
                    <div className='grid grid-cols-2'>
                        <div className='grid grid-cols-4 mb-4'>
                            <div className='text-base font-semibold'>Họ tên:</div>
                            <span className='text-base col-span-3 font-normal text-[#535261]'>{account?.full_name}</span>
                        </div>
                        <div className='grid grid-cols-4 mb-4'>
                            <span className='text-base font-semibold'>Nguồn cấp:</span>
                            <span className='text-base col-span-3 font-normal text-[#535261]'>{service?.service_name}</span>
                        </div>
                        <div className='grid grid-cols-4 mb-4'>
                            <span className='text-base font-semibold'>Tên dịch vụ:</span>
                            <span className='text-base col-span-3 font-normal text-[#535261]'>{service?.service_name}</span>
                        </div>
                        <div className='grid grid-cols-4 mb-4'>
                            <span className='text-base font-semibold'>Trạng thái:</span>
                            <span className='text-base col-span-3 font-normal text-[#535261]'>{numberLevel?.status}</span>
                        </div>
                        <div className='grid grid-cols-4 mb-4'>
                            <span className='text-base font-semibold'>Số thứ tự:</span>
                            <span className='text-base  col-span-3 font-normal text-[#535261]'>{numberLevel?.number_level}</span>
                        </div>
                        <div className='grid grid-cols-4'>
                            <span className='text-base font-semibold'>Số điện thoại:</span>
                            <span className='text-base col-span-3 font-normal text-[#535261]'>{account?.phone_number}</span>
                        </div>
                        <div className='grid grid-cols-4 mb-4'>
                            <span className='text-base font-semibold'>Thời gian cấp:</span>
                            {
                                numberLevel?.grant_time && numberLevel.grant_time instanceof Timestamp &&
                                <span className='text-base col-span-3 font-normal text-[#535261]'>{dayjs(new Date(numberLevel.grant_time.toMillis())).format("HH:mm DD/MM/YYYY")}</span>
                            }
                        </div>
                        <div className='grid grid-cols-4'>
                            <span className='text-base font-semibold'>Địa chỉ Email:</span>
                            <span className='text-base col-span-3 font-normal text-[#535261]'>{account?.email}</span>
                        </div>
                        <div className='grid grid-cols-4'>
                            <span className='text-base font-semibold'>Hạn sử dụng:</span>
                            {
                                numberLevel?.expiry && numberLevel.expiry instanceof Timestamp &&
                                <span className='text-base col-span-3 font-normal text-[#535261]'>{dayjs(new Date(numberLevel.expiry.toMillis())).format("HH:mm DD/MM/YYYY")}</span>
                            }
                        </div>
                    </div>
                </div>
                <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push(`/manager/device/edit/${params.id}`)}>
                    <div className="text-white text-sm bg-primary p-1 rounded-md flex items-center"><EditFilled /></div>
                    <div className='text-primary'>Cập nhập <br /> thiết bị</div>
                </Button>
            </main >
        </div >
    )
}
export default Page

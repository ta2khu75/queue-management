"use client"
import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import BaseService from '@/service/BaseService'
import { collection } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import HeaderAdmin from '@/components/HeaderAdmin'
import { NumberRule } from '@/type/NumberRule'
import { useAppSelector } from '@/redux/hook'
import InputServiceElement from '@/components/element/InputServiceElement'
import ServiceNumberLevelTable from '@/components/table/ServiceNumberLevelTable'
import Image from 'next/image'
import { FunctionUtil } from '@/app/util/FunctionUtil'
const Page = ({ params }: { params: { id: string } }) => {
    const serviceId = FunctionUtil.getIdFromPath(params.id)
    const serviceCollectionRef = collection(db, "services")
    const serviceState = useAppSelector(state => state.service)
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [prefix, setPrefix] = useState("")
    const [surfix, setSurfix] = useState("")
    const [reset, setReset] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const [service, setService] = useState<Service>()
    useEffect(() => {
        if (serviceState.services.length === 0) {
            fetchServiceById()
        } else {
            const service = serviceState.services.find((s) => s.id === serviceId)
            if (service !== undefined) {
                const data = setNumberRulerService({ ...service })
                setService(data)
            }
        }
    }, [params.id])

    const fetchServiceById = () => {
        BaseService.readById<Service>(serviceCollectionRef, serviceId).then((response) => {
            if (response) {
                const data = setNumberRulerService({ ...response })
                setService(data)
            }
        }).catch((err) => console.log(err))
    }
    const setNumberRulerService = (service: Service) => {
        const number_rules = [...service.number_rules ?? []]
        number_rules?.map((number_rule, index) => {
            if (number_rule.includes(NumberRule.AUTO)) {
                const [rule, from, to] = number_rule.split(" ").slice(-3)
                setFrom(from)
                setTo(to)
                number_rules[index] = rule;
            } else if (number_rule.includes(NumberRule.PREFIX)) {
                const [rule, prefix] = number_rule.split(" ").slice(-2)
                setPrefix(prefix)
                number_rules[index] = rule;
            } else if (number_rule.includes(NumberRule.SURFIX)) {
                const [rule, surfix] = number_rule.split(" ").slice(-2)
                setSurfix(surfix)
                number_rules[index] = rule;
            } else if (number_rule.includes(NumberRule.RESET)) {
                setReset(true)
            }
        })
        service.number_rules = number_rules;
        return service;
    }
    return (
        <div>
            <HeaderAdmin paths={[{ path: "", title: "Dịch vụ" }, { path: "/manager/service", title: "Danh sách dịch vụ" }, { path: pathname, title: "Chi tiết" }]} />
            <h6 className='mt-4 mb-8'>Quản lý dịch vụ</h6>
            <main className='flex justify-between h-[606px]'>
                <div className='w-[370px] bg-white rounded-xl p-4'>
                    <div className='grid grid-cols-1 gap-y-3 mb-4'>
                        <div className='leading-[30px] font-bold text-super_primary text-xl'>Thông tin dịch vụ</div>
                        <div className='grid grid-cols-3'>
                            <div className='text-base font-semibold  leading-6'>Mã dịch vụ:</div>
                            <div>{service?.service_id}</div>
                        </div>
                        <div className='grid grid-cols-3'>
                            <div className='text-base font-semibold  leading-6'>Tên dịch vụ:</div>
                            <div>{service?.service_name}</div>
                        </div>
                        <div className='grid grid-cols-3'>
                            <div className='text-base font-semibold  leading-6'>Mô tả:</div>
                            <div>{service?.description}</div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-y-3'>
                        <div className='leading-[30px] font-bold text-super_primary text-xl'>Quy tắc cấp số</div>
                        {from && to &&
                            <div className='grid grid-cols-5 flex items-center'>
                                <div className='text-base font-semibold col-span-2 leading-6'>Tăng tự động:</div>
                                <div className='col-span-3'><div className='flex items-center'><InputServiceElement readonly={true} setValue={setFrom} value={from} /> <span className="ml-[10px] mr-3">đến</span> <InputServiceElement setValue={setTo} readonly={true} value={to} /></div></div>
                            </div>
                        }
                        {
                            prefix &&
                            <div className='grid grid-cols-5 flex items-center'>
                                <div className='text-base font-semibold col-span-2 leading-6'>Prefix:</div>
                                <div className='col-span-3' ><InputServiceElement readonly={true} setValue={setPrefix} value={prefix} /> </div>
                            </div>
                        }
                        {
                            surfix &&
                            <div className='grid grid-cols-5 flex items-center'>
                                <div className='text-base font-semibold col-span-2 leading-6'>Prefix:</div>
                                <div className='col-span-3' ><InputServiceElement readonly={true} setValue={setSurfix} value={surfix} /> </div>
                            </div>
                        }
                        {
                            reset &&
                            <div className='text-base font-semibold leading-6'>Reset mỗi ngày</div>
                        }
                        <div>Ví dụ: 201-2001</div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl py-4 px-6" style={{ width: "718px" }}>
                    <ServiceNumberLevelTable serviceId={params.id} />
                </div>
                <div className='grid-cols-1 gap-1'>
                    <Button type="text" className="w-20 h-[94px]  flex flex-col font-semibold" onClick={() => router.push(`/manager/service/edit/${params.id}`)}>
                        <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fedit.svg?alt=media&token=e1a360d6-aa5d-425c-9763-a2d2eaa22f60"} width={24} height={24} alt='edit' />
                        <div className='text-primary'>Cập nhập <br /> danh sách</div>
                    </Button>
                    <Button type="text" className="w-20 h-[75px] flex flex-col font-semibold" onClick={() => router.push(`/manager/service`)}>
                        <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fback.svg?alt=media&token=c490af9d-4e18-454b-9686-9f88a0e6174b"} width={24} height={24} alt='back' />
                        <div className='text-primary'>Quay lại</div>
                    </Button>
                </div>
            </main >
        </div >
    )
}
export default Page

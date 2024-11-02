"use client"
import { Button, DatePicker, Form, Input, Select } from "antd"
import { CaretDownOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import dayjs from 'dayjs';
import NumberLevelTable from "@/components/table/NumberLevelTable"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useEffect, useState } from "react"
import { serviceAction } from "@/redux/slice/serviceClice"
import { NumberLevelStatus } from "@/type/NumberLevelStatus"
import useDebounce from "@/hook/useDebounce"
import Image from "next/image"
const Page = () => {
    const { Search } = Input;
    const services = useAppSelector(state => state.service.services)
    const dispatch = useAppDispatch()
    const router = useRouter();
    const pathname = usePathname()
    const [fromTo, setFromTo] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const [keyword, setKeyword] = useState("")
    const keywordDebounce = useDebounce(keyword)
    const [status, setStatus] = useState("all")
    const [serviceId, setServiceId] = useState("all")
    const [supply, setSupply] = useState("all")
    const dateFormat = 'DD/MM/YYYY';
    useEffect(() => {
        if (services.length === 0) {
            dispatch(serviceAction.fetchReadAll())
        }
    }, [])
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Cấp số", path: "" }, { title: "Danh sách cấp số", path: pathname }]} />
            <h6 className="my-4">Quản lý cấp số</h6>
            <Form layout="vertical" className="flex justify-between mb-4 w-[1112px]">
                <div className="flex">
                    <Form.Item label="Tên dịch vụ" className="mb-0">
                        <Select style={{ width: "154px" }} onChange={(e) => setServiceId(e)} value={serviceId} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" size="large" defaultValue={"Tất cả"} options={[{ label: "Tất cả", value: "all" }, ...services.map((serivce) => ({ label: serivce.service_name, value: serivce.id }))]}></Select>
                    </Form.Item>
                    <Form.Item label="Tình trạng" className="mb-0">
                        <Select style={{ width: "154px" }} onChange={(e) => setStatus(e)} value={status} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" options={[{ label: "Tất cả", value: "all" }, ...Object.entries(NumberLevelStatus).map((status) => ({ label: status[1], value: status[1] }))]}></Select>
                    </Form.Item>
                    <Form.Item label="Nguồn cấp" className="mb-0">
                        <Select style={{ width: "154px" }} onChange={(e) => setSupply(e)} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" value={supply} options={[{ label: "Tất cả", value: "all" }, { label: "Kiosk", value: "Kiosk" }, { label: "Hệ thống", value: "Hệ thống" }]}></Select>
                    </Form.Item>
                    <Form.Item label="Chọn thời gian" className="mb-0 ">
                        <DatePicker.RangePicker
                            className="w-[300px]"
                            onChange={(e) => setFromTo(e)}
                            value={fromTo}
                            format={dateFormat}
                        />
                    </Form.Item>
                </div>
                <Form.Item label="Từ khoá" className="col-start-5 col-span-1 mb-0">
                    <Search size="large" onChange={(e) => setKeyword(e.target.value)} placeholder="Nhập từ khóa" style={{ width: "240px" }} />
                </Form.Item>
            </Form >
            <div className='flex justify-between'>
                <NumberLevelTable keyword={keywordDebounce} serviceId={serviceId} status={status} fromTo={fromTo} supply={supply} />
                <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push('/manager/number-level/create')}>
                    <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fadd.svg?alt=media&token=30041c15-ff4c-4c95-b7a9-c6abf7aee19f"} width={24} height={24} alt="add" />
                    <div className='text-primary'>Cấp<br />
                        số mới</div>
                </Button>
            </div>
        </div >
    )
}

export default Page
"use client"
import { Button, DatePicker, Form, Input, Select } from "antd"
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import dayjs from 'dayjs';
import NumberLevelTable from "@/components/table/NumberLevelTable"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { useEffect, useState } from "react"
import { serviceAction } from "@/redux/slice/serviceClice"
import { NumberLevelStatus } from "@/type/NumberLevelStatus"
import { DefaultOptionType } from "antd/es/select"
const Page = () => {
    const { Search } = Input;
    const services = useAppSelector(state => state.service.services)
    const dispatch = useAppDispatch()
    const router = useRouter();
    const pathname = usePathname()
    const dateFormat = 'DD/MM/YYYY';
    const [serviceOptions, setServiceOptions] = useState<DefaultOptionType[]>([])
    useEffect(() => {
        if (services.length === 0) {
            dispatch(serviceAction.fetchReadAll())
        }
        const optionService = services.map((serivce) => ({ label: serivce.service_name, value: serivce.id }));
        optionService.unshift({ label: "Tất cả", value: "all" })
        setServiceOptions(optionService);
    }, [services])
    const statusOptions: Array<{ label: string | NumberLevelStatus; value: string | NumberLevelStatus }> = Object.entries(NumberLevelStatus).map((status) => ({ label: status[1], value: status[1] }));
    statusOptions.unshift({ label: "Tất cả", value: "all" })
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Cấp số", path: "" }, { title: "Danh sách cấp số", path: pathname }]} />
            <h6 className="my-4">Quản lý cấp số</h6>
            <Form layout="vertical" className="flex justify-between mb-4 w-[1112px]">
                <div className="flex">
                    <Form.Item label="Tên dịch vụ" className="mb-0">
                        <Select style={{ width: "154px" }} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" size="large" defaultValue={"Tất cả"} options={serviceOptions}></Select>
                    </Form.Item>
                    <Form.Item label="Tình trạng" className="mb-0">
                        <Select style={{ width: "154px" }} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" size="large" defaultValue={"Tất cả"} options={statusOptions}></Select>
                    </Form.Item>
                    <Form.Item label="Nguồn cấp" className="mb-0">
                        <Select style={{ width: "154px" }} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" size="large" defaultValue={"Tất cả"} options={[{ label: "Tất cả", value: "all" }, { label: "Kiosk", value: "kiosk" }, { label: "Hệ thống", value: "system" }]}></Select>
                    </Form.Item>
                    <Form.Item label="Chọn thời gian" className="mb-0 ">
                        <div className="exam-date-picker">
                            <DatePicker.RangePicker
                                defaultValue={[dayjs('01/01/2024', dateFormat), dayjs('01/01/2024', dateFormat)]}
                                format={dateFormat}
                            />
                        </div>
                    </Form.Item>
                </div>
                <Form.Item label="Từ khoá" className="col-start-5 col-span-1 mb-0">
                    <Search size="large" placeholder="Nhập từ khóa" style={{ width: "240px" }} />
                </Form.Item>
            </Form>
            <div className='flex justify-between'>
                <NumberLevelTable />
                <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push('/manager/number-level/create')}>
                    <div className="text-white text-sm bg-primary p-1 rounded-md flex items-center"><PlusOutlined /></div>
                    <div className='text-primary'>Cấp<br />
                        số mới</div>
                </Button>
            </div>
        </div >
    )
}

export default Page
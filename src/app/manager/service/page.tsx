"use client"
import { Button, DatePicker, Form, Input, Select } from "antd"
import { CaretDownOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import dayjs from 'dayjs';
import ServiceTable from "@/components/table/ServiceTable"
import { useState } from "react"
import useDebounce from "@/hook/useDebounce"
import Image from "next/image"
const Page = () => {
    const optionActive = ["Hoạt động", "Ngưng hoạt động"];
    const router = useRouter();
    const pathname = usePathname()
    const dateFormat = 'DD/MM/YYYY';
    const [status, setStatus] = useState("all");
    const [keyword, setKeyword] = useState('')
    const keywordDebounce = useDebounce(keyword)
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Dịch vụ", path: "" }, { title: "Danh sách dịch vụ", path: pathname }]} />
            <h6 className="my-4">Quản lý dịch vụ</h6>
            <Form layout="vertical" className="flex justify-between mb-4 w-[1112px]">
                <div className="flex">
                    <Form.Item label="Trạng thái hoạt động" className="mb-0">
                        <Select style={{ width: "300px" }} onChange={(data) => setStatus(data)} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" value={status} options={[{ label: "Tất cả", value: "all" }, ...optionActive.map((active) => ({ label: active, value: active }))]}></Select>
                    </Form.Item>
                    <Form.Item label="Chọn thời gian" className="mb-0 ">
                        <div className="exam-date-picker">
                            <DatePicker.RangePicker
                                className="w-[300px]"
                                defaultValue={[dayjs(), dayjs()]}
                                format={dateFormat}
                            />
                        </div>
                    </Form.Item>
                </div>
                <Form.Item label="Từ khoá" className="col-start-5 col-span-1 mb-0">
                    <Input.Search onChange={(e) => setKeyword(e.target.value)} size="large" placeholder="Nhập từ khóa" style={{ width: "300px" }} />
                </Form.Item>
            </Form>
            <div className='flex justify-between'>
                <ServiceTable keyword={keywordDebounce} status={status} />
                <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push('/manager/service/add')}>
                    <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fadd.svg?alt=media&token=30041c15-ff4c-4c95-b7a9-c6abf7aee19f"} width={28} height={28} alt="add" />
                    <div className='text-primary'>Thêm <br />dịch vụ</div>
                </Button>
            </div>
        </div >
    )
}

export default Page
"use client"
import { Button, DatePicker, Form, Input, Select } from "antd"
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import dayjs from 'dayjs';
import ServiceTable from "@/components/table/ServiceTable"
import UserLogTable from "@/components/table/UserLogTable"
const Page = () => {
    const pathname = usePathname()
    const dateFormat = 'DD/MM/YYYY';
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Dịch vụ", path: "" }, { title: "Danh sách dịch vụ", path: pathname }]} />
            <Form layout="vertical" className="flex justify-between my-4 w-[1112px]">
                <div className="flex">
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
                    <Input.Search size="large" placeholder="Nhập từ khóa" style={{ width: "300px" }} />
                </Form.Item>
            </Form>
            <UserLogTable />
        </div >
    )
}

export default Page
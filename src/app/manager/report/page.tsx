"use client"
import { DatePicker, Form } from "antd"
import { usePathname } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import dayjs from 'dayjs';
import { useState } from "react"
import ReportTable from "@/components/table/ReportTable"
const Page = () => {
    const pathname = usePathname()
    const [fromTo, setFromTo] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const dateFormat = 'DD/MM/YYYY';
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Cấp số", path: "" }, { title: "Danh sách cấp số", path: pathname }]} />
            <h6 className="my-4">Quản lý cấp số</h6>
            <Form layout="vertical" className="flex justify-between mb-4 w-[1112px]">
                <Form.Item label="Chọn thời gian" className="mb-0 ">
                    <div className="exam-date-picker">
                        <DatePicker.RangePicker
                            className="w-[300px]"
                            onChange={(e) => setFromTo(e)}
                            value={fromTo}
                            format={dateFormat}
                        />
                    </div>
                </Form.Item>
            </Form>
            <ReportTable fromTo={fromTo} />
        </div >
    )
}

export default Page
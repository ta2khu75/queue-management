"use client"
import { DatePicker, Form, Input } from "antd"
import { usePathname } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import dayjs from 'dayjs';
import UserLogTable from "@/components/table/UserLogTable"
import { useState } from "react"
import useDebounce from "@/hook/useDebounce"
const Page = () => {
    const pathname = usePathname()
    const dateFormat = 'DD/MM/YYYY';
    const [fromTo, setFromTo] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const [keyword, setKeyword] = useState("")
    const keywordDebounce = useDebounce(keyword);
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Dịch vụ", path: "" }, { title: "Danh sách dịch vụ", path: pathname }]} />
            <Form layout="vertical" className="flex justify-between my-4 w-[1112px]">
                <div className="flex">
                    <Form.Item label="Chọn thời gian" className="mb-0 ">
                        <div className="exam-date-picker">
                            <DatePicker.RangePicker
                                onChange={(e) => setFromTo(e)}
                                value={fromTo}
                                format={dateFormat}
                            />
                        </div>
                    </Form.Item>
                </div>
                <Form.Item label="Từ khoá" className="col-start-5 col-span-1 mb-0">
                    <Input.Search value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Nhập từ khóa" style={{ width: "300px" }} />
                </Form.Item>
            </Form>
            <UserLogTable fromTo={fromTo} keyword={keywordDebounce} />
        </div >
    )
}

export default Page
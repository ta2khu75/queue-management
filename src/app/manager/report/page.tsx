"use client"
import { Button, DatePicker, Form } from "antd"
import { CloudDownloadOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import dayjs from 'dayjs';
import { useState } from "react"
import ReportTable from "@/components/table/ReportTable"
const Page = () => {
    const router = useRouter();
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
                            onChange={(e) => setFromTo(e)}
                            value={fromTo}
                            format={dateFormat}
                        />
                    </div>
                </Form.Item>
            </Form>
            <div className='flex justify-between'>
                <ReportTable fromTo={fromTo} />
                <Button type="text" className="w-20 h-[75px]  flex flex-col font-semibold" onClick={() => router.push('/manager/service/add')}>
                    <div className="text-white text-sm bg-primary p-1 rounded-md flex items-center"><CloudDownloadOutlined /></div>
                    <div className='text-primary'>Tải về</div>
                </Button>
            </div>
        </div >
    )
}

export default Page
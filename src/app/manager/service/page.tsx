"use client"
import { Button, DatePicker, Form, Input, Select } from "antd"
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import dayjs from 'dayjs';
import ServiceTable from "@/components/table/ServiceTable"
const Page = () => {
    const { Search } = Input;
    const optionActive = ["Tất cả", "Hoạt động", "Ngưng hoạt động"];
    const router = useRouter();
    const pathname = usePathname()
    const dateFormat = 'DD/MM/YYYY';
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Dịch vụ", path: "" }, { title: "Danh sách dịch vụ", path: pathname }]} />
            <h6 className="my-4">Quản lý dịch vụ</h6>
            <Form layout="vertical" className="flex justify-between mb-4 w-[1112px]">
                <div className="flex">
                    <Form.Item label="Trạng thái hoạt động" className="mb-0">
                        <Select style={{ width: "300px" }} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" size="large" defaultValue={"Tất cả"} options={optionActive.map((active) => ({ label: active, value: active }))}></Select>
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
                    <Search size="large" placeholder="Nhập từ khóa" style={{ width: "300px" }} />
                </Form.Item>
            </Form>
            <div className='flex justify-between'>
                <ServiceTable />
                <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push('/manager/service/add')}>
                    <div className="text-white text-sm bg-primary p-1 rounded-md flex items-center"><PlusOutlined /></div>
                    <div className='text-primary'>Thêm <br />dịch vụ</div>
                </Button>
            </div>
        </div >
    )
}

export default Page
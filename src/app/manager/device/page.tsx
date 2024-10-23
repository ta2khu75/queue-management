"use client"
import DeviceTable from "@/components/table/DeviceTable"
import { Button, Form, Input, Select } from "antd"
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
const Page = () => {
    const optionActive = ["Tất cả", "Hoạt động", "Ngưng hoạt động"];
    const optionConnect = ["Tất cả", "Kết nối", "Mất kết nối"]
    const router = useRouter();
    const pathname = usePathname()
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Thiết bị", path: "" }, { title: "Danh sách thiết bị", path: pathname }]} />
            <h6 className="my-4">Danh sách thiết bị</h6>
            <Form layout="vertical" className="flex justify-between mb-4 w-[1112px]">
                <div className="flex">
                    <Form.Item label="Trạng thái hoạt động" className="mb-0">
                        <Select style={{ width: "300px" }} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" size="large" defaultValue={"Tất cả"} options={optionActive.map((active) => ({ label: active, value: active }))}></Select>
                    </Form.Item>
                    <Form.Item label="Trạng thái kết nối" className="mb-0 ">
                        <Select style={{ width: "300px" }} size="large" suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} defaultValue={"Tất cả"} options={optionConnect.map(connect => ({ label: connect, value: connect }))}></Select>
                    </Form.Item>
                </div>
                <Form.Item label="Từ khoá" className="col-start-5 col-span-1 mb-0">
                    <Input.Search size="large" placeholder="Nhập từ khóa" style={{ width: "300px" }} />
                </Form.Item>
            </Form>
            <div className='flex justify-between'>
                <DeviceTable />
                <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push('/manager/device/add')}>
                    <div className="text-white text-sm bg-primary p-1 rounded-md flex items-center"><PlusOutlined /></div>
                    <div className='text-primary'>Thêm <br /> thiết bị</div>
                </Button>
            </div>
        </div >
    )
}

export default Page
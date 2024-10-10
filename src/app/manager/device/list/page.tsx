"use client"
import DeviceTable from "@/components/DeviceTable"
import { AvatarInfoElement } from "@/components/element/AvatarInfoElement"
import { Breadcrumb, Form, Input, Select } from "antd"
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
const page = () => {
    const { Search } = Input;
    const optionActive = ["Tất cả", "Hoạt động", "Ngưng hoạt động"];
    const optionConnect = ["Tất cả", "Kết nối", "Mất kết nối"]
    const router = useRouter();
    return (
        <div className="flex flex-col">
            <header className="flex justify-between items-center" style={{ height: "88px" }} >
                <Breadcrumb
                    separator=">"
                    className="text-xl font-bold"
                    items={[
                        {
                            title: 'Thiết bị',
                        },
                        {
                            title: <Link href="/manager/device/list"> <span className="text-primary">Danh sách thiết bị</span></Link>,
                        }
                    ]}
                />
                <AvatarInfoElement />
            </header>
            <main className="flex flex-col">
                <p className="text-2xl font-bold text-primary mb-5">Danh sách thiết bị</p>
                <div className="mb-4">
                    <Form layout="vertical" className="flex justify-between">
                        <div className="flex">
                            <Form.Item label="Trạng thái hoạt động" className="mb-0">
                                <Select style={{ width: "300px" }} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" size="large" defaultValue={"Tất cả"} options={optionActive.map((active) => ({ label: active, value: active }))}></Select>
                            </Form.Item>
                            <Form.Item label="Trạng thái kết nối" className="mb-0 ">
                                <Select style={{ width: "300px" }} size="large" suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} defaultValue={"Tất cả"} options={optionConnect.map(connect => ({ label: connect, value: connect }))}></Select>
                            </Form.Item>
                        </div>
                        <Form.Item label="Từ khoá" className="col-start-5 col-span-1 mb-0">
                            <Search size="large" placeholder="Nhập từ khóa" style={{ width: "300px" }} />
                        </Form.Item>
                    </Form>
                </div>
                <div className='flex justify-between'>
                    <DeviceTable />
                    <button style={{ width: "80px", height: "94px" }} onClick={() => router.push('/manager/device/add')} className='bg-[#FFF2E7] text-sm rounded-tl-lg rounded-br-lg py-3 px-1'>
                        <div className='flex justify-center'><div className=' h-6 w-6 text-white text-sm bg-primary rounded-md'><PlusOutlined /></div></div>
                        <div className='text-primary'>Thêmthiết bị</div>
                    </button>
                </div>
            </main >
        </div >
    )
}

export default page
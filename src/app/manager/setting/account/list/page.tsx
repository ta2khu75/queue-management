"use client"
import { Button, Form, Input, Select } from "antd"
import { PlusOutlined, CaretDownOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import AccountTable from "@/components/table/AccountTable"
import { useEffect, useState } from "react"
import BaseService from "@/service/BaseService"
import { collection } from "firebase/firestore"
import { db } from "@/config/FirebaseConfig"
const Page = () => {
    const { Search } = Input;
    const [roles, setRoles] = useState<Role[]>([])
    useEffect(() => {
        fetchAllAccount()
    }, [])
    const fetchAllAccount = () => {
        BaseService.getAll(collection(db, "roles")).then((response) => {
            setRoles(response)
        }).catch(error => console.log(error))
    }
    const router = useRouter();
    const pathname = usePathname()
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Cài đặt hệ thống", path: "" }, { title: "Quản lý tài khoản", path: pathname }]} />
            <h6 className="my-4">Danh sách tài khoản</h6>
            <Form layout="vertical" className="flex justify-between mb-4 w-[1112px]">
                <Form.Item label="Tên vai trò" className="mb-0 ">
                    <Select style={{ width: "300px" }} size="large" suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} defaultValue={"Tất cả"} options={roles.map(role => ({ label: role.role_name, value: role.id }))}></Select>
                </Form.Item>
                <Form.Item label="Từ khoá" className="col-start-5 col-span-1 mb-0">
                    <Search size="large" placeholder="Nhập từ khóa" style={{ width: "300px" }} />
                </Form.Item>
            </Form>
            <div className='flex justify-between'>
                <AccountTable />
                <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push('/manager/device/add')}>
                    <div className="text-white text-sm bg-primary p-1 rounded-md flex items-center"><PlusOutlined /></div>
                    <div className='text-primary'>Thêm <br /> thiết bị</div>
                </Button>
            </div>
        </div >
    )
}

export default Page
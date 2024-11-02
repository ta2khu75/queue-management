"use client"
import { Button, Form, Input, Select } from "antd"
import { CaretDownOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"
import HeaderAdmin from "@/components/HeaderAdmin"
import AccountTable from "@/components/table/AccountTable"
import { useEffect, useState } from "react"
import BaseService from "@/service/BaseService"
import { collection } from "firebase/firestore"
import { db } from "@/config/FirebaseConfig"
import useDebounce from "@/hook/useDebounce"
import Image from "next/image"
const Page = () => {
    const [roles, setRoles] = useState<Role[]>([])
    const [keyword, setKeyword] = useState('')
    const router = useRouter();
    const pathname = usePathname()
    const keywordDebounce = useDebounce(keyword)
    const [roleId, setRoleId] = useState("all")
    useEffect(() => {
        fetchAllAccount()
    }, [])
    const fetchAllAccount = () => {
        BaseService.readAll(collection(db, "roles")).then((response) => {
            setRoles([{ role_name: "Tất cả", id: "all" }, ...response])
        }).catch(error => console.log(error))
    }
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Cài đặt hệ thống", path: "" }, { title: "Quản lý tài khoản", path: pathname }]} />
            <h6 className="my-4">Danh sách tài khoản</h6>
            <Form layout="vertical" className="flex justify-between mb-4 w-[1112px]">
                <Form.Item label="Tên vai trò" className="mb-0 ">
                    <Select style={{ width: "300px" }} onChange={(e: string) => setRoleId(e)} value={roleId} size="large" suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} defaultValue={"all"} options={roles.map(role => ({ label: role.role_name, value: role.id }))}></Select>
                </Form.Item>
                <Form.Item label="Từ khoá" className="col-start-5 col-span-1 mb-0">
                    <Input.Search onChange={(e) => setKeyword(e.target.value)} size="large" placeholder="Nhập từ khóa" style={{ width: "300px" }} />
                </Form.Item>
            </Form>
            <div className='flex justify-between'>
                <AccountTable keyword={keywordDebounce} roleId={roleId} />
                <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push('/manager/setting/account/add')}>
                    <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fadd.svg?alt=media&token=30041c15-ff4c-4c95-b7a9-c6abf7aee19f"} width={28} height={28} alt="add" />
                    <div className='text-primary'>Thêm<br />tài khoản</div>
                </Button>
            </div>
        </div >
    )
}

export default Page
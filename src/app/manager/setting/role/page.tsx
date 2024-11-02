"use client"
import HeaderAdmin from '@/components/HeaderAdmin'
import { Button, Form, Input } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import RoleTable from '@/components/table/RoleTable'
import useDebounce from '@/hook/useDebounce'
import Image from 'next/image'
const Page = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [keyword, setKeyword] = useState('')
    const debounceKeyword = useDebounce(keyword)
    return (
        <div className="flex flex-col">
            <HeaderAdmin paths={[{ title: "Cài đặt hệ thống", path: "" }, { title: "Quản lý vai trò", path: pathname }]} />
            <div className='flex justify-between w-[1112px] my-4'>
                <h6>Danh sách vai trò</h6>
                <Form layout='vertical'>
                    <Form.Item label="Từ khoá" className="col-start-5 col-span-1 mb-0">
                        <Input.Search onChange={(e) => setKeyword(e.target.value)} size="large" placeholder="Nhập từ khóa" style={{ width: "300px" }} />
                    </Form.Item>
                </Form>
            </div>
            <div className='flex justify-between'>
                <RoleTable keyword={debounceKeyword} />
                <Button type="text" className="w-20 h-24  flex flex-col font-semibold" onClick={() => router.push('/manager/setting/role/add')}>
                    <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fadd.svg?alt=media&token=30041c15-ff4c-4c95-b7a9-c6abf7aee19f"} width={24} height={24} alt="add" />
                    <div className='text-primary'>Thêm <br />vai trò</div>
                </Button>
            </div>
        </div >
    )

}

export default Page
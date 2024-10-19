"use client"

import { AvatarInfoElement } from "@/components/element/AvatarInfoElement"
import { Form, Input } from "antd"
import Image from "next/image"
import { CameraOutlined } from "@ant-design/icons"
import { useAppSelector } from "@/redux/hook"
const Page = () => {

    const auth = useAppSelector(state => state.auth)
    return (
        <div>
            <header className="flex justify-between items-center" style={{ height: "88px" }} >
                <h1 className="text-primary text-xl leading-[30px] font-bold">Thông tin cá nhân</h1>
                <AvatarInfoElement />
            </header>
            <main className="bg-white flex justify-center items-center mt-[84px]" style={{ width: "1112px", height: "397px" }}>
                <div className="flex">
                    <div className="relative">
                        <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/avatar.png?alt=media"} width={248} height={248} alt="avatar" className="rounded-full" />
                        <div className="absolute top-[206px] left-[171px]">
                            <div className="bg-[#FF7506] h-[45px] w-[45px] rounded-full border-2 border-white flex items-center justify-center">
                                <CameraOutlined className="text-white text-2xl" />
                            </div>
                        </div>
                        <div className="text-center leading-9 text-2xl font-bold mt-4">{auth.account?.full_name}</div>
                    </div>
                    <div style={{ width: "792px", height: "276px" }} className="ml-5">
                        <Form layout="vertical" initialValues={auth.account} className="grid grid-cols-2 gap-5 disable">
                            <Form.Item<Account>
                                label="Tên người dùng"
                                name="full_name"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Tên đăng nhập "
                                name="username"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone_number"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Email:"
                                name="email"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Vai trò:"
                                name="role"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Page
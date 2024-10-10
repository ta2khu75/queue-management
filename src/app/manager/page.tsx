"use client"

import { AvatarInfoElement } from "@/components/element/AvatarInfoElement"
import { Form, Input } from "antd"
import Image from "next/image"
import avatar from "../../../public/avatar-generations_rpge.jpg"
import { CameraOutlined } from "@ant-design/icons"
const page = () => {
    return (
        <div>
            <header className="flex justify-between items-center" style={{ height: "88px" }} >
                <h1 className="text-primary text-xl font-bold">Thông tin cá nhân</h1>
                <AvatarInfoElement />
            </header>
            <main className="bg-white flex justify-center items-center mt-16" style={{ width: "1112px", height: "397px" }}>
                <div className="flex">
                    <div>
                        <div className="relative">
                            <Image src={avatar} width={248} height={248} alt="avatar" className="rounded-full" />
                            <div className="absolute top-52 left-44">
                                <div className="bg-primary h-11 w-11 rounded-full border-2 border-white flex items-center justify-center">
                                    <CameraOutlined className="text-white text-2xl" />
                                </div>
                            </div>
                            <div className="text-center text-2xl font-bold leading-9 mt-2">Lê Quỳnh Ái Vân</div>
                        </div>
                    </div>
                    <div style={{ width: "792px", height: "276px" }} className="ml-5">
                        <Form layout="vertical" initialValues={{ username: "Lê Quỳnh Ái Vân", name_login: "lequynhaivan01", phone_number: "0767375921", password: "311940211", email: "adminSSO1@gmail.com", role: "Kế toán" }} className="grid grid-cols-2 gap-5">
                            <Form.Item
                                label="Tên người dùng"
                                name="username"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Tên đăng nhập "
                                name="name_login"
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

export default page
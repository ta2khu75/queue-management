"use client"
import image from "../../../public/Screenshot_20241007_163526.png"
import { Form, Input } from "antd"
import { AuthPage } from "@/components/AuthPage"
const page = () => {
    return (
        <AuthPage image={image}>
            <Form layout='vertical' className='mt-16' style={{ width: "400px" }}>
                <Form.Item label="Vui lòng nhập email để đặt lại mật khẩu của bạn *">
                    <Input />
                </Form.Item>
                <Form.Item className='mt-7'>
                    <div className="flex justify-around">
                        <button className='text-primary border-primary border font-bold rounded text-center' style={{ width: "162px", height: "40px" }}>Hủy</button>
                        <button className='bg-primary text-white font-bold rounded text-center' style={{ width: "162px", height: "40px" }} > Tiếp tục</button>
                    </div>
                </Form.Item>
            </Form>
        </AuthPage>
    )
}

export default page
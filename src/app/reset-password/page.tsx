"use client"
import { Form, Input } from 'antd'
import React from 'react'
import image from "../../../public/Screenshot_20241007_163526.png"
import { AuthPage } from '@/components/AuthPage'
const page = () => {
    return (
        <AuthPage image={image}>
            <Form layout='vertical' className='mt-16' style={{ width: "400px" }}>
                <Form.Item label="Mật khẩu ">
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Nhập lại mật khẩu " className='mb-2'>
                    <Input.Password />
                </Form.Item>
                <Form.Item className='text-center'>
                    <div>
                        <button className='bg-primary text-white font-bold rounded mt-7 py-2 px-10 mb-2' >Đăng nhập</button><br />
                    </div>
                </Form.Item>
            </Form>
        </AuthPage>
    )
}

export default page
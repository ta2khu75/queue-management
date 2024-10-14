"use client"
import { Button, Form, Input } from 'antd'
import React from 'react'
import image from "../../../public/forgot.png"
import { AuthPage } from '@/components/AuthPage'
const page = () => {
    return (
        <AuthPage image={image}>
            <Form layout='vertical' className='auth' style={{ width: "400px" }}>
                <p className="text-[22px] font-bold text-center leading-[33px] mb-4">Đặt lại mật khẩu mới</p>
                <Form.Item label="Mật khẩu ">
                    <Input.Password className='mb-4' />
                </Form.Item>
                <Form.Item label="Nhập lại mật khẩu " className='mb-2'>
                    <Input.Password className='mb-12' />
                </Form.Item>
                <Form.Item className='text-center'>
                    <Button type="primary" className='h-10 w-[162px]'>Xác nhận</Button>
                </Form.Item>
            </Form>
        </AuthPage>
    )
}

export default page
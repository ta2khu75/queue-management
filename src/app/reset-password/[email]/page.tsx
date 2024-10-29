"use client"
import { Button, Form, FormProps, Input } from 'antd'
import React from 'react'
import { AuthPage } from '@/components/AuthPage'
import { useRouter, useSearchParams } from 'next/navigation'
import BaseService from '@/service/BaseService'
import { db } from '@/config/FirebaseConfig'
import { collection, limit, query, where } from 'firebase/firestore'
import useNotification from '@/hook/NotificationHook'
const Page = ({ params }: { params: { email: string } }) => {
    const decodedEmail = decodeURIComponent(params.email);
    const searchParams = useSearchParams()
    const router = useRouter()
    const accountCollenctionRef = collection(db, "accounts")
    const forgot_code = searchParams.get('forgot_code')
    const { contextHolder, openNotification } = useNotification();
    const onFinish: FormProps['onFinish'] = async (values) => {
        BaseService.query<Account>(query(accountCollenctionRef, where("email", "==", decodedEmail), limit(1))).then(response => {
            if (values.password === values.confirm_password) {
                console.log(response, decodedEmail);
                if (response.length > 0) {
                    const account = response[0]
                    if (account.forgot_code === forgot_code) {
                        account.password = values.password
                        if (account.id)
                            BaseService.update(accountCollenctionRef, account.id, account).then(() => {
                                openNotification("success", "Đạt lại mật khẩu thành công")
                                router.push("/login")
                            })
                    } else {
                        openNotification("error", "Mã xác nhận không đúng")
                    }
                } else {
                    openNotification("error", "Đạt lại mật khẩu thất bại")
                }
            }
            else {
                openNotification("error", "Mật khẩu không khớp")
            }
        })
    }
    return (
        <AuthPage image={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/forgot.png?alt=media"}>
            <Form onFinish={onFinish} layout='vertical' className='auth' style={{ width: "400px" }}>
                {contextHolder}
                <p className="text-[22px] font-bold text-center leading-[33px] mb-4">Đặt lại mật khẩu mới</p>
                <Form.Item label="Mật khẩu "
                    name={"password"}
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                >
                    <Input.Password className='mb-4'
                    />
                </Form.Item>
                <Form.Item label="Nhập lại mật khẩu " className='mb-2'
                    name={"confirm_password"}
                    dependencies={['password']}
                    rules={[
                        { required: true, message: "Vui lòng lại nhập mật khẩu" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không khớp'));
                            },
                        }),
                    ]}
                >
                    <Input.Password className='mb-12' />
                </Form.Item>
                <Form.Item className='text-center'>
                    <Button type="primary" htmlType='submit' className='h-10 w-[162px]'>Xác nhận</Button>
                </Form.Item>
            </Form>
        </AuthPage>
    )
}

export default Page
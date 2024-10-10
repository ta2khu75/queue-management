"use client"
import React, { useState } from 'react'
import image from "../../../public/Screenshot_20241007_163616.png"
import { Form, FormProps, Input } from 'antd'
import { ExclamationCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { AuthPage } from '@/components/AuthPage'
import { auth } from '@/config/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
const page = () => {
  const [errorLogin, setErrorLogin] = useState(false)
  const router = useRouter()
  const onFinish: FormProps<User>['onFinish'] = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/manager")
    } catch (error: any) {
      console.error("Error logging in:", error);
      setErrorLogin(true)
    }
  }
  return (
    <AuthPage image={image}>
      <Form layout='vertical' onFinish={onFinish} className='mt-16' style={{ width: "400px" }}>
        <Form.Item<User> label="Tên đăng nhập *" name={'email'}>
          <Input />
        </Form.Item>
        <Form.Item<User> label="Mật khẩu *" className='mb-2' name={'password'}>
          <Input.Password />
        </Form.Item>
        {errorLogin &&
          < span className='text-red-600'><ExclamationCircleOutlined />Sai tài khoản hoặc mật khẩu</span>
        }
        {!errorLogin &&
          < Link href={"/forgot-password"} className='text-red-600'>Quên mật khẩu?</Link>
        }
        <Form.Item className='text-center'>
          <div>
            <button className='bg-primary text-white font-bold rounded mt-7 py-2 px-10 mb-2' >Đăng nhập</button><br />
            {errorLogin && < Link href={"/forgot-password"} className='text-red-600'>Quên mật khẩu?</Link>}
          </div>
        </Form.Item>
      </Form>
    </AuthPage>
  )
}

export default page
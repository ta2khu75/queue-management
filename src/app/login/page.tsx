"use client"
import React, { useState } from 'react'
import image from "../../../public/login.png"
import { Button, Form, FormProps, Input } from 'antd'
import { ExclamationCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { AuthPage } from '@/components/AuthPage'
import { auth } from '@/config/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { LogoElement } from '@/components/element/LogoElement'
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
    <div className='mx-auto' style={{ width: "1440px", height: "810px" }}>
      <div className='flex'>
        <div className='bg-[#F6F6F6] w-[592px] h-[810px]'>
          <div className='flex justify-center mb-' style={{ marginTop: "82px", marginBottom: "75px" }}>
            <LogoElement height={136} width={170} />
          </div>
          <div className='flex justify-center'>
            <Form layout='vertical' onFinish={onFinish} style={{ width: "400px" }}>
              <Form.Item<User> label="Tên đăng nhập *" className='auth' name={'email'}>
                <Input className='mb-4 auth' />
              </Form.Item>
              <Form.Item<User> label="Mật khẩu *" className='auth' name={'password'}>
                <Input.Password className='mb-3 auth' />
              </Form.Item>
              {errorLogin &&
                < span className='text-red-600'><ExclamationCircleOutlined /> <span className='ml-1'>Sai tài khoản hoặc mật khẩu</span></span>
              }
              {!errorLogin &&
                < Link href={"/forgot-password"} className='text-red-600 mb-[19px]' >Quên mật khẩu?</Link>
              }
              <Form.Item className='text-center'>
                <div>
                  <Button type='primary' htmlType='submit' className='h-10 text-base mt-2' style={{ width: "162px" }} >Đăng nhập</Button>
                  <br />
                  {errorLogin && < Link href={"/forgot-password"} className='text-red-600'>Quên mật khẩu?</Link>}
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className='grow relative' >
          <Image src={image} width={605} className='absolute top-[112.94px] left-[79px]' height={614.06} alt='image' />
          <div className='text-[34px] absolute text-[#FF7506] top-[407px] right-[252px]'>Hệ thống</div>
          <div className='text-[#FF7506] font-black text-4xl absolute top-[454px] right-[33px]'>QUẢN LÝ XẾP HÀNG</div>
        </div>
      </div>
    </div >
  )
}

export default page
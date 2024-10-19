"use client"
import React, { useState } from 'react'
import { Button, Form, FormProps, Input } from 'antd'
import { ExclamationCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { LogoElement } from '@/components/element/LogoElement'
import { collection, limit, query, where } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { useAppDispatch } from '@/redux/hook'
import { authAction } from '@/redux/slice/authSlice'
import { addressAction } from '@/redux/slice/addressSlice'
const Page = () => {
  const [errorLogin, setErrorLogin] = useState(false)
  const accountCollenctionRef = collection(db, "accounts")
  const dispatch = useAppDispatch();
  const router = useRouter()
  const fetchIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      const ip = data.ip
      dispatch(addressAction.set(ip))
    } catch (error) {
      console.error('Error fetching the IP address:', error);
      router.push("/login")
    }
  };
  const onFinish: FormProps<User>['onFinish'] = async (values) => {
    BaseService.query<Account>(query(accountCollenctionRef, where("username", "==", values.username), limit(1))).then((data) => {
      if (data.length > 0 && data[0].password == values.password) {
        dispatch(authAction.set(data[0]))
        fetchIPAddress()
        router.push("/manager")
      } else {
        setErrorLogin(true)
      }
    }).catch((err) => {
      console.log(err);
    })
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
              <Form.Item<User> label="Tên đăng nhập *" className='auth' name={'username'}>
                <Input className='mb-4 auth' status={errorLogin ? "error" : ""} />
              </Form.Item>
              <Form.Item<User> label="Mật khẩu *" className='auth' name={'password'}>
                <Input.Password className='mb-3 auth' status={errorLogin ? "error" : ""} />
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
          <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/login.png?alt=media"} width={605} className='absolute top-[112.94px] left-[79px]' height={614.06} alt='image' />
          <div className='text-[34px] absolute text-[#FF7506] top-[407px] right-[252px]'>Hệ thống</div>
          <div className='text-[#FF7506] font-black text-4xl absolute top-[454px] right-[33px]'>QUẢN LÝ XẾP HÀNG</div>
        </div>
      </div>
    </div >
  )
}

export default Page
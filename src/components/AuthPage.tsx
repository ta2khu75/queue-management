import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { LogoElement } from './element/LogoElement'
type Props = {
    children: React.JSX.Element,
    image: StaticImageData
}
export const AuthPage = ({ children, image }: Props) => {
    return (
        <div className='mx-auto' style={{ width: "1440px", height: "810px" }}>
            <div className='flex justify-center'>
                <div style={{ width: "592px" }} className='bg-[#F6F6F6]'>
                    <div className='flex justify-center mt-16'>
                        <LogoElement height={136} width={170} />
                    </div>
                    <h6 className='text-center mt-14 font-bold text-basis'>Đặt lại mật khẩu</h6>
                    <div className='flex justify-center'>
                        {children}
                    </div>
                </div>
                <div style={{ width: 848 }}>
                    <Image src={image} alt='image' />
                </div>
            </div>
        </div >
    )
}

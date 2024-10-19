import Image from 'next/image'
import React from 'react'
import { LogoElement } from './element/LogoElement'
type Props = {
    children: React.JSX.Element,
    image: string
}
export const AuthPage = ({ children, image }: Props) => {
    return (
        <div className='mx-auto' style={{ width: "1440px", height: "810px" }}>
            <div className='flex'>
                <div className='bg-[#F6F6F6] w-[592px] h-[810px]'>
                    <div className='flex justify-center mb-' style={{ marginTop: "82px", marginBottom: "75px" }}>
                        <LogoElement height={136} width={170} />
                    </div>
                    <div className='flex justify-center'>
                        {children}
                    </div>
                </div>
                <div className='grow relative' >
                    <Image src={image} width={711} height={560} className='absolute top-[153px] left-[43px]' alt='image' />
                </div>
            </div>
        </div >
    )
}

import Image from 'next/image'
import logo from "../../../public/avatar.png"
import { BellFilled } from "@ant-design/icons"
export const AvatarInfoElement = () => {
    return (
        <div className='flex items-center mr-12'>
            <div className='w-8 h-8 rounded-full bg-[#FFF2E7] flex justify-center mr-6'>
                <BellFilled className='text-yellow-400 text-xl' />
            </div>
            <div className='flex'>
                <div className='rounded-full'>
                    <Image className='rounded-full' src={logo} width={40} height={40} alt='avatar' />
                </div>
                <div className='ml-2'>
                    <p className='text-[#7E7D88] text-xs'>Xin chào</p>
                    <p className='text-base'>Lê Quỳnh Ái Vân</p>
                </div>
            </div>
        </div>
    )
}

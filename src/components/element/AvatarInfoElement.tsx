import Image from 'next/image'
import { BellFilled } from "@ant-design/icons"
import { useAppSelector } from '@/redux/hook'
export const AvatarInfoElement = () => {
    const auth = useAppSelector(state => state.auth);
    return (
        <div className='flex items-center mr-12'>
            <div className='w-8 h-8 rounded-full bg-[#FFF2E7] flex justify-center mr-6'>
                <BellFilled className='text-yellow-400 text-xl' />
            </div>
            <div className='flex'>
                <div className='rounded-full'>

                    {auth.account?.avatar_url && <Image className='rounded-full h-[40px] w-[40px]' src={auth.account.avatar_url} width={40} height={40} alt='avatar' />}
                    {!auth.account?.avatar_url && < Image className='rounded-full h-[40px] w-[40px]' objectFit='none' src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/avatar.png?alt=media"} width={40} height={40} alt='avatar' />}
                </div>
                <div className='ml-2'>
                    <p className='text-[#7E7D88] text-xs'>Xin chào</p>
                    <p className='text-base'>{auth.account?.full_name}</p>
                </div>
            </div>
        </div>
    )
}

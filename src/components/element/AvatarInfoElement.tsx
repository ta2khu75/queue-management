"use client"
import Image from 'next/image'
import { useAppSelector } from '@/redux/hook'
import { Popover } from 'antd';
import NotificationElement from './NotificationElement';
import { useState } from 'react';
export const AvatarInfoElement = () => {
    const auth = useAppSelector(state => state.auth);
    const [open, setOpen] = useState(false);
    return (
        <div className='flex items-center mr-12'>
            <Popover placement="bottom" overlayInnerStyle={{ padding: 0 }} onOpenChange={() => setOpen(false)} open={open} trigger={"click"} content={<NotificationElement />}>
                {open ?
                    <Image className='mr-6' src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fselected%2Fbell.svg?alt=media&token=29407c9d-3a82-4ae7-ba90-9eaae20be3f1"} width={32} height={32} alt='bell' />
                    :
                    <Image className='mr-6' onClick={() => setOpen(true)} src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fdefault%2Fbell.svg?alt=media&token=a3fc01ce-8211-4a3b-9f8a-47ee42d39400"} width={32} height={32} alt='bell' />
                }
            </Popover>
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

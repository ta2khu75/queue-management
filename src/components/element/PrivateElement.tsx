"use client"
import { useAppSelector } from '@/redux/hook';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const PrivateElement = ({
    children
}: {
    children: React.ReactNode
}) => {
    const auth = useAppSelector(state => state.auth);
    const router = useRouter();
    const pathname = usePathname()
    useEffect(() => {

        if (!auth.auth && pathname !== "login" && pathname !== "forgot-password" && pathname !== "reset-password") {
            router.push('/login');
        }
    }, [auth.auth,pathname, router]);

    return (
        <>{children}</>
    )
}

export default PrivateElement
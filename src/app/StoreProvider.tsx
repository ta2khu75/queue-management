'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../redux/store'
import { authAction } from '@/redux/slice/authSlice'

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(makeStore()) // Khởi tạo store ban đầu

    useEffect(() => {
        const auth = localStorage.getItem("auth")
        if (auth) {
            storeRef.current.dispatch(authAction.set(JSON.parse(auth)))
        }
    }, [])

    return <Provider store={storeRef.current}>{children}</Provider>
}

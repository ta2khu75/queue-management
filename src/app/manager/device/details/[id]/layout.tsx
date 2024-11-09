import { FunctionUtil } from '@/app/util/FunctionUtil'
import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { Device } from '@/type/Device'
import { collection } from 'firebase/firestore'
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props): Promise<Metadata> {
    const id = FunctionUtil.getIdFromPath((await params).id)
    const device = await BaseService.readById<Device>(collection(db, "devices"), id)
    return {
        title: `Thiết bị ${device?.device_id}`,
        description: `Thiết bị ${device?.device_name}`
    }
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
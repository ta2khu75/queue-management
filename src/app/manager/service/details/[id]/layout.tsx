import { FunctionUtil } from '@/app/util/FunctionUtil'
import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { collection } from 'firebase/firestore'
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props): Promise<Metadata> {
    const id = FunctionUtil.getIdFromPath((await params).id)
    const service = await BaseService.readById<Service>(collection(db, "services"), id)
    return {
        title: `Dịch vụ ${service?.service_name}`,
        description: `Dịch vụ ${service?.service_name}`
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
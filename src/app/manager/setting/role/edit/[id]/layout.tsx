import { FunctionUtil } from '@/app/util/FunctionUtil'
import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { collection } from 'firebase/firestore'
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props): Promise<Metadata> {
    const id = FunctionUtil.getIdFromPath((await params).id)
    const role = await BaseService.readById<Role>(collection(db, "roles"), id)
    return {
        title: `Vai trò ${role?.role_name}`,
        description: `Vai trò ${role?.role_name}`
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
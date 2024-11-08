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
    const id = (await params).id
    const account = await BaseService.readById<Account>(collection(db, "accounts"), id)
    return {
        title: `Tài khoản ${account?.username}`,
        description: `Tài khoản ${account?.email}`
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
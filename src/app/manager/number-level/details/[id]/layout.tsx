import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { NumberLevel } from '@/type/NumberLevel'
import { collection } from 'firebase/firestore'
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(
    { params }: Props): Promise<Metadata> {
    const id = (await params).id
    const numberLevel = await BaseService.readById<NumberLevel>(collection(db, "number-levels"), id)
    return {
        title: `Cấp số ${numberLevel?.id}`,
        description: `Cấp số ${numberLevel?.id}`
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
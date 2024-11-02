import { db } from "@/config/FirebaseConfig";
import BaseService from "@/service/BaseService";
import { NumberLevel } from "@/type/NumberLevel";
import { NumberLevelStatus } from "@/type/NumberLevelStatus";
import { collection, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
    const numberLevelCollectionRef = collection(db, "number-levels")
    try {
        const data = await BaseService.query<NumberLevel>(query(numberLevelCollectionRef, where("status", "==", NumberLevelStatus.WAITING), where("grant_time", "<=", new Date())));
        data.forEach(item => {
            if (item.id)
                BaseService.update(numberLevelCollectionRef, item.id, { ...item, status: NumberLevelStatus.SKIP }).then(() => console.log("update successfully")).catch(error => {
                    throw error
                })
        })
        return NextResponse.json({ message: "Tác vụ đã chạy thành công" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Xác minh thất bại', details: error }, { status: 500 });
    }
}
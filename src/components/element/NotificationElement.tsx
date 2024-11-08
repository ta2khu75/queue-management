import { db } from "@/config/FirebaseConfig"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { accountAction } from "@/redux/slice/accountSlice"
import BaseService from "@/service/BaseService"
import { NumberLevel } from "@/type/NumberLevel"
import { collection, limit, orderBy, query, Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
const NotificationElement = () => {
    const accountState = useAppSelector(state => state.account)
    const dispatch = useAppDispatch()
    const numberLevelCollectionRef = collection(db, "number-levels");
    const [numberLevels, setNumberLevels] = useState<NumberLevel[]>([])
    const [accountMap, setAccountMap] = useState<Map<string, Account>>();
    useEffect(() => {
        if (accountState.accounts.length === 0) {
            dispatch(accountAction.fetchReadAll())
        }
        fetchReadAll()
    }, [])
    useEffect(() => {
        if (accountState.accounts.length > 0 && accountMap === undefined) {
            setAccountMap(accountState.accounts.reduce((account, item) => {
                account.set(item.id, item);
                return account;
            }, new Map()))
        }
        fetchReadAll()
    }, [accountState.accounts.length])
    const fetchReadAll = () => {
        BaseService.query<NumberLevel>(query(numberLevelCollectionRef, orderBy("grant_time", "desc"), limit(10))).then(data => {
            setNumberLevels(data)
        })
    }
    return (
        <div className='w-[360px] h-[536px] rounded-[10px]'>
            <div className='font-bold text-xl leading-[30px] py-[10px] pl-6 bg-super_primary text-white rounded-t-[10px]'>Thông báo</div>
            <div className="px-6 h-[486px] overflow-y-auto">
                {numberLevels.map(numberLevel => {
                    return (<div key={numberLevel.id}>
                        <div className="text-[#BF5805] font-bold text-base mt-4 mb-1">Người dùng: {numberLevel.account_id ? accountMap?.get(numberLevel.account_id)?.full_name : numberLevel.fullName}</div>
                        <div className="text-[#535261] text-base font-normal mb-3">Thời gian nhận số: {numberLevel.grant_time instanceof Timestamp ? dayjs(numberLevel.grant_time.toMillis()).format("HH[h]mm [ngày] DD/MM/YYYY") : ""}</div>
                        <hr />
                    </div>)
                })}
            </div>
        </div>
    )
}

export default NotificationElement
import { db } from "@/config/FirebaseConfig";
import BaseService from "@/service/BaseService";
import { Table, TableProps } from "antd";
import { collection, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { UserLog } from "@/type/UserLog";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { accountAction } from "@/redux/slice/accountSlice";

type Props = {
    keyword: string,
    fromTo: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
}
const UserLogTable = ({ keyword, fromTo }: Props) => {
    const columns: TableProps<UserLog>['columns'] = [
        {
            title: 'Tên đăng nhập',
            dataIndex: "account_id",
            key: 'account_id',
            render: (account_id: string) => <>{accountMap?.get(account_id)?.username}</>
        },
        {
            title: 'Thời gian tác động',
            dataIndex: "impact_time",
            key: 'impact_time',
            render: (impact_time: Timestamp) => <>{dayjs(new Date(impact_time.toMillis())).format("HH:mm DD/MM/YYYY")}</>
        },
        {
            title: 'IP thực hiện',
            dataIndex: "address_ip",
            key: 'address_ip',
        },
        {
            title: 'Thao tác thực hiện',
            dataIndex: "action",
            key: 'action',
        },
    ];
    const [userLogs, setUserLogs] = useState<UserLog[]>()
    const accountState = useAppSelector(state => state.account)
    const [accountMap, setAccountMap] = useState<Map<string, Account>>();
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (accountState.accounts.length > 0 && accountMap === undefined) {
            setAccountMap(accountState.accounts.reduce((account, item) => {
                account.set(item.id, item);
                return account;
            }, new Map()))
        }
        if (accountState.accounts.length === 0) {
            dispatch(accountAction.fetchReadAll())
        }
    }, [accountState.accounts.length])
    useEffect(() => {
        if (fromTo?.[0] && fromTo?.[1]) {
            BaseService.query<UserLog>(query(collection(db, "user-logs"), where("impact_time", ">=", fromTo[0].toDate()), where("impact_time", "<=", fromTo[1].toDate()), orderBy("impact_time", "desc"))).then(data => setUserLogs(data))
        }
        else
            BaseService.query<UserLog>(query(collection(db, "user-logs"), orderBy("impact_time", "desc"))).then(data => { setUserLogs(data) })

    }, [fromTo])
    return <Table<UserLog> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9, pageSizeOptions: [], showSizeChanger: false }}
        rowClassName={(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row') + " custom-row"}
        className="custom-table" columns={columns} dataSource={userLogs?.filter(useLog => useLog.account_id.includes(keyword))} />
}

export default UserLogTable
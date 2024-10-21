import { db } from "@/config/FirebaseConfig";
import BaseService from "@/service/BaseService";
import { Table, TableProps } from "antd";
import { collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const UserLogTable = () => {
    const columns: TableProps<UserLog>['columns'] = [
        {
            title: 'Tên đăng nhập',
            dataIndex: "account_id",
            key: 'username',
        },
        {
            title: 'Thời gian tác động',
            dataIndex: "impact_time",
            key: 'impact_time',
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

    useEffect(() => {
        BaseService.readAll<UserLog>(collection(db, "user-logs")).then(data => {
            setUserLogs(data)
        })
    }, [])
    return <Table<UserLog> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9 }}
        rowClassName={`${(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row')} custom-row`}
        className="custom-table" columns={columns} dataSource={userLogs} />
}

export default UserLogTable
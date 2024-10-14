import { db } from "@/config/FirebaseConfig";
import BaseService from "@/service/BaseService";
import { Table, TableProps } from "antd";
import { collection } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const AccountTable = () => {
    const [roleMap, setRoleMap] = useState<Map<number, Role>>()
    const columns: TableProps<Account>['columns'] = [
        {
            title: 'Tên đăng nhập',
            dataIndex: "username",
            key: 'username',
        },
        {
            title: 'Họ tên',
            dataIndex: "full_name",
            key: 'full_name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: "phone_number",
            key: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: "email",
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: "role_id",
            key: 'role',
            render: (role_id) => <span>{roleMap?.get(role_id)?.role_name}</span>
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: "status",
            key: 'status',
            render: status => <div className="flex items-center"><div className={`h-2 w-2 rounded-full mr-[6.5px] ${status === "ACTIVE" ? "bg-active" : "bg-in_active"}`}></div><span>{status === "ACTIVE" ? "Hoạt động" : "Ngưng hoạt động"}</span></div>
        },
        {
            key: '',
            dataIndex: "id",
            render: (text) => <Link href={`/manager/setting/account/edit/${text}`} className="underline text-[#4277FF] decoration-1">Cập nhật</Link>
        },
    ];
    const [data, setData] = useState<Device[]>([])
    const deviceCollectionRef = collection(db, "accounts")
    useEffect(() => {
        fetchAllAccount()
        fetchAllRole()
    }, [])
    const fetchAllRole = () => {
        BaseService.getAll<Role>(collection(db, "roles")).then((data) => {
            setRoleMap(data.reduce((account, item) => {
                account.set(item.id, item);
                return account;
            }, new Map()))
        }).catch((err) => {
            console.log(err);
        })
    }
    const fetchAllAccount = async () => {
        BaseService.getAll<Device>(deviceCollectionRef).then(response => setData(response))
    }
    return <Table<Device> style={{ width: "1112px" }}
        bordered
        rowClassName={(record, index) => (index % 2 !== 0 ? 'odd-row' : 'even-row')}
        className="custom-table" columns={columns} dataSource={data} />
}

export default AccountTable
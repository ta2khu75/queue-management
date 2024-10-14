import { db } from "@/config/FirebaseConfig";
import BaseService from "@/service/BaseService";
import { Table, TableProps } from "antd";
import { collection } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const RoleTable = () => {
    const columns: TableProps<Role>['columns'] = [
        {
            title: 'Tên vai trò',
            dataIndex: "role_name",
            key: 'id',
        },
        {
            title: 'Số người dùng',
            dataIndex: "device_name",
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: "description",
            key: 'name',
        },
        {
            key: 'update',
            dataIndex: "id",
            render: (text) => <Link href={`/manager/setting/role/edit/${text}`} className="underline text-[#4277FF] decoration-1">Cập nhật</Link>
        },
    ];
    const [data, setData] = useState<Role[]>([])
    const deviceCollectionRef = collection(db, "roles")
    useEffect(() => {
        fetchAllDevices()
    }, [])
    const fetchAllDevices = async () => {
        BaseService.getAll<Role>(deviceCollectionRef).then(response => setData(response))
    }
    return <Table<Device> style={{ width: "1112px" }}
        bordered
        rowClassName={(record, index) => (index % 2 !== 0 ? 'odd-row' : 'even-row')}
        className="custom-table" columns={columns} dataSource={data} />
}

export default RoleTable
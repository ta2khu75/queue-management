import { db } from "@/config/FirebaseConfig";
import BaseService from "@/service/BaseService";
import { Table, TableProps } from "antd";
import { collection } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const ServiceTable = () => {
    const columns: TableProps<Service>['columns'] = [
        {
            title: 'Mã dịch vụ',
            dataIndex: "service_id",
            key: 'service_id',
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: "service_name",
            key: 'service_name',
        },
        {
            title: 'Mô tả',
            dataIndex: "description",
            key: 'description',
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: "status",
            key: 'status',
            render: status => <div className="flex items-center"><div className={`h-2 w-2 rounded-full mr-[6.5px] ${status === "ACTIVE" ? "bg-active" : "bg-in_active"}`}></div><span>{status === "ACTIVE" ? "Hoạt động" : "Ngưng hoạt động"}</span></div>
        },
        {
            key: 'details',
            dataIndex: "id",
            render: (text) => <Link href={`/manager/service/details/${text}`} className="underline text-[#4277FF] decoration-1" >Chi tiết</Link>
        },
        {
            key: '',
            dataIndex: "id",
            render: (text) => <Link href={`/manager/service/edit/${text}`} className="underline text-[#4277FF] decoration-1">Cập nhật</Link>
        },
    ];
    const [data, setData] = useState<Device[]>([])
    const deviceCollectionRef = collection(db, "services")
    useEffect(() => {
        fetchAllAccount()
    }, [])
    const fetchAllAccount = async () => {
        BaseService.getAll<Service>(deviceCollectionRef).then(response => setData(response))
    }
    return <Table<Device> style={{ width: "1112px" }}
        bordered
        rowClassName={(record, index) => (index % 2 !== 0 ? 'odd-row' : 'even-row')}
        className="custom-table" columns={columns} dataSource={data} />
}

export default ServiceTable;
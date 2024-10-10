import { db } from "@/config/FirebaseConfig";
import BaseService from "@/service/BaseService";
import { Table, TableProps } from "antd";
import { collection } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const DeviceTable = () => {
    const columns: TableProps<Device>['columns'] = [
        {
            title: 'Mã thiết bị',
            dataIndex: "device_id",
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tên thiết bị',
            dataIndex: "device_name",
            key: 'name',
        },
        {
            title: 'Địa chỉ IP',
            dataIndex: "address_ip",
            key: 'address',
        },
        {
            title: 'Trạng thái hoạt động',
            key: 'status-active',
            dataIndex: "",
        },
        {
            title: 'Trạng thái kết nối',
            key: 'status-connect',
            dataIndex: 'tags',
        },
        {
            title: 'Dịch vụ sử dụng',
            key: 'service',
            dataIndex: 'service',
        },
        {
            key: 'details',
            dataIndex: "id",
            render: (text) => <Link href={`/manager/device/details/${text}`} className="underline text-[#4277FF] decoration-1" >Chi tiết</Link>
        },
        {
            key: 'update',
            dataIndex: "id",
            render: (text) => <Link href={`/manager/device/edit/${text}`} className="underline text-[#4277FF] decoration-1">Cập nhật</Link>
        },
    ];
    const [data, setData] = useState<Device[]>([])
    const deviceCollectionRef = collection(db, "devices")
    useEffect(() => {
        fetchAllDevices()
    }, [])
    const fetchAllDevices = async () => {
        BaseService.getAll<Device>(deviceCollectionRef).then(response => setData(response))
    }
    return <Table<Device> style={{ width: "1112px" }}
        bordered
        rowClassName={(record, index) => (index % 2 !== 0 ? 'odd-row' : 'even-row')}
        className="custom-table" columns={columns} dataSource={data} />
}

export default DeviceTable
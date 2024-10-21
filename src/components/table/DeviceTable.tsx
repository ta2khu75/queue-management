import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { deviceAction } from "@/redux/slice/deviceSlice";
import { FetchStatus } from "@/type/FetchStatus";
import { Table, TableProps } from "antd";
import Link from "next/link";
import { useEffect } from "react";

const DeviceTable = () => {
    const columns: TableProps<Device>['columns'] = [
        {
            title: 'Mã thiết bị',
            dataIndex: "device_id",
            key: 'id',
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
    const dispatch = useAppDispatch()
    const deviceState = useAppSelector(state => state.device)
    useEffect(() => {
        if (deviceState.devices.length === 0) {
            dispatch(deviceAction.fetchReadAll())
        }
    }, [])
    if (deviceState.fetchStatus === FetchStatus.PENDING) {
        return <div>loading</div>
    }
    if (deviceState.fetchStatus === FetchStatus.REJECTED) {
        return <div>something wrong</div>
    }
    return <Table<Device> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9 }}
        rowClassName={`${(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row')} custom-row`}
        className="custom-table" columns={columns} dataSource={deviceState.devices} />
}

export default DeviceTable
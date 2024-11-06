import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { deviceAction } from "@/redux/slice/deviceSlice";
import { serviceAction } from "@/redux/slice/serviceClice";
import { ConnectStatus } from "@/type/ConnectStatus";
import { Device } from "@/type/Device";
import { FetchStatus } from "@/type/FetchStatus";
import { Status } from "@/type/Status";
import { Popover, Table, TableProps } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
type Props = {
    keyword: string,
    status: string,
    connectStatus: string
}
const DeviceTable = ({ keyword, status, connectStatus }: Props) => {
    const columns: TableProps<Device>['columns'] = [
        {
            title: 'Mã thiết bị',
            dataIndex: "device_id",
            key: 'id',
        },
        {
            title: 'Tên thiết bị',
            width: 120,
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
            key: 'status',
            dataIndex: "status",
            render: status => <div className="flex items-center"><div className={`h-2 w-2 rounded-full mr-[6.5px] ${status === Status.ACTIVE ? "bg-active" : "bg-in_active"}`}></div><span>{status === Status.ACTIVE ? "Hoạt động" : "Ngưng hoạt động"}</span></div>
        },
        {
            title: 'Trạng thái kết nối',
            key: 'connect_status',
            dataIndex: 'connect_status',
            render: status => <div className="flex items-center"><div className={`h-2 w-2 rounded-full mr-[6.5px] ${status === ConnectStatus.CONNECT ? "bg-active" : "bg-in_active"}`}></div><span>{status === ConnectStatus.CONNECT ? "Kết nối" : "Mất kết nối"}</span></div>
        },
        {
            title: 'Dịch vụ sử dụng',
            key: 'service_ids',
            width: 200,
            dataIndex: 'service_ids',
            render: (service_ids: string[]) => <>
                <div className="truncate w-[180px]">{service_ids?.map(service_id => `${serviceMap?.get(service_id)?.service_name}, `)}{service_ids?.length > 0 ? "..." : ""}</div>
                {service_ids?.length > 0 && <Popover
                    placement="top"
                    trigger="click"
                    content={service_ids?.map(service_id => `${serviceMap?.get(service_id)?.service_name}, `)}>
                    <button className="underline text-[#4277FF] decoration-1">Xem thêm</button>
                </Popover>
                }
            </>
        },
        {
            key: 'details',
            dataIndex: "id",
            render: (text) => <Link href={`/manager/device/details/${text}`} className="underline text-[#4277FF] decoration-1">Chi tiết</Link>
        },
        {
            key: 'update',
            dataIndex: "id",
            render: (text) => <Link href={`/manager/device/edit/${text}`} className="underline text-[#4277FF] decoration-1">Cập nhật</Link>
        },
    ];
    const dispatch = useAppDispatch()
    const deviceState = useAppSelector(state => state.device)
    const serviceState = useAppSelector(state => state.service)
    const [serviceMap, setServiceMap] = useState<Map<string, Service>>()
    useEffect(() => {
        if (deviceState.devices.length === 0) {
            dispatch(deviceAction.fetchReadAll())
        }
    }, [])
    useEffect(() => {
        if (serviceState.services.length === 0)
            dispatch(serviceAction.fetchReadAll())
        else {
            setServiceMap(serviceState.services.reduce((service, item) => {
                service.set(item.id, item);
                return service;
            }, new Map()))

        }
    }, [serviceState.services.length])
    if (deviceState.fetchStatus === FetchStatus.PENDING) {
        return <div>loading</div>
    }
    if (deviceState.fetchStatus === FetchStatus.REJECTED) {
        return <div>something wrong</div>
    }
    return (
        <Table<Device> style={{ width: "1112px" }}
            bordered
            pagination={{ pageSize: 8, pageSizeOptions: [], showSizeChanger: false }}
            rowClassName={(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row') + " custom-row"}
            className="custom-table" columns={columns} dataSource={deviceState.devices.filter(device => device.device_name?.includes(keyword)).filter(device => status === "all" || device.status === status).filter(device => connectStatus === "all" || device.connect_status === connectStatus)} />
    )
}

export default DeviceTable
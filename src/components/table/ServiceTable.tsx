import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { serviceAction } from "@/redux/slice/serviceClice";
import { FetchStatus } from "@/type/FetchStatus";
import { Table, TableProps } from "antd";
import Link from "next/link";
import { useEffect } from "react";
type Props = {
    keyword: string
}
const ServiceTable = ({ keyword }: Props) => {
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
    const dispatch = useAppDispatch()
    const serviceState = useAppSelector(state => state.service)
    useEffect(() => {
        if (serviceState.services.length === 0)
            dispatch(serviceAction.fetchReadAll())
    }, [])
    if (serviceState.fetchStatus === FetchStatus.PENDING) {
        return <div>loading</div>
    }
    if (serviceState.fetchStatus === FetchStatus.REJECTED) {
        return <div>something wrong</div>
    }
    return <Table<Device> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9 }}
        rowClassName={`${(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row')} custom-row`}
        className="custom-table" columns={columns} dataSource={serviceState.services.filter(service => service.service_name?.includes(keyword))} />
}

export default ServiceTable;
import { FunctionUtil } from "@/app/util/FunctionUtil";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { serviceAction } from "@/redux/slice/serviceClice";
import { FetchStatus } from "@/type/FetchStatus";
import { Status } from "@/type/Status";
import { Table, TableProps } from "antd";
import Link from "next/link";
import { useEffect } from "react";
type Props = {
    keyword: string,
    status: string
}
const ServiceTable = ({ keyword, status }: Props) => {
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
            render: status => <div className="flex items-center"><div className={`h-2 w-2 rounded-full mr-[6.5px] ${status === Status.ACTIVE ? "bg-active" : "bg-in_active"}`}></div><span>{status === Status.ACTIVE ? "Hoạt động" : "Ngưng hoạt động"}</span></div>
        },
        {
            key: 'details',
            dataIndex: "id",
            render: (id: string, record: Service) => <Link href={`/manager/service/details/${FunctionUtil.convertSlugUrl(record.service_name)}-${id}.html`} className="underline text-[#4277FF] decoration-1" >Chi tiết</Link>
        },
        {
            key: '',
            dataIndex: "id",
            render: (id: string, record: Service) => <Link href={`/manager/service/edit/${FunctionUtil.convertSlugUrl(record.service_name)}-${id}.html`} className="underline text-[#4277FF] decoration-1">Cập nhật</Link>
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
    return <Table<Service> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9, pageSizeOptions: [], showSizeChanger: false }}
        rowClassName={(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row') + " custom-row"}
        className="custom-table" columns={columns} dataSource={serviceState.services.filter(service => service.service_name?.includes(keyword)).filter(service => status === "all" || status === service.status)} />
}

export default ServiceTable;
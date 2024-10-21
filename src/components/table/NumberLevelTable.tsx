import { db } from "@/config/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { serviceAction } from "@/redux/slice/serviceClice";
import BaseService from "@/service/BaseService";
import { NumberLevel } from "@/type/NumberLevel";
import { Table, TableProps } from "antd";
import { collection, Timestamp } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { NumberLevelStatus } from "@/type/NumberLevelStatus";
const NumberLevelTable = () => {
    const setBgStatus = (status: string) => {
        if (status === NumberLevelStatus.WAITING) return "bg-[#4277FF]";
        if (status === NumberLevelStatus.USED) return "bg-[#7E7D88]";
        if (status === NumberLevelStatus.SKIP) return "bg-[#E73F3F]";
    }
    const columns: TableProps<NumberLevel>['columns'] = [
        {
            title: 'STT',
            dataIndex: "number_level",
            key: 'number_level',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: "account_id",
            key: 'account_id',
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: "service",
            key: 'service_id',
            render: (service: Service) => <>{service?.service_name}</>
        },
        {
            title: 'Thời gian cấp',
            dataIndex: "grant_time",
            key: 'grant_time',
            render: (grant_time: Timestamp) => <>{dayjs(new Date(grant_time.toMillis())).format("HH:mm DD/MM/YYYY")}</>
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: "expiry",
            key: "expiry",
            render: (grant_time: Timestamp) => <>{dayjs(new Date(grant_time.toMillis())).format("HH:mm DD/MM/YYYY")}</>
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: 'status',
            render: status => <div className="flex items-center"><div className={`h-2 w-2 rounded-full mr-[6.5px] ${setBgStatus(status)}`}></div><span>{status}</span></div>
        },
        {
            title: "Nguồn cấp",
            dataIndex: "service",
            key: 'status',
        },
        {
            dataIndex: "id",
            key: 'details',
            render: (id) => <Link href={`/ manager / number / details / ${id}`} className="underline text-[#4277FF] decoration-1">Chi tiết</Link>
        },
    ];
    useEffect(() => {
    }, [])
    const dispatch = useAppDispatch()
    const [numberLevels, setNumberLevels] = useState<NumberLevel[]>()
    const serviceState = useAppSelector(state => state.service)
    useEffect(() => {
        if (serviceState.services.length === 0)
            dispatch(serviceAction.fetchReadAll())
        fetchReadAll()
    }, [serviceState.services.length])
    const fetchReadAll = async () => {
        const number_levels = await BaseService.readAll<NumberLevel>(collection(db, "number-levels"))
        setNumberLevels(number_levels.map(numberLevel => {
            const service = serviceState.services.find(service => service.id == numberLevel.service_id);
            if (service) {
                numberLevel.service = service
            }
            return numberLevel
        }))
    }
    return <Table<NumberLevel> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9 }}
        rowClassName={`${(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row')} custom-row`}
        className="custom-table" columns={columns} dataSource={numberLevels} />
}

export default NumberLevelTable;
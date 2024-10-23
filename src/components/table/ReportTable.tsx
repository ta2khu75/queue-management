import { db } from "@/config/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { serviceAction } from "@/redux/slice/serviceClice";
import BaseService from "@/service/BaseService";
import { NumberLevel } from "@/type/NumberLevel";
import { Table, TableProps } from "antd";
import { collection, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { NumberLevelStatus } from "@/type/NumberLevelStatus";
type Props = {
    fromTo: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
}
const ReportTable = ({ fromTo }: Props) => {
    const columns: TableProps<NumberLevel>['columns'] = [
        {
            title: 'STT',
            dataIndex: "number_level",
            key: 'number_level',
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
    ];
    const dispatch = useAppDispatch()
    const [numberLevels, setNumberLevels] = useState<NumberLevel[]>()
    const serviceState = useAppSelector(state => state.service)
    useEffect(() => {
        if (serviceState.services.length === 0)
            dispatch(serviceAction.fetchReadAll())
        fetchReadAll()
    }, [serviceState.services.length])
    useEffect(() => {
        if (fromTo?.[0] && fromTo?.[1]) {
            BaseService.query<NumberLevel>(query(collection(db, "number-levels"), where("grant_time", ">=", fromTo[0].toDate()), where("grant_time", "<=", fromTo[1].toDate()), orderBy("grant_time", "desc"))).then(data => {
                setNumberLevels(data.map(numberLevel => {
                    const service = serviceState.services.find(service => service.id == numberLevel.service_id);
                    if (service) {
                        numberLevel.service = service
                    }
                    return numberLevel
                }))
            })
        } else {
            fetchReadAll();
        }
    }, [fromTo])
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

    const setBgStatus = (status: string) => {
        if (status === NumberLevelStatus.WAITING) return "bg-[#4277FF]";
        if (status === NumberLevelStatus.USED) return "bg-[#7E7D88]";
        if (status === NumberLevelStatus.SKIP) return "bg-[#E73F3F]";
    }
    return <Table<NumberLevel> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9 }}
        rowClassName={`${(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row')} custom-row`}
        className="custom-table" columns={columns} dataSource={numberLevels} />
}

export default ReportTable;
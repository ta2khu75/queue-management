import { db } from "@/config/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { serviceAction } from "@/redux/slice/serviceClice";
import BaseService from "@/service/BaseService";
import { NumberLevel } from "@/type/NumberLevel";
import { Button, Table, TableProps } from "antd";
import { collection, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { NumberLevelStatus } from "@/type/NumberLevelStatus";
import * as XLSX from 'xlsx/xlsx.mjs';
import { CloudDownloadOutlined } from "@ant-design/icons"
import Image from "next/image";
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
            dataIndex: "service_id",
            key: 'service_id',
            render: (service_id: string) => <>{serviceMap?.get(service_id)?.service_name}</>
        },
        {
            title: 'Thời gian cấp',
            dataIndex: "grant_time",
            key: 'grant_time',
            render: (grant_time: Timestamp) => <>{dayjs(new Date(grant_time?.toMillis())).format("HH:mm DD/MM/YYYY")}</>
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: 'status',
            render: status => <div className="flex items-center"><div className={`h-2 w-2 rounded-full mr-[6.5px] ${setBgStatus(status)}`}></div><span>{status}</span></div>
        },
        {
            title: "Nguồn cấp",
            dataIndex: "supply",
            key: 'supply',
        },
    ];
    const handleDownloadClick = () => {
        const data = numberLevels?.map(numberLevel => {
            return {
                "Số thứ tự": numberLevel.number_level,
                "Tên dịch vụ": serviceMap?.get(numberLevel.service_id ?? "")?.service_name,
                "Thời gian cấp": numberLevel.grant_time instanceof Timestamp ? dayjs(new Date(numberLevel.grant_time?.toMillis())).format("HH:mm DD/MM/YYYY") : "",
                "Tình trạng": numberLevel.status,
                "Nguồn cấp": numberLevel.supply,
            }
        })
        if (data) {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(data);
            // Set column widths based on the content
            const columnWidths = Object.keys(data[0]).map((key) => ({
                wch: Math.max(
                    key.length, // Header width
                    ...data.map(row => (row[key] ? row[key].toString().length : 0)) // Data width
                ),
            }));
            worksheet["!cols"] = columnWidths;
            // Append worksheet to workbook and write file
            XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
            XLSX.writeFile(workbook, dayjs().format("HH:mm_DD-MM-YYYY") + ".xlsx");
        }
    }
    const dispatch = useAppDispatch()
    const [numberLevels, setNumberLevels] = useState<NumberLevel[]>()
    const serviceState = useAppSelector(state => state.service)
    const [serviceMap, setServiceMap] = useState<Map<string, Service>>();
    useEffect(() => {
        if (serviceState.services.length === 0)
            dispatch(serviceAction.fetchReadAll())
        fetchReadAll()
    }, [])
    useEffect(() => {
        if (serviceState.services.length > 0 && serviceMap === undefined) {
            setServiceMap(serviceState.services.reduce((service, item) => {
                service.set(item.id, item);
                return service;
            }, new Map()))
        }
    }, [serviceState.services.length])
    useEffect(() => {
        if (fromTo?.[0] && fromTo?.[1]) {
            BaseService.query<NumberLevel>(query(collection(db, "number-levels"), where("grant_time", ">=", fromTo[0].toDate()), where("grant_time", "<=", fromTo[1].toDate()), orderBy("grant_time", "desc"))).then(data => {
                setNumberLevels(data)
            })
        } else {
            fetchReadAll();
        }
    }, [fromTo])
    const fetchReadAll = async () => {
        const number_levels = await BaseService.query<NumberLevel>(query(collection(db, "number-levels"), orderBy("grant_time", "desc")))
        setNumberLevels(number_levels)
    }

    const setBgStatus = (status: string) => {
        if (status === NumberLevelStatus.WAITING) return "bg-[#4277FF]";
        if (status === NumberLevelStatus.USED) return "bg-[#7E7D88]";
        if (status === NumberLevelStatus.SKIP) return "bg-[#E73F3F]";
    }
    return (
        <div className='flex justify-between'>
            <Table<NumberLevel> style={{ width: "1112px" }}
                bordered
                pagination={{ pageSize: 9 }}
                rowClassName={(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row') + " custom-row"}
                className="custom-table" columns={columns} dataSource={numberLevels} />
            <Button type="text" className="w-20 h-[75px]  flex flex-col font-semibold" onClick={() => handleDownloadClick()}>
                <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/icon%2Fdownload.svg?alt=media&token=04c988db-60cf-4eef-8126-34b5ee61aa8b"} width={28} height={28} alt="add" />
                <div className='text-primary'>Tải về</div>
            </Button>
        </div >
    )
}

export default ReportTable;
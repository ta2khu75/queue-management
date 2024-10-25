import { db } from "@/config/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { serviceAction } from "@/redux/slice/serviceClice";
import BaseService from "@/service/BaseService";
import { NumberLevel } from "@/type/NumberLevel";
import { Table, TableProps } from "antd";
import { collection, orderBy, query, Timestamp } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { NumberLevelStatus } from "@/type/NumberLevelStatus";
import { accountAction } from "@/redux/slice/accountSlice";
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
            render: (account_id: string) => <>{accountMap?.get(account_id)?.full_name}</>
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
            render: (grant_time: Timestamp) => <>{dayjs(new Date(grant_time.toMillis())).format("HH:mm DD/MM/YYYY")}</>
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: "expiry",
            key: "expiry",
            render: (expiry: Timestamp) => <>{dayjs(new Date(expiry.toMillis())).format("HH:mm DD/MM/YYYY")}</>
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
            render: (id) => <Link href={`/manager/number-level/details/${id}`} className="underline text-[#4277FF] decoration-1">Chi tiết</Link>
        },
    ];
    useEffect(() => {
    }, [])
    const dispatch = useAppDispatch()
    const accountState = useAppSelector(state => state.account)
    const [numberLevels, setNumberLevels] = useState<NumberLevel[]>()
    const serviceState = useAppSelector(state => state.service)
    const [accountMap, setAccountMap] = useState<Map<string, Account>>();
    const [serviceMap, setServiceMap] = useState<Map<string, Service>>();
    useEffect(() => {
        if (serviceState.services.length === 0)
            dispatch(serviceAction.fetchReadAll())
        if (accountState.accounts.length === 0)
            dispatch(accountAction.fetchReadAll())
        fetchReadAll()
    }, [])
    useEffect(() => {
        if (accountState.accounts.length > 0 && accountMap === undefined) {
            setAccountMap(accountState.accounts.reduce((account, item) => {
                account.set(item.id, item);
                return account;
            }, new Map()))

        }
        if (serviceState.services.length > 0 && serviceMap === undefined) {
            setServiceMap(serviceState.services.reduce((service, item) => {
                service.set(item.id, item);
                return service;
            }, new Map()))
        }
    }, [accountState.accounts.length, serviceState.services.length])
    const fetchReadAll = () => {
        BaseService.query<NumberLevel>(query(collection(db, "number-levels"), orderBy("grant_time", "desc"))).then(data => {
            setNumberLevels(data)
        })
    }
    return <Table<NumberLevel> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9 }}
        rowClassName={(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row') + " custom-row"}
        className="custom-table" columns={columns} dataSource={numberLevels} />
}

export default NumberLevelTable;
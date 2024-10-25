import { db } from "@/config/FirebaseConfig";
import BaseService from "@/service/BaseService";
import { NumberLevel } from "@/type/NumberLevel";
import { DatePicker, Form, Input, Select, Table, TableProps } from "antd";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { NumberLevelStatus } from "@/type/NumberLevelStatus";
import { CaretDownOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
type Props = {
    serviceId: string,
}
const ServiceNumberLevelTable = ({ serviceId }: Props) => {
    const setBgStatus = (status: string) => {
        if (status === NumberLevelStatus.WAITING) return "bg-[#4277FF]";
        if (status === NumberLevelStatus.USED) return "bg-[#7E7D88]";
        if (status === NumberLevelStatus.SKIP) return "bg-[#E73F3F]";
    }
    const columns: TableProps<NumberLevel>['columns'] = [
        {
            title: 'Số thứ tự',
            dataIndex: "number_level",
            key: 'number_level',
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: 'status',
            render: status => <div className="flex items-center"><div className={`h-2 w-2 rounded-full mr-[6.5px] ${setBgStatus(status)}`}></div><span>{status}</span></div>
        },
    ];
    const dateFormat = "DD/MM/YYYY"
    useEffect(() => {
    }, [])
    const [numberLevels, setNumberLevels] = useState<NumberLevel[]>()
    useEffect(() => {
        fetchReadAll()
    }, [])
    const fetchReadAll = () => {
        BaseService.query<NumberLevel>(query(collection(db, "number-levels"), where("service_id", "==", serviceId), orderBy("grant_time", "desc"))).then(data => {
            setNumberLevels(data)
        })
    }
    return (
        <>
            <Form layout="vertical" className="flex justify-between mb-4">
                <Form.Item label="Trạng thái">
                    <Select style={{ width: "160px" }} suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="mr-6" size="large" defaultValue={"Tất cả"} options={[{ label: "Tất cả", value: "all" }, ...Object.entries(NumberLevelStatus).map((status) => ({ label: status[1], value: status[1] }))]}></Select>
                </Form.Item>
                <div>
                    <Form.Item label="Chọn thời gian">
                        <DatePicker.RangePicker
                            defaultValue={[dayjs('01/01/2024', dateFormat), dayjs('01/01/2024', dateFormat)]}
                            format={dateFormat}
                        />
                    </Form.Item>
                </div>
                <Form.Item label="Từ khoá">
                    <Input.Search size="large" placeholder="Nhập từ khóa" style={{ width: "206px" }} />
                </Form.Item>
            </Form >
            <Table<NumberLevel> style={{ width: "1112px" }}
                bordered
                pagination={{ pageSize: 9 }}
                rowClassName={(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row') + " custom-row"}
                className="custom-table" columns={columns} dataSource={numberLevels} />
        </>
    )
}

export default ServiceNumberLevelTable;
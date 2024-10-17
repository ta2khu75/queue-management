import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { roleAction } from "@/redux/slice/roleSlice";
import { Table, TableProps } from "antd";
import Link from "next/link";
import { useEffect } from "react";

const RoleTable = () => {
    const columns: TableProps<Role>['columns'] = [
        {
            title: 'Tên vai trò',
            dataIndex: "role_name",
            key: 'id',
        },
        {
            title: 'Số người dùng',
            dataIndex: "device_name",
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: "description",
            key: 'name',
        },
        {
            key: 'update',
            dataIndex: "id",
            render: (text) => <Link href={`/manager/setting/role/edit/${text}`} className="underline text-[#4277FF] decoration-1">Cập nhật</Link>
        },
    ];
    const roleState = useAppSelector(state => state.role)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (roleState.roles.length === 0)
            dispatch(roleAction.fetchReadAll())
    }, [])
    return <Table<Device> style={{ width: "1112px" }}
        bordered
        rowClassName={(record, index) => (index % 2 !== 0 ? 'odd-row' : 'even-row')}
        className="custom-table" columns={columns} dataSource={roleState.roles} />
}

export default RoleTable
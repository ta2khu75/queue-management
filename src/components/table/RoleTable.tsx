import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { roleAction } from "@/redux/slice/roleSlice";
import { FetchStatus } from "@/type/FetchStatus";
import { Table, TableProps } from "antd";
import Link from "next/link";
import { useEffect } from "react";
type Props = {
    keyword: string
}
const RoleTable = ({ keyword }: Props) => {
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
    if (roleState.fetchStatus === FetchStatus.PENDING) {
        return <div>loading</div>
    }
    if (roleState.fetchStatus === FetchStatus.REJECTED) {
        return <div>something wrong</div>
    }
    return <Table<Device> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9 }}
        rowClassName={(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row') + " custom-row"}
        className="custom-table" columns={columns} dataSource={roleState.roles.filter(role => role.role_name?.includes(keyword))} />
}

export default RoleTable
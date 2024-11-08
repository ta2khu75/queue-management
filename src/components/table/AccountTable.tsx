import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { accountAction } from "@/redux/slice/accountSlice";
import { roleAction } from "@/redux/slice/roleSlice";
import { FetchStatus } from "@/type/FetchStatus";
import { Table, TableProps } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
type Props = {
    keyword: string
    roleId: string
}
const AccountTable = ({ keyword, roleId }: Props) => {
    const [roleMap, setRoleMap] = useState<Map<number, Role>>()
    const columns: TableProps<Account>['columns'] = [
        {
            title: 'Tên đăng nhập',
            dataIndex: "username",
            key: 'username',
        },
        {
            title: 'Họ tên',
            dataIndex: "full_name",
            key: 'full_name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: "phone_number",
            key: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: "email",
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: "role_id",
            key: 'role',
            render: (role_id) => <span>{roleMap?.get(role_id)?.role_name}</span>
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: "status",
            key: 'status',
            render: status => <div className="flex items-center"><div className={`h-2 w-2 rounded-full mr-[6.5px] ${status === "ACTIVE" ? "bg-active" : "bg-in_active"}`}></div><span>{status === "ACTIVE" ? "Hoạt động" : "Ngưng hoạt động"}</span></div>
        },
        {
            key: '',
            dataIndex: "id",
            render: (id: string) => <Link href={`/manager/setting/account/edit/${id}`} className="underline text-[#4277FF] decoration-1">Cập nhật</Link>
        },
    ];
    const roleState = useAppSelector(state => state.role)
    const accountState = useAppSelector(state => state.account)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (accountState.accounts.length === 0) {
            dispatch(accountAction.fetchReadAll())
        }
        if (roleState.roles.length === 0) {
            dispatch(roleAction.fetchReadAll())
        }
        if (roleState.roles.length > 0 && accountState.accounts.length > 0) {
            setRoleMap(roleState.roles.reduce((role, item) => {
                role.set(item.id, item);
                return role;
            }, new Map()))

        }
    }, [roleState.roles.length])
    if (accountState.fetchStatus === FetchStatus.PENDING) {
        return <div>loading</div>
    }
    if (accountState.fetchStatus === FetchStatus.REJECTED) {
        return <div>something wrong</div>
    }
    return (

        <div className="h-[546px] w-[1112px]">
            <Table<Account>
                bordered
                pagination={{ pageSize: 8, pageSizeOptions: [], showSizeChanger: false }}
                rowClassName={(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row') + " custom-row"}
                className="custom-table" columns={columns} dataSource={accountState.accounts.filter(account => account.username?.includes(keyword) && (roleId === "all" || account.role_id === roleId))} />
        </div>
    )
}

export default AccountTable
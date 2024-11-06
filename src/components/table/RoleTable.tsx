import { db } from "@/config/FirebaseConfig";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { roleAction } from "@/redux/slice/roleSlice";
import { FetchStatus } from "@/type/FetchStatus";
import { Table, TableProps } from "antd";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
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
            dataIndex: "count",
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
    const accountCollectionRef = collection(db, "accounts")
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (roleState.roles.length === 0)
            dispatch(roleAction.fetchReadAll())
        else {
            fetchCountRole()
        }
    }, [roleState.roles.length])
    const fetchCountRole = async () => {
        dispatch(roleAction.set(await Promise.all(roleState.roles.map(async role => {
            if (role.id) {
                const response = await getCountFromServer(query(accountCollectionRef, where("role_id", "==", role.id)))
                console.log(response.data().count);

                return { ...role, count: response.data().count }
            }
            return role;
        }))))
    }
    if (roleState.fetchStatus === FetchStatus.PENDING) {
        return <div>loading</div>
    }
    if (roleState.fetchStatus === FetchStatus.REJECTED) {
        return <div>something wrong</div>
    }
    return <Table<Role> style={{ width: "1112px" }}
        bordered
        pagination={{ pageSize: 9, pageSizeOptions: [], showSizeChanger: false }}
        rowClassName={(record: object, index: number) => (index % 2 !== 0 ? 'odd-row' : 'even-row') + " custom-row"}
        className="custom-table" columns={columns} dataSource={roleState.roles.filter(role => role.role_name?.includes(keyword))} />
}

export default RoleTable
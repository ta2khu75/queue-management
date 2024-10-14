"use client"
import HeaderAdmin from "@/components/HeaderAdmin";
import { db } from "@/config/FirebaseConfig";
import useNotification from "@/hook/NotificationHook";
import BaseService from "@/service/BaseService";
import { Button, Checkbox, Form, FormProps, Input } from "antd"
import { collection } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";

const Page = () => {
    const deviceCollectionRef = collection(db, "roles")
    const router = useRouter()
    const pathname = usePathname()
    const { contextHolder, openNotification } = useNotification();
    const onFinish: FormProps<Role>['onFinish'] = (values) => {
        BaseService.create(deviceCollectionRef, values).then(() => {

            openNotification('success', "Thêm thiết bị thành công");
            router.push("/manager/setting/role/list")
        }
        ).catch((err) => {
            console.log(err);
            openNotification('error', err);
        })
    };
    const groupPermissions = [
        { group: "Nhóm chức năng A", permissions: ["Tất cả", "Chức năng x", "Chức năng y", "Chức năng z"] },
        { group: "Nhóm chức năng B", permissions: ["Tất cả", "Chức năng x", "Chức năng y", "Chức năng z"] }]
    return (
        <div className="flex flex-col">
            {contextHolder}
            <HeaderAdmin paths={[{ path: "", title: "Cài đặt hệ thống" }, { path: "/manager/setting/role/list", title: "Quản lý vai trò" }, { path: pathname, title: "Thêm vai trò" }]} />
            <p className="text-2xl font-bold text-primary pt-4 pb-8">Danh sách vai trò</p>
            <Form onFinish={onFinish} layout="vertical" className="custom flex flex-col w-[1192px]" >
                <main className="flex flex-col">
                    <div className="bg-white rounded-2xl px-6 py-4" style={{ height: "550px" }}>
                        <p className="text-xl text-primary mb-4 font-bold ">Thông tin vai trò</p>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Form.Item<Role>
                                    label="Tên vai trò"
                                    name={"role_name"}
                                    rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}
                                >
                                    <Input placeholder="Nhập tên vai trò" className="mb-3" />
                                </Form.Item>
                                <Form.Item<Role>
                                    label="Mô tả:"
                                    name={"description"}
                                >
                                    <Input.TextArea placeholder="Nhập mô tả" style={{ height: "160px" }} />
                                </Form.Item>
                                <div className="mt-3">
                                    <span className="text-[#FF4747] mr-2">*</span>
                                    <span className="text-sm">Là trường thông tin bắt buộc</span>
                                </div>
                            </div>
                            <Form.Item<Role>
                                rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}
                                name={"permissions"}
                                label="Phân quyền chức năng"
                            >
                                <Checkbox.Group>
                                    <div className="w-[560px] h-[420px] px-6 py-4 bg-[#FFF2E7] rounded-lg">
                                        {groupPermissions.map((groupPermission, index) => {
                                            return (
                                                <div key={index} className="mb-6">
                                                    <p className="text-super_primary text-xl font-bold leading-[30px] mb-4">{groupPermission.group}</p>
                                                    <div className="grid grid-cols-1 gap-y-3">
                                                        {groupPermission.permissions.map((permission, indexPermission) =>
                                                            (<Checkbox key={`checkbox-permission-${index}-${indexPermission}`} value={index + permission}>{permission}</Checkbox>)
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>
                        </div>
                    </div>
                </main >
                <div className="flex justify-center items-center mt-6">
                    <Button className="h-12 mr-4" onClick={() => router.push("/manager/device/list")} style={{ width: "147px" }}>Hủy bỏ</Button>
                    <Button className="h-12 ml-4" htmlType="submit" type="primary" style={{ width: "147px" }}>Thêm</Button>
                </div>
            </Form>
        </div >
    )
}

export default Page
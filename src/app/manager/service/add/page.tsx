"use client"
import { AvatarInfoElement } from "@/components/element/AvatarInfoElement";
import { db } from "@/config/FirebaseConfig";
import useNotification from "@/hook/NotificationHook";
import BaseService from "@/service/BaseService";
import { Breadcrumb, Button, Checkbox, Form, FormProps, Input, Select } from "antd"
import { collection } from "firebase/firestore";
import Link from "next/link"
import { useRouter } from "next/navigation";

const page = () => {
    const deviceCollectionRef = collection(db, "devices")
    const router = useRouter()
    const { contextHolder, openNotification } = useNotification();
    const onFinish: FormProps<Service>['onFinish'] = (values) => {
        console.log(values);
        BaseService.create(deviceCollectionRef, values).then(() => {
            openNotification('success', "Thêm thiết bị thành công");
            router.push("/manager/device/list")
        }
        ).catch((err) => {
            console.log(err);
            openNotification('error', err);
        })
    };
    return (
        <div className="flex flex-col">
            {contextHolder}
            <header className="flex justify-between items-center" style={{ height: "88px" }} >
                <Breadcrumb
                    separator=">"
                    className="text-xl font-bold"
                    items={[
                        {
                            title: 'Dịch vụ',
                        },
                        {
                            title: <Link href="/manager/device/list">Danh sách dịch vụ</Link>,
                        },
                        {
                            title: <Link href="/manager/device/add"> <span className="text-primary">Thêm dịch vụ</span></Link>,
                        }
                    ]}
                />
                <AvatarInfoElement />
            </header>
            <Form onFinish={onFinish} layout="vertical" className="flex flex-col">
                <main className="flex flex-col">
                    <p className="text-2xl font-bold text-primary">Quản lý dịch vụ</p>
                    <div className="bg-white rounded-2xl py-4 px-6 mt-4" style={{ height: "550px" }}>
                        <p className="text-xl text-primary mb-4 font-bold ">Thông tin dịch vụ</p>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <Form.Item<Service> className="mb-0"
                                    label="Mã dịch vụ:"
                                    name={"service_id"}
                                    rules={[{ required: true, message: 'Vui lòng nhập mã dịch vụ' }]}
                                >
                                    <Input size="large" placeholder="201" />
                                </Form.Item>
                                <Form.Item<Service> className="mb-0"
                                    label="Tên dịch vụ:"
                                    name={"service_name"}
                                    rules={[{ required: true, message: 'Vui lòng nhập loại thiết bị' }]}
                                >
                                    <Input size="large" placeholder="Khám tim mạch" />
                                </Form.Item>
                            </div>
                            <Form.Item<Service>
                                className="mb-0"
                                label="Mô tả:"
                                name={"description"}
                                rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị' }]}
                            >
                                <Input.TextArea size="large" rows={4} placeholder="Mô tả dịch vụ" />
                            </Form.Item>
                            <div className="flex">
                                <span className="text-red-600 mr-1">*</span>
                                <p className="text-sm">Là trường thông tin bắt buộc</p>
                            </div>
                        </div>
                        <p className="text-xl text-primary mb-4 font-bold ">Thông tin dịch vụ</p>
                        <div>
                            <Checkbox.Group options={[{label:"Tăng tự động từ:", value:"tang"},{label:"Prefix:", value:"Prefix:"},{label:"Surfix:", value:"Surfix:"},{label:"Reset mỗi ngày",value:"Reset mỗi ngày"}]}>
                                
                            </Checkbox.Group>
                        </div>
                    </div>
                </main >
                <div className="flex justify-center items-center mt-10">
                    <Button className="h-12 mr-4" onClick={() => router.push("/manager/device/list")} style={{ width: "147px" }}>Hủy bỏ</Button>
                    <Button className="h-12 ml-4" htmlType="submit" type="primary" style={{ width: "147px" }}>Thêm thiết bị</Button>
                </div>
            </Form>
        </div >
    )
}

export default page
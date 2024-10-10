"use client"
import { AvatarInfoElement } from "@/components/element/AvatarInfoElement"
import { db } from "@/config/FirebaseConfig"
import useNotification from "@/hook/NotificationHook"
import BaseService from "@/service/BaseService"
import { Breadcrumb, Form, FormProps, Input, Select } from "antd"
import { collection } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const page = ({ params }: { params: { id: string } }) => {
    const [form] = Form.useForm<Device>()
    const deviceCollectionRef = collection(db, "devices")
    const { contextHolder, openNotification } = useNotification();
    const router = useRouter()
    useEffect(() => {
        if (params.id)
            fetchDeviceById(params.id)
    }, [params.id])
    const fetchDeviceById = async (deviceId: string) => {
        const device = await BaseService.getById<Device>(deviceCollectionRef, deviceId)
        if (device) { form.setFieldsValue(device); console.log(device); }

    }
    const onFinish: FormProps<Device>['onFinish'] = (values) => {
        BaseService.update(deviceCollectionRef, params.id, values).then(() => {
            openNotification('success', "Cập nhật thiết bị thành công");
            router.push("/manager/device/list");
        }).catch((error) => {
            console.log(error);
            openNotification('error', "Cập nhập thiết bị thất bại")
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
                            title: 'Thiết bị',
                        },
                        {
                            title: <Link href="/manager/device/list">Danh sách thiết bị</Link>,
                        },
                        {
                            title: <Link href={`/manager/device/edit/${params.id}`}> <span className="text-primary">Cập nhập thiết bị</span></Link>,
                        }
                    ]}
                />
                <AvatarInfoElement />
            </header>
            <Form onFinish={onFinish} form={form} layout="vertical" className="flex flex-col">
                <main className="flex flex-col flex-none">
                    <p className="text-2xl font-bold text-primary">Quản lý thiết bị</p>
                    <div className="bg-white rounded-2xl py-4 px-6 mt-4" style={{ height: "550px" }}>
                        <p className="text-xl text-primary mb-4 font-bold ">Thông tin thiết bị</p>
                        <div className="grid grid-cols-2 gap-5">
                            <Form.Item<Device> className="mb-0"
                                label="Mã thiết bị:"
                                name={"device_id"}
                                rules={[{ required: true, message: 'Vui lòng nhập mã thiết bị' }]}
                            >
                                <Input size="large" placeholder="Nhập mã thiết bị" />
                            </Form.Item>
                            <Form.Item<Device> className="mb-0"
                                label="Loại thiết bị:"
                                name={"device_category"}
                                rules={[{ required: true, message: 'Vui lòng nhập loại thiết bị' }]}
                            >
                                <Select size="large" className="custom-select" placeholder="Chọn loại thiết bị" options={[{ value: 'Kiosk', label: <span>Kiosk</span> }, { value: "Display counter", label: <span>Display counter</span> }]} />
                            </Form.Item>
                            <Form.Item<Device>
                                className="mb-0"
                                label="Tên thiết bị:"
                                name={"device_name"}
                                rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị' }]}
                            >
                                <Input size="large" placeholder="Nhập tên thiết bị" />
                            </Form.Item>
                            <Form.Item<Device>
                                className="mb-0"
                                label="Tên đăng nhập:"
                                name={"username"}
                                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                            >
                                <Input size="large" placeholder="Nhập tài khoản" />
                            </Form.Item>
                            <Form.Item<Device>
                                className="mb-0"
                                name={"address_ip"}
                                label="Địa chỉ IP:"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ IP' }]}
                            >
                                <Input size="large" placeholder="Nhập địa chỉ IP" />
                            </Form.Item>
                            <Form.Item<Device>
                                className="mb-0"
                                name={'password'}
                                label="Mật khẩu:"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                            >
                                <Input size="large" placeholder="Nhập mật khẩu" />
                            </Form.Item>
                            <Form.Item<Device>
                                className="col-span-2 mb-0"
                                label="Dịch vụ sử dụng:"
                                name={"service"}
                                rules={[{ required: true, message: 'Vui lòng nhập dịch vụ sử dụng' }]}
                            >
                                <Input size="large" placeholder="Nhập dịch vụ sử dụng" />
                            </Form.Item>
                        </div>
                    </div>
                </main>
                <div className="flex justify-center items-center mt-9">
                    <button className="text-base border-primary mr-4 text-primary border rounded-lg bg-[#FFF2E7] h-12" style={{ width: '147px' }}>Hủy bỏ</button>
                    <button type="submit" className="text-base bg-primary ml-4 text-white h-12 rounded-lg" style={{ width: "147px" }}>Cập nhật</button>
                </div>
            </Form>
        </div>
    )
}

export default page
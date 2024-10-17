"use client"
import { AvatarInfoElement } from "@/components/element/AvatarInfoElement"
import { db } from "@/config/FirebaseConfig"
import useNotification from "@/hook/NotificationHook"
import BaseService from "@/service/BaseService"
import { Breadcrumb, Button, Form, FormProps, Input, Select } from "antd"
import { collection } from "firebase/firestore"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CaretDownOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { FetchStatus } from "@/type/FetchStatus"
import { deviceAction } from "@/redux/slice/deviceSlice"
import HeaderAdmin from "@/components/HeaderAdmin"

const Page = ({ params }: { params: { id: string } }) => {
    const [form] = Form.useForm<Device>()
    const dispatch = useAppDispatch()
    const deviceState = useAppSelector(state => state.device)
    const deviceCollectionRef = collection(db, "devices")
    const [fetchStatus, setFetchStatus] = useState(FetchStatus.IDLE)
    const { contextHolder, openNotification } = useNotification();
    const pathname = usePathname()
    const router = useRouter()
    useEffect(() => {
        if (deviceState.devices.length === 0)
            fetchDeviceById()
        else {
            const device = deviceState.devices.find((d) => d.id === params.id)
            if (device) form.setFieldsValue(device);
        }
    }, [params.id])
    useEffect(() => {
        if (fetchStatus !== FetchStatus.IDLE) {
            if (deviceState.fetchStatus === FetchStatus.REJECTED) {
                openNotification('error', "Cập nhật thiết bị thất bại");
            } else if (deviceState.fetchStatus === FetchStatus.FULFILLED) {
                openNotification('success', "Cập nhật thiết bị thành công");
                router.push("/manager/device");
            }
        }
    }, [deviceState.fetchStatus])
    const fetchDeviceById = async () => {
        const device = await BaseService.readById<Device>(deviceCollectionRef, params.id)
        if (device) { form.setFieldsValue(device); console.log(device); }

    }
    const onFinish: FormProps<Device>['onFinish'] = (values) => {
        setFetchStatus(FetchStatus.PENDING)
        dispatch(deviceAction.fetchUpdate({ id: params.id, device: values }))
    };
    return (
        <div className="flex flex-col">
            {contextHolder}
            <HeaderAdmin paths={[{ path: "", title: "Thiết bị" }, { path: "/manager/device", title: 'Danh sách thiết bị' }, { path: pathname, title: "Cập nhật thiết bị" }]} />
            <h6 className="my-4">Quản lý thiết bị</h6>
            <Form onFinish={onFinish} form={form} layout="vertical" className="flex flex-col">
                <div className="bg-white rounded-2xl py-4 px-6" style={{ height: "550px", width: "1152px" }}>
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
                            <Select size="large" suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} className="custom-select" placeholder="Chọn loại thiết bị" options={[{ value: 'Kiosk', label: <span>Kiosk</span> }, { value: "Display counter", label: <span>Display counter</span> }]} />
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
                <div className="flex justify-center items-center mt-6">
                    <Button className="h-12 mr-4" onClick={() => router.push("/manager/device/list")} style={{ width: "115px" }}>Hủy bỏ</Button>
                    <Button className="h-12 ml-4" htmlType="submit" type="primary" style={{ width: "115px" }}>Cập nhật</Button>
                </div>
            </Form>
        </div>
    )
}

export default Page
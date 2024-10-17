"use client"
import HeaderAdmin from "@/components/HeaderAdmin";
import useNotification from "@/hook/NotificationHook";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { deviceAction } from "@/redux/slice/deviceSlice";
import { FetchStatus } from "@/type/FetchStatus";
import { Button, Form, FormProps, Input, Select } from "antd"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const deviceFetchState = useAppSelector(state => state.device.fetchStatus)
    const dispatch = useAppDispatch()
    const [fetchStatus, setFetchStatus] = useState(FetchStatus.IDLE);
    const router = useRouter()
    const pathname = usePathname()
    const { contextHolder, openNotification } = useNotification();
    const onFinish: FormProps<Account>['onFinish'] = (values) => {
        setFetchStatus(FetchStatus.PENDING)
        dispatch(deviceAction.fetchCreate(values))
    };
    useEffect(() => {
        if (fetchStatus !== FetchStatus.IDLE) {
            if (deviceFetchState === FetchStatus.REJECTED) {
                openNotification('error', "Thêm thiết bị thất bại");
            } else if (deviceFetchState === FetchStatus.FULFILLED) {
                openNotification('success', "Thêm thiết bị thành công");
                router.push("/manager/device");
            }
        }
    }, [deviceFetchState])
    return (
        <div className="flex flex-col">
            {contextHolder}
            <HeaderAdmin paths={[{ path: "", title: "Thiết bị" }, { path: "/manager/device", title: "Danh sách thiết bị" }, { path: pathname, title: "Thêm thiết bị" }]} />
            <p className="text-2xl font-bold text-primary py-4">Quản lý thiết bị</p>
            <Form onFinish={onFinish} layout="vertical" className="flex flex-col w-[1152px]" >
                <main className="flex flex-col">
                    <div className="bg-white rounded-2xl px-6 py-4" style={{ height: "550px" }}>
                        <p className="text-xl text-primary mb-4 font-bold ">Thông tin thiết bị</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
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
                            <div className="flex">
                                <span className="text-red-600 mr-1">*</span>
                                <p className="text-sm">Là trường thông tin bắt buộc</p>
                            </div>
                        </div>
                    </div>
                </main >
                <div className="flex justify-center items-center mt-6">
                    <Button className="h-12 mr-4" onClick={() => router.push("/manager/device")} style={{ width: "147px" }}>Hủy bỏ</Button>
                    <Button className="h-12 ml-4" htmlType="submit" type="primary" style={{ width: "147px" }}>Thêm thiết bị</Button>
                </div>
            </Form>
        </div >
    )
}

export default Page
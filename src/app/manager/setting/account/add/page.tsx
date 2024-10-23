"use client"
import HeaderAdmin from "@/components/HeaderAdmin";
import useNotification from "@/hook/NotificationHook";
import { Button, Form, FormProps, Input, Select } from "antd"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { FetchStatus } from "@/type/FetchStatus";
import { roleAction } from "@/redux/slice/roleSlice";
import { accountAction } from "@/redux/slice/accountSlice";
import { Status } from "@/type/Status";
const Page = () => {
    const dispatch = useAppDispatch()
    const roles = useAppSelector(state => state.role.roles)
    const accountFetchStatus = useAppSelector(state => state.account.fetchStatus)
    const [fetchStatus, setFetchStatus] = useState(FetchStatus.IDLE)
    const router = useRouter()
    const pathname = usePathname()
    const { contextHolder, openNotification } = useNotification();
    useEffect(() => {
        if (roles.length === 0) {
            dispatch(roleAction.fetchReadAll())
        }
    }, [])
    useEffect(() => {
        if (FetchStatus.IDLE !== fetchStatus) {
            if (accountFetchStatus === FetchStatus.FULFILLED) {
                router.push("/manager/setting/account")
                openNotification("success", "Thêm tài khoản thành công")
            }
            else if (accountFetchStatus === FetchStatus.REJECTED) {
                openNotification('error', "Thêm tài khoản thất bại");
            }
        }
    }, [accountFetchStatus])
    const onFinish: FormProps<Device>['onFinish'] = (values) => {
        setFetchStatus(FetchStatus.PENDING)
        dispatch(accountAction.fetchCreate(values))
    };
    return (
        <div className="flex flex-col">
            {contextHolder}
            <HeaderAdmin paths={[{ path: "", title: "Cài đặt hệ thống" }, { path: "/manager/setting/account", title: "Quản lý tài khoản" }, { path: pathname, title: "Thêm tài khoản" }]} />
            <h6 className="mt-4 mb-[10px]">Quản lý tài khoản</h6>
            <Form<Account> onFinish={onFinish} initialValues={{ "status": "ACTIVE" }} layout="vertical" className="flex flex-col w-[1192px] custom" >
                <main className="flex flex-col">
                    <div className="bg-white rounded-2xl px-6 py-4" style={{ height: "534px" }}>
                        <p className="text-xl text-primary mb-4 font-bold ">Thông tin tài khoản</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                            <Form.Item<Account> className="mb-0"
                                label="Họ tên"
                                name={"full_name"}
                                rules={[{ required: true, message: 'Vui lòng họ tên' }]}
                            >
                                <Input size="large" placeholder="Nhập họ tên" />
                            </Form.Item>
                            <Form.Item<Account> className="mb-0"
                                label="Tên đăng nhập:"
                                name={"username"}
                                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                            >
                                <Input size="large" placeholder="Nhập tên đăng nhập" />
                            </Form.Item>
                            <Form.Item<Account>
                                label="Số điện thoại"
                                name={"phone_number"}
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            >
                                <Input size="large" placeholder="Nhập số điện thoại" />
                            </Form.Item>
                            <Form.Item<Account>
                                label="Mật khẩu:"
                                name={"password"}
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu" />
                            </Form.Item>
                            <Form.Item<Account>
                                label="Email"
                                name={"email"}
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ IP' }]}
                            >
                                <Input placeholder="Nhập địa chỉ IP" />
                            </Form.Item>
                            <Form.Item<Account>
                                label="Nhập lại mật khẩu"
                                name={"confirm_password"}
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: "Vui lòng lại nhập mật khẩu" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Nhập lại mật khẩu" />
                            </Form.Item>
                            <Form.Item<Account>
                                label="Vai trò"
                                name={'role_id'}
                                rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                            >
                                <Select className="custom-select" placeholder="Chọn vai trò" suffixIcon={<CaretDownOutlined />} options={roles.map((role) => ({ value: role.id, label: role.role_name }))} />
                            </Form.Item>
                            <Form.Item<Account>
                                label="Tình trạng"
                                name={'status'}
                                rules={[{ required: true, message: 'Vui lòng chọn tình trạng' }]}
                            >
                                <Select className="custom-select" placeholder="Chọn loại thiết bị" suffixIcon={<CaretDownOutlined />} options={Object.entries(Status).map(entry => ({ label: entry[1], value: entry[0] }))} />
                            </Form.Item>
                            <div className="flex">
                                <span className="text-red-600 mr-1">*</span>
                                <p className="text-sm">Là trường thông tin bắt buộc</p>
                            </div>
                        </div>
                    </div>
                </main >
                <div className="flex justify-center items-center mt-[48px]">
                    <Button className="h-12 mr-4" onClick={() => router.push("/manager/setting/account")} style={{ width: "147px" }}>Hủy bỏ</Button>
                    <Button className="h-12 ml-4" htmlType="submit" type="primary" style={{ width: "147px" }}>Thêm</Button>
                </div>
            </Form>
        </div >
    )
}

export default Page
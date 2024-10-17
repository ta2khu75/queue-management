"use client"
import InputServiceElement from "@/components/element/InputServiceElement";
import HeaderAdmin from "@/components/HeaderAdmin";
import { db } from "@/config/FirebaseConfig";
import useNotification from "@/hook/NotificationHook";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { serviceAction } from "@/redux/slice/serviceClice";
import BaseService from "@/service/BaseService";
import { FetchStatus } from "@/type/FetchStatus";
import { Button, Checkbox, Form, FormProps, Input } from "antd"
import { collection } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
    const deviceCollectionRef = collection(db, "services")
    const serviceState = useAppSelector(state => state.service)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [fetchStatus, setFetchStatus] = useState(FetchStatus.IDLE)
    const pathname = usePathname()
    const { contextHolder, openNotification } = useNotification();
    const [form] = Form.useForm<Service>()
    const onFinish: FormProps<Service>['onFinish'] = (values) => {
        setFetchStatus(FetchStatus.PENDING)
        dispatch(serviceAction.fetchUpdate({ id: params.id, service: values }))
    };
    useEffect(() => {
        if (serviceState.services.length === 0) {
            fetchServiceById()
        } else {
            const service = serviceState.services.find((s) => s.id === params.id)
            if (service !== undefined) form.setFieldsValue(service)
        }
    }, [params.id])
    useEffect(() => {
        if (FetchStatus.IDLE !== fetchStatus) {
            if (serviceState.fetchStatus === FetchStatus.REJECTED) {
                openNotification('error', "Cập nhật dịch vụ thất bại");
            } else if (serviceState.fetchStatus === FetchStatus.FULFILLED) {
                openNotification('success', "Cập nhật dịch vụ thành công");
                router.push("/manager/service")
            }
        }
    }, [serviceState.fetchStatus])
    const fetchServiceById = () => {
        BaseService.readById(deviceCollectionRef, params.id).then((response) => {
            if (response) form.setFieldsValue(response)
        }).catch((err) => console.log(err))
    }
    return (
        <div className="flex flex-col">
            {contextHolder}
            <HeaderAdmin paths={[{ path: "", title: "Dịch vụ" }, { path: "/manager/service", title: "Danh sách dịch vụ" }, { path: pathname, title: "Thêm dịch vụ" }]} />
            <h6 className="mb-8 mt-4">Quản lý dịch vụ</h6>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <div className="flex flex-col h-[534px] w-[1178px] bg-white py-4 rounded-2xl px-6">
                    <p className="text-xl text-primary mb-3 font-bold ">Thông tin dịch vụ</p>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Form.Item<Service>
                                label="Mã dịch vụ:"
                                name={"service_id"}
                                rules={[{ required: true, message: 'Vui lòng nhập mã dịch vụ' }]}
                            >
                                <Input size="large" placeholder="201" />
                            </Form.Item>
                            <Form.Item<Service>
                                label="Tên dịch vụ:"
                                name={"service_name"}
                                rules={[{ required: true, message: 'Vui lòng nhập loại thiết bị' }]}
                            >
                                <Input size="large" placeholder="Khám tim mạch" />
                            </Form.Item>
                        </div>
                        <Form.Item<Service>
                            label="Mô tả:"
                            name={"description"}
                        >
                            <Input.TextArea size="large" rows={4} placeholder="Mô tả dịch vụ" />
                        </Form.Item>
                        <div>
                            <p className="text-xl text-primary mb-4 font-bold ">Quy tắc cấp số</p>
                            <Form.Item<Service> name={"number_rules"}>
                                <Checkbox.Group className="grid grid-cols-1 gap-y-3 mb-[22px]">
                                    <Checkbox value={"auto"} className="flex"><div className="flex items-center"><div className="mr-[15px]">Tăng tự động từ:</div><InputServiceElement value={"0001"} /> <span className="ml-[10px] mr-3">đến</span> <InputServiceElement value="9999" /></div></Checkbox>
                                    <Checkbox value={"prefix"} className="flex"><div className="flex items-center"><div className="w-[120px] mr-[15px]">Prefix:</div><InputServiceElement value={"0001"} /></div></Checkbox>
                                    <Checkbox value={"surfix"} className="flex"><div className="flex items-center"><div className="w-[120px] mr-[15px]">Surfix:</div><InputServiceElement value={"0001"} /></div></Checkbox>
                                    <Checkbox value={"reset"} className="flex">Reset mỗi ngày</Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                            <div className="flex">
                                <span className="text-red-600 mr-1">*</span>
                                <p className="text-sm">Là trường thông tin bắt buộc</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <Button className="h-12 mr-4" onClick={() => router.push("/manager/service")} style={{ width: "147px" }}>Hủy bỏ</Button>
                    <Button className="h-12 ml-4" htmlType="submit" type="primary" style={{ width: "147px" }}>Cập nhật</Button>
                </div>
            </Form>
        </div >
    )
}

export default Page
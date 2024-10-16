"use client"
import HeaderAdmin from "@/components/HeaderAdmin";
import { db } from "@/config/FirebaseConfig";
import useNotification from "@/hook/NotificationHook";
import BaseService from "@/service/BaseService";
import { Button, Form, FormProps, Select } from "antd"
import { collection } from "firebase/firestore";
import { CaretDownOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModalElement from "@/components/element/ModalElement";

const Page = () => {
    const deviceCollectionRef = collection(db, "services")
    const [open, setOpen] = useState(false);
    const [services, setServices] = useState<Service[]>([])
    const router = useRouter()
    const pathname = usePathname()
    const { contextHolder, openNotification } = useNotification();
    const onFinish: FormProps<Account>['onFinish'] = (values) => {
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
    const fetchAllServices = () => {
        BaseService.getAll(deviceCollectionRef).then((response) => {
            setServices(response)
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        fetchAllServices()
    }, [])
    return (
        <div className="flex flex-col">
            {contextHolder}
            <HeaderAdmin paths={[{ path: "", title: "Cấp số" }, { path: "/manager/device/list", title: "Danh sách cấp số" }, { path: pathname, title: "Cấp số mới" }]} />
            <p className="text-2xl font-bold text-primary pt-4 pb-6">Quản lý cấp số</p>
            <Form onFinish={onFinish} layout="vertical" className=" text-center w-[1192px] h-[604px] bg-white rounded-2xl" >
                {/* <div className="w-[400px] flex flex-col items-center"> */}
                <div className="text-[32px] text-super_primary font-bold leading-8 mt-6 mb-5">CẤP SỐ MỚI</div>
                <div className="font-bold text-xl leading-[30px] mb-3 text-[#535261]">Dịch vụ khách hàng lựa chọn</div>
                <div className="flex justify-center mb-20">
                    <Form.Item className="w-[400px]">
                        <Select placeholder="Chọn dịch vụ" options={services.map(service => ({ label: service.service_name, value: service.service_id }))} suffixIcon={<CaretDownOutlined />} />
                    </Form.Item>
                </div>
                <div className="flex justify-center">
                    <Button className="mr-8 w-[115px] h-12 ">Hủy bỏ</Button><Button onClick={() => setOpen(true)} className="h-12 w-[115px]" type="primary">In số</Button>
                </div>
            </Form >
            <ModalElement open={open} handleCancel={() => setOpen(false)}>
                <div className={`w-[469px] h-[385px] rounded-3xl bg-white relative`}>
                    <div className="absolute top-[22px] right-[22px]">
                        <button className="text-primary font-bold">X</button>
                    </div>
                    <div className="flex flex-col items-center mt-12">
                        <h4 className="font-bold text-[32px] leading-[48px] mb-6">Số thứ tự được cấp</h4>
                        <h3 className="text-super_primary text-[56px] leading-[60px] font-extrabold mb-6">2001201</h3>
                        <p className="text-[18px] leading-[27px] mb-[44px]">DV: Khám răng hàm mặt <b>(tại quầy số 1)</b></p>
                    </div>
                    <div className="bg-primary h-[110px] rounded-b-3xl flex flex-col items-center justify-center">
                        <div className="text-[22px] font-bold leading-[33px] text-white mb-3"><span className="w-[143px] h-[33px] mr-2">Thời gian cấp:</span><span>09:30 11/10/2021</span></div>
                        <div className="text-[22px] font-bold leading-[33px] text-white"><span className="w-[143px] h-[33px] mr-2">Hạn sử dụng:</span><span>09:30 11/10/2021</span></div>
                    </div>
                </div>
            </ModalElement>
        </div >
    )
}
export default Page
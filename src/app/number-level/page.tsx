"use client"
import { Button, Form, FormProps, Input, Modal, Select } from "antd"
import { CaretDownOutlined } from "@ant-design/icons"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { serviceAction } from "@/redux/slice/serviceClice";
import { NumberLevel } from "@/type/NumberLevel";
import { NumberRule } from "@/type/NumberRule";
import BaseService from "@/service/BaseService";
import { collection, limit, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { NumberLevelStatus } from "@/type/NumberLevelStatus";
import dayjs from "dayjs"
import { HashUtil } from "@/app/util/HashUtil";
import HeaderUser from "@/components/HeaderUser";
const Page = () => {
    const dispatch = useAppDispatch()
    const collectionRef = collection(db, "number-levels")
    const services = useAppSelector(state => state.service.services)
    const account = useAppSelector(state => state.auth.account)
    const [service, setService] = useState<Service>()
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [numberLevel, setNumberLevel] = useState<NumberLevel>()
    const pathname = usePathname()
    const [from, setFrom] = useState<string | undefined>()
    const [to, setTo] = useState<string | undefined>()
    const [prefix, setPrefix] = useState<string | undefined>()
    const [surfix, setSurfix] = useState<string | undefined>()
    const [reset, setReset] = useState(false)
    useEffect(() => {
        if (services.length === 0) {
            dispatch(serviceAction.fetchReadAll())
        }
    }, [])
    useEffect(() => {
        if (numberLevel) {
            setOpen(true)
        }
    }, [numberLevel])
    const onFinish: FormProps<NumberLevel>['onFinish'] = async (values) => {
        if (service) {
            setOpenForm(false)
            console.log(from, to, prefix, surfix, reset ? "true" : "false");
            let numberLevel = ""
            let number = ""
            const dataQuery = await BaseService.query<NumberLevel>(query(collectionRef, where("service_id", "==", service.id), orderBy("grant_time", "desc"), limit(1)))
            if (reset) {
                if (dataQuery.length > 0 && dataQuery?.[0]?.grant_time instanceof Timestamp && dayjs(new Date(dataQuery[0].grant_time.toMillis())).format("HH:mm DD/MM/YYYY").includes(dayjs().format("DD/MM/YYYY"))) {
                    let numberParse = parseInt(dataQuery[0].number, 10);
                    numberParse++
                    number = numberParse.toString()
                } else {
                    number = from ?? "1"
                }
            }
            if (from && to) {
                if (reset) {
                    const numberParse = number.padStart(to.length, "0")
                    number = numberParse
                }
                else {
                    if (dataQuery.length > 0) {
                        const numberNotReset = dataQuery[0].number;
                        let numberParse = parseInt(numberNotReset);
                        numberParse++
                        number = numberParse.toString().padStart(to.length, "0")
                    } else {
                        number = from
                    }
                } if (number === to) {
                    number = from
                }
            }
            if (!number) {
                if (dataQuery.length > 0) {
                    const numberNotReset = dataQuery[0].number;
                    let numberParse = parseInt(numberNotReset);
                    numberParse++
                    number = numberParse.toString();
                } else {
                    number = "1"
                }
            }
            numberLevel = number
            if (prefix) {
                console.log(prefix);

                numberLevel = `${prefix}${numberLevel}`
            }
            if (surfix) {
                console.log(surfix);

                numberLevel = `${numberLevel}${surfix}`
            }
            console.log("number-level", numberLevel, number);
            BaseService.create<NumberLevel>(collectionRef, { account_id: account?.id ?? "", expiry: HashUtil.hour(), status: NumberLevelStatus.WAITING, service_id: service.id, grant_time: new Date(), number_level: numberLevel, number, email: values.email ?? "", fullName: values.fullName, phoneNumber: values.phoneNumber, supply: "Hệ thống" }).then(data => {
                console.log(data);
                setNumberLevel(data)
            }).catch(error => {
                console.log(error);
                throw error;
            })
        }
    };
    const setNumberRulerService = (service: Service) => {
        const number_rules = [...service.number_rules ?? []]
        console.log(number_rules);
        number_rules?.map((number_rule, index) => {
            if (number_rule.includes(NumberRule.AUTO)) {
                const [rule, from, to] = number_rule.split(" ").slice(-3)
                setFrom(from)
                setTo(to)
                number_rules[index] = rule;
            } else if (number_rule.includes(NumberRule.PREFIX)) {
                const [rule, prefix] = number_rule.split(" ").slice(-2)
                setPrefix(prefix)
                number_rules[index] = rule;
            } else if (number_rule.includes(NumberRule.SURFIX)) {
                const [rule, surfix] = number_rule.split(" ").slice(-2)
                setSurfix(surfix)
                number_rules[index] = rule;
            } else if (number_rule.includes(NumberRule.RESET)) {
                setReset(true)
            }
        })
        service.number_rules = number_rules;
        return service;
    }
    const handleSelectChange = (id: string) => {
        const data = services.find(service => service.id === id);
        if (data) {
            setReset(false)
            setPrefix(undefined)
            setSurfix(undefined)
            setFrom(undefined)
            setTo(undefined)
            setService(data)
            setService(data)
            setNumberRulerService({ ...data })
        }
    }
    return (
        <div className="flex flex-col">
            <HeaderUser paths={[{ path: "", title: "Cấp số" }, { path: "/manager/number-level", title: "Danh sách cấp số" }, { path: pathname, title: "Cấp số mới" }]} />
            <p className="text-2xl font-bold text-primary pt-4 pb-6">Quản lý cấp số</p>
            <Form onFinish={() => setOpenForm(true)} layout="vertical" className=" text-center w-[1192px] h-[604px] bg-white rounded-2xl" >
                <div className="text-[32px] text-super_primary font-bold leading-8 mt-6 mb-5">CẤP SỐ MỚI</div>
                <div className="font-bold text-xl leading-[30px] mb-3 text-[#535261]">Dịch vụ khách hàng lựa chọn</div>
                <div className="flex justify-center mb-20">
                    <Form.Item<NumberLevel> name={"service_id"} className="w-[400px]">
                        <Select onChange={(e: string) => handleSelectChange(e)} placeholder="Chọn dịch vụ" options={services.map(service => ({ label: service.service_name, value: service.id }))} suffixIcon={<CaretDownOutlined />} />
                    </Form.Item>
                </div>
                <div className="flex justify-center">
                    <Button className="mr-8 w-[115px] h-12 ">Hủy bỏ</Button><Button htmlType="submit" className="h-12 w-[115px]" type="primary">In số</Button>
                </div>
            </Form >
            <Modal open={openForm} footer={[]} styles={{ content: { paddingTop: '32px', paddingBottom: "28px", paddingLeft: "36px", paddingRight: "36px" } }}
                width={571} height={510} closable={false} >
                <div className="text-2xl leading-9 font-bold text-super_primary text-center mb-[50px]">Điền thông tin của bạn</div>
                <Form onFinish={onFinish} layout="vertical">
                    <div className="grid grid-cols-1 gap-y-4 mb-[10px]">
                        <Form.Item<NumberLevel> name={"fullName"} label={"Họ và tên"}
                            rules={[{ required: true, message: 'Chọn dịch vụ sử dụng' }]}
                        >
                            <Input placeholder="Nhập họ và tên của bạn" />
                        </Form.Item>
                        <Form.Item<NumberLevel> name={"phoneNumber"} label={"Số điện thoại"}
                            rules={[{ required: true, message: 'Chọn dịch vụ sử dụng' }]}
                        >
                            <Input placeholder="Nhập số điện thoại của bạn" />
                        </Form.Item>
                        <Form.Item<NumberLevel> name={"email"} label={"Email"}>
                            <Input placeholder="Nhập email của bạn" />
                        </Form.Item>
                    </div>
                    <div className="flex mb-[49px]">
                        <span className="text-red-600 mr-1">*</span>
                        <p className="text-sm">Là trường thông tin bắt buộc</p>
                    </div>
                    <div className="flex justify-center">
                        <Button className="py-6 px-6 text-base mr-4" onClick={() => setOpenForm(false)}>Hủy bỏ</Button><Button htmlType="submit" className="py-6 px-6 text-base" type="primary">Xác nhận</Button>
                    </div>
                </Form>
            </Modal>
            {numberLevel && <Modal styles={{ content: { padding: "0px", width: "469px", borderRadius: "24px" } }} open={open} footer={[]} onCancel={() => setOpen(false)}>
                <div className="bg-white w-[469px] h-[385px] rounded-3xl">
                    <div className="h-[48px]">
                    </div>
                    <div className="flex flex-col items-center">
                        <h4 className="font-bold text-[32px] leading-[48px] mb-6">Số thứ tự được cấp</h4>
                        <h3 className="text-super_primary text-[56px] leading-[60px] font-extrabold mb-6">{numberLevel.number_level}</h3>
                        <p className="text-[18px] leading-[27px] mb-[44px]">DV: {service?.service_name} <b>(tại quầy số 1)</b></p>
                    </div>
                    <div className="bg-primary h-[110px] rounded-b-3xl flex flex-col items-center justify-center">
                        {numberLevel.grant_time && numberLevel.grant_time instanceof Timestamp &&
                            < div className="text-[22px] font-bold leading-[33px] text-white mb-3"><span className="w-[143px] h-[33px] mr-2">Thời gian cấp:</span><span>{dayjs(new Date(numberLevel.grant_time.toMillis())).format("HH:mm DD/MM/YYYY")}</span></div>
                        }{
                            numberLevel.expiry && numberLevel.expiry instanceof Timestamp &&
                            <div className="text-[22px] font-bold leading-[33px] text-white"><span className="w-[143px] h-[33px] mr-2">Hạn sử dụng:</span><span>{dayjs(new Date(numberLevel.expiry.toMillis())).format("HH:mm DD/MM/YYYY")}</span></div>
                        }
                    </div>
                </div>
            </Modal>}
        </div >
    )
}
export default Page
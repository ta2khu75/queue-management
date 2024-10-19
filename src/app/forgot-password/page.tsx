"use client"
import { Button, Form, Input } from "antd"
import { AuthPage } from "@/components/AuthPage"
import { useRouter } from "next/navigation"
const Page = () => {
    const router = useRouter()
    return (
        <AuthPage image={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/forgot.png?alt=media"} >
            <Form layout='vertical' className="auth" style={{ width: "400px" }}>
                <p className="text-[22px] font-bold text-center leading-[33px] mb-4">Đặt lại mật khẩu</p>
                <Form.Item label={<span className="text-[17px]">Vui lòng nhập email để đặt lại mật khẩu của bạn *</span>}>
                    <Input />
                </Form.Item>
                <div className="flex justify-around mt-12">
                    <Button onClick={() => router.push("/login")} className="h-10 w-[160px]" style={{ backgroundColor: "white" }}>Hủy</Button>
                    <Button className="h-10 w-[160px]" type="primary">Tiếp tục</Button>
                </div>
            </Form>
        </AuthPage>
    )
}

export default Page
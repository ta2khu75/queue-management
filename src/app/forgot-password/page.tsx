"use client"
import { Button, Form, FormProps, Input } from "antd"
import { AuthPage } from "@/components/AuthPage"
import { useRouter } from "next/navigation"
import BaseService from "@/service/BaseService"
import { collection, limit, query, where } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/config/FirebaseConfig"
import useNotification from "@/hook/NotificationHook"
const Page = () => {
    const router = useRouter()
    const accountCollenctionRef = collection(db, "accounts")
    const { contextHolder, openNotification } = useNotification();
    const onFinish: FormProps['onFinish'] = async (values) => {
        BaseService.query<Account>(query(accountCollenctionRef, where("email", "==", values.email), limit(1))).then(async (data) => {
            if (data.length > 0) {
                let account = data[0]
                if (!account.forgot_code) {
                    account = { ...account, forgot_code: uuidv4() }
                    if (account.id)
                        await BaseService.update(accountCollenctionRef, account.id, account)
                }
                try {
                    const response = await fetch('/api/verify-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: account.email, forgot_code: account.forgot_code }),  // Send email data
                    });
                    const result = await response.json();
                    if (response.ok) {
                        console.log(result.message);
                        openNotification("success", result.message)
                    } else {
                        openNotification("error", result.message)
                        console.log(result.error, result.details);
                    }
                } catch (error) {
                    console.log(error);
                    openNotification("error", "Sendmail error")
                }
            } else {
                openNotification("error", "Email không tồn tại")
            }
        })
    }
    return (
        <AuthPage image={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/forgot.png?alt=media"} >
            <>
                {contextHolder}
                <Form onFinish={onFinish} layout='vertical' className="auth" style={{ width: "400px" }}>
                    <p className="text-[22px] font-bold text-center leading-[33px] mb-4">Đặt lại mật khẩu</p>
                    <Form.Item label={"Vui lòng nhập email để đặt lại mật khẩu"}
                        name={"email"}
                        rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="flex justify-around mt-12">
                        <Button onClick={() => router.push("/login")} className="h-10 w-[160px]" style={{ backgroundColor: "white" }}>Hủy</Button>
                        <Button className="h-10 w-[160px]" htmlType="submit" type="primary">Tiếp tục</Button>
                    </div>
                </Form>
            </>
        </AuthPage>
    )
}

export default Page
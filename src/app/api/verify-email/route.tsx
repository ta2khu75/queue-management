import transporter from '@/config/MailConfig';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, forgot_code } = await request.json()
    const resetLink = `http://localhost:3000/reset-password/${email}?forgot_code=${forgot_code}`;
    const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Đặt lại mật khẩu',
        html: ` <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px;">
                <div style="background-color: #4CAF50; padding: 20px; border-top-left-radius: 5px; border-top-right-radius: 5px; text-align: center;">
                    <h2 style="color: #fff;">Yêu cầu đặt lại mật khẩu</h2>
                </div>
                <div style="padding: 20px;">
                    <p>Chào bạn,</p>
                    <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Vui lòng nhấp vào nút bên dưới để đặt lại mật khẩu của bạn:</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 15px 25px; margin: 20px 0; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Đặt lại mật khẩu
                    </a>
                    <p>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>
                    <p style="color: #999; font-size: 12px;">Liên kết này sẽ hết hạn sau một thời gian ngắn vì lý do bảo mật.</p>
                </div>
                <div style="background-color: #f9f9f9; padding: 15px; text-align: center; color: #666; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;">
                    <p style="font-size: 12px;">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                </div>
            </div>`
    };
    try {

        await transporter.sendMail(mailOptions)
        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Xác minh thất bại', details: error }, { status: 500 });
    }
}
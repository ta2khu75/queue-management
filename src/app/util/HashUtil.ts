export class HashUtil {
    static hour = () => {
        const defaultHour = 17;
        const defaultMinute = 30;

        // Tạo một đối tượng Date mới với giờ và phút mặc định
        const newDate = new Date();
        newDate.setHours(defaultHour, defaultMinute, 0, 0); // Đặt giờ, phút, giây và mili giây
        return newDate;
    }
}
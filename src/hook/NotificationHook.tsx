import { notification } from "antd";
type NotificationType = 'success' | 'info' | 'warning' | 'error';
const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type: NotificationType, message: string) => {
        api[type]({
            message
        });
    };
    return { contextHolder, openNotification };
}
export default useNotification
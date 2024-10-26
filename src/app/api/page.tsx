export default function handler(req, res) {
    // Logic của tác vụ định kỳ
    console.log('Đã gọi API định kỳ');

    // Đáp ứng thành công
    res.status(200).json({ message: 'Tác vụ đã chạy thành công' });
}
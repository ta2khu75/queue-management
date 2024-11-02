import { NumberLevel } from "@/type/NumberLevel"
import { Select } from "antd"
import dayjs from "dayjs"
import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { CaretDownOutlined } from "@ant-design/icons"
type Props = {
    numberLevels: NumberLevel[],
}
const DashboardElement = ({ numberLevels }: Props) => {
    const [accordingTo, setAccordingTo] = useState("day")
    const [dashboardData, setDashboardData] = useState<Dashboard[]>([])
    useEffect(() => {
        if (numberLevels.length > 0) {
            if (accordingTo === "day") {
                setDashboardData(countByGrantTimeDay(numberLevels))
            } else if (accordingTo === "week") {
                setDashboardData(countByGrantTimeWeek(numberLevels))
            } else if (accordingTo === "month") {
                setDashboardData(countByGrantTimeMonth(numberLevels))
            }
        }
    }, [accordingTo, numberLevels.length])
    function countByGrantTimeDay(arr: NumberLevel[]): Dashboard[] {
        const daysInCurrentMonth = dayjs().daysInMonth();
        const array = arr.filter(item => {
            if (item.grant_time && item.grant_time instanceof Timestamp)
                return dayjs(item.grant_time.toMillis()).format("MM/YYYY") === dayjs().format("MM/YYYY")
            return false
        })
        const arrayReturn: Dashboard[] = []
        for (let i = 1; i <= daysInCurrentMonth; i++) {
            const count = array.filter(item => {
                if (item.grant_time && item.grant_time instanceof Timestamp) {
                    return dayjs(item.grant_time.toMillis()).format("D") === `${i}`;
                } return false
            })
            arrayReturn.push({
                name: `${i}`,
                total: count.length,
            })
        }
        return arrayReturn;
    }
    function countByGrantTimeWeek(arr: NumberLevel[]): Dashboard[] {
        const monthYearFormat = dayjs().format("MM/YYYY")
        const filteredArray = arr.filter(item => {
            if (item.grant_time && item.grant_time instanceof Timestamp)
                return dayjs(item.grant_time.toMillis()).format("MM/YYYY") === monthYearFormat
            return false
        });

        const startOfMonth = dayjs().startOf('month');
        const endOfMonth = dayjs().endOf('month');
        const weeksInCurrentMonth = [];
        for (let weekStart = startOfMonth; weekStart.isBefore(endOfMonth); weekStart = weekStart.add(1, 'week')) {
            weeksInCurrentMonth.push(weekStart.isoWeek());
        }
        const weekCounts: Record<number, number> = {};
        for (const item of filteredArray) {
            if (item.grant_time && item.grant_time instanceof Timestamp) {
                const weekNumber = dayjs(item.grant_time.toMillis()).isoWeek();
                weekCounts[weekNumber] = (weekCounts[weekNumber] || 0) + 1;
            }
        }

        // Xây dựng mảng kết quả
        const arrayReturn: Dashboard[] = [];
        for (let i = 0; i < weeksInCurrentMonth.length; i++) {
            arrayReturn.push({
                name: `Tuần ${i + 1}`,
                total: weekCounts[weeksInCurrentMonth[i]] || 0,
            });
        }

        return arrayReturn;
    }


    function countByGrantTimeMonth(arr: NumberLevel[]): Dashboard[] {
        const array = arr.filter(item => {
            if (item.grant_time && item.grant_time instanceof Timestamp)
                return dayjs(item.grant_time.toMillis()).format("YYYY") === dayjs().format("YYYY")
            return false
        })
        const arrayReturn: Dashboard[] = []
        for (let i = 1; i <= 12; i++) {
            const count = array.filter(item => {
                if (item.grant_time && item.grant_time instanceof Timestamp) {
                    return dayjs(item.grant_time.toMillis()).format("M") === `${i}`;
                } return false
            })
            arrayReturn.push({
                name: `${i}`,
                total: count.length,
            })
        }
        return arrayReturn;
    }
    const calculatorInterval = () => {
        if (accordingTo === "day") {
            return Math.ceil(dayjs().daysInMonth() / 4)
        }
        return undefined;
    }
    const calculatorTitle = () => {
        if (accordingTo === "day") {
            return "Ngày"
        } else if (accordingTo === "week") {
            return "Tuần"
        } else if (accordingTo === "month") {
            return "Tháng"
        }
    }
    return (
        <div className='bg-white rounded-xl h-[484px] p-6'>
            <div className="flex justify-between">
                <div className="grid-cols-1">
                    <div className="font-bold text-xl leading-[30px] mb-1">Bảng thống kê theo {calculatorTitle()}</div>
                    <div className="text-[#A9A9B0] text-sm leading-[21px]">Tháng {dayjs().format("MM/YYYY")}</div>
                </div>
                <div className="flex items-center">
                    <div className="font-semibold mr-2">Xem theo</div>
                    <Select style={{ width: "106px", height: "42px" }} value={accordingTo} onChange={(value) => setAccordingTo(value)} size="large" suffixIcon={<CaretDownOutlined className="text-primary text-lg" />} options={[{ label: "Ngày", value: "day" }, { label: "Tuần", value: "week" }, { label: "Tháng", value: "month" }]}></Select>
                </div>
            </div>
            <div className="w-[754px] h-[373px]">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <AreaChart data={dashboardData}>
                        <YAxis />
                        <XAxis dataKey={"name"} interval={calculatorInterval()} />
                        <Tooltip />
                        <Area type={"monotone"} dataKey={"total"} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default DashboardElement
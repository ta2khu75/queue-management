import { Progress } from "antd"
import m from "./styles.module.css"
type Props = {
    progressColor: string
    activeData: number
    inActiveData: number
    data: number,
    children: React.JSX.Element,
    title: string
}
const DashboardProgressElement = ({ progressColor, children, data, activeData, inActiveData, title }: Props) => {
    const calculatorPercent = (typeData: number) => {
        return Math.round((typeData * 100) / data)
    }
    return (
        <div className={`w-[353px] h-[83px] rounded-xl px-4 ${m["progress-element"]} grid grid-cols-2 flex items-center flex items-center`}>
            <div className="flex">
                <div className="relative w-[60px] h-[60px]">
                    <Progress type="circle" strokeColor={progressColor} percent={activeData} format={(percent) => <span className="text-black text-sm">{percent}%</span>} size={60} />
                    <Progress type="circle" percent={inActiveData} size={50} strokeColor="#7E7D88" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" format={() => ""} />
                </div>

                <div className="ml-3">
                    <div className="font-extrabold text-2xl leading-9">{data}</div>
                    <div className={`text-sm leading-[21px] text-[${progressColor}] font-semibold`}>{children} {title}</div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-[5px]">
                <div className="flex items-center">
                    <div className={`h-1 w-1 rounded-full mr-2 bg-[${progressColor}]`}></div>
                    <div className="flex justify-between items-center grow">
                        <div className="text-xs leading-[21px]">Đang hoạt động</div>
                        <div className={`text-[${progressColor}] font-bold text-sm leading-[18px]`}>{calculatorPercent(activeData)}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className={`h-1 w-1 rounded-full mr-2 bg-[#7E7D88] `}></div>
                    <div className="flex justify-between items-center grow">
                        <div className="text-xs leading-[21px]">Ngưng hoạt động</div>
                        <div className={`text-[${progressColor}] font-bold text-sm leading-[18px]`}>{calculatorPercent(inActiveData)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardProgressElement
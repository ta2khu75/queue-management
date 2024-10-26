import { Progress } from "antd"
import m from "./styles.module.css"
type Props = {
    progressColor: string
    waitPercent: number
    usedPercent: number
    skipPercent: number
    data: string,
    children: React.JSX.Element,
    title: string,
    waitData: string,
    usedData: string,
    skipData: string
}
const NumberLevelProgressElement = ({ progressColor, children, data, waitData, waitPercent, skipData, skipPercent, usedData, usedPercent, title }: Props) => {
    return (
        <div className={`w-[353px] h-[83px] rounded-xl px-4 ${m["progress-element"]} grid grid-cols-2 flex items-center`}>
            <div className="flex">
                <div className="relative w-[60px] h-[60px]">
                    <Progress type="circle" strokeColor={progressColor} percent={waitPercent} size={60} />
                    <Progress type="circle" percent={usedPercent} size={50} strokeColor="#7E7D88" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" format={() => ""} />
                    <Progress type="circle" percent={skipPercent} size={40} strokeColor="#F178B6" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" format={() => ""} />
                </div>

                <div className="ml-3">
                    <div className="font-extrabold text-2xl leading-9">{data}</div>
                    <div className={`text-sm leading-[21px] text-[${progressColor}] font-semibold`}>{children} {title}</div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-0">
                <div className="flex items-center">
                    <div className={`h-1 w-1 rounded-full mr-2 bg-[${progressColor}]`}></div>
                    <div className="flex justify-between items-center grow">
                        <div className="text-xs leading-[21px]">Đang chờ</div>
                        <div className={`text-[${progressColor}] font-bold text-sm leading-[18px]`}>{waitData}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className={`h-1 w-1 rounded-full mr-2 bg-[#7E7D88] `}></div>
                    <div className="flex justify-between items-center grow">
                        <div className="text-xs leading-[21px]">Đã sử dụng</div>
                        <div className={`text-[${progressColor}] font-bold text-sm leading-[18px]`}>{usedData}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className={`h-1 w-1 rounded-full mr-2 bg-[#F178B6] `}></div>
                    <div className="flex justify-between items-center grow">
                        <div className="text-xs leading-[21px]">Bỏ qua</div>
                        <div className={`text-[${progressColor}] font-bold text-sm leading-[18px]`}>{skipData}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NumberLevelProgressElement
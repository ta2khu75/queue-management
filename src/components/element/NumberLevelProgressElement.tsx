import { Progress } from "antd"
import m from "./styles.module.css"
import { FunctionUtil } from "@/app/util/FunctionUtil"
import Image from "next/image"
type Props = {
    progressColor: string
    data: number,
    image: string,
    title: string,
    waitData: number,
    usedData: number,
    skipData: number
}
const NumberLevelProgressElement = ({ progressColor, image, data, waitData, skipData, usedData, title }: Props) => {
    const calculatorPercent = (typeData: number) => {
        return Math.round((typeData * 100) / data)
    }
    return (
        <div className={`w-[353px] h-[83px] rounded-xl px-4 ${m["progress-element"]} grid grid-cols-2 flex items-center`}>
            <div className="flex">
                <div className="relative w-[60px] h-[60px]">
                    <Progress type="circle" strokeColor={progressColor} percent={calculatorPercent(waitData)} format={(percent) => <span className="text-black text-sm">{percent}%</span>} size={60} />
                    <Progress type="circle" percent={calculatorPercent(usedData)} size={50} strokeColor="#7E7D88" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" format={() => ""} />
                    <Progress type="circle" percent={calculatorPercent(skipData)} size={40} strokeColor="#F178B6" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" format={() => ""} />
                </div>

                <div className="ml-3">
                    <div className="font-extrabold text-2xl leading-9">{FunctionUtil.formatNumber(data)}</div>
                    <div className={`text-sm leading-[21px] text-[${progressColor}] font-semibold flex`}><Image className="mr-1" src={image} width={14} height={14} alt={title} /><label>{title}</label> </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-0">
                <div className="flex items-center">
                    <div className={`h-1 w-1 rounded-full mr-2 bg-[${progressColor}]`}></div>
                    <div className="flex justify-between items-center grow">
                        <div className="text-xs leading-[21px]">Đang chờ</div>
                        <div className={`text-[${progressColor}] font-bold text-sm leading-[18px]`}>{FunctionUtil.formatNumber(waitData)}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className={`h-1 w-1 rounded-full mr-2 bg-[#7E7D88] `}></div>
                    <div className="flex justify-between items-center grow">
                        <div className="text-xs leading-[21px]">Đã sử dụng</div>
                        <div className={`text-[${progressColor}] font-bold text-sm leading-[18px]`}>{FunctionUtil.formatNumber(usedData)}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className={`h-1 w-1 rounded-full mr-2 bg-[#F178B6] `}></div>
                    <div className="flex justify-between items-center grow">
                        <div className="text-xs leading-[21px]">Bỏ qua</div>
                        <div className={`text-[${progressColor}] font-bold text-sm leading-[18px]`}>{FunctionUtil.formatNumber(skipData)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NumberLevelProgressElement
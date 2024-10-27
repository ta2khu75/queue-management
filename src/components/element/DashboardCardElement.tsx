import { FunctionUtil } from "@/app/util/FunctionUtil"
import { ArrowUpOutlined } from "@ant-design/icons"
type Props = {
    children: React.JSX.Element,
    title: string
    titleBr: string
    className_icon: string
    data: number
    dataPercent: string
}
const DashboardCardElement = ({ children, title, titleBr, className_icon, data, dataPercent }: Props) => {
    return (
        <div className="w-[186px] h-[120px] px-3 py-2 flex flex-col justify-between bg-white rounded-xl">
            <div className="flex">
                <div className={`w-12 h-12 flex justify-center text-center rounded-full ${className_icon}`}>
                    {children}
                </div>
                <span className="ml-3 text-sm font-bold leading-[18px]">
                    {title}<br /> {titleBr}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="text-3xl leading-[40px]">{FunctionUtil.formatNumber(data)}</h4>
                </div>
                <div className="w-12 text-[8px] h-[15px] text-center leading-[15px] text-super_primary rounded-[7px] bg-[#FFEFD9]">
                    <ArrowUpOutlined /> {dataPercent}%
                </div>
            </div>
        </div >
    )
}

export default DashboardCardElement
"use client"
import { AvatarInfoElement } from "@/components/element/AvatarInfoElement"
import CalendarElement from "@/components/element/CalendarElement";
import DashboardCardElement from "@/components/element/DashboardCardElement"
import DashboardProgressElement from "@/components/element/DashboardProgressElement copy";
import NumberLevelProgressElement from "@/components/element/NumberLevelProgressElement";
import { BlockOutlined, DesktopOutlined, CommentOutlined } from "@ant-design/icons";
import { CalendarOutlined, BookOutlined, UserOutlined, CheckSquareOutlined } from "@ant-design/icons"
const Page = () => {
    return (
        <div className="flex justify-between">
            <div className="w-[790px]">
                <h5 className="text-super_primary text-xl font-bold h-[80px] leading-[80px]">Dashboard</h5>
                <h6 className="my-4">Biểu đồ cấp số</h6>
                <div className="flex justify-around w-[790px] mb-3">
                    <DashboardCardElement title="Số thứ tự" titleBr="đã cấp" className_icon="bg-[#E8EFFE]" dataPercent="32,41" data="4.221">
                        <CalendarOutlined className="text-2xl text-[#6493F9]" />
                    </DashboardCardElement>
                    <DashboardCardElement title="Số thứ tự" titleBr="đã sử dụng" className_icon="bg-[#E1F7E6]" dataPercent="32,41" data="3.721">
                        <CheckSquareOutlined className="text-2xl text-[#35C75A]" />
                    </DashboardCardElement>
                    <DashboardCardElement title="Số thứ tự" titleBr="đang chờ" className_icon="bg-[#FFF3E9]" dataPercent="56,41" data="468">
                        <UserOutlined className="text-2xl text-[#FFAC6A]" />
                    </DashboardCardElement>
                    <DashboardCardElement title="Số thứ tự" titleBr="đã bỏ qua" className_icon="bg-[#FEE9E9]" dataPercent="22,41" data="32">
                        <BookOutlined className="text-2xl text-[#F86D6D]" />
                    </DashboardCardElement>
                </div>
                <div className='flex justify-between bg-white rounded-xl h-[484px]'>

                </div>
            </div>
            <div className="bg-white w-[401px] h-[810px] rounded-tl-lg rounded-bl-lg p-6 pt-0">
                <div className="relative h-[88px] flex items-center">
                    <div className="absolute right-16">
                        <AvatarInfoElement />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <h6>Tổng quan</h6>
                    <div className="grid grid-cols-1 gap-3">
                        <DashboardProgressElement progressColor="#FF7506" title="Thiết bị" activePercent={90} nonActivePercent={10} data="4.221" dataActive="3.799" dataNonActive="422" >
                            <DesktopOutlined />
                        </DashboardProgressElement>
                        <DashboardProgressElement progressColor="#4277FF" title="Dịch vụ" activePercent={76} nonActivePercent={10} data="276" dataActive="210" dataNonActive="66" >
                            <CommentOutlined />
                        </DashboardProgressElement>
                        <NumberLevelProgressElement progressColor="#35C75A" title="Cấp số" waitPercent={86} usedPercent={10} skipPercent={5} skipData="32" usedData="486" waitData="3.721" data="4.221">
                            <BlockOutlined />
                        </NumberLevelProgressElement>
                    </div>
                    <CalendarElement />
                </div>
            </div>
        </div >
    )
}

export default Page
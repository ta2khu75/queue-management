"use client"
import { AvatarInfoElement } from "@/components/element/AvatarInfoElement"
import { useAppDispatch, useAppSelector, useAppStore } from "@/redux/hook"
import { counterAction } from "@/redux/slice/countSlice"
import { PlusOutlined, CaretDownOutlined, CalendarOutlined } from "@ant-design/icons"
const Page = () => {
    const count = useAppSelector((state) => state.count.value)
    const dispatch = useAppDispatch()
    return (
        <div className="flex justify-between">
            <div className="w-[790px]">
                <h5 className="text-super_primary text-xl font-bold h-[80px] leading-[80px]">Dashboard</h5>
                <h6 className="my-4">Biểu đồ cấp số</h6>
                <div className="flex justify-around w-[790px] mb-3">
                    <div className="w-[186px] h-[120px] px-3 py-2 flex flex-col justify-between bg-white rounded-xl">
                        <div className="flex">
                            <div className="w-12 h-12 flex justify-center text-center rounded-full bg-[#E8EFFE]">
                                <CalendarOutlined className="text-2xl text-[#6493F9]" />
                            </div>
                            <span className="ml-3 text-sm font-bold leading-[18px]">
                                Số thứ tự <br /> đã cấp
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-3xl leading-[40px]">4.221</h4>
                            </div>
                            <div className="w-12 text-[8px] h-[15px] text-center leading-[15px] text-super_primary rounded-[7px] bg-[#FFEFD9]">
                                H 32,41%
                            </div>
                        </div>
                    </div>
                    <div className="w-[186px] h-[120px] px-3 py-2 flex flex-col justify-between bg-white rounded-xl">
                        <div className="flex">
                            <div className="w-12 h-12 flex justify-center text-center rounded-full bg-[#E8EFFE]">
                                <CalendarOutlined className="text-2xl text-[#6493F9]" />
                            </div>
                            <span className="ml-3 text-sm font-bold leading-[18px]">
                                Số thứ tự <br /> đã cấp
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-3xl leading-[40px]">4.221</h4>
                            </div>
                            <div className="w-12 text-[8px] h-[15px] text-center leading-[15px] text-super_primary rounded-[7px] bg-[#FFEFD9]">
                                H 32,41%
                            </div>
                        </div>
                    </div>
                    <div className="w-[186px] h-[120px] px-3 py-2 flex flex-col justify-between bg-white rounded-xl">
                        <div className="flex">
                            <div className="w-12 h-12 flex justify-center text-center rounded-full bg-[#E8EFFE]">
                                <CalendarOutlined className="text-2xl text-[#6493F9]" />
                            </div>
                            <span className="ml-3 text-sm font-bold leading-[18px]">
                                Số thứ tự <br /> đã cấp
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-3xl leading-[40px]">4.221</h4>
                            </div>
                            <div className="w-12 text-[8px] h-[15px] text-center leading-[15px] text-super_primary rounded-[7px] bg-[#FFEFD9]">
                                H 32,41%
                            </div>
                        </div>
                    </div>
                    <div className="w-[186px] h-[120px] px-3 py-2 flex flex-col justify-between bg-white rounded-xl">
                        <div className="flex">
                            <div className="w-12 h-12 flex justify-center text-center rounded-full bg-[#E8EFFE]">
                                <CalendarOutlined className="text-2xl text-[#6493F9]" />
                            </div>
                            <span className="ml-3 text-sm font-bold leading-[18px]">
                                Số thứ tự <br /> đã cấp
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-3xl leading-[40px]">4.221</h4>
                            </div>
                            <div className="w-12 text-[8px] h-[15px] text-center leading-[15px] text-super_primary rounded-[7px] bg-[#FFEFD9]">
                                H 32,41%
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between bg-white rounded-xl h-[484px]'>
                    h
                </div>
            </div>
            <div className="bg-white w-[401px] h-[810px] rounded-tl-lg rounded-bl-lg p-6 pt-0">
                <div className="relative h-[88px] flex  could not find react-redux context value; please ensure the component is wrapped in a <Provider>items-center mb-4">
                    <div className="absolute right-16">
                        <AvatarInfoElement />
                    </div>
                </div>
                <h6>Tổng quan</h6>
                <div>
                    <div className="w-[353px] h-[83px] flex rounded-xl">
                        <div>
                            <div></div>   Đã sử dụng  <h1>{count}</h1>
                            <button onClick={() => dispatch(counterAction.increment())}>cong</button>
                            <button onClick={() => dispatch(counterAction.decrement())}>tru</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Page
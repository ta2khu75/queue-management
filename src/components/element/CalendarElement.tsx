import React from 'react';
import dayjs from 'dayjs';
import m from "./styles.module.css"
import 'dayjs/locale/zh-cn';

import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';

dayjs.extend(dayLocaleData);

const CalendarElement = () => {
    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const wrapperStyle: React.CSSProperties = {
        borderRadius: "12px"
    };

    return (
        <div style={wrapperStyle} className={m["progress-element"]}>
            <Calendar
                fullscreen={false}
                headerRender={({ value, type, onChange }) => {
                    // const start = 0;
                    // const end = 12;
                    // const monthOptions = [];

                    // let current = value.clone();
                    // const localeData = value.localeData();
                    // const months = [];
                    // for (let i = 0; i < 12; i++) {
                    //     current = current.month(i);
                    //     months.push(localeData.monthsShort(current));
                    // }

                    // for (let i = start; i < end; i++) {
                    //     monthOptions.push(
                    //         <Select.Option key={i} value={i} className="month-item">
                    //             {months[i]}
                    //         </Select.Option>,
                    //     );
                    // }
                    // const year = value.year();
                    // const month = value.month();
                    // const options = [];
                    // for (let i = year - 10; i < year + 10; i += 1) {
                    //     options.push(
                    //         <Select.Option key={i} value={i} className="year-item">
                    //             {i}
                    //         </Select.Option>,
                    //     );
                    // }
                    return (
                        <div className='px-10 py-[25px] flex justify-between items-center text-super_primary text-base font-bold'>
                            <button onClick={() => {
                                const newMonth = value.month() - 1
                                if (newMonth == 0) {
                                    const newYear = value.year() - 1
                                    const now = value.clone().year(newYear).month(12)
                                    onChange(now);
                                } else {
                                    const now = value.clone().month(newMonth)
                                    onChange(now);
                                }
                            }}>
                                {"<"}
                            </button>
                            {/* <Select
                                size="small"
                                popupMatchSelectWidth={false}
                                value={month}
                                onChange={(newMonth) => {
                                    const now = value.clone().month(newMonth);
                                    onChange(now);
                                }}
                            >
                                {monthOptions}
                            </Select>
                            <Select
                                size="small"
                                popupMatchSelectWidth={false}
                                className="my-year-select"
                                value={year}
                                onChange={(newYear) => {
                                    const now = value.clone().year(newYear);
                                    onChange(now);
                                }}
                            >
                                {options}
                            </Select> */}
                            {dayjs(value.toDate()).format("DD MMM YYYY")}
                            <button onClick={() => {
                                let newMonth = value.month() + 1
                                if (newMonth == 13) {
                                    const newYear = value.year() + 1
                                    value.clone().year(newYear)
                                    newMonth = 1
                                }
                                const now = value.clone().month(newMonth)
                                onChange(now);
                            }}>{">"}</button>
                        </div>
                    );
                }}
                onChange={(e) => console.log(e)}
                onPanelChange={onPanelChange}
            />
        </div>
    );
};

export default CalendarElement;
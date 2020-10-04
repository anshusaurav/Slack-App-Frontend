import React, { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
// import { HiOutlineChevronDown } from "react-icons/hi";
function NiceDatePicker() {
    const [date, setDate] = useState()
    return (
        <DatePicker date={date} onDateChange={setDate} locale={enGB} placeholder="Everything">
            {({ inputProps, focused }) => (
                <input
                    className={'input px-6 py-3 w-full relative placeholder-gray-800' + (focused ? ' -focused' : '')}
                    {...inputProps}
                    placeholder="Everything"
                >
                </input>
            )}
        </DatePicker>
    )
}
export default NiceDatePicker;
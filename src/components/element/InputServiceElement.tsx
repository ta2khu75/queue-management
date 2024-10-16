import React from 'react'
type Props = {
    value: string
}
const InputServiceElement = ({ value }: Props) => {
    return (
        <input className="border-[1.5px] w-[61px] h-[44px] text-center text-[#535261] rounded-lg border-[#D4D4D7]" readOnly value={value} />
    )
}

export default InputServiceElement
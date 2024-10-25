import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
type Props = {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
    readonly?: boolean;
}
const InputServiceElement = ({ value, setValue, readonly = false }: Props) => {

    const [inputWidth, setInputWidth] = useState(1); // Default width in px
    const spanRef = useRef<HTMLSpanElement>(null); // Ref to hidden span for measuring text width

    useEffect(() => {
        // Update the width of the input based on the width of the text in the hidden span
        if (spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth + 10); // Add some padding
        }
    }, [value]); // Recalculate width every time the input value changes

    return (
        <div>
            <input
                type="text"
                onChange={e => setValue(e.target.value)}
                className="border-[1.5px] h-[44px] inline-block text-center text-[#535261] rounded-lg border-[#D4D4D7]" value={value}
                readOnly={readonly}
                style={{ width: `${inputWidth}px`, padding: "5px", minWidth: "61px" }}
            />
            {/* Hidden span used to calculate the width of the input */}
            <span
                ref={spanRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontSize: "16px",
                }}
            >
                {value || " "} {/* Ensure there's always at least one character */}
            </span>
        </div>
    )
}

export default InputServiceElement
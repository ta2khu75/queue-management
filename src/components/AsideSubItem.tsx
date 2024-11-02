"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { MoreOutlined } from "@ant-design/icons";
type Props = {
    imageHover: string;
    imageDefault: string;
    imageSelected: string;
    selected: boolean;
    label: string
}
const AsideSubItem = ({ imageDefault, imageHover, imageSelected, selected, label }: Props) => {
    const classParent = "font-semibold text-base flex items-center h-12 w-[200px] rounded-lg "
    const classDefault = classParent + "text-[#7E7D88] bg-white"
    const classHover = classParent + "text-[#7E7D88] text-super_primary bg-[#FFF2E7]"
    const classSelected = classParent + "text-[#7E7D88] text-white bg-super_primary"
    const [image, setImage] = useState(imageDefault)
    const [className, setClassName] = useState(classDefault)
    useEffect(() => {
        if (selected) {
            setImage(imageSelected)
            setClassName(classSelected)
        } else {
            setImage(imageDefault)
            setClassName(classDefault)
        }
    }, [selected])
    const handleMouseEnter = () => {
        setImage(imageHover)
        setClassName(classHover)
    }
    const handleMouseLeave = () => {
        if (selected) {
            setImage(imageSelected)
            setClassName(classSelected)
        } else {
            setImage(imageDefault)
            setClassName(classDefault)
        }
    }
    return (
        <button className={className} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>
            <Image src={image} width={20} height={20} className='mr-[2px] ml-4 rounded-lg' alt='image icon' />
            <label className='mr-2'>{label}</label><MoreOutlined />
        </button>
    )
}

export default AsideSubItem
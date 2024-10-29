import Image from "next/image"
import image from "../../../public/Frame.svg"
const page = () => {
    return (
        <Image alt="image" src={image} />
    )
}

export default page
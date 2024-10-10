import Image from "next/image"
import logo from "../../../public/1615793217.png"
type Props = {
    width: number,
    height: number,
    className?: string
}
export const LogoElement = (props: Props) => {
    return (
        <Image src={logo} {...props} alt="logo" />
    )
}
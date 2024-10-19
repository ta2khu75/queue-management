import Image from "next/image"
type Props = {
    width: number,
    height: number,
    className?: string
}
export const LogoElement = (props: Props) => {
    return (
        <Image src={"https://firebasestorage.googleapis.com/v0/b/queue-management-b8d91.appspot.com/o/logo.png?alt=media"} {...props} alt="logo" />
    )
}

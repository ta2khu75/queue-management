import { Breadcrumb } from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"
type Props = {
    paths: Path[],
}
const HeaderUser = ({ paths }: Props) => {
    const pathname = usePathname()
    return (
        <header className="flex justify-between items-center" style={{ height: "88px" }} >
            <Breadcrumb
                separator=">"
                className="text-xl font-bold"
                items={paths.map(path => ({ title: <Link href={path.path}>{path.path === pathname ? <span className="text-super_primary">{path.title}</span> : path.title}</Link> }))}
            />
        </header>
    )
}

export default HeaderUser;
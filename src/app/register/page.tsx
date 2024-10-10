"use client"

import { auth } from "@/config/FirebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

const page = () => {
    const router = useRouter()
    const [user, setUser] = useState({ email: "", password: "", confirmPassword: "" })
    const [errorPassword, setErrorPassword] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user?.email && user?.password && user.confirmPassword) {
            if (user.password === user.confirmPassword) {
                try {
                    await createUserWithEmailAndPassword(auth, user.email, user.password);
                    alert("Register in successfully!");
                    router.push("/login")
                } catch (error: any) {
                    console.error("Error register in:", error);
                    alert(error?.message);
                }
            } else {
                setErrorPassword(true);
            }
        }
    };
    return (
        <div>
            <h1 className="text-4xl">Register</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                {errorPassword && <p className="text-red-600">Mat khau khong giong nhau</p>}
                <input onChange={(e) => handleChange(e)} type="email" value={user.email} name="email" placeholder="email" />
                <input onChange={(e) => handleChange(e)} type="password" value={user.password} name="password" placeholder="password" />
                <input onChange={(e) => handleChange(e)} type="password" value={user.confirmPassword} name="confirmPassword" placeholder="password" />
                <button type="submit">register</button>
            </form>

        </div>
    )
}

export default page
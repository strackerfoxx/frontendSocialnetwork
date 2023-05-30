'use client';
import useModal from "../hooks/useModal"
import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
const AuthContext = createContext()


function AuthProvider({children}){
    const router = useRouter()

    const [token, setToken] = useState("")
    const [usName, setUsName] = useState("")

    const [users, setUsers] = useState([{}])
    
    useEffect(() => {
        setToken(localStorage.getItem("user")?.split(",")[0])
        setUsName(localStorage.getItem("user")?.split(",")[1])
        if(router.pathname !== "/login" && router.pathname !== "/register" && !localStorage.getItem("user")) router.push("/login")

        const getUsers = async () =>  {
            const respuesta = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`)
            const resultado = await respuesta.json()
            setUsers(resultado) 
        }
        getUsers()
    }, [])
    

    return(
        <AuthContext.Provider value={{ usName, token, users }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export { AuthProvider }
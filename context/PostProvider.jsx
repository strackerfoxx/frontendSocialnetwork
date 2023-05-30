import { createContext, useState, useEffect } from "react";
const PostContext = createContext()

const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([])
    const [updated, setUpdated] = useState(false)

    useEffect(() => {
        async function request(){
            const respuesta = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`)
            setPosts(await respuesta.json())
        }
        request()
    }, [updated])
        
    return (
        <PostContext.Provider value={{ posts, updated, setUpdated }}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContext
export { PostProvider }
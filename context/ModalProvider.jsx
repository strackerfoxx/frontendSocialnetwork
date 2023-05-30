import { createContext, useState } from "react";
const ModalContext = createContext()

const ModalProvider = ({children}) => {
    const [modal, setModal] = useState(false)
    const [post, setPost] = useState({})
    const [id, setId] = useState("")
    const [discard, setDiscard] = useState(false)
    
    
    return(
        <ModalContext.Provider value={{ 
            modal, setModal,
            post, setPost,
            id, setId,
            discard, setDiscard
        }}>
            {children}
        </ModalContext.Provider>
    )
}
export default ModalContext
export { ModalProvider }
import {useEffect} from 'react'
import axios from 'axios';
import useModal from '@/hooks/useModal';

export default function Modal({children}) {
  
  const { setModal, setPost, id, setId, setDiscard } = useModal()
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const modalContainer = document.getElementById('modalContainer');

    modalContainer.addEventListener('click', function(event) {
      
      if (event.target !== modalContainer) return
        if(id !== ""){
          if(window.confirm("Are you sure that you want to exit")){
            setDiscard(true)
            async function discardPost(){
              try {
                const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?id=${id}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("user").split(",")[0]}`
                  }
                })
                console.log(data)
                setId("")
                setDiscard(false)
              } catch (error) {
                console.log(error)
              }
            }
            discardPost()
            setDiscard(false)
            console.log("borrando")
          }else{
            console.log("PARA")
            return
          }
        }
        setModal(false)
        setPost({})
        document.body.style.overflow = "auto";
      
    });
    
  }, [id])
  
  return (
    <div id='modalContainer'>
      <div className='x'>
          <p onClick={() => {
              setModal() 
              setPost({}) 
              document.body.style.overflow = "auto";
            } }>&#215;</p>
        </div>
            {children}
    </div>
  )
}

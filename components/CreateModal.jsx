import {useState} from 'react'
import axios from 'axios';
import Spinner from './Spinner';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';

export default function CreateModal({}) {
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [next, setNext] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {updated, setUpdated} = useAuth()
  const {setModal, id, setId} = useModal()


  async function handleChange(e){
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      
      setIsLoading(true)
      try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("user").split(",")[0]}`
          }
        })
        setImage(data.img)
        setId(data._id)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
  }
  async function addDescription(){
    if(description){
        try {
          const {data} = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/description?_id=${id}`, {description}, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("user").split(",")[0]}`
            }
          })
          console.log(data)
        } catch (error) {
          console.log(error)
        }
    }
    setModal(false)
    document.body.style.overflow = "auto";
    setUpdated(!updated)
    setModal(false)
    setId("")
  }
  
  return (
    <div className='modal' style={{width: `${!next ? "45%" : "70%"}`}}>
      
    {!next ? (
      <div id='title'>
        <p>Create new Post</p>
        <button  className='next' onClick={() => setNext(true)}>Next</button>
      </div>
    ): (
      <div id='title'>
        <button onClick={() => setNext(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <p>Add a description</p>
        <button className='next' onClick={addDescription}>Share</button>
      </div>
    )}
    <div className='createmodal'>
      {!next ? 
        <>
          {!isLoading ? image ? <div style={{backgroundImage: `url(${image})`,backgroundSize: "cover",backgroundPosition: "center",borderBottomRightRadius: ".5rem"}}></div> : (
            <form>
              <input type="file" accept='image/*' onChange={e => handleChange(e)}/> 
            </form>
          ) : <Spinner/>}
        </>
      : (
        <div>
          <div style={{backgroundImage: `url(${image})`,backgroundSize: "cover",backgroundPosition: "center"}}></div>
          <form>
            <label htmlFor="desc">Añadir descripcion</label>
            <textarea name="desc" placeholder='Escribe una descripcion (opcional)' onChange={e => setDescription(e.target.value)}></textarea>
          </form>
        </div>
      )}
    </div>

  </div>
  )
}

import React from 'react'
import Image from 'next/image'
import PostModal from './PostModal'
import Modal from './Modal'
import useModal from '@/hooks/useModal'

export default function Profile({data}) {
    const {user: {username, createdAt, name, profile}, posts} = data
    const { setPost, modal, setModal, post, id, setDiscard } = useModal()
    
  return (
    <>
      {modal && Object.entries(post).length > 0 && <Modal 
        setModal={setModal} 
        setPost={setPost} 
        id={id} 
        setDiscard={setDiscard} 

      ><PostModal post={post}/> </Modal>}
        <div id='profile'>
            <Image src={profile} width={120} height={120} style={{borderRadius: "10rem"}} alt={`imagen de usuario de ${username}`}/>
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <h1>{username}</h1>
                <h3>{posts.length} posts</h3>
            </div>
        </div>
        <div className='gridImages'>
            {posts.map(post => (
                    <div key={post._id} className="square" style={{backgroundImage: `url(${post.image})`, backgroundSize: "cover",backgroundPosition: "center"}} onClick={() => {
                    setModal(true)
                    setPost(post)
                }}></div>
            ))}
        </div>
    </>
  )
}

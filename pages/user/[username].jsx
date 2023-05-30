import React from 'react'
import Layout from '@/components/Layout'
import Profile from '@/components/Profile'

export default function User({data,
  modal, 
  setModal, 
  post,
  setPost, 
  id, 
  setId, 
  discard, 
  setDiscard, 
  updated, 
  setUpdated,
}) {
  return (
    <Layout
      setModal={setModal} 
      modal={modal} 
      setPost={setPost} 
      post={post} 
      id={id} 
      setId={setId} 
      discard={discard} 
      setDiscard={setDiscard} 
      updated={updated} 
      setUpdated={setUpdated}>
        
      <Profile 
        data={data} 
        setModal={setModal} 
        setPost={setPost} 
        modal={modal} 
        id={id} 
        setId={setId}
        post={post} 
        setDiscard={setDiscard} 
      />
    </Layout>
  )
}

export async function getServerSideProps(context){
    const {username} = context.query
    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/posts?username=` + username)
    const data = await respuesta.json()
    return{
        props: {
            data
        }
    }
}
import Layout from "@/components/Layout"
import useAuth from "@/hooks/useAuth"
import useModal from "@/hooks/useModal"
import usePost from "@/hooks/usePost"
import Modal from "@/components/Modal"
import PostModal from "@/components/PostModal"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Explore() {
  const [filtredUser, setFiltredUser] = useState({})
  const [search, setSearch] = useState("")

  const { posts } = usePost()
  const { users } = useAuth()
  const { modal, setModal, setPost, post, id, setDiscard } = useModal()
  useEffect(() => {
    users?.users?.map(user => {
      if(user.username.includes(search)){
        setFiltredUser(user)
      }
    })
    !search && setFiltredUser({})
  }, [search])

  return (
    <Layout>
        {modal && Object.entries(post).length > 0 && <Modal 
          setModal={setModal} 
          setPost={setPost} 
          id={id} 
          setDiscard={setDiscard} 

        ><PostModal post={post}/> </Modal>}
        <div id="buscador">
          <form>
            <input type="text" placeholder="nombre del usuario" id="search" onChange={e => setSearch(e.target.value)}/>
          </form>

          {filtredUser.username ? (
              <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}user/${filtredUser.username}`}>
                <div id="result">
                  <Image src={filtredUser?.profile} width={35} height={35}/>
                  <h1>{filtredUser?.username}</h1>
                </div>
              </Link>
          ): ""}

        </div>

        <div className="gridImages">
          {posts.map(post => (
              <div key={post._id} className="square" style={{backgroundImage: `url(${post.image})`, backgroundSize: "cover",backgroundPosition: "center"}} onClick={() => {
                setModal(true)
                setPost(post)
              }}></div>
          ))}
        </div>
    </Layout>
  )
}

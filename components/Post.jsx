import {useState} from 'react'
import Image from "next/image"
import Link from "next/link"
import useAuth from '@/hooks/useAuth'
import useModal from '@/hooks/useModal'
import usePost from '@/hooks/usePost'

export default function Post({post}) {
    const [comment, setComment] = useState("")
    const { token } = useAuth()
    const {setModal, setPost} = useModal()
    const {updated, setUpdated} = usePost()
    
    async function addComment(e, post){
        e.preventDefault()
        if(comment === "") return
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/comment?id=${post._id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({"content": comment})
            })
            setComment("")
            setUpdated(!updated)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLike(id){
        try {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/likes?id=${id}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          setUpdated(!updated)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <>
            <div className="author">
                <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/user/${post.author.username}`}>
                    <Image src={post.author.profile} width={1000} height={1000} alt='imagen'/>
                 </Link>
                <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/user/${post.author.username}`}>
                <h1>{post.author.username}</h1>
                 </Link>
            </div>

        <img src={post.image} alt={`Imagen del autor: ${post.author.username}`} />

        <div className="prev">
            <button onClick={() => handleLike(post._id)}>
            {post.likeAuthor.some(like => like.username === localStorage.getItem("user").split(",")[1]) ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            ): (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            )}
            </button>
            <button onClick={() => {
                setModal(true)
                setPost(post)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
            </button>

            <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
            </button>
        </div>

        <div className="desc">
            <p id="likes">{post.likes} likes</p>
                <h3>{post.description}</h3> 
            <p className={post.comments[0] ? "comentario" : ""}>{post?.comments[0]?.content}</p>

            <form onSubmit={e => addComment(e, post)} style={{marginTop: "1rem", width: "100%", backgroundColor: "rgba(47, 47, 47)", 
            display: "flex", alignItems: "center", justifyContent: "space-between"}}>

                <input type="text" placeholder="Añadir un comentario" value={comment} onChange={e => setComment(e.target.value)}
                style={{background: "none", border: "none", padding: ".5rem", width: "100%", color: "white"}}/>
                <button className='next'>comentar</button>
            </form>
        </div>
    </>
  )
}

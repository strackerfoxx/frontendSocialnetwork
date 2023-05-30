import React from 'react'
import Image from 'next/image'

export default function PostModal({post}) {
    console.log(post)
    const { image, description } = post
    const { profile, username } = post.author
  return (
    <div className='modal' style={{width: "90%",height: "90%",backgroundColor: "rgba(0, 0, 0, 0.518)", backdropFilter: "blur(5px)"}}>
      <div id='postmodal'>
          <div style={{backgroundImage: `url(${image})`,backgroundSize: "cover",backgroundPosition: "center",borderBottomLeftRadius: "5px",borderTopLeftRadius: "5px"}}></div>
          
          <div>
              <div style={{padding: "1rem", display: "flex", alignItems: "center",borderBottom: "1px solid rgba(47, 47, 47, 0.737)"}}>
                <Image src={profile} width={30} height={30} alt={`foto del usuario: ${username}`} style={{borderRadius: "10rem",marginRight: "1rem"}}/>
                <h1>{username}</h1>
              </div>
              <div style={{padding: "1rem", display: "flex", alignItems: "center"}}>
                <p style={{padding: "1rem"}}>{description}</p>
              </div>
              <div className='comments'>
                  {post?.comments.map(comment => (
                    <div key={comment._id} style={{display: "flex", margin: "1rem 0", justifyContent: "space-between"}}>
                      <Image src={comment.author.profile} width={30} height={30} alt={`foto del usuario: ${comment.author.username}`} style={{borderRadius: "10rem",marginRight: "1rem"}}/>
                      <p style={{display: "flex", alignItems: "center"}}>{comment.content}</p>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                      </svg>
                    </div>
                  ))}
              </div>
          </div>
          
      </div>
    </div>
  )
}

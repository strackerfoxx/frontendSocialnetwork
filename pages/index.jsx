import Layout from "@/components/Layout"
import Modal from "@/components/Modal"
import PostModal from "@/components/PostModal"
import Post from "@/components/Post"
import useModal from "@/hooks/useModal"
import usePost from "@/hooks/usePost"

export default function Home({}) {
  const { posts } = usePost()
  const { modal, post } = useModal() 

  return (
    <Layout>

      {modal && Object.entries(post).length > 0 && <Modal
      ><PostModal post={post}/> </Modal>}

      <div className="listado">
          {posts.map(post => (
            <div className="post" key={post._id}>
              <Post post={post} />
            </div>
          ))}
      </div>

    </Layout>
  )
}

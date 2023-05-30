import '../styles/globals.css'
import '../styles/main.css'
import '../styles/sign.css'
import '../styles/post.css'
import '../styles/modal.css'
import '../styles/spinner.css'
import '../styles/profile.css'
import '../styles/explore.css'
import { AuthProvider } from '../context/AuthProvider'
import { ModalProvider } from '@/context/ModalProvider'
import { PostProvider } from '@/context/PostProvider'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <PostProvider>
            <Component {...pageProps}/>
        </PostProvider>
      </ModalProvider>
    </AuthProvider>
  )
}

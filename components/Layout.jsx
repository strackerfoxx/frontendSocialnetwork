import Aside from './Aside'
import AsideBottom from './AsideBottom'
import { useRouter } from 'next/router'

export default function Layout({children}) {
  const router = useRouter()
  return (
    <>
      <main>
        <Aside/>
        <article className={`${router.pathname !== "/" ? "noIndex" : ""}`}>
            {children}
        </article>
        <AsideBottom/>
      </main>
    </>
  )
}

import {useState} from 'react'
import Image from 'next/image'
import { validatePass } from '@/helpers'
import Alert from './Alert'
import { useRouter } from 'next/router'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const [alerta, setAlerta] = useState({error: true, msg: ""})
    async function handleSubmit(e){
        e.preventDefault()
        if([email, password].includes("")) return setAlerta({error: true, msg: "Todos los campos son obligatorios"})
        if(password.length < 8) return setAlerta({error: true, msg: "La contraseña debe tener minimo 8 caracteres"})
        if(!validatePass(password)) return setAlerta({error: true, msg: "La contraseña debe tener una mayuscula una minuscula y un numero o simbolo"})
        setAlerta({error: true, msg: ""})
        const respuesta = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
              email,
              password
          })
        })
        const resultado = await respuesta.json()
        localStorage.setItem("user", [resultado.user.token, resultado.user.username])
        router.push("/")
    }
  return (
    <div className='sign'>
        <div>
          <Image src="/../public/img/logo.png" width={70} height={70} alt='logo'/>
        </div>
        {alerta.msg && <Alert alerta={alerta} />}
        <form onSubmit={handleSubmit}>
              <div className='campo'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <input type="email" placeholder='email' onChange={e => setEmail(e.target.value)} />
              </div>

              <div className='campo'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
              </div>

          <button className='btn'>Login</button>
        </form>
    </div>
  )
}

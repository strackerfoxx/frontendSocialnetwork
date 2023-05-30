import React from 'react'

export default function Alert({alerta}) {
  return (
    <div className={`${alerta.error ? "alert" : "success"}`}>
        <h1>{alerta.msg}</h1>
    </div>
  )
}

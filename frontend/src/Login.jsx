import { useState } from "react"
import api from "./api"

export default function Login({ setUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const res = await api.post("/api/auth/login", { email, password })
    setUser(res.data)
  }

  return (
    <div>
      <h2>GigFlow Login</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  )
}

import { useState } from "react"
import api from "./api"

export default function Login({ setUser }) {
  const [isRegister, setIsRegister] = useState(false)
  const [role, setRole] = useState("freelancer")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const submit = async (e) => {
    e.preventDefault()
    try {
      if (isRegister) {
        await api.post("/api/auth/register", {
          name,
          email,
          password,
          role
        })
        setIsRegister(false)
        setError("Registered successfully. Please login.")
      } else {
        const res = await api.post("/api/auth/login", {
          email,
          password
        })
        setUser(res.data)
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Invalid details")
    }
  }

  return (
    <div style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        {isRegister && (
          <>
            <input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <br />

            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="freelancer">Freelancer</option>
              <option value="client">Client</option>
            </select>
            <br />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "New user? Register"}
      </button>
    </div>
  )
}

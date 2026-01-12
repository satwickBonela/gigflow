import { useEffect, useState } from "react"
import api from "./api"
import Login from "./Login"
import Gigs from "./Gigs"
import ClientBids from "./ClientBids"

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState("gigs")
  const [selectedGig, setSelectedGig] = useState(null)

  useEffect(() => {
    api.get("/api/auth/me")
      .then(res => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(() => {
        setUser(null)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  if (!user) {
    return <Login setUser={setUser} />
  }

  return (
    <div>
      <h1>GigFlow Dashboard</h1>

      {view === "gigs" && (
        <Gigs
          openBids={(gigId) => {
            setSelectedGig(gigId)
            setView("bids")
          }}
        />
      )}

      {view === "bids" && (
        <ClientBids
          gigId={selectedGig}
          goBack={() => setView("gigs")}
        />
      )}
    </div>
  )
}

import { useState } from "react"
import Login from "./Login"
import Gigs from "./Gigs"
import ClientBids from "./ClientBids"

export default function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState("gigs")
  const [selectedGig, setSelectedGig] = useState(null)

  if (!user) return <Login setUser={setUser} />

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

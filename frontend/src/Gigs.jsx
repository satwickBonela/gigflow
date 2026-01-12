import { useEffect, useState } from "react"
import api from "./api"

export default function Gigs({ openBids }) {
  const [gigs, setGigs] = useState([])
  const [message, setMessage] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    api.get("/api/gigs").then(res => setGigs(res.data))
  }, [])

  const apply = async (gigId) => {
    await api.post("/api/bids", {
      gigId,
      message,
      price
    })
    alert("Bid sent")
  }

  return (
    <div>
      <h2>Available Jobs</h2>

      {gigs.map(g => (
        <div key={g._id} style={{border:"1px solid black", margin:10, padding:10}}>
          <h3>{g.title}</h3>
          <p>{g.description}</p>

          <input placeholder="Message" onChange={e => setMessage(e.target.value)} />
          <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
          <button onClick={() => apply(g._id)}>Apply</button>

          <br /><br />
          <button onClick={() => openBids(g._id)}>View Bids (Client)</button>
        </div>
      ))}
    </div>
  )
}

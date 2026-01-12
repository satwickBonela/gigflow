import { useEffect, useState } from "react"
import api from "./api"

export default function ClientBids({ gigId, goBack }) {
  const [bids, setBids] = useState([])

  useEffect(() => {
    api.get(`/api/bids/${gigId}`).then(res => setBids(res.data))
  }, [gigId])

  const hire = async (bidId) => {
    await api.patch(`/api/bids/${bidId}/hire`)
    alert("Freelancer hired")
    goBack()
  }

  return (
    <div>
      <h2>Bids</h2>
      <button onClick={goBack}>⬅ Back</button>

      {bids.map(b => (
        <div key={b._id} style={{border:"1px solid black", margin:10, padding:10}}>
          <p>{b.message}</p>
          <p>₹{b.price}</p>
          <button onClick={() => hire(b._id)}>Hire</button>
        </div>
      ))}
    </div>
  )
}

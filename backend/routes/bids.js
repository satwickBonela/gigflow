const express = require("express")
const Bid = require("../models/Bid")
const Gig = require("../models/Gig")
const jwt = require("jsonwebtoken")

const router = express.Router()

// Auth middleware
const auth = (req,res,next)=>{
  const token = req.cookies.token
  if(!token) return res.status(401).json("Not logged in")

  try{
    const data = jwt.verify(token,"secret123")
    req.userId = data.id
    next()
  }catch{
    res.status(401).json("Invalid token")
  }
}

// Submit a bid
router.post("/", auth, async (req,res)=>{
  const { gigId, message, price } = req.body

  const bid = await Bid.create({
    gigId,
    freelancerId: req.userId,
    message,
    price
  })

  res.json(bid)
})

// Get all bids for a gig (only owner)
router.get("/:gigId", auth, async (req,res)=>{
  const gig = await Gig.findById(req.params.gigId)

  if(gig.ownerId.toString() !== req.userId){
    return res.status(403).json("Not your gig")
  }

  const bids = await Bid.find({ gigId: req.params.gigId })
  res.json(bids)
})
// Hire a freelancer
router.patch("/:bidId/hire", auth, async (req,res)=>{
  const bid = await Bid.findById(req.params.bidId)
  const gig = await Gig.findById(bid.gigId)

  // Only gig owner can hire
  if(gig.ownerId.toString() !== req.userId){
    return res.status(403).json("Not allowed")
  }

  // Update gig
  gig.status = "assigned"
  await gig.save()

  // Set selected bid as hired
  bid.status = "hired"
  await bid.save()

  // Reject other bids
  await Bid.updateMany(
    { gigId: gig._id, _id: { $ne: bid._id } },
    { status: "rejected" }
  )

  res.json("Freelancer hired successfully")
})

module.exports = router

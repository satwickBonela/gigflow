const express = require("express")
const Gig = require("../models/Gig")
const jwt = require("jsonwebtoken")

const router = express.Router()

// Middleware to get logged in user
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

// Create Gig
router.post("/", auth, async (req,res)=>{
  const {title,description,budget} = req.body
  const gig = await Gig.create({
    title,
    description,
    budget,
    ownerId:req.userId
  })
  res.json(gig)
})

// Get all open gigs
router.get("/", async (req,res)=>{
  const search = req.query.search || ""
  const gigs = await Gig.find({
    status:"open",
    title:{$regex:search,$options:"i"}
  })
  res.json(gigs)
})

module.exports = router

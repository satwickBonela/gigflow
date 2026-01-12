const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()

router.post("/register", async (req,res)=>{
  const {name,email,password} = req.body
  const hash = await bcrypt.hash(password,10)
  const user = await User.create({name,email,password:hash})
  res.json(user)
})

router.post("/login", async (req,res)=>{
  const {email,password} = req.body
  const user = await User.findOne({email})
  if(!user) return res.status(400).json("Invalid email")

  const ok = await bcrypt.compare(password,user.password)
  if(!ok) return res.status(400).json("Invalid password")

  const token = jwt.sign({id:user._id}, "secret123")
  res.cookie("token", token, {httpOnly:true}).json(user)
})

module.exports = router

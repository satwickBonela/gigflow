const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) return res.json(null)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")

    res.json(user)
  } catch {
    res.json(null)
  }
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

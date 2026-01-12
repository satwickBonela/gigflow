const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json("User already exists")

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hash
    })

    res.json(user)
  } catch (err) {
    res.status(500).json("Registration failed")
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json("Invalid email")

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json("Invalid password")

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    )

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    }).json(user)

  } catch (err) {
    res.status(500).json("Login failed")
  }
})

// Get current user
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

module.exports = router

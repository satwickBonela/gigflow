const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: "User already exists" })

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hash
    })

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Registration failed" })
  }
})

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid email" })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json({ message: "Invalid password" })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true
    }).json(user)

  } catch (err) {
    res.status(500).json({ message: "Login failed" })
  }
})

// CURRENT USER
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) return res.json(null)

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")

    res.json(user)
  } catch (err) {
    res.json(null)
  }
})

module.exports = router

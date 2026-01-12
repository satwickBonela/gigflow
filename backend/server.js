require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const app = express()

// 🔥 MANUAL CORS (ONLY THIS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ver-git-main-satwickbonelas-projects.vercel.app")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  if (req.method === "OPTIONS") return res.sendStatus(200)
  next()
})

app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err))

app.get("/", (req, res) => res.send("GigFlow API Running"))

app.use("/api/auth", require("./routes/auth"))
app.use("/api/gigs", require("./routes/gigs"))
app.use("/api/bids", require("./routes/bids"))

app.listen(5000, () => console.log("Backend running"))

require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

// 🔥 CORS MUST BE FIRST
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ver-git-main-satwickbonelas-projects.vercel.app"
  ],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err))

app.get("/", (req, res) => res.send("GigFlow API Running"))

app.use("/api/auth", require("./routes/auth"))
app.use("/api/gigs", require("./routes/gigs"))
app.use("/api/bids", require("./routes/bids"))

app.listen(5000, () => console.log("Backend running on port 5000"))

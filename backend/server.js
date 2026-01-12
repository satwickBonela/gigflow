require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

// Debug: show Mongo URL
console.log("MONGO_URI =", process.env.MONGO_URI)

// Connect MongoDB (ONLY ONCE)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err))

app.use(cors({
  origin:"https://gigflow.vercel.app",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => res.send("GigFlow API Running"))

// Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/gigs", require("./routes/gigs"))
app.use("/api/bids", require("./routes/bids"))

app.listen(5000, () => console.log("Backend running on port 5000"))

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect("mongoose.connect(process.env.MONGO_URI")

.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

app.get("/", (req,res)=>res.send("GigFlow API Running"))

// ROUTES must be before listen
app.use("/api/auth", require("./routes/auth"))
app.use("/api/gigs", require("./routes/gigs"))
app.use("/api/bids", require("./routes/bids"))



app.listen(5000, () => console.log("Backend running on port 5000"))

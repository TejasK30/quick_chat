import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoute"

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("quick_chat Node.js Backend is running with Prisma ORM.")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT || 5000}`)
})

export default app

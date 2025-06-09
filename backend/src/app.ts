import { createAdapter } from "@socket.io/redis-streams-adapter"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { connectKafkaProducer } from "./config/kafka.config"
import redis from "./config/redis.config"
import { consumeMessages } from "./helper"
import authRoutes from "./routes/authRoute"
import chatGroupRoutes from "./routes/chatgroup"
import { setupSocket } from "./socket"

const app = express()
const PORT = process.env.PORT || 5000

const server = createServer(app)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
)

connectKafkaProducer().catch((err) =>
  console.log("Error connecting kafka producer", err)
)

consumeMessages(process.env.KAFKA_TOPIC || "chats").catch((err) =>
  console.log("Error consuming messages from Kafka topic", err)
)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  adapter: createAdapter(redis),
})

setupSocket(io)

export { io }

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/chat", chatGroupRoutes)

app.get("/", (req, res) => {
  res.send("quick_chat Node.js Backend is running with Prisma ORM.")
})

server.listen(PORT, () => {
  console.log(`Server is running with Socket.IO on port ${PORT}`)
})

export default app

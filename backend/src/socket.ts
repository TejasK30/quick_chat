import { produceMessage } from "./helper"
import { Socket, Server as SocketIOServer } from "socket.io"

interface customSocket extends Socket {
  room?: string
}

export function setupSocket(io: SocketIOServer) {
  io.use((socket: customSocket, next: (err?: any) => void) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room
    // socket.handshake.headers.room for testing via postman

    if (!room) {
      return next(new Error("Invalid room"))
    }

    socket.room = room
    next()
  })

  io.on("connection", (socket: customSocket) => {
    console.log("Socket connected: ", socket.id)

    // join room
    socket.join(socket.room!)

    socket.on("message", async (data) => {
      // send data to specific room

      await produceMessage(process.env.KAFKA_TOPIC!, data)

      socket.to(socket.room!).emit("message", data)
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected: ", socket.id)
    })
  })
}

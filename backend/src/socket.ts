import { Socket, Server as SocketIOServer } from "socket.io"

export function setupSocket(io: SocketIOServer) {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected: ", socket.id)

    socket.on("disconnect", () => {
      console.log("Socket disconnected: ", socket.id)
    })
  })
}

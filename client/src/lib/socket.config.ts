import { io, Socket } from "socket.io-client"
import { API_BASE_URL } from "./api"

let socket: Socket

export const getsocket = (): Socket => {
  if (!socket) {
    socket = io(API_BASE_URL, { autoConnect: false })
  }

  return socket
}

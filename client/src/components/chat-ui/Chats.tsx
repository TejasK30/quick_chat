import { getsocket } from "@/lib/socket.config"
import { ChatGroupType, GroupChatUserType, MessageType } from "@/types"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "../ui/button"

export default function Chats({
  group,
  oldMessages,
  chatUser,
  setOpen,
}: {
  group: ChatGroupType
  oldMessages: Array<MessageType> | []
  chatUser?: GroupChatUserType
  setOpen: (open: boolean) => void
}) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const socket = useMemo(() => {
    const socket = getsocket()
    socket.auth = { room: group.id }
    return socket.connect()
  }, [group.id])

  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, data])
      scrollToBottom()
    })

    return () => {
      socket.close()
    }
  }, [socket])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!message.trim()) return

    if (!chatUser?.name) {
      setOpen(true)
      return
    }

    const payload: MessageType = {
      id: uuidv4(),
      message: message.trim(),
      name: chatUser.name,
      created_at: new Date().toISOString(),
      group_id: group.id,
    }

    socket.emit("message", payload)
    setMessage("")
    setMessages([...messages, payload])
    scrollToBottom()
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse min-h-0">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`w-fit rounded-lg p-2 flex flex-col ${
                msg.name === chatUser?.name
                  ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white self-end"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}
            >
              <p className="text-sm font-bold">{msg.name}</p>
              {msg.message}
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-2 gap-2 flex items-center shrink-0 border-t pt-2"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="px-4 py-2 bg-violet-700 h-full" type="submit">
          Send
        </Button>
      </form>
    </div>
  )
}

"use client"

import { ChatGroupType, GroupChatUserType, MessageType } from "@/types"
import { useEffect, useState } from "react"
import ChatNav from "./Chatnav"
import ChatSidebar from "./ChatSideBar"
import ChatUserDialog from "./ChatUserDialog"
import Chats from "./Chats"

const ChatBase = ({
  group,
  users,
  oldMessages,
}: {
  group: ChatGroupType
  users: Array<GroupChatUserType> | []
  oldMessages: Array<MessageType> | []
}) => {
  const [open, setOpen] = useState(true)
  const [chatUser, setChatUser] = useState<GroupChatUserType>()

  useEffect(() => {
    const data = localStorage.getItem(group.id)
    if (data) {
      const pData = JSON.parse(data)
      setChatUser(pData)
    }
  }, [group.id])

  return (
    <>
      <div className="flex">
        <ChatSidebar users={users} />
        <div className="w-full md:w-4/5 bg-gradient-x-0 items-center">
          {open ? (
            <ChatUserDialog group={group} open={open} setOpen={setOpen} />
          ) : (
            <ChatNav chatGroup={group} users={users} />
          )}

          <Chats group={group} oldMessages={oldMessages} chatUser={chatUser} />
        </div>
      </div>
    </>
  )
}

export default ChatBase

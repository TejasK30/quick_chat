"use client"

import { ChatGroupType, GroupChatUserType, MessageType } from "@/types"
import { useState, useEffect } from "react"
import ChatNav from "./Chatnav"
import ChatSidebar from "./ChatSideBar"
import ChatUserDialog from "./ChatUserDialog"
import Chats from "./Chats"
import useCurrentUser from "@/hooks/useCurrentUser"
import { useRouter } from "next/navigation"

const ChatBase = ({
  group,
  users,
  oldMessages,
}: {
  group: ChatGroupType
  users: Array<GroupChatUserType> | []
  oldMessages: Array<MessageType> | []
}) => {
  const [open, setOpen] = useState(true) // ✅ always open dialog first
  const [chatUser, setChatUser] = useState<GroupChatUserType>()

  const router = useRouter()
  const { data: currentUser, error: autherror } = useCurrentUser()

  useEffect(() => {
    if (autherror && !currentUser) {
      router.push("/login")
    }
  }, [currentUser, router, autherror])

  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSidebar users={users} />
      <div className="flex flex-col w-full md:w-4/5 h-screen overflow-hidden">
        {open ? (
          <ChatUserDialog
            group={group}
            open={open}
            setOpen={setOpen}
            setChatUser={setChatUser}
          />
        ) : (
          <ChatNav chatGroup={group} users={users} chatUser={chatUser} />
        )}

        <Chats
          group={group}
          oldMessages={oldMessages}
          chatUser={chatUser}
          setOpen={setOpen}
        />
      </div>
    </div>
  )
}

export default ChatBase

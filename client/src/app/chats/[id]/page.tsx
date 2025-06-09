import ChatBase from "@/components/chat-ui/ChatBase"
import { fetchChats } from "@/fetch/chatsFetch"
import { getChatGroup, getGroupUsers } from "@/fetch/groupFetch"
import { ChatGroupType, GroupChatUserType, MessageType } from "@/types"
import { notFound } from "next/navigation"

const Chat = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  if (id.length !== 36) {
    return notFound()
  }

  const group: ChatGroupType | null = await getChatGroup(id)

  const users: Array<GroupChatUserType> = await getGroupUsers(id)

  const chats: Array<MessageType> | [] = await fetchChats(params.id)

  if (group === null) {
    return notFound()
  }

  return (
    <>
      <ChatBase users={users} group={group} oldMessages={chats} />
    </>
  )
}

export default Chat

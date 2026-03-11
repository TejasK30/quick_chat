import ChatBase from "@/components/chat-ui/ChatBase"
import { fetchChats } from "@/fetch/chatsFetch"
import { getChatGroup, getGroupUsers } from "@/fetch/groupFetch"
import { ChatGroupType, GroupChatUserType, MessageType } from "@/types"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

const Chat = async ({ params }: { params: { id: string } }) => {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  if (!token) {
    redirect("/login")
  }

  const { id } = params

  if (id.length !== 36) {
    return notFound()
  }

  const group: ChatGroupType | null = await getChatGroup(id)

  if (!group) {
    return notFound()
  }

  const users: GroupChatUserType[] = await getGroupUsers(id)

  const chats: MessageType[] = await fetchChats(id)

  return <ChatBase users={users} group={group} oldMessages={chats} />
}

export default Chat

import ChatBase from "@/components/chat-ui/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";
import { getChatGroup, getGroupUsers } from "@/fetch/groupFetch";
import { ChatGroupType, GroupChatUserType, MessageType } from "@/types";
import { notFound, redirect } from "next/navigation";

type ApiError = {
  status: number;
  message?: string;
};

const Chat = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  if (id.length !== 36) {
    return notFound();
  }

  try {
    const group: ChatGroupType | null = await getChatGroup(id);

    if (!group) return notFound();

    const users: GroupChatUserType[] = await getGroupUsers(id);

    const chats: MessageType[] = await fetchChats(id);

    return <ChatBase users={users} group={group} oldMessages={chats} />;
  } catch (err: unknown) {
    const error = err as ApiError;

    if (error.status === 401) {
      redirect("/login");
    }

    throw err;
  }
};

export default Chat;

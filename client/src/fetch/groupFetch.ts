import { ChatGroupType } from "@/types"

type ChatGroupResponse = {
  data: ChatGroupType[] | []
}

export const getChatGroups = async (): Promise<ChatGroupResponse> => {
  const response = await fetch("http://localhost:5000/api/chat/chat-group", {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch chat groups")
  }

  return response.json()
}

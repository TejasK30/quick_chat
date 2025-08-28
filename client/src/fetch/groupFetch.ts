import { CHAT_GROUP } from "@/lib/api"

export const getChatGroups = async () => {
  const response = await fetch("http://localhost:5000/api/chat/chat-group", {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch chat groups")
  }

  return response.json()
}

export const getChatGroup = async (groupId: string) => {
  try {
    const response = await fetch(`${CHAT_GROUP}/${groupId}`, {
      method: "GET",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch chat groups`)
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error("Fetch error:", error)
    throw error
  }
}

export const getGroupUsers = async (groupId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/chat/chat-group-users/?groupId=${groupId}`,
    {
      method: "GET",
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await response.json()

  if (data?.users) {
    return data.users
  }

  return []
}

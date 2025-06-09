import { CHATS_URL } from "@/lib/api"

export async function fetchChats(groupId: string) {
  const res = await fetch(`${CHATS_URL}/${groupId}`, {
    method: "GET",
    credentials: "include",
    cache: "no-cache",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const response = await res.json()
  if (response?.data) {
    return response?.data
  }
  return []
}

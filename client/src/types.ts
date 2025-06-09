//group details
export type ChatGroupType = {
  id: string
  user_id: string
  title: string
  passcode: string
  created_at: string
}

// user details
export type GroupChatUserType = {
  id: number
  name: string
  group_id: string
  created_at: string
  isOnline?: boolean
}

// message details
export type MessageType = {
  id: string
  message: string
  group_id: string
  name: string
  created_at: string
}

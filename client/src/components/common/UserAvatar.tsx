import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserAvatar({ name }: { name: string }) {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  )
}

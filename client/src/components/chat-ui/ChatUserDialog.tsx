"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CHAT_GROUP_USERS } from "@/lib/api"
import { ChatGroupType, GroupChatUserType } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import React, { Dispatch, SetStateAction, useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const addUserToGroup = async (userData: { name: string; group_id: string }) => {
  const response = await fetch(`${CHAT_GROUP_USERS}/add`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  return response.json()
}

export default function ChatUserDialog({
  open,
  setOpen,
  group,
  setChatUser,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  group: ChatGroupType
  setChatUser: (user: GroupChatUserType) => void
}) {
  const params = useParams()
  const groupId = params["id"] as string
  const queryClient = useQueryClient()

  const [state, setState] = useState({
    name: "",
    passcode: "",
  })

  const addUserMutation = useMutation({
    mutationFn: addUserToGroup,
    onSuccess: (result) => {
      setChatUser(result?.data)
      setOpen(false)

      queryClient.invalidateQueries({ queryKey: ["chatUsers", groupId] })
      queryClient.invalidateQueries({ queryKey: ["chatGroup", groupId] })
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!")
    },
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!state.name.trim()) {
      toast.error("Please enter your name!")
      return
    }

    if (group.passcode !== state.passcode) {
      toast.error("Please enter correct passcode!")
      return
    }

    addUserMutation.mutate({
      name: state.name,
      group_id: groupId,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Name and Passcode</DialogTitle>
          <DialogDescription>
            Add your name and passcode to join in room
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-2">
            <Input
              placeholder="Enter your name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>

          <div className="mt-2">
            <Input
              placeholder="Enter your passcode"
              value={state.passcode}
              onChange={(e) => setState({ ...state, passcode: e.target.value })}
            />
          </div>

          <div className="mt-2">
            <Button className="w-full" disabled={addUserMutation.isPending}>
              {addUserMutation.isPending ? "Joining..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

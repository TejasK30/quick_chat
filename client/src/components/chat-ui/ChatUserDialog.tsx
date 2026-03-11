"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getChatGroup } from "@/fetch/groupFetch"
import useCurrentUser from "@/hooks/useCurrentUser"
import { CHAT_GROUP_USERS } from "@/lib/api"
import { ChatGroupType } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
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
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  group: ChatGroupType
}) {
  const params = useParams()
  const groupId = params["id"] as string
  const queryClient = useQueryClient()

  const [state, setState] = useState({
    name: "",
    passcode: "",
  })

  const { data: user } = useCurrentUser()

  const { data } = useQuery({
    queryKey: ["get-group", groupId],
    queryFn: () => getChatGroup(groupId),
  })

  const addUserMutation = useMutation({
    mutationFn: addUserToGroup,
    onSuccess: (result) => {
      localStorage.setItem(groupId, JSON.stringify(result?.data))

      queryClient.invalidateQueries({
        queryKey: ["chatUsers", groupId],
      })

      queryClient.invalidateQueries({
        queryKey: ["chatGroup", groupId],
      })
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!")
    },
  })

  useEffect(() => {
    const data = localStorage.getItem(groupId)

    if (data) {
      const jsonData = JSON.parse(data)

      if (jsonData?.name && jsonData?.group_id) {
        setOpen(false)
      }
    }
  }, [groupId, setOpen])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (group.passcode !== state.passcode) {
      toast.error("Please enter correct passcode!")
      return
    }

    const localData = localStorage.getItem(groupId)

    if (!localData) {
      addUserMutation.mutate({
        name: state.name,
        group_id: groupId,
      })
    }

    setOpen(false)
  }

  const isUser: boolean = data?.name === user?.name

  if (isUser) return null

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
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { ChatGroupType } from "@/types"
import { CHAT_GROUP_USERS } from "@/lib/api"

const addUserToGroup = async (userData: { name: string; group_id: string }) => {
  const response = await fetch(`${CHAT_GROUP_USERS}/add`, {
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
  const queryClient = useQueryClient()
  const [state, setState] = useState({
    name: "",
    passcode: "",
  })

  const addUserMutation = useMutation({
    mutationFn: addUserToGroup,
    onSuccess: (result) => {
      localStorage.setItem(params["id"] as string, JSON.stringify(result?.data))
      // Invalidate queries to update the UI
      queryClient.invalidateQueries({ queryKey: ["chatUsers", params["id"]] })
      queryClient.invalidateQueries({ queryKey: ["chatGroup", params["id"]] })
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!")
    },
  })

  useEffect(() => {
    const data = localStorage.getItem(params["id"] as string)
    if (data) {
      const jsonData = JSON.parse(data)
      if (jsonData?.name && jsonData?.group_id) {
        setOpen(false)
      }
    }
  }, [params, setOpen])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const localData = localStorage.getItem(params["id"] as string)
    if (!localData) {
      addUserMutation.mutate({
        name: state.name,
        group_id: params["id"] as string,
      })
    }
    if (group.passcode !== state.passcode) {
      toast.error("Please enter correct passcode!")
    } else {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open}>
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

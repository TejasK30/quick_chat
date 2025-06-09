"use client"
import React, { useState, useEffect, Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { clearCache } from "@/actions/common"
import { CHAT_GROUP } from "@/lib/api"
import { ChatGroupType } from "@/types"
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validations/groupChatValidation"
import { useQueryClient } from "@tanstack/react-query"

export default function EditGroupChat({
  group,
  open,
  setOpen,
}: {
  group: ChatGroupType
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  })

  useEffect(() => {
    setValue("title", group.title)
    setValue("passcode", group.passcode)
  }, [group, setValue])

  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      setLoading(true)

      const response = await fetch(`${CHAT_GROUP}/${group.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
        next: { tags: ["dashboard"] },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update chat group")
      }

      if (data?.message) {
        setOpen(false)
        clearCache("dashboard")
        toast.success(data.message)
        await queryClient.invalidateQueries({ queryKey: ["chat-groups"] })
      }
    } catch (error: any) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Something went wrong. Please try again!")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passcode")} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

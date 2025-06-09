import React, { Dispatch, SetStateAction, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { CHAT_GROUP } from "@/lib/api"
import { clearCache } from "@/actions/common"
import { useQueryClient } from "@tanstack/react-query"

export default function DeleteChatGroup({
  open,
  setOpen,
  groupId,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  groupId: string
}) {
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const deleteChatGroup = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${CHAT_GROUP}/${groupId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        next: { tags: ["dashboard"] },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || "Failed to delete chat group")
      }

      if (data?.message) {
        setOpen(false)
        clearCache("dashboard")
        toast.success(data.message)
        await queryClient.invalidateQueries({ queryKey: ["chat-groups"] })
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your chat
            group and it&apos;s conversations.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={deleteChatGroup}>
            {loading ? "Processing.." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

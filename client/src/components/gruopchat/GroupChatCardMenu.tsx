"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChatGroupType } from "@/types"
import { Copy, Edit, EllipsisVertical, Trash2 } from "lucide-react"
import dynamic from "next/dynamic"
import { Suspense, useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import EditGroupChat from "./EditChatGroup"
const DeleteChatGroup = dynamic(() => import("./DeleteChatGroup"))

export function GroupChatCardMenu({ group }: { group: ChatGroupType }) {
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(`http://localhost:3000/chats/${group.id}`)
    toast.success("Link copied successfully!")
  }

  return (
    <>
      {deleteDialog && (
        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Loading...</div>
          }
        >
          <DeleteChatGroup
            open={deleteDialog}
            setOpen={setDeleteDialog}
            groupId={group.id}
          />
        </Suspense>
      )}
      {editDialog && (
        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Loading...</div>
          }
        >
          <EditGroupChat
            open={editDialog}
            setOpen={setEditDialog}
            group={group}
          />
        </Suspense>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setEditDialog(true)}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteDialog(true)}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

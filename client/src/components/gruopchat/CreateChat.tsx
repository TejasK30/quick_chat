import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CHAT_GROUP } from "@/lib/api"
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validations/groupChatValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useQueryClient } from "@tanstack/react-query"

const CreateChat = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  })

  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      setLoading(true)
      const response = await fetch(`${CHAT_GROUP}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        toast.error(data.message || "Something went wrong")
        setLoading(false)
        return
      }

      setOpen(false)
      toast.success(data.message)
      reset()
      await queryClient.invalidateQueries({ queryKey: ["chat-groups"] })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong. Please try again!")
      console.log(error)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Chat</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new group chat</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <Input placeholder="Enter chat title" {...register("title")} />
              <span className="text-red-500">{errors.title?.message}</span>
            </div>
            <div className="mt-4">
              <Input
                placeholder="Enter chat passcode"
                {...register("passcode")}
              />
              <span className="text-red-500">{errors.passcode?.message}</span>
            </div>
            <div className="mt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Processing" : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateChat

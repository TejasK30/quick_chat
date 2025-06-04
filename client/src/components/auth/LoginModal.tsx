"use client"

import React, { useState } from "react"
import { useLogin } from "@/hooks/useLogin"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginModal() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [apiMessage, setApiMessage] = useState<string | null>(null)

  const router = useRouter()
  const loginMutation = useLogin()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setApiMessage(null)

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push("/dashboard")
        },
        onError: (error) => {
          setApiMessage(error.message)
        },
      }
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Get started</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Login to QuickChat</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="font-bold">
              Your email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="font-bold">
              Your password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {apiMessage && (
            <p className="text-sm text-red-600">{apiMessage}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in…" : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

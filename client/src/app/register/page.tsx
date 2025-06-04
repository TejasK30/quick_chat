"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegister } from "@/hooks/useRegister"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [apiMessage, setApiMessage] = useState<string | null>(null)

  const router = useRouter()
  const loginMutation = useRegister()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setApiMessage(null)

    loginMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          router.push("/dashboard")
        },
        onError: (error: Error) => {
          setApiMessage(error.message)
        },
      }
    )
  }

  return (
    <>
      <div className="flex flex-col min-h-screen w-full items-center justify-center ">
        <h1 className="font-bold text-2xl p-4">Register page</h1>
        <form
          className="flex flex-col gap-2 border border-gray-500 p-5 rounded-3xl w-[30vw]"
          onSubmit={handleRegister}
        >
          <Label htmlFor="email" className="font-bold">
            Your email address
          </Label>
          <Input
            name="email"
            placeholder="Enter your email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="name" className="font-bold">
            Your Name
          </Label>
          <Input
            name="name"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="name" className="font-bold">
            Your Password
          </Label>
          <Input
            name="password"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {apiMessage && (
            <>
              <span className="text-red-500">{apiMessage}</span>
            </>
          )}
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <span>
          Already have an account ?
          <Link className="text-blue-700" href="/login">
            Login
          </Link>{" "}
          here
        </span>
      </div>
    </>
  )
}

export default RegisterPage

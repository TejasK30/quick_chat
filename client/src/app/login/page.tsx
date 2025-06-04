"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from "@/hooks/useLogin"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const LoginPage = () => {
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
        onError: (error: Error) => {
          setApiMessage(error.message)
        },
      }
    )
  }
  return (
    <>
      <div className="flex flex-col min-h-screen w-full items-center justify-center ">
        <h1 className="font-bold text-2xl p-4">login page</h1>
        <form
          className="flex flex-col gap-2 border border-gray-500 p-5 rounded-3xl w-[30vw]"
          onSubmit={handleLogin}
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
          <Label htmlFor="password" className="font-bold">
            Your email address
          </Label>
          <Input
            name="password"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {apiMessage && <p className="text-sm text-red-600">{apiMessage}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <span>
          Dont&apos;t have an account ?
          <Link className="text-blue-700" href="/register">
            Register
          </Link>{" "}
          here
        </span>
      </div>
    </>
  )
}

export default LoginPage

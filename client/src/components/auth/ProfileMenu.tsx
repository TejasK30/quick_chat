"use client"
import React, { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dynamic from "next/dynamic"
import UserAvatar from "../common/UserAvatar"
const LogoutModal = dynamic(() => import("../auth/LogoutModal"))

export default function ProfileMenu({ name }: { name: string }) {
  const [logoutOpen, setLogoutOpen] = useState(false)
  return (
    <>
      {logoutOpen && <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={name} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLogoutOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

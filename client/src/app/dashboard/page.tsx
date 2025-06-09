"use client"

import ProfileMenu from "@/components/auth/ProfileMenu"
import CreateChat from "@/components/gruopchat/CreateChat"
import GroupChatCard from "@/components/gruopchat/GroupChatCard"
import { getChatGroups } from "@/fetch/groupFetch"
import useCurrentUser from "@/hooks/useCurrentUser"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

const Dashboard = () => {
  const router = useRouter()
  const { data: user, error: autherror } = useCurrentUser()

  const {
    data: groupResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chat-groups"],
    queryFn: getChatGroups,
  })

  useEffect(() => {
    if (autherror) {
      router.push("/login")
    }
  }, [autherror, router])

  if (isLoading)
    return <div className="text-center mt-10">Loading chat groups...</div>
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Error fetching groups
      </div>
    )

  const groups = groupResponse?.data ?? []

  return (
    <div>
      <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-xl md:text-2xl font-extrabold">QuickChat</h1>
        <div className="flex items-center space-x-2 md:space-x-6 text-gray-700 cursor-pointer">
          <ProfileMenu name={user?.name} />
        </div>
      </nav>

      <div className="flex justify-center mt-10">
        <CreateChat />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {groups.length > 0 ? (
          groups.map((item) => <GroupChatCard group={item} key={item.id} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No groups found.
          </p>
        )}
      </div>
    </div>
  )
}

export default Dashboard

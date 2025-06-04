import useCurrentUser from "@/hooks/useCurrentUser"
import React from "react"

const Dashboard = () => {
  const { data: user } = useCurrentUser()

  return (
    <>
      <div>
        <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
          <h1 className="text-xl md:text-2xl font-extrabold">QuickChat</h1>
          <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
            {user.name}
          </div>
        </nav>
      </div>
    </>
  )
}

export default Dashboard

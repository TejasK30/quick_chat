import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

interface apiResponse {
  message: string
}

const url = "http://localhost:5000/api"

const logoutRequest = async (): Promise<apiResponse> => {
  const response = await fetch(`${url}/auth/logout`, {
    method: "POST",
    credentials: "include",
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.message || "Logout failed")
  }

  return response.json()
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation<apiResponse, Error>({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear()
      router.push("/login")
    },
  })
}

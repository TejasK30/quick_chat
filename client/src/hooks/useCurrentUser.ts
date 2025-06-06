import { API_URL } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_URL}/auth/verify`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Unauthorized")
  }

  return response.json()
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["verify-token"],
    queryFn: fetchCurrentUser,
    retry: false,
  })
}

export default useCurrentUser

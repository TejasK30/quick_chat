import { useQuery } from "@tanstack/react-query"

const URL = "http://localhost:5000/api"

export const fetchCurrentUser = async () => {
  const response = await fetch(`${URL}/auth/verify`, {
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

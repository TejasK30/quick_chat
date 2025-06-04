import { useMutation, useQueryClient } from "@tanstack/react-query"

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
    throw new Error(err.message || "Login failed")
  }

  return response.json()
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation<apiResponse, Error>({
    // custom response and data type set
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logoutUser"] })
    },
  })
}

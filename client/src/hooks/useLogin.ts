import { LOGIN_URL } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface loginCredentials {
  email: string
  password: string
}

interface apiResponse {
  message: string
}

const loginRuquest = async (
  credentials: loginCredentials
): Promise<apiResponse> => {
  const response = await fetch(`${LOGIN_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.message || "Login failed")
  }

  return response.json()
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation<apiResponse, Error, loginCredentials>({
    // custom response and data type set
    mutationFn: loginRuquest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loginUser"] })
    },
  })
}

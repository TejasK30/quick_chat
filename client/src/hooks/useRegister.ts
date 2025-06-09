import { SIGNUP_URL } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface registerCredentials {
  name: string
  email: string
  password: string
}

interface apiResponse {
  message: string
}

const registerRequest = async (
  credentials: registerCredentials
): Promise<apiResponse> => {
  const response = await fetch(`${SIGNUP_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.message || "Registration failed")
  }

  return response.json()
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation<apiResponse, Error, registerCredentials>({
    // custom response and data type set
    mutationFn: registerRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registerUser"] })
    },
  })
}

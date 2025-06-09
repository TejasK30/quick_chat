import { z } from "zod"

export const createChatSchema = z
  .object({
    title: z
      .string()
      .min(4, { message: "Chat title must be 4 characters long" })
      .max(100, { message: "Chat title must not exceed 100 characters" }),
    passcode: z
      .string()
      .min(4, { message: "Chat passcode must be 4 characters long" })
      .max(100, { message: "Chat passcode must not exceed 25 characters" }),
  })
  .required()

export type createChatSchemaType = z.infer<typeof createChatSchema>

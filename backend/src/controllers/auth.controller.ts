import bcrypt from "bcryptjs"
import crypto from "crypto"
import { Request, Response } from "express"
import { prisma } from "../db/client"
import { generateToken } from "../utils/generateToken"

export const RegisterUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, email, password } = req.body

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" })
    }

    const customId = crypto.randomBytes(16).toString("hex")

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        id: customId,
        name,
        email,
        password: hashedPassword,
      },
    })

    const token = generateToken(newUser.id)

    return res.status(201).json({ userId: newUser.id, token })
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Internal server error" })
  }
}
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: "User doesn't exists" })
    }

    const token = await generateToken(user.id)

    const ismatch = await bcrypt.compare(password, user.password)

    if (!ismatch) {
      return res.status(400).json({ message: "password does not match" })
    }

    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({ message: "Login successful" })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const logoutUser = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })
  return res.status(200).json({ message: "Logged out successfully" })
}

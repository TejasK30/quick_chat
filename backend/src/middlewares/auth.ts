import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { prisma } from "../db/client"

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        name: string
        email: string
      }
    }
  }
}

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

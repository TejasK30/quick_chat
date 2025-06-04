import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface JwtPayload {
  id: string
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
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
    const decoded = (await jwt.verify(token, process.env.JWT_SECRET!)) as {
      id: string
    }

    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" })
  }
}

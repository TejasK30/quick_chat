import { Request, Response } from "express"
import { prisma } from "../db/client"

class chatsController {
  static async getChats(req: Request, res: Response): Promise<any> {
    const { groupId } = req.params
    const chats = await prisma.chats.findMany({
      where: {
        group_id: groupId,
      },
    })
    return res.json({ data: chats })
  }
}

export default chatsController

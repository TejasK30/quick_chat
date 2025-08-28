import { prisma } from "../db/client"
import { Request, Response } from "express"

class chatuserController {
  // get users in group
  static async getUsers(req: Request, res: Response): Promise<any> {
    try {
      const { groupId } = req.params

      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: groupId as string,
        },
      })

      return res.status(200).json({ users })
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ message: "Something went wrong please try again later!" })
    }
  }

  // add user to group
  static async addUser(req: Request, res: Response): Promise<any> {
    try {
      const body = req.body

      const user = await prisma.groupUsers.create({
        data: body,
      })
      return res.json({ message: "User created successfully!", data: user })
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" })
    }
  }
}

export default chatuserController

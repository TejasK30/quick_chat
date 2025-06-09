import { Request, Response } from "express"
import { prisma } from "../db/client"
class chatgroupController {
  // create chat group
  static async CreateGroup(req: Request, res: Response): Promise<any> {
    try {
      const { title, passcode } = req.body
      const user = req.user?.id

      await prisma.chatgroup.create({
        data: {
          title: title,
          passcode: passcode,
          user_id: user as string,
        },
      })

      return res.status(201).json({ message: "chat group crated succesfully" })
    } catch (error) {
      return res
        .status(500)
        .json("Something went wrong! please try again later.")
    }
  }

  // get group chats
  static async getGroupChats(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?.id

      const groups = await prisma.chatgroup.findMany({
        where: {
          user_id: userId,
        },
        orderBy: {
          created_at: "desc",
        },
      })

      return res.json({ message: "Date fetched successfully!", data: groups })
    } catch (error) {
      return res
        .status(500)
        .json("Something went wrong! please try again later.")
    }
  }

  // get group based on gruop id
  static async GetGroup(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params

      console.log(id)

      if (id) {
        const group = await prisma.chatgroup.findUnique({
          where: {
            id: id,
          },
        })

        console.log(group)
        return res.json({ data: group })
      }
      return res.status(404).json({ message: "No group found!" })
    } catch (error) {
      return res
        .status(500)
        .json("Something went wrong! please try again later.")
    }
  }

  // update group
  static async updateGroup(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const body = req.body
      if (id) {
        const group = await prisma.chatgroup.update({
          where: {
            id: id,
          },
          data: body,
        })

        return res.json({ message: "Group updated successfully!" })
      }
      return res.status(404).json({ message: "No group found!" })
    } catch (error) {
      return res
        .status(500)
        .json("Something went wrong! please try again later.")
    }
  }

  // delete group
  static async deletegroup(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      await prisma.chatgroup.delete({
        where: {
          id: id,
        },
      })
      return res.json({ message: "Chat Deleted successfully!" })
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" })
    }
  }
}

export default chatgroupController

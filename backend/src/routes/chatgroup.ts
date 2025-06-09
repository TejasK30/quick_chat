import chatsController from "../controllers/chatsController"
import chatgroupController from "../controllers/chatgroup.controller"
import chatuserController from "../controllers/chatuserController"
import { verify } from "../middlewares/auth"
import { Router } from "express"

const router = Router()
//create chat group
router.post("/chat-group", verify, chatgroupController.CreateGroup)

// get user chat groups
router.get("/chat-group", verify, chatgroupController.getGroupChats)

// get group based on group id
router.get("/chat-group/:id", chatgroupController.GetGroup)

// update group
router.put("/chat-group/:id", verify, chatgroupController.updateGroup)

// delete group
router.delete("/chat-group/:id", verify, chatgroupController.deletegroup)

// get users in group
router.get("/chat-group-users", chatuserController.getUsers)

// add user to group
router.post("/chat-group-users/add", verify, chatuserController.addUser)

// get chats
router.get("/chats/:groupId", chatsController.getChats)

export default router

import chatgroupController from "../controllers/chatgroup.controller"
import { verify } from "../middlewares/auth"
import { Router } from "express"

const router = Router()
//create chat group
router.post("/chat-group", verify, chatgroupController.CreateGroup)

// get user chat groups
router.get("/chat-group", verify, chatgroupController.getGroupChats)

// get group based on group id
router.get("/chat-group/:id", verify, chatgroupController.GetGroup)

// update group
router.put("/chat-group/:id", verify, chatgroupController.updateGroup)

// delete group
router.delete("/chat-group/:id", verify, chatgroupController.deletegroup)

export default router

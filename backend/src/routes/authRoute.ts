import { verify } from "../middlewares/auth"
import {
  loginUser,
  logoutUser,
  RegisterUser,
} from "../controllers/auth.controller"
import { Router } from "express"

const router = Router()

router.post("/register", RegisterUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)

router.get("/verify", verify, (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user })
})

export default router

import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
router.route("/logout").post(LogoutUser)

export default router
import { Router } from "express";
import AuthToken from "../middlewares/Auth.js";
import { GetMessage, SendMessage } from "../controllers/message.controller.js";

const router = Router()

router.get("/users", AuthToken, userSidebar)
router.get("/:id", AuthToken, GetMessage)
router.post("/send/:id", AuthToken, SendMessage)

export default router
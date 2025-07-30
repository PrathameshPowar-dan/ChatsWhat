import { Router } from "express";
import AuthToken from "../middlewares/Auth.js";
import { GetMessage } from "../controllers/message.controller.js";

const router = Router()

router.get("/users", AuthToken, userSidebar)
router.get("/:id", AuthToken, GetMessage)

export default router
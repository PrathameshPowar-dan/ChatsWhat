import { Router } from "express";
import AuthToken from "../middlewares/Auth.js";
import { GetMessage, SendMessage, userSidebar } from "../controllers/message.controller.js";
import { upload } from "../middlewares/Multer.js";

const router = Router()

router.get("/users", AuthToken, userSidebar)
router.get("/:messageId", AuthToken, GetMessage)
router.post("/send/:id", AuthToken, upload.single("image"), SendMessage)

export default router
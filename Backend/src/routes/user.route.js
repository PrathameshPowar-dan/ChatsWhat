import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser, UpdateProfile } from "../controllers/user.controller.js";
import AuthToken from "../middlewares/Auth.js";
import { upload } from "../middlewares/Multer.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "ProfilePic",
            maxCount: 1
        }
    ]),
    RegisterUser
)
router.route("/login").post(LoginUser)
router.route("/logout").post(LogoutUser)
router.put("/update-profile", upload.single("ProfilePic"), AuthToken, UpdateProfile)

export default router
import { Router } from "express";
import { CheckAuth, LoginUser, LogoutUser, RegisterUser, UpdateProfile, UpdateAccountDetails } from "../controllers/user.controller.js";
import AuthToken from "../middlewares/Auth.js";
import { upload } from "../middlewares/Multer.js";

const router = Router()

router.route("/register").post(
    upload.single("ProfilePic"),
    RegisterUser
)
router.route("/login").post(LoginUser)
router.route("/logout").post(LogoutUser)
router.put("/update-profile", upload.single("ProfilePic"), AuthToken, UpdateProfile)
router.get("/check", AuthToken, CheckAuth)
router.patch("/update-details", AuthToken, UpdateAccountDetails)

export default router
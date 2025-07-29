import { Router } from "express";
import AuthToken from "../middlewares/Auth.js";

router.get("/users",AuthToken,userSidebar)
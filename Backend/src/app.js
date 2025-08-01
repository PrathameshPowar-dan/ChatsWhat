import express from "express"
import userRouter from "../src/routes/user.route.js"
import messageRouter from "../src/routes/message.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.js"
const app = express()

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    withCredentials: true,
    credentials: true
}))

app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)
app.use(errorHandler)

export { app }
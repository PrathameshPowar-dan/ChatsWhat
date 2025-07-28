import express from "express"
import userRouter from "../src/routes/user.route.js"
const app = express()

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use("./api/user", userRouter)

export { app }
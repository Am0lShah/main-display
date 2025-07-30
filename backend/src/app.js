import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { Server } from 'socket.io';
import { createServer } from 'http'
import {initializeSocket} from './controllers/socket.controller.js'
import {connectionManage} from './controllers/socket2..controller.js'

const app = express()

const server = createServer(app);


app.use(cors({
    origin:"https://piboard.netlify.app" ||"https://raspmain.netlify.app/" || process.env.CORS_ORIGIN,
    credentials: true, 
    
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://piboard.netlify.app", // Your frontend URL
    credentials: true,
    allowedHeaders: ["authorization"]
  },
  transports: ["websocket", "polling"], // Explicitly enable both
  allowUpgrades: true,
  perMessageDeflate: false ,// Disable if using Nginx
  connectionStateRecovery: {
    maxDisconnectionDuration: 5000
  }
});

initializeSocket(io)
connectionManage(io)

//routes import
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import fileUploadRouter from './routes/fileUpload.routes.js'

//routes declaration
//app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/file-uploads", fileUploadRouter)



// app.use("/api/v1/tweets", tweetRouter)
// app.use("/api/v1/subscriptions", subscriptionRouter)
// app.use("/api/v1/videos", videoRouter)
// app.use("/api/v1/comments", commentRouter)
// app.use("/api/v1/likes", likeRouter)
// app.use("/api/v1/playlist", playlistRouter)
// app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register

export { server }
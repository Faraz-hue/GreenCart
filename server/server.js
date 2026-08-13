import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import sellerRouter from "./routes/sellerRoute.js"
import connectCloudinary from "./config/cloudinary.js"
const app = express()

const port = process.env.PORT || 4000
console.log("MONGODB_URI:", process.env.MONGODB_URI);
await connectDB();
await connectCloudinary()
// Allow multiple origins
const allowedOrigins = ["http://localhost:5173"]
// Middleware configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.get("/", (req, res) => res.send("API is working"))
app.use("/api/user", userRouter)

app.use("/api/seller", sellerRouter)



app.listen(port, () => console.log(`Server is running on http://localhost:${port}`)
)
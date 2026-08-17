import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import sellerRouter from "./routes/sellerRoute.js"
import connectCloudinary from "./config/cloudinary.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import addressRouter from "./routes/addressRoute.js"
import orderRouter from "./routes/orderRoute.js"
import { cloudinary } from "./config/cloudinary.js"

const app = express()
const port = process.env.PORT || 4000

console.log("MONGODB_URI:", process.env.MONGODB_URI);
await connectDB();
await connectCloudinary()
try {
    const result = await cloudinary.api.resources({
        resource_type: "image",
        type: "upload",
        max_results: 1
    })

    console.log("CLOUDINARY API TEST SUCCESS")
    console.log(result.resources)
} catch (error) {
    console.log("CLOUDINARY API TEST FAILED")
    console.dir(error, { depth: null })
}

// Allow multiple origins
const allowedOrigins = ["http://localhost:5173"]
// Middleware configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.get("/", (req, res) => res.send("API is working"))
app.use("/api/user", userRouter)

app.use("/api/seller", sellerRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/order", orderRouter)


app.listen(port, () => console.log(`Server is running on http://localhost:${port}`)
)
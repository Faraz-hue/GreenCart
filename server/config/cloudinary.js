import { v2 as cloudinary } from "cloudinary"

const connectCludinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDNINARY_API_SECRET
    })
}

export default connectCludinary
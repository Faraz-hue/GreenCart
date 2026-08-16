import express from "express"
import authUser from "../middlewares/authUser.js"
import addressController from "../controllers/addressController.js"
const addressRouter = express.Router()

addressRouter.post("/add", authUser, addressController.addAddress)
addressRouter.get("/get", authUser, addressController.getAddress)

export default addressRouter
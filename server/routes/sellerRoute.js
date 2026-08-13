

import express from "express"
import sellerController from "../controllers/sellerController.js"
import authSeller from "../middlewares/authSeller.js"
const sellerRouter = express.Router()

sellerRouter.post("/login", sellerController.SellerLogin)
sellerRouter.get("/is-auth", authSeller, sellerController.isSellerAuth)
sellerRouter.get("/logout", sellerController.sellerLogout)

export default sellerRouter
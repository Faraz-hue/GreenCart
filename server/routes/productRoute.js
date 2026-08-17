import express from "express"
import upload from "../config/multer.js"
import authSeller from "../middlewares/authSeller.js"
import productController from "../controllers/productController.js"
const productRouter = express.Router()

productRouter.post("/add", upload.array("images"),
    authSeller, productController.addProduct)

productRouter.get("/list", productController.productList)

productRouter.get("/id", productController.productById)

productRouter.post("/stock", productController.changeStock)

export default productRouter


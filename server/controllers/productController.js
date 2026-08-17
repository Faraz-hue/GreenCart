import { cloudinary } from "../config/cloudinary.js"
import Product from "../models/product.js"

// Add Product : /api/product/add
const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData)
        const images = req.files
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,
                    { resource_type: "image" }
                )
                return result.secure_url
            })
        )


        await Product.create({
            ...productData, image: imagesUrl
        })
        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.dir(error, { depth: null })   // <-- add this
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }
}

// Get Product : /api/product/list
const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Get Single Product : /api/product/id
const productById = async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Change Product inStock: /api/product/stock
const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body
        const product = await Product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, product })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export default {
    addProduct,
    productList,
    productById,
    changeStock,
}
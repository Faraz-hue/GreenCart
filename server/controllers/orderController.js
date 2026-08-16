import Product from "../models/product.js"
import Order from "../models/order.js"

// Place Order COD :/api/order/cod

const placeOrder = async (req, res) => {
    try {
        const { userId, items, address } = req.body
        if (!address || items.length === 0) {
            return res.json({
                success: false,
                message: "Invalid Data"
            })

        }

        // Calculate Amount Using Items

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity
        }, 0)

        // Add Tac Charge (2%)
        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        })

        return res.json({ success: true, message: "Order Placed Succeccfully" })
    } catch (error) {
        console.log(error.message);
        res.json(
            {
                success: false,
                message: error.message
            }
        )

    }
}

const getUserOrder = async (req, res) => {
    try {

        const { userId } = req.body
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error.message);
        res.json(
            {
                success: false,
                message: error.message
            }
        )

    }
}

// Get All Orders (for seller / admin ) : /api/order/seller

const getAllOrders = async (req, res) => {
    try {

        const { userId } = req.body
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error.message);
        res.json(
            {
                success: false,
                message: error.message
            }
        )

    }
}

export {
    getAllOrders,
    getUserOrder,
    placeOrder,
};
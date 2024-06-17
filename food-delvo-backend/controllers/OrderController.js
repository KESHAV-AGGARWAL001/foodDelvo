import { Order } from "../models/OrderModel.js"
import { User } from "../models/UserModel.js";
import Stripe from 'stripe';


export const placeOrder = async (req, res) => {
    console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
    const frontend_url = "http://localhost:5174"
    try {
        const newOrder = new Order({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();

        await User.findByIdAndUpdate(req.body.userId, {
            cartData: {}
        })

        const lineItems = req.body.items.map((item, index) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))


        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })


        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })


        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}



export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" })
        }
        else {
            await Order.findByIdAndUpdate(orderId)
            res.json({ success: false, message: "unpaid" });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


export const userOrder = async (req, res) => {
    const { userId } = req.body;
    try {
        const orders = await Order.find({ userId });
        return res.json({ success: true, data: orders });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


export const ListOrders = async (req, res) => {
    try {
        const response = await Order.find({});
        return res.json({ success: true, data: response });
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


export const ChangeStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        const order = await Order.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "order is not present" });
        }
        order.status = status;
        await Order.findByIdAndUpdate(orderId, order);
        return res.json({ success: true, message: "status updated" });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
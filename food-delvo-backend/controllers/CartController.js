import { User } from "../models/UserModel.js";


export const addToCart = async (req, res) => {
    try {

        const { userId, itemId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "user is not present" });
        }

        const cartData = user.cartData;
        if (!cartData[itemId]) cartData[itemId] = 1;
        else cartData[itemId] += 1;

        await User.findByIdAndUpdate(userId, { cartData })

        return res.json({ success: true, message: "successfully updated cart" });
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "user is not present" });
        }

        const cartData = user.cartData;
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            await User.findByIdAndUpdate(userId, { cartData });
            return res.json({ success: true, message: "successfully removed from cart" });
        }
        return res.json({ success: false, message: "item is not present so cannot delete" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getCartData = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "user is not authenticated" });
        }

        const cartData = user.cartData;
        return res.json({ success: true, data: cartData });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

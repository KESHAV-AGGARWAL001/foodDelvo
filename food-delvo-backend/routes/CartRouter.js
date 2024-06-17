import express from "express";
import { addToCart, getCartData, removeFromCart } from "../controllers/CartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const CartRouter = express.Router();

CartRouter.get("/get", authMiddleware, getCartData);
CartRouter.post("/add", authMiddleware, addToCart);
CartRouter.post("/remove", authMiddleware, removeFromCart);

export default CartRouter;







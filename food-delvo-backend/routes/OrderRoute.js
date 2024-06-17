import express from "express"
import { ChangeStatus, ListOrders, placeOrder, userOrder, verifyOrder } from "../controllers/OrderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const OrderRouter = express.Router();

OrderRouter.post("/place", authMiddleware, placeOrder);
OrderRouter.post("/verify", verifyOrder);
OrderRouter.post("/userOrders", authMiddleware, userOrder)
OrderRouter.get("/allOrders", ListOrders);
OrderRouter.put("/statusChange", ChangeStatus)


export default OrderRouter;




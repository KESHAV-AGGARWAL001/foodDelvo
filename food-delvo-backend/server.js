import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { dbConnection } from "./config/dbConnnect.js";
import FoodRouter from "./routes/FoodRouter.js";
import UserRouter from "./routes/UserRouter.js";
import CartRouter from "./routes/CartRouter.js";
import OrderRouter from "./routes/OrderRoute.js";

configDotenv()

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static('uploads'));


app.use("/api/food", FoodRouter);
app.use("/api/user", UserRouter);
app.use("/api/cart", CartRouter);
app.use("/api/order" , OrderRouter);

dbConnection();
const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
import express from "express"
import { loginUser, signupUser } from "../controllers/UserController.js";

const UserRouter = express.Router();


UserRouter.post("/signup", signupUser);
UserRouter.post("/login", loginUser);


export default UserRouter;




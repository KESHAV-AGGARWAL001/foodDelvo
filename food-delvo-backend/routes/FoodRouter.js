import express from "express";
import multer from "multer";
import { addItem, getList } from "../controllers/FoodController.js";

const FoodRouter = express.Router();

const storageEngine = multer.diskStorage({
    destination: "./uploads",
    filename: (_, file, cb) => {
        return cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({
    storage: storageEngine
}).single("image");


FoodRouter.post("/add", upload, addItem);
FoodRouter.get("/list", getList)


export default FoodRouter;
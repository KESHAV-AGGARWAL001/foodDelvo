import { Food } from "../models/FoodModel.js";
import fs from "fs";

export const addItem = async (req, res) => {

    try {

        const { name, description, category, price } = req.body;
        const imgFile = req.file.filename;

        const item = new Food({
            name, description, category, price, image: imgFile
        });

        await item.save();
        res.json({ success: true, message: "successfully added item" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const getList = async (req, res) => {
    try {
        const allItems = await Food.find({});
        res.json({ success: true, data: allItems })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const removeItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        const food = await Food.findById(itemId);
        if (!food) {
            res.json({ success: false, message: "Not present item" })
        }
        fs.unlink("uploads/" + food.image, () => { })
        await Food.findByIdAndDelete(itemId, food);
        res.json({ success: true, message: "successfully deleted" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
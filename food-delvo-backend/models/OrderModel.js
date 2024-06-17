import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    userId: {
        type: String, required: true
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Food Processing",
        enum: ["Food Processing", "Delivered"]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: true
    }
})


export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema); 
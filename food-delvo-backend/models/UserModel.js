import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    cartData: {
        type: Object,
        required: true,
        default: {}
    }
})

UserSchema.pre('save', function (next) {
    if (!this.cartData) {
        this.cartData = {};
    }
    next();
});


export const User = mongoose.models.User || mongoose.model("User", UserSchema);
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { User } from "../models/UserModel.js";


const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET)
    return token
}

export const signupUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.json({ success: false, message: "Successfully registered" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "email is not valid" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "not a strong password" });
        }

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.json({ success: false, message: "already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const encodedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: encodedPassword
        })


        await newUser.save();

        const token = createToken(newUser._id);

        return res.json({ success: true, message: "successfully registered", token })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "auth details is not present" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "wrong credentials" });
        }
        const decodedPassword = user.password

        const token = createToken(user._id);

        const isMatch = await bcrypt.compare(password, decodedPassword);
        if (isMatch) {
            return res.json({ success: true, message: "successfully signed in", token });
        }
        return res.json({ success: false, message: "wrong password" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
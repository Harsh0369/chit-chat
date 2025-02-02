import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {email,password,fullname} = req.body;
    try {
        if(!email || !password || !fullname){
            return res.status(400).send("Please fill in all fields");
        }
        if (password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters long");
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send("User with this email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            fullname,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({message:"User created successfully"});
        }
        else {
            res.status(400).send("Invalid user data");
        }
    }
    catch (err) {
        console.log(err);
    }
}

export const login = async (req, res) => {
  res.send("signup");
};

export const logout = async (req, res) => {
  res.send("signup");
};
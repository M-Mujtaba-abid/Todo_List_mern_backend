import {User} from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { makeHashed, checkEncryptedPassword } from "../utils/encryptPassword.js"; // tumhari file ka path de do

// ====================== REGISTER ======================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password using your helper
    // const hashedPassword = await makeHashed(password);

    // create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ====================== LOGIN ======================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password are required" });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password using your helper
    const isMatch = await checkEncryptedPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password not matched" });
    }

    // generate access token (using method from schema)
    const accessToken = user.generateAccessToken();

    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authentication from "./userAuth.js";
const router = express.Router();

//signup
router.post("/signup", async (req, res) => {
  const { username, email, password, address } = req.body;
  try {
    
    //validation
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "username length should be greater than 3" });
    }

    //check if user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //check for email
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //check for password
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password legnth should be greater than 5" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating user
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      address: address,
    });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Internal server error" });
  }
});

//signin
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookStore123", {
          expiresIn: "30d",
        });
        res
          .status(200)
          .json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
          });
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//getuser
router.get("/getuser", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update address
router.put("/updateAddress", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    const data = await User.findByIdAndUpdate(
      id,
      { $set: { address: address } },
      { new: true }
    );
    return res.status(200).json({ message: "Address updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});



export default router;

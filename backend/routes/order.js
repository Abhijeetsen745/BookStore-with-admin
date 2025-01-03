import express from "express";
import User from "../model/user.js";
import Order from "../model/order.js";
import authentication from "./userAuth.js";
const router = express.Router();

//place order
router.post("/placeOrder", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDatafromdb = await newOrder.save();
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDatafromdb._id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.status(200).json({
      status: "success",
      message: "order placed succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get order history of particular user
router.get("/getOrderHistory", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderData = userData.orders.reverse();
    return res.status(200).json({
      status: "success",
      data: orderData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get all orders of admin
router.get("/get-all-orders", async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });

    const orderData = userData.reverse();
    return res.status(200).json({
      status: "success",
      data: orderData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//update order
router.put("/update-status/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
     await Order.findByIdAndUpdate(id, { status: req.body.status });

    return res.status(200).json({
      status: "success",
      message: "status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

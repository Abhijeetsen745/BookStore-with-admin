import express from "express";
import User from "../model/user.js";
import authentication from "./userAuth.js";

const router = express.Router();
//put book to cart
router.put("/add-to-cart", authentication, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourited = userData.cart.includes(bookid);

    if (isBookFavourited) {
      return res.json({
        status: "success",
        message: "Book is already in cart",
      });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

    return res.status(200).json({
      status: "success",
      message: "Book added to cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//remove from cart
router.put("/remove-from-cart/:bookid", authentication, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    const userData = await User.findById(id);
    // const isBookFavourited = userData.cart.includes(bookid)

    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });

    return res.status(200).json({
      status: "success",
      message: "Book removed from cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get all books from particular user
router.get("/get-user-cart", authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

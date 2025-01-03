import express from "express";
import User from "../model/user.js";
import authentication from "./userAuth.js";

const router = express.Router();
//add book to favourites
router.put("/add-book-to-favourite",authentication, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res
        .status(200)
        .json({ message: "Book is already in favourites!" });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete
router.put("/remove-book-from-favourite",authentication, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    }

    return res.status(200).json({ message: "Book removed from favourites!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get all books from particular user
router.get("/get-favourites-book",authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;

    return res.status(200).json({
      status: "success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
});



export default router;

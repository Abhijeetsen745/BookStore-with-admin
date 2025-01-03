import express from "express";
import User from "../model/user.js";
// import jwt from "jsonwebtoken";
import Book from "../model/book.js";
import authentication from "./userAuth.js";

const router = express.Router();

//admin pannel - add book
router.post("/addBook",authentication, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (user.role !== "admin") {
      return res.status(401).json({ message: "You are not an admin" });
    }
    const { url, title, author, price, desc, language } = req.body;
    if (!url || !title || !author || !price || !desc || !language) {
      return res.status(400).json({ message: "Missing required book data" });
    }
    
    
    const newBook = new Book({
      url,
      title,
      author,
      price,
      desc,
      language,
    });
    await newBook.save();
    
    
    res.status(201).json({ message: "Book Added Successfully" });
  } catch (error) {
    // res.status(500).json({ message: "Internal server error" });
    console.log(error);
    
  }
});
//update
router.put("/updateBook",authentication , async (req, res) => {
  try {
    const { bookid } = req.headers;
    const { url, title, author, price, desc, language } = req.body;
    let currbook = await Book.findByIdAndUpdate(bookid,{$set:{
      
        url: url,
        title: title,
        author: author,
        price: price,
        desc: desc,
        language: language,
      
    }},{new:true});

    
    
    // await book.save()
    res.status(201).json({ message: "Book updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//delete
router.delete("/deleteBook", authentication ,async (req, res) => {
  try {
    const { bookid } = req.headers;

    await Book.findByIdAndDelete(bookid);

    res.status(201).json({ message: "Book deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//getallbooks
router.get("/getAllbook" ,async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 })
    return res.json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get-recent-books
router.get("/get-recent-books" , async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get book by id
router.get('/get-book-byid/:id' ,async (req,res) => {
  try {
    
    const {id} = req.params;
    const books = await Book.findById(id)
    return res.json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

export default router;

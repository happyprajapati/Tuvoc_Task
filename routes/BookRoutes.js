import express from "express";
import BookImageUpload from "../middlewares/BookImageUpload.js";
import { addBook, getBookById, getBooks, updateBook, deleteBook } from "../controller/BookController.js";
import { AuthenticateUser } from "../middlewares/AuthenticateUser.js";

const router = express.Router();

router.get("/", 
    AuthenticateUser,
    getBooks
)
router.get("/:id",
    AuthenticateUser,
    getBookById
)

router.post("/", 
    AuthenticateUser,
    BookImageUpload.single("image"),
    addBook
)

router.put("/:id",
    BookImageUpload.single("image"),
    updateBook
)

router.delete("/:id",
    deleteBook
)

export default router;
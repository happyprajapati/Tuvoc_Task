import BooksModel from "../models/BooksModel.js";
// import UserModel from "../models/UserModel.js";

export const addBook = async (req, res) => {
    try {
        const { title, author, description } = req.body;
        if (req.file) {
            var photo = req.file.filename;
        } else {
            var photo = "";
        }
        const book = await BooksModel.create({
            title,
            author,
            description,
            photo,
            userId: req.user.id
        });

        res.status(200).json({
            code: 200,
            status: "success",
            message: "Book added successfully",
            data: {
                message: "Book added successfully",
                book_id: book._id,
            },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            status: "failure",
            message: "Something went wrong",
            data: {
                message: "Something went wrong",
            },
        });
    }
}

export const getBooks = async (req, res) => {
    try {
        const books = await BooksModel.find();
        res.status(200).json({
            code: 200,
            status: "success",
            length: books.length,
            message: "Books fetched successfully",
            data: books,
        });
    } catch (error) {
        console.log(e);
        res.status(500).json({
            code: 500,
            status: "failure",
            message: "Something went wrong",
            data: {
                message: "Something went wrong",
            },
        });
    }
}

export const getBookById = async (req, res) => {
    try {
        const book = await BooksModel.findById(req.params.id);
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Book fetched successfully",
            data: book,
        });
    } catch (error) {
        console.log(e);
        res.status(500).json({
            code: 500,
            status: "failure",
            message: "Something went wrong",
            data: {
                message: "Something went wrong",
            },
        });
    }
}

export const updateBook = async (req, res) => {
    try {
        const { title, author, description } = req.body;
        if (req.file) {
            var photo = req.file.filename;
        } else {
            var photo = "";
        }
        const book = await BooksModel.findByIdAndUpdate(req.params.id, {
            title,
            author,
            description,
            photo,
        });
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Book updated successfully",
            data: {
                message: "Book updated successfully",
                book_id: book._id,
            },
        });
    } catch (error) {
        console.log(e);
        res.status(500).json({
            code: 500,
            status: "failure",
            message: "Something went wrong",
            data: {
                message: "Something went wrong",
            },
        });
    }
}

export const deleteBook = async (req, res) => {
    try {
        const book = await BooksModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            code: 200,
            status: "success",
            message: "Book deleted successfully",
            data: {
                message: "Book deleted successfully",
                book_id: book._id,
            },
        });
    } catch (error) {
        console.log(e);
        res.status(500).json({
            code: 500,
            status: "failure",
            message: "Something went wrong",
            data: {
                message: "Something went wrong",
            },
        });
    }
}
import mongoose, { Schema } from "mongoose";

const BooksSchema = Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
})
const BooksModel = mongoose.model('book', BooksSchema);

export default BooksModel;
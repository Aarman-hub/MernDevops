const express = require("express");
const {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook,
    getPublishedBooks
} = require("../controllers/bookControllers");

const router = express.Router();

router.route("/books").get(getAllBooks).post(createBook);
router.route("/books/:id").patch(updateBook).delete(deleteBook);
router.route("/books/published").get(getPublishedBooks).post(createBook);

module.exports = router;
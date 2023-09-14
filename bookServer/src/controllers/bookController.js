const Book = require('../models/Book');

async function addBook(req, res) {
  try {
    const { title, author, publicationDate } = req.body;
    const book = new Book({ title, author, publicationDate });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function searchBooks(req, res) {
  try {
    const { title } = req.query;
    const books = await Book.find({ title: { $regex: title, $options: 'i' } });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { addBook, searchBooks };

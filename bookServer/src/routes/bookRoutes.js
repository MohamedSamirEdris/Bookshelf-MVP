const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/books', bookController.addBook);
router.get('/books', bookController.searchBooks);

module.exports = router;

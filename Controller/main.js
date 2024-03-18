const express = require('express');
const User = require('../Model/User');
const sequelize = require('../ConnetDb/database');
const Book = require('../Model/Book');
const bodyParser = require('body-parser');
const BookService = require('../Service/BookService');
const req = require('express/lib/request');
const res = require('express/lib/response');
const cors = require('cors');


const app = express();
const router = express.Router();
const port = 3000;
app.use(cors());
app.use(express.static('public'));
// Kiểm tra kết nối
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Đồng bộ hóa cơ sở dữ liệu và bắt đầu lắng nghe yêu cầu HTTP
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized successfully.');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

  app.use(bodyParser.json());

// API endpoint để thêm sách
app.post('/api/books', async (req, res) => {
    const { title, 
      ProductName,
      ProductCode,
      ProductDate,
      ProductStoreCode,
      price } = req.body;
  
    try {
      const newBook = await BookService.addBook(title, 
        ProductName,
        ProductCode,
        ProductDate,
        ProductStoreCode,
        price);
      res.status(201).json({ success: true, book: newBook });
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  app.get('/api/GetallBook', async (req, res) => {
    try {
        const books = await Book.findAll(); // Retrieve all books from the database
        res.status(200).json({ success: true, book: books }); // Send the retrieved books as a JSON response
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' }); // Handle any errors
    }
});
  app.put('/api/updateBook/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedBook = await BookService.updateBook(bookId, updatedData);
        res.status(200).json({ success: true, book: updatedBook });
    } catch (error) {
        console.error('Error updating book:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.delete('/api/deleteBook/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    // Gọi hàm deleteBook từ BookService
    const deletedBookData = await BookService.deleteBook(bookId);

    // Trả về thông tin của cuốn sách đã bị xóa
    res.status(200).json(deletedBookData);
  } catch (error) {
    console.error('Error deleting book:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
app.get('/api/getBook/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    res.status(200).json({ success: true, book });
  } catch (error) {
    console.error('Error getting book information:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
  


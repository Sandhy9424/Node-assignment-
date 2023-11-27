
const pool = require('./database.js');


// GET all books
const getBook=async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM books');
    const books = result.rows;
    client.release();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// POST method to add a new book
const addBook= async (req, res) => {
    const { title, author} = req.body;
  
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO books (name, author ) VALUES ($1, $2 )',
        [title, author ]
      );
      client.release();
      res.status(201).send('Book added successfully');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// PUT method to update a book
const updateBook= async (req, res) => {
    const { title, author } = req.body;
    const bookId = req.params.id;
  
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE books SET title = $1, author = $2 WHERE id = $3',
        [title, author , bookId]
      );
      client.release();
      res.send(`Book with ID ${bookId} updated successfully`);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
   // DELETE method to delete a book
const deleteBook=async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const client = await pool.connect();
      const result = await client.query('DELETE FROM books WHERE id = $1', [bookId]);
      client.release();
      res.send(`Book with ID ${bookId} deleted successfully`);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
const getBookById=async (req, res) => {
  const bookId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM books WHERE id = $1', [bookId]);
    const book = result.rows[0];
    client.release();

    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


  let controller={
    addBook:addBook,
    getBook:getBook,
    updateBook:updateBook,
    deleteBook:deleteBook,
    getBookById:getBookById

  }
   
module.exports = controller;


const pool = require('./database.js');


// GET all books
const getBook=async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM book');
    const books = result.rows;
    client.release();
    res.status(200).send(books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// POST method to add a new book
const addBook= async (req, res) => {
    const { title, author} = req.body;
  
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO book (name, author ) VALUES ($1, $2 )',
        [title, author ]
      );
      client.release();
      res.status(201).send('Book added successfully');
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
// PUT method to update a book
const updateBook= async (req, res) => {
    const { title, author } = req.body;
    const bookId = req.params.id;
  
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE book SET name = $1, author = $2 WHERE id = $3',
        [title, author , bookId]
      );
      client.release();
      res.status(200).send(`Book with ID ${bookId} updated successfully`);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
   // DELETE method to delete a book
const deleteBook=async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const client = await pool.connect();
      const result = await client.query('DELETE FROM book WHERE id = $1', [bookId]);
      client.release();
      res.status(200).send(`Book with ID ${bookId} deleted successfully`);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
const getBookById=async (req, res) => {
  const bookId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM book WHERE id = $1', [bookId]);
    const book = result.rows[0];
    client.release();

    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).send({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
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

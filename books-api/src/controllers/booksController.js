const pgClient = require('../config/pgClient');

function index(req, res) {
  const sql = `
    SELECT
      b.id,
      b.title,
      (SELECT row_to_json(x) FROM (SELECT a.id, a.title, a.first_name, a.middle_name, a.last_name FROM authors a WHERE a.id = b.author_id) x) AS author
    FROM
      books b
  `;

  pgClient.query(sql)
    .then(results => {
      res.json(results.rows);
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

function show(req, res) {
  const sql = `
    SELECT
      b.id,
      b.title,
      (SELECT row_to_json(x) FROM (SELECT a.id, a.title, a.first_name, a.middle_name, a.last_name FROM authors a WHERE a.id = b.author_id) x) AS author
    FROM
      books b
    WHERE
      id = $1
  `;

  pgClient.query(sql, [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json(results.rows[0]);
      }
      else {
        res.status(404).json({ error: `Book not found for id ${req.params.id}.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

function create(req, res) {
  const book = req.body;

  pgClient.query('INSERT INTO books (title, author_id) VALUES ($1, $2) RETURNING id', [book.name, book.author_id])
    .then(results => {
      res.location(`/books/${results.rows[0].id}`);
      res.json({ message: 'Book created successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

function update(req, res) {
  const book = req.body;

  pgClient.query('UPDATE books SET title = $1, author_id = $2 WHERE id = $3', [book.name, book.author_id, req.params.id])
    .then(results => {
      if(results.rowCount > 0) {
        res.json({ message: 'Book updated successfully' });
      }
      else {
        res.status(404).json({ error: `Book not found for id ${req.params.id}.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

function destroy(req, res) {
  pgClient.query('DELETE FROM books WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json({ message: 'Book successfully deleted.' });
      }
      else {
        res.status(404).json({ error: `Book not found for id ${req.params.id}.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

const booksController = {
  index,
  show,
  create,
  update,
  destroy
}
module.exports = booksController;
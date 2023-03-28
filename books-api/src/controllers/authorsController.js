const pgClient = require('../config/pgClient');

function index(req, res) {
  pgClient.query('SELECT id, title, first_name, middle_name, last_name FROM authors ORDER BY last_name')
    .then(results => {
      res.json(results.rows);
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

function show(req, res) {
  pgClient.query('SELECT id, title, first_name, middle_name, last_name FROM authors WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json(results.rows[0]);
      }
      else {
        res.status(404).json({ error: `Author not found for id ${req.params.id}.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

function create(req, res) {
  const author = req.body;

  const values = [
    author.title,
    author.first_name,
    author.middle_name,
    author.last_name
  ];

  pgClient.query('INSERT INTO authors (title, first_name, middle_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id', values)
    .then(results => {
      res.location(`/authors/${results.rows[0].id}`);
      res.json({ message: 'Author created successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

function update(req, res) {
  const author = req.body;

  const sql = 'UPDATE authors SET title = $1, first_name = $2, middle_name = $3, last_name = $4 WHERE id = $5';

  const values = [
    author.title,
    author.first_name,
    author.middle_name,
    author.last_name,
    req.params.id
  ];

  pgClient.query(sql, values)
    .then(results => {
      if(results.rowCount > 0) {
        res.json({ message: 'Author updated successfully' });
      }
      else {
        res.status(404).json({ error: `Author not found for id ${req.params.id}.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

function destroy(req, res) {
  pgClient.query('DELETE FROM authors WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json({ message: 'Author successfully deleted.' });
      }
      else {
        res.status(404).json({ error: `Author not found for id ${req.params.id}.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

const authorsController = {
  index,
  show,
  create,
  update,
  destroy
}
module.exports = authorsController;
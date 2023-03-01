const pgClient = require('../config/pgClient');

function index(req, res) {
  pgClient.query('SELECT id, name FROM authors ORDER BY name')
    .then(results => {
      res.json(results.rows);
    })
    .catch(error => {
      res.status(500).json({ error: `Error : ${error}` });
    });
}

function show(req, res) {
  pgClient.query('SELECT id, name FROM authors WHERE id = $1', [req.params.id])
    .then(results => {
      if (results.rowCount > 0) {
        res.json(results.rows[0]);
      }
      else {
        res.status(404).json({ error: `Author not found for id ${req.params.id}.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Error : ${error}` });
    });
}

function create(req, res) {
  const author = req.body;

  pgClient.query('INSERT INTO authors (name) VALUES ($1) RETURNING id', [author.name])
    .then(results => {
      res.location(`/authors/${results.rows[0].id}`);
      res.json({ message: 'Author created successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: `Error : ${error}` });
    });
}

function update(req, res) {
  const author = req.body;

  pgClient.query('UPDATE authors SET name = $1 WHERE id = $2', [author.name, req.params.id])
    .then(results => {
      if(results.rowCount > 0) {
        res.json({ message: 'Author updated successfully' });
      }
      else {
        res.status(404).json({ error: `Author not found for id ${req.params.id}.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: `Error : ${error}` });
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
      res.status(500).json({ error: `Error : ${error}` });
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
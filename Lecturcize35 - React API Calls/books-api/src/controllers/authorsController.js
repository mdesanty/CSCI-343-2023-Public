const pgClient = require('../config/pgClient');

function index(req, res) {
  pgClient.query('SELECT id, title, first_name, middle_name, last_name FROM authors ORDER BY last_name')
    .then(results => {
      res.json(results.rows);
    })
    .catch(error => {
      res.status(500).json({ error: `Error : ${error}` });
    });
}

const authorsController = {
  index
}

module.exports = authorsController;
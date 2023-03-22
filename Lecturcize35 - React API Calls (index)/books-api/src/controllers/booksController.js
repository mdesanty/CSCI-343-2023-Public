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
      res.status(500).json({ error: `Error : ${error}` });
    });
}

const booksController = {
  index
}

module.exports = booksController;
const pgClient = require('../config/pgClient');

function index(req, res) {
  pgClient.query('SELECT id, name, user_id FROM songs WHERE user_id = $1 ORDER BY name', [res.locals.user.id])
    .then(results => {
      res.json(results.rows);
    })
    .catch(error => {
      res.status(500).json({ error: `${error}` });
    });
}

const songsController = {
  index
};

module.exports = songsController;
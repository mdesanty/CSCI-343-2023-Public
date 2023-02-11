require("dotenv").config();

const express = require("express");
const session = require("express-session")

const pgClient = require('./pgClient');

const app = express();

const sessionOptions = {
  secret: "Mike is awesome",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60_000 }
};
app.use(session(sessionOptions));

/**
 * This is a library to parse the body of requests.
 *
 * If you recall from Advanced Web Dev, post and put requests use the body for
 * the data instead of the query.
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/books", getBooks);
app.get("/books/:id", getBook);
app.post("/books", createBook);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function getBooks(req, res) {
  pgClient.query('SELECT name, author FROM books ORDER BY name')
    .then((results) => {
      res.status(200).json(results.rows);
    })
    .catch((error) => {
      res.status(500).json({ error: `We encountered an error with your request: ${error}.` });
    });
}

function getBook(req, res) {
  pgClient.query('SELECT name, author FROM books WHERE id = $1', [req.params.id])
    .then((results) => {
      res.status(200).json(results.rows[0]);
    })
    .catch((error) => {
      res.status(500).json({ error: `We encountered an error with your request: ${error}.` });
    });
}

function createBook(req, res) {
  const book = req.body;

  pgClient.query('INSERT INTO books (name, author) VALUES ($1, $2)', [book.name, book.author])
    .then((results) => {
      res.status(201).json({ message: 'Book created successfully.' });
    })
    .catch((error) => {
      res.status(500).json({ error: `We encountered an error with your request: ${ error }.` });
    });
}
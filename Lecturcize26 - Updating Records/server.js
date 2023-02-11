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

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/books", getBooks);
app.get("/books/:id", getBook);
app.post("/books", createBook);
app.put("/books/:id", updateBook);

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

  pgClient.query('INSERT INTO books (name, author) VALUES ($1, $2) RETURNING id', [book.name, book.author])
    .then((results) => {
      res.location(`/books/${results.rows[0].id}`);
      res.status(201).json({ message: 'Book created successfully.' });
    })
    .catch((error) => {
      res.status(500).json({ error: `We encountered an error with your request: ${ error }.` });
    });
}

function updateBook(req, res) {
  const book = req.body;

  pgClient.query('UPDATE books SET name = $1, author = $2 WHERE id = $3', [book.name, book.author, req.params.id])
    .then((results) => {
      /**
       * We can check how many records were updated using the results we get back from the query call.
       *
       * If it's 1 or greater than 0 (effectively the same thing in our case here) then we know that
       * the update was successfull.
       *
       * Otherwise, we could not find the record - which is not the same as an error updating a record
       * that we did find. So we provide different error messages to the user for record not found and
       * errors encountered during an update.
       */
      if (results.rowCount > 0) {
        res.status(200).json({ message: 'Book successfully updated.' });
      }
      else {
        res.status(404).json({ error: 'Book not found.' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Error updating book: ${ error }` });
    });
}
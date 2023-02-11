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

app.get("/books", getBooks);

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
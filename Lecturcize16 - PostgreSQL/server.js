require("dotenv").config();

const express = require("express");
const session = require("express-session")

const { Pool } = require('pg');
const pgClient = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_PASSWORD,
  password: process.env.DB_NAME,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
});

const app = express();

const sessionOptions = {
  secret: "Mike is awesome",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60_000 }
};
app.use(session(sessionOptions));

app.get("/songs", getSongs);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function getSongs(req, res) {

}
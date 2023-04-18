require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.JWT_SECRET));

const session = require("express-session")
const sessionOptions = {
  secret: "Mike is awesome",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60_000
  }
};
app.use(session(sessionOptions));

const userRoutes = require('./routes/authRoutes');
app.use('/auth', userRoutes);

const songRoutes = require('./routes/songRoutes');
app.use('/songs', songRoutes);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});
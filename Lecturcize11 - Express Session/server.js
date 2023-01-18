require("dotenv").config();

const express = require("express");
const session = require("express-session")

const app = express();

const sessionOptions = {
  secret: "Mike is awesome", //
  resave: false, //
  saveUninitialized: false, //
  cookie: { //
    maxAge: 60_000 //
  }
};

/**
 * Middleware and the .use function.
 */
app.use(session(sessionOptions));

app.get("/introduce", introduce);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function introduce(req, res) {
  if (req.query.name !== undefined)
    req.session.name = req.query.name;

  const displayName = req.session.name || "nobody";

  /**
   * res.json
   */
  res.json(res, 200, { message: `Hello ${displayName}` });
}
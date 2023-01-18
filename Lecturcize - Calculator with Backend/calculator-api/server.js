require("dotenv").config();

const express = require("express");
const app = express();

app.get("/add", add);
app.get("/subtract", subtract);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function add(req, res) {
  const x = parseFloat(req.query.x);
  const y = parseFloat(req.query.y);

  let result = {};
  if (isNaN(x) || isNaN(y))
    result = { error: "Both x and y must be numbers." };
  else
    result = { result: x + y };

  res.json(result);
}

function subtract(req, res) {
  const x = parseFloat(req.query.x);
  const y = parseFloat(req.query.y);

  let result = {};
  if (isNaN(x) || isNaN(y))
    result = { error: "Both x and y must be numbers." };
  else
    result = { result: x - y };

  res.json(result);
}
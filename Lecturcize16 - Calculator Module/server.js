require("dotenv").config();

const calculator = require('./asyncCalculator');

const express = require("express");
const app = express();

app.get("/add", add);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function add(req, res) {
  calculator.add(req.query.a, req.query.b)
    .then((sum) => { res.json({ result: sum }); })
    .catch((error) => { res.status(400).json({ error: error.message }); });
}
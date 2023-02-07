require("dotenv").config();

const express = require("express");
const app = express();

app.get("/add", add);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function add(req, res) {
  executeAdd(req.query.a, req.query.b)
    .then((sum) => { res.json({ result: sum }) })
    .catch((error) => { res.status(400).json({ error: error.message }) });
}

function executeAdd(a, b) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a === undefined || b === undefined)
        reject(new Error('Both a and b are required.'));

      if (isNaN(a) || isNaN(b))
        reject(new Error('Both a and b must be numbers.'));

      const sum = parseFloat(a) + parseFloat(b);
      resolve(sum);
    })
  });

  return promise
}
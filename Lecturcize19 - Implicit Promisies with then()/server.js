require('dotenv').config();

const express = require('express');
const app = express();

app.get('/chain', chain);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function chain(req, res) {
  getPromise(req.query.number)
    .then((result) => { return result * 3; })
    .then((result) => { return result * 4; })
    .then((result) => { res.json({ result: result }) })
    .catch((error) => { res.status(400).json({ error: error.message }) });
}

function getPromise(number) {
  const promise = new Promise((resolve, reject) => {
    if (isNaN(number))
      reject(new Error('Number must be a number.'));

    const result = parseFloat(number) * 2;
    resolve(result);
  });

  return promise;
}
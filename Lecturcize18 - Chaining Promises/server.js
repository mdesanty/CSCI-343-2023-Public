require('dotenv').config();

const calculator = require('./asyncCalculator');

const express = require('express');
const app = express();

app.get('/add', add);
app.get('/subtract', subtract);
app.get('/sum', sum);
app.get('/addSubtractAndSum', addSubtractAndSum);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function add(req, res) {
  calculator.add(req.query.a, req.query.b)
    .then(sum => { res.json({ result: sum }); })
    .catch(error => { res.status(400).json({ error: error.message }); });
}

function subtract(req, res) {
  calculator.subtract(req.query.a, req.query.b)
    .then(value => { res.json({ result: value }); })
    .catch(error => { res.status(400).json({ error: error.message }); });
}

function sum(req, res) {
  calculator.sum(req.query.num)
    .then(value => { res.json({ result: value });})
    .catch(error => { res.status(400).json({ error: error.message }); });
}

function addSubtractAndSum(req, res) {
  const result = {};

  calculator.add(req.query.a, req.query.b)
    .then((sum) => {
      result.addResult = sum;

      /**
       * The .then method returns a new Promise. This allows for chaining .then calls.
       *
       * If the function pass as a handler (callback) to .then returns a Promise, an equivalent
       * Promise will be exposed to the subsequent .then call.
       *
       * The value returns from .then is resolved in the same way as .resolve(). This means even
       * if the return value of the handler is not a Promise, it will be implicitly wrapped in a
       * Promise and then resolved (with the return value).
       *
       */
      return calculator.subtract(req.query.a, req.query.b);
    })
    .then((difference) => {
      result.subtractResult = difference;
      return calculator.sum(req.query.num);
    })
    .then((sum) => {
      result.summResult = sum;
      res.json(result);
    })
    .catch((error) => { res.status(400).json({ error: error.message }); });
}
require('dotenv').config();

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
  executeAdd(req.query.a, req.query.b)
    .then((result) => { res.json({ result: result.sum }) })
    .catch((error) => { res.status(400).json({ error: error.message }) });
}

function subtract(req, res) {
  executeSubtract(req.query.a, req.query.b)
    .then((result) => { res.json({ result: result.difference }) })
    .catch((error) => { res.status(400).json({ error: error.message }) });
}

function sum(req, res) {
  executeSum(req.query.num)
    .then((result) => { res.json({ result: result.sum }) })
    .catch((error) => { res.status(400).json({ error: error.message }) });
}

function addSubtractAndSum(req, res) {
  const result = {};

  executeAdd(req.query.a, req.query.b)
    .then((data) => {
      result.addResult = data.sum;

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
      return executeSubtract(req.query.a, req.query.b);
    })
    .then((data) => {
      result.subtractResult = data.difference;
      return executeSum(req.query.num);
    })
    .then((data) => {
      result.summResult = data.sum;
      res.json(result);
    })
    .catch((error) => { res.status(400).json({ error: error.message }) });
}

function executeAdd(a, b) {
  const additionPromise = new Promise((resolve, reject) => {
    if (a === undefined || b === undefined)
      reject(new Error('Both a and b are required.'));

    if (isNaN(a) || isNaN(b))
      reject(new Error('Both a and b must be numbers.'));

    const sum = parseFloat(a) + parseFloat(b);
    resolve({ sum });
  });

  return additionPromise
}

function executeSubtract(a, b) {
  const subtractionPromise = new Promise((resolve, reject) => {
    if (a === undefined || b === undefined)
      reject(new Error('Both a and b are required.'));

    if (isNaN(a) || isNaN(b))
      reject(new Error('Both a and b must be numbers.'));

    const difference = parseFloat(a) - parseFloat(b);
    resolve({ difference });
  });

  return subtractionPromise
}

function executeSum(nums) {
  const sumPromise = new Promise((resolve, reject) => {
    if (nums === undefined)
      reject(new Error('At least one value for num is required.'));

    const sum = nums.map(i => {
      if(isNaN(i))
        reject(new Error('All values in num must be numbers.'));

      return parseFloat(i);
    }).reduce((sum, i) => { sum += i; return sum; });

    resolve({ sum });
  });

  return sumPromise;
}
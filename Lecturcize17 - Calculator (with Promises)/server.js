require('dotenv').config();

const calculator = require('./asyncCalculator');

const express = require('express');
const app = express();

app.get('/add', add);
app.get('/subtract', subtract);
app.get('/sum', sum);

const listener = app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening at ${listener.address().address}:${listener.address().port}`);
});

function add(req, res) {
  executeAdd(req.query.a, req.query.b)
    .then((sum) => { res.json({ result: sum }) })
    .catch((error) => { res.status(400).json({ error: error.message }) });
}

function subtract(req, res) {
  executeSubtract(req.query.a, req.query.b)
    .then((difference) => { res.json({ result: difference }) })
    .catch((error) => { res.status(400).json({ error: error.message }) });
}

function sum(req, res) {
  calculator.sum(req.query.num)
    .then((sum) => { res.json({ result: sum }) })
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